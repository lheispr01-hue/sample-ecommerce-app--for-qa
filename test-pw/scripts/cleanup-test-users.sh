#!/usr/bin/env bash
# Deletes the users recorded by seed-test-users.sh (plus their carts and orders) from the VM database.
# There is no delete-user API, so this runs psql inside the Postgres container over SSH.
set -euo pipefail

CREATED_USERS_FILE="${CREATED_USERS_FILE:-$(dirname "$0")/../.created-test-users}"
VM_HOST="${VM_HOST:?set VM_HOST}"
VM_USER="${VM_USER:-ec2-user}"
SSH_KEY_FILE="${SSH_KEY_FILE:-}"

if [ ! -s "$CREATED_USERS_FILE" ]; then
  echo "No test users were created in this run; nothing to clean up."
  exit 0
fi

names=()
while IFS= read -r name; do
  [ -z "$name" ] && continue
  if ! [[ "$name" =~ ^[A-Za-z0-9_.-]+$ ]]; then
    echo "Refusing unsafe username: $name" >&2
    exit 1
  fi
  names+=("'$name'")
done < "$CREATED_USERS_FILE"

list=$(IFS=,; echo "${names[*]}")

sql="
BEGIN;
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id IN (SELECT id FROM users WHERE username IN ($list)));
DELETE FROM orders WHERE user_id IN (SELECT id FROM users WHERE username IN ($list));
DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM carts WHERE user_id IN (SELECT id FROM users WHERE username IN ($list)));
DELETE FROM carts WHERE user_id IN (SELECT id FROM users WHERE username IN ($list));
DELETE FROM users WHERE username IN ($list);
COMMIT;"

ssh_opts=(-o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new)
[ -n "$SSH_KEY_FILE" ] && ssh_opts+=(-i "$SSH_KEY_FILE")

printf '%s\n' "$sql" | ssh "${ssh_opts[@]}" "$VM_USER@$VM_HOST" \
  'docker exec -i ecommerce-postgres psql -v ON_ERROR_STOP=1 -U ecommerce -d ecommerce'

echo "Removed test users: $list"
rm -f "$CREATED_USERS_FILE"

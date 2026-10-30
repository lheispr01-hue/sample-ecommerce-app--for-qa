#!/usr/bin/env bash
# Registers the E2E test user(s) through the public API.
# Only users created by this run are recorded in CREATED_USERS_FILE, so cleanup never removes pre-existing users.
set -euo pipefail

API_BASE_URL="${API_BASE_URL:-http://localhost/api}"
DEMO_USERNAME="${DEMO_USERNAME:-demo}"
DEMO_PASSWORD="${DEMO_PASSWORD:-password1}"
CREATED_USERS_FILE="${CREATED_USERS_FILE:-$(dirname "$0")/../.created-test-users}"

: > "$CREATED_USERS_FILE"

json() {
  python3 -c 'import json,sys; print(json.dumps(dict(zip(sys.argv[1::2], sys.argv[2::2]))))' "$@"
}

seed_user() {
  local username="$1" password="$2" status
  status=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$API_BASE_URL/auth/register" \
    -H 'Content-Type: application/json' \
    -d "$(json username "$username" password "$password" displayName "$username")")
  case "$status" in
    200|201) echo "$username" >> "$CREATED_USERS_FILE"; echo "Created test user '$username'" ;;
    409) echo "Test user '$username' already exists, leaving it untouched" ;;
    *) echo "Failed to create test user '$username' (HTTP $status)" >&2; return 1 ;;
  esac

  status=$(curl -sS -o /dev/null -w '%{http_code}' -X POST "$API_BASE_URL/auth/login" \
    -H 'Content-Type: application/json' \
    -d "$(json username "$username" password "$password")")
  if [ "$status" != 200 ]; then
    echo "Login check failed for '$username' (HTTP $status)" >&2
    return 1
  fi
}

seed_user "$DEMO_USERNAME" "$DEMO_PASSWORD"

import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  protected readonly path = '/cart';

  readonly lines: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.lines = page.getByTestId('cart-line');
    this.checkoutButton = page.getByTestId('checkout-button');
  }

  lineFor(productName: string): Locator {
    return this.lines.filter({ hasText: productName });
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

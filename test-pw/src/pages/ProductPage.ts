import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  protected readonly path = '/products';

  readonly name: Locator;
  readonly addToCartButton: Locator;
  readonly addedMessage: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.getByTestId('product-name');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addedMessage = page.getByText('Added to cart');
    this.cartLink = page.getByTestId('cart-link');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}

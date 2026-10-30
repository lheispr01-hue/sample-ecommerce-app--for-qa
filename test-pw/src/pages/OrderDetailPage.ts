import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderDetailPage extends BasePage {
  protected readonly path = '/orders';

  readonly orderNumber: Locator;
  readonly orderStatus: Locator;
  readonly orderLines: Locator;
  readonly cardLast4: Locator;

  constructor(page: Page) {
    super(page);
    this.orderNumber = page.getByTestId('order-number');
    this.orderStatus = page.getByTestId('order-status');
    this.orderLines = page.getByTestId('order-line');
    this.cardLast4 = page.getByTestId('order-last4');
  }
}

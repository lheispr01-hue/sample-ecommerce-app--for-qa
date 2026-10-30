import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CardDetails {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

export class CheckoutPage extends BasePage {
  protected readonly path = '/checkout';

  readonly cardName: Locator;
  readonly cardNumber: Locator;
  readonly cardExpiry: Locator;
  readonly cardCvv: Locator;
  readonly payButton: Locator;
  readonly paymentError: Locator;

  constructor(page: Page) {
    super(page);
    this.cardName = page.getByTestId('card-name');
    this.cardNumber = page.getByTestId('card-number');
    this.cardExpiry = page.getByTestId('card-expiry');
    this.cardCvv = page.getByTestId('card-cvv');
    this.payButton = page.getByTestId('pay-button');
    this.paymentError = page.getByTestId('payment-error');
  }

  async fillCard(card: CardDetails): Promise<void> {
    await this.cardName.fill(card.name);
    await this.cardNumber.fill(card.number);
    await this.cardExpiry.fill(card.expiry);
    await this.cardCvv.fill(card.cvv);
  }

  async pay(): Promise<void> {
    await this.payButton.click();
  }
}

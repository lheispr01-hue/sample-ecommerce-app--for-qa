import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  protected readonly path = '/';

  readonly categorySelect: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productGrid: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.categorySelect = page.getByTestId('search-category');
    this.searchInput = page.getByTestId('search-input');
    this.searchButton = page.getByTestId('search-submit');
    this.productGrid = page.getByTestId('product-grid');
    this.productCards = page.getByTestId('product-card');
  }

  async selectCategory(name: string): Promise<void> {
    await this.categorySelect.selectOption({ label: name });
    // The header select only filters on submit; submit with an empty query.
    await this.searchButton.click();
  }

  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async openFirstProduct(): Promise<string> {
    const first = this.productCards.first();
    const name = (await first.getByTestId('product-name').innerText()).trim();
    await first.click();
    return name;
  }
}

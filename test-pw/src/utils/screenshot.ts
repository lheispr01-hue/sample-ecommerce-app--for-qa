import { Page, TestInfo } from '@playwright/test';

// Saves a full-page PNG for a test step and attaches it to the report.
export async function captureStep(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const path = testInfo.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage: true });
  await testInfo.attach(name, { path, contentType: 'image/png' });
}

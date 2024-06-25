import { expect, Page } from '@playwright/test';

async function verifyPDFDownloadFirst(page: Page) {
  await page.waitForSelector('.icon-download');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.icon-download').first().click()
  ]);
  const path = await download.path();
  expect(path).toBeTruthy();
}

export { verifyPDFDownloadFirst }; 



async function verifyPDFDownload(page: Page) {
  await page.waitForSelector('.icon-download');
  const downloadButtons = await page.locator('.icon-download').elementHandles();
  const randomIndex = Math.floor(Math.random() * downloadButtons.length);
  const randomButton = downloadButtons[randomIndex];
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    randomButton.click()
  ]);

  const path = await download.path();
  expect(path).toBeTruthy();
}

export { verifyPDFDownload };


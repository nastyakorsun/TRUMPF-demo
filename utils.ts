import { expect, Page } from '@playwright/test';

/**
 * Verifies the download of the first PDF file found on the page.
 *
 * @param {Page} page - The Playwright page object.
 *
 * @example
 * // Using in a Playwright test
 * await verifyPDFDownloadFirst(page);
 */

async function verifyPDFDownloadFirst(page: Page) {
  await page.waitForSelector('.icon-download');
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.icon-download').first().click()
  ]);
  const path = await download.path();
  expect(path).toBeTruthy();
}

/**
 * Verifies the download of a randomly selected PDF file found on the page.
 *
 * @param {Page} page - The Playwright page object.
 *
 * @example
 * // Using in a Playwright test
 * await verifyPDFDownload(page);
 */

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
/**
 * Generates a unique email address and corresponding subject using the given base name and domain,
 * appending the current timestamp to ensure uniqueness.
 *
 * @param {string} baseName - The base name of the email address and subject.
 * @param {string} domain - The domain of the email address.
 * @returns {object} - An object containing the unique email address and subject.
 *
 * @example
 * const { email, subject } = generateUniqueEmail('test_de_whitepaper', 'galaniprojectsteam.testinator.com');
 * console.log(email); // Outputs something like 'test_de_whitepaper1632357794345@galaniprojectsteam.testinator.com'
 * console.log(subject); // Outputs something like 'test_de_whitepaper1632357794345'
 *
 * @example
 * // Using in a Playwright test
 * const { email, subject } = generateUniqueEmail('test_de_whitepaper', 'galaniprojectsteam.testinator.com');
 * await page.fill('input[name="email"]', email);
 */
function generateUniqueEmail(baseName: string, domain: string): { email: string, subject: string } {
    const timestamp = Date.now();
    const uniqueIdentifier = `${baseName}${timestamp}`;
    return {
      email: `${uniqueIdentifier}@${domain}`,
      subject: uniqueIdentifier,
    };
  }
  

export { verifyPDFDownload, verifyPDFDownloadFirst, generateUniqueEmail}; 


import { test, expect } from '@playwright/test';

test.describe('Whitepaper Request Form Tests', () => {

  test('Request Whitepaper and fill out the form', async ({ page }) => { 
    await test.step('Navigate to the landing page', async () => {
      await page.goto('https://www.trumpf.com/de_DE/landing-pages/de/whitepaper-selektives-laserreinigen-funktionsweise-und-industrielle-anwendungen/');
    });

    await test.step('Accept cookies', async () => {
      const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
      await acceptCookiesButton.click();
    });

    await test.step('Click on the "Whitepaper anfordern" button', async () => {
      const requestWhitepaperButton = page.locator('button', { hasText: 'Whitepaper anfordern' });
      await requestWhitepaperButton.click();
    });

    await test.step('Wait for the form to appear', async () => {
      const form = page.locator('form#whitepaperux_standard');
      await expect(form).toBeVisible({ timeout: 10000 });
    });

    await test.step('Fill out the form fields', async () => {
      await page.selectOption('select[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][anrede]"]', '3'); // Divers
      await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][vorname]"]', 'Test');
      await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][nachname]"]', 'Test');
      await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][company-1]"]', 'Test GmbH');
      await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][email]"]', 'test_de@galaniprojectsteam.testinator.com');
    }); 
// Note: If the part before the domain in the email address remains the same each time, 
// the system will not send a newsletter registration confirmation email. 
// There are two potential solutions to this issue:
// 1. Use a new random name before the domain each time to ensure the email is unique.
// 2. Use the same email address consistently and skip checking the newsletter registration 
//    in this test, as newsletter registration verification should be handled in a separate test.
// For now is 2nd is solusion used 



    await test.step('Fill out the country field', async () => {
      const countryField = page.locator('input#ux-unique-id-2');
      await countryField.click();
      await countryField.fill('Deutschland');
      const countrySuggestion = page.locator('.ux-autosuggest-input__suggestions >> text=Deutschland');
      await expect(countrySuggestion).toBeVisible({ timeout: 10000 });
      await countrySuggestion.click();
    });

    await test.step('Check the newsletter checkbox', async () => {
      const newsletterCheckboxLabel = page.locator('label.ux-checkbox', { hasText: 'Ich bin damit einverstanden' });
      await newsletterCheckboxLabel.scrollIntoViewIfNeeded();
      await newsletterCheckboxLabel.click();
    });

    await test.step('Submit the form', async () => {
      const submitButton = page.locator('button[type="submit"]', { hasText: 'Absenden' });
      await submitButton.click();
    });

    await test.step('Wait for the confirmation message', async () => {
      const confirmationMessage = page.locator('text=Vielen Dank');
      await expect(confirmationMessage).toBeVisible({ timeout: 10000 });
    });
  });

  test('Login to Mailinator, open email and click on attachments tab', async ({ page }) => {
    await test.step('Go to Mailinator', async () => {
      await page.goto('https://www.mailinator.com/');
    });

    await test.step('Click on the LOGIN link', async () => {
      await page.locator('#menu-item-7937').getByRole('link', { name: 'LOGIN' }).click();
    });

    await test.step('Fill in the login credentials and press Enter', async () => {
      await page.locator('input[placeholder="Email"]').fill('korsun@galaniprojects.com');
      await page.locator('input[placeholder="Password"]').fill('IWilltest42!');
      await page.locator('input[placeholder="Password"]').press('Enter');
    });

    await test.step('Wait for the email list to load and click on the first email', async () => {
      const firstEmailSelector = 'tr.ng-scope:first-child';
      await page.waitForSelector(firstEmailSelector);
      await page.click(firstEmailSelector);
    });

    await test.step('Wait for the email content to load', async () => {
      await page.waitForLoadState();
    });

    await test.step('Click on the "ATTACHMENTS" tab', async () => {
      const attachmentsTabSelector = 'a#pills-attachments-tab';
      await page.click(attachmentsTabSelector);
    });

    await test.step('Verify the presence of the download button', async () => {
      const attachmentsSectionSelector = '#pills-attachments-content';
      await page.waitForSelector(attachmentsSectionSelector);
      const downloadButtonSelector = 'button.btn.btn-xs.btn-dark';
      const downloadButton = page.locator(downloadButtonSelector);
      await expect(downloadButton).toHaveText('TRUMPF-Whitepaper-Selektive-Reinigung-mittels-Laser.pdf');
    });

    await test.step('Click the download button and verify that the download starts', async () => {
      const downloadButtonSelector = 'button.btn.btn-xs.btn-dark';
      const downloadButton = page.locator(downloadButtonSelector);
      const [download] = await Promise.all([
        page.waitForEvent('download'), 
        downloadButton.click(), 
      ]);
      const downloadPath = await download.path();
      const downloadName = download.suggestedFilename();
      console.log(`Download started: ${downloadName}`);
      await expect(downloadName).toBe('TRUMPF-Whitepaper-Selektive-Reinigung-mittels-Laser.pdf');
    });
  });
});






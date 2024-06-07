import { test, expect } from '@playwright/test';
import { MailinatorPage } from '../pages/MailinatorPage';

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
      await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][email]"]', 'test_de_whitepaper@galaniprojectsteam.testinator.com');
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
    const mailinatorPage = new MailinatorPage(page);

    await test.step('Login to Mailinator', async () => {
      await mailinatorPage.login('korsun@galaniprojects.com', 'IWilltest42!');
    });

    await test.step('Open the email with subject "test_de_whitepaper"', async () => {
      await mailinatorPage.openEmailBySubject('test');
    });

    await test.step('Click on the "ATTACHMENTS" tab', async () => {
      await mailinatorPage.clickAttachmentsTab();
    });

    await test.step('Verify and download attachment', async () => {
      await mailinatorPage.verifyAndDownloadAttachment('TRUMPF-Whitepaper-Selektive-Reinigung-mittels-Laser.pdf');
    });
  });
});






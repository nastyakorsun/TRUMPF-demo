import { test, expect } from '@playwright/test';
import { MailinatorPage } from '../pages/MailinatorPage';
import { generateUniqueEmail } from '../utils';

test.describe('Newsletter Signup and Confirmation Tests', () => {

  test('Newsletter Signup and Confirmation', async ({ page, context }) => {
    // Generate a unique email for this test run using the current timestamp
    const { email, subject } = generateUniqueEmail('test_de_Newsletter', 'galaniprojectsteam.testinator.com');

    

    await test.step('Navigate to TRUMPF homepage', async () => {
      await page.goto('https://www.trumpf.com/de_DE/');
    });

    await test.step('Accept cookies', async () => {
      await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
    });

    await test.step('Navigate to Newsletter signup page', async () => {
      await page.getByRole('link', { name: 'TRUMPF Newsletteranmeldung' }).click();
    });

    await test.step('Verify default language and available options', async () => {
      const languageSelect = page.locator('#newsletteranmeldung-600343-defaultlanguage');
      await expect(languageSelect).toHaveValue('de'); // Default should be German

      const options = await languageSelect.evaluate((select) => {
        const selectElement = select as HTMLSelectElement;
        return Array.from(selectElement.options).map(option => option.value);
      });
      expect(options).toContain('de');
      expect(options).toContain('en');
    });

    await test.step('Fill out the signup form', async () => {
      await page.locator('#powermail_field_newsletteranmeldung-600343-salutation').selectOption('2');
      await page.getByLabel('Vorname').fill('Adam');
      await page.getByLabel('Nachname').fill('Sandler');
      await page.getByLabel('Firma').fill('abc');
      await page.getByLabel('Land/Region').click();
      await page.getByLabel('Land/Region').fill('d');
      await page.getByText('Deutschland', { exact: true }).click();
      await page.locator('#powermail_field_newsletter_0').click();
      await page.getByLabel('E-Mail\n\t\t\t\t\n*').fill(email);
      await page.getByRole('button', { name: 'Absenden' }).click();
    });

    await test.step('Verify confirmation message', async () => {
      const title = page.getByRole('heading', { name: 'TRUMPF News per E-Mail' });
      await expect(title).toHaveText('TRUMPF News per E-Mail abonnieren');
      await expect(page.getByText('Sichern Sie sich einen')).toBeVisible();
      await expect(page.getByText('Vielen Dank für Ihre')).toBeVisible();
    });

    const mailinatorPage = new MailinatorPage(await context.newPage());

    await test.step('Login to Mailinator', async () => {
      await mailinatorPage.login('korsun@galaniprojects.com', 'IWilltest42!');
    });

    await test.step(`Open the email with subject "${email}"`, async () => {
      await mailinatorPage.openEmailBySubject(subject);
    });

    await test.step('Click the confirmation link in the email', async () => {
      await mailinatorPage.clickLinkInEmail('https://de.trumpf-news.com/go');
    });

    context.on('page', async (newPage) => {
      await newPage.waitForLoadState('domcontentloaded');
      await test.step('Verify the confirmation URL and message', async () => {
        await expect(newPage).toHaveURL('https://www.trumpf.com/de_DE/meta/bestaetigung-newsletteranmeldung/newsletteranmeldung-erfolgreich/');
        const heading = newPage.getByRole('heading', { name: 'Newsletteranmeldung' });
        await expect(heading).toHaveText('Newsletteranmeldung erfolgreich');
      });
    });
  });
});



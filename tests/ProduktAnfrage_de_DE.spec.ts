import { test, expect } from '@playwright/test';
import { MailinatorPage } from '../pages/MailinatorPage';

test('Product inquiry form submission and email verification', async ({ page, browser }) => {
  await test.step('Navigate to the product inquiry page', async () => {
    await page.goto('https://www.trumpf.com/de_DE/meta/produktanfrage/');
  });

  await test.step('Accept all cookies', async () => {
    await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  });

  await test.step('Fill in personal information', async () => {
    await page.locator('#powermail_field_produktanfrage-595634-salutation').selectOption('2');
    await page.getByLabel('Vorname *').fill('Max');
    await page.getByLabel('Nachname *').fill('Mustermann');
    await page.getByLabel('Firma *').fill('Muster GmbH');
    await page.getByLabel('Straße und Nr.').fill('Musterstraße 1');
    await page.getByLabel('PLZ').fill('12345');
    await page.getByLabel('Ort').fill('Musterstadt');
  });

  await test.step('Select country/region', async () => {

    await page.getByLabel('Land/Region').click();
    await page.getByLabel('Land/Region').fill('d');
    await page.getByText('Deutschland', { exact: true }).click();
    
  });

  await test.step('Fill in contact details', async () => {
    await page.getByLabel('Telefon *').fill('0123456789');
    await page.getByLabel('E-Mail *').fill('test_de_produktanfrage@galaniprojectsteam.testinator.com');
  });

  await test.step('Fill in product inquiry details', async () => {
    await page.getByLabel('Folgende Produkte').fill('Dies ist ein Test. Bitte nicht beantworten');
  });

  await test.step('Opt-in for the newsletter', async () => {
    await page.locator('#powermail_field_newsletter_0').check();
  });

  await test.step('Submit the product inquiry form', async () => {
    await page.getByRole('button', { name: 'Absenden' }).click();
  });

  const mailinatorContext = await browser.newContext();
  const mailinatorPage = new MailinatorPage(await mailinatorContext.newPage());

  await test.step('Login to Mailinator', async () => {
    await mailinatorPage.login('korsun@galaniprojects.com', 'IWilltest42!');
  });

  await test.step('Open the email with subject "test_de_produktanfrage"', async () => {
    await mailinatorPage.openEmailBySubject('test_de_produktanfrage');
  });
  await test.step('Click the confirmation link in the email', async () => {
    await mailinatorPage.clickLinkInEmail('https://de.trumpf-news.com/go');
    const newPagePromise = mailinatorContext.waitForEvent('page'); 
    const newPage = await newPagePromise;
    await newPage.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  });

 
});

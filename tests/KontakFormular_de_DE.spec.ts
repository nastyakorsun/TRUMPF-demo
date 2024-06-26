import { test, expect } from '@playwright/test';

test('Contact form submission', async ({ page }) => {
  await test.step('Navigate to the contact page and verify the title', async () => {
    await page.goto('https://www.trumpf.com/de_DE/meta/kontakt/');
    await expect(page).toHaveTitle(/Kontakt | TRUMPF/);
  });

  await test.step('Accept all cookies', async () => {
    await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  });

  await test.step('Select the subject', async () => {
    await page.getByLabel('Betreff').selectOption('Allgemeine_Anfrage');
  });

  await test.step('Fill in the personal information', async () => {
    await page.locator('#powermail_field_kontaktformularwebsite-608876-salutation').selectOption('2');
    await page.getByLabel('Vorname *').fill('Max');
    await page.getByLabel('Nachname *').fill('Mustermann');
    await page.getByLabel('Firma').fill('Musterfirma');
    await page.getByLabel('Straße und Nr.').fill('Musterstraße 1');
    await page.getByLabel('PLZ').fill('12345');
    await page.getByLabel('Ort').fill('Muserstadt');
    await page.getByLabel('Bundesland').fill('Musterland');
    await page.getByLabel('Land/Region').click();
    await page.getByLabel('Land/Region').fill('Muster');
    await page.getByLabel('Telefon').fill('03012345678');
    await page.getByLabel('E-Mail *').fill('test_de_kontakt@galaniprojectsteam.testinator.com');
  });

  await test.step('Specify products and message', async () => {
    await page.getByLabel('Folgende Produkte').fill('Nur ein Test');
    await page.getByLabel('Ihre Nachricht *').fill('Bitte nicht antworten');
  });

  await test.step('Opt-in for the newsletter', async () => {
    await page.locator('#powermail_field_newsletter_0').check();
  });

  await test.step('Submit the contact form', async () => {
    await page.getByRole('button', { name: 'Absenden' }).click();
  });

  await test.step('Click on the confirmation link', async () => {
    await page.getByRole('button', { name: 'Hier klicken' }).click();
  });
});



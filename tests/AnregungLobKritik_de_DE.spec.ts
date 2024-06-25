import { test, expect } from '@playwright/test';

test('Suggestions, Praise, and Criticism Form', async ({ page }) => {
  await test.step('Navigate to the page', async () => {
    await page.goto('https://www.trumpf.com/de_DE/meta/anregungen-lob-und-kritik/');
    await page.waitForLoadState('domcontentloaded');
  });

  await test.step('Accept all cookies', async () => {
    const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
    await acceptCookiesButton.click();
  });

  await test.step('Verify the main heading', async () => {
    const mainHeading = page.getByRole('heading', { name: 'Anregungen, Lob und Kritik' });
    await expect(mainHeading).toBeVisible();
  });

  await test.step('Verify form field labels', async () => {
    const fieldLabels = [
      { label: 'Betreff *', locator: page.getByLabel('Betreff\n\t\t\t\t\n*') },
      { label: 'Ihre Nachricht *', locator: page.getByLabel('Ihre Nachricht\n\t\t\t\t\n*') },
      { label: 'Anrede', locator: page.getByText('Anrede') },
      { label: 'Titel', locator: page.getByText('Titel') },
      { label: 'Vorname', locator: page.getByText('Vorname') },
      { label: 'Nachname', locator: page.getByText('Nachname') },
      { label: 'Firma', locator: page.getByText('Firma') },
      { label: 'Straße und Nr.', locator: page.getByText('Straße und Nr.') },
      { label: 'PLZ', locator: page.getByText('PLZ') },
      { label: 'Ort', locator: page.getByText('Ort', { exact: true }) },
      { label: 'Bundesland', locator: page.getByText('Bundesland') },
      { label: 'Land/Region *', locator: page.getByText('Land/Region *') },
      { label: 'Telefon', locator: page.getByText('Telefon') },
      { label: 'Fax', locator: page.getByText('Fax') },
      { label: 'E-Mail', locator: page.getByText('E-Mail') }
    ];

    for (const field of fieldLabels) {
      await expect(field.locator).toBeVisible();
    }
  });

  await test.step('Check mandatory fields', async () => {
    await page.getByRole('button', { name: 'Absenden' }).click();

    const mandatoryFieldErrors = [
      { locator: page.locator('#parsley-id-5'), errorMessage: 'Dieses Feld muss ausgefüllt werden!' },
      { locator: page.locator('#parsley-id-7'), errorMessage: 'Dieses Feld muss ausgefüllt werden!' },
      { locator: page.locator('#parsley-id-31'), errorMessage: 'Dieses Feld muss ausgefüllt werden!' },
     
    ];

    for (const fieldError of mandatoryFieldErrors) {
      await expect(fieldError.locator).toHaveText(fieldError.errorMessage);
      await expect(fieldError.locator).toBeVisible();
    }
  });

  await test.step('Fill in the form', async () => {
    await page.getByLabel('Betreff\n\t\t\t\t\n*').selectOption('Anregung');
    await page.getByLabel('Ihre Nachricht\n\t\t\t\t\n*').fill('This is a test message.');
    await page.locator('#powermail_field_anregungenLobundKritik-600102-salutation').selectOption('2'); // Herr
    await page.getByLabel('Titel').fill('Dr.');
    await page.getByLabel('Vorname').fill('Max');
    await page.getByLabel('Nachname').fill('Mustermann');
    await page.getByLabel('Firma').fill('Musterfirma');
    await page.getByLabel('Straße und Nr.').fill('Musterstraße 1');
    await page.getByLabel('PLZ').fill('12345');
    await page.getByLabel('Ort').fill('Musterstadt');
    await page.getByLabel('Bundesland').fill('Musterland');
    await page.getByLabel('Telefon').fill('0123456789');
    await page.getByLabel('Fax').fill('0123456789');
    await page.getByLabel('E-Mail').fill('LobKritik@galaniprojectsteam.testinator.com');
  });

  await test.step('Select country/region', async () => {
    const countryRegionElement = page.getByLabel('Land/Region\n                \n*');
    await countryRegionElement.click();
    await countryRegionElement.fill('d');
    const germanyElement = page.getByText('Deutschland', { exact: true });
    await germanyElement.click();
  });

 /* await test.step('Submit the form', async () => {
    await page.getByRole('button', { name: 'Absenden' }).click();
  });

  await test.step('Verify the success message', async () => {
    const successMessage = page.locator('p:has-text("Vielen Dank für Ihre Anfrage.")');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
  });*/
});

//import { test, expect } from '@playwright/test';
//
// test('5 Jahre Grantie', async ({ page }) => {
//   await page.goto('https://www.trumpf.com/de_INT/produkte/services/services-fuer-elektrowerkzeuge/5-jahres-garantie/registrierung-5-jahres-garantie/');
//   await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
//   await page.getByLabel('Typ\n                            *').selectOption('TruTool S 130');
//   await page.getByPlaceholder('Z.B. 202301-12345, 202303-123456, 202305-1234567').click();
//   await page.getByPlaceholder('Z.B. 202301-12345, 202303-123456, 202305-1234567').fill('202301-12345');
//   await page.getByPlaceholder('Geben Sie hier Ihr Kaufdatum ein').click();
//   await page.locator('div').filter({ hasText: 'Februar MoDiMiDoFrSaSo 293031123456789101112131415161718192021222324252627282912' }).getByRole('img').first().click();
//   await page.locator('div').filter({ hasText: 'Januar MoDiMiDoFrSaSo 1234567891011121314151617181920212223242526272829303112345' }).getByRole('img').first().click();
//   await page.locator('div').filter({ hasText: 'Dezember MoDiMiDoFrSaSo 27282930123456789101112131415161718192021222324252627282' }).getByRole('img').first().click();
//   await page.getByLabel('November 3, 2023').click();
//   await page.getByPlaceholder('Händlername').click();
//   await page.getByPlaceholder('Händlername').fill('test');
//   await page.getByRole('link', { name: 'Weiter' }).click();
//   await page.getByLabel('Firma\n                        *').click();
//   await page.getByLabel('Firma\n                        *').fill('test');
//   await page.getByLabel('Vorname\n                        *').click();
//   await page.getByLabel('Vorname\n                        *').fill('test');
//   await page.getByLabel('Nachname\n                        *').click();
//   await page.getByLabel('Nachname\n                        *').fill('test');
//   await page.getByLabel('Funktion').click();
//   await page.getByLabel('Funktion').fill('test');
//   await page.getByLabel('Straße und Nummer\n                        *').click();
//   await page.getByLabel('Straße und Nummer\n                        *').fill('test');
//   await page.getByLabel('PLZ\n                        *').click();
//   await page.getByLabel('PLZ\n                        *').fill('12345');
//   await page.getByLabel('Ort\n                        *').click();
//   await page.getByLabel('Ort\n                        *').fill('test');
//   await page.locator('#powermail_field_land').selectOption('54');
//   await page.getByLabel('Telefon').click();
//   await page.getByLabel('Telefon').fill('01238760985');
//   await page.getByLabel('E-Mail Adresse\n                        *').click();
//   await page.getByLabel('E-Mail Adresse\n                        *').fill('test@galaniprojectsteam.testinator.com');
//   await page.getByRole('link', { name: 'Weiter' }).click();
//   await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"]').selectOption('9');
//   await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[EMPLOYEES\\]"]').selectOption('3');
//   await page.getByRole('button', { name: 'Absenden' }).click();
//   await page.locator('#subpage div').filter({ hasText: 'Kaufdatum ungültig (liegt mehr als 8 Wochen zurück oder in der Zukunft).' }).nth(3).click(); 
//   await page.getByRole('link', { name: 'Schritt 1' }).click();
//   await page.getByPlaceholder('Geben Sie hier Ihr Kaufdatum ein').click();
//   await page.locator('div').filter({ hasText: 'November MoDiMiDoFrSaSo 30311234567891011121314151617181920212223242526272829301' }).getByRole('img').nth(1).click();
//   await page.locator('div').filter({ hasText: 'Dezember MoDiMiDoFrSaSo 27282930123456789101112131415161718192021222324252627282' }).getByRole('img').nth(1).click();
//   await page.getByLabel('Januar 26, 2024').click();
//   await page.getByRole('link', { name: 'Weiter' }).click();
//   await page.getByRole('link', { name: 'Weiter' }).click();
//   await page.getByRole('button', { name: 'Absenden' }).click();
//   await page.getByRole('heading', { name: 'Danke für Ihre Anmeldung zur 5-Jahres-Garantie.' }).click();
// }); 


import { test, expect } from '@playwright/test';

test('5 Jahre Garantie - Registrierung', async ({ page }) => {
    // Öffnen der Webseite
    await page.goto('https://www.trumpf.com/de_INT/produkte/services/services-fuer-elektrowerkzeuge/5-jahres-garantie/registrierung-5-jahres-garantie/');
    
    // Cookies akzeptieren
    const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
    await acceptCookiesButton.click();

    // Funktion zum Ausfüllen eines Textfeldes
    async function fillFormField(selector, text) {
        const field = await page.getByLabel(selector);
        await field.click();
        await field.fill(text);
    }

    // Option aus Dropdown-Menü wählen
    await page.getByLabel('Typ\n                            *').selectOption('TruTool S 130');
    
    // Seriennummer eingeben
    await fillFormField('Z.B. 202301-12345, 202303-123456, 202305-1234567', '202301-12345');

    async function selectDate(page, date) {
      // Click on the element to open the calendar
      await page.getByPlaceholder('Geben Sie hier Ihr Kaufdatum ein').click();
  
      // Wait until the calendar becomes visible
      await page.waitForSelector('.flatpickr-calendar.open', { visible: true });
  
      // Get the day and year from the date
      const day = date.getDate();
      const year = date.getFullYear();
  
      // Array of German month names
      const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
      // Get the month name in German
      const month = months[date.getMonth()];
  
      // Form the date string combining German month name with English date format
      const dateString = `${month} ${day}, ${year}`;
      const dateSelector = `.flatpickr-day[aria-label="${dateString}"]`;
  
      // Click on the day in the calendar
      await page.click(dateSelector);
  }
  const date = new Date(2024, 1, 4); // February 4, 2024
  await selectDate(page, date);



    // Ausfüllen weiterer Formularfelder
    await page.getByPlaceholder('Händlername').click();
    await page.getByPlaceholder('Händlername').fill('test');
    await page.getByRole('link', { name: 'Weiter' }).click();
    await fillFormField('Firma\n                        *', 'test');
    await fillFormField('Vorname\n                        *', 'test');
    await fillFormField('Nachname\n                        *', 'test');
    await fillFormField('Funktion', 'test');
    await fillFormField('Straße und Nummer\n                        *', 'test');
    await fillFormField('PLZ\n                        *', '12345');
    await fillFormField('Ort\n                        *', 'test');
    await page.locator('#powermail_field_land').selectOption('54');
    await fillFormField('Telefon', '01238760985');
    await fillFormField('E-Mail Adresse\n                        *', 'test@galaniprojectsteam.testinator.com');

    // Klicken des "Weiter"-Buttons
    const weiterButton = await page.getByRole('link', { name: 'Weiter' });
    await weiterButton.click();

    // Auswahl aus zusätzlichen Dropdown-Menüs
    await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"]').selectOption('9');
    await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[EMPLOYEES\\]"]').selectOption('3');

    // Absenden des Formulars
    const submitButton = await page.getByRole('button', { name: 'Absenden' });
    await submitButton.click();

    // Überprüfung auf erfolgreiche Anmeldung
    await expect(page.getByRole('heading', { name: 'Danke für Ihre Anmeldung zur 5-Jahres-Garantie.' })).toBeVisible();
});

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
    await fillFormField('E-Mail Adresse\n                        *', 'test5Jahre@galaniprojectsteam.testinator.com');

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

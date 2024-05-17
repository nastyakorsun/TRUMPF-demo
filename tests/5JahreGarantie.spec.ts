import { test, expect } from '@playwright/test'; 


// Beschreibung der Test-Suite
test.describe('5 Jahre Garantie Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Öffnen der Webseite
        await page.goto('https://www.trumpf.com/de_DE/produkte/services/services-fuer-elektrowerkzeuge/5-jahres-garantie/registrierung-5-jahres-garantie/');
        
        // Cookies akzeptieren
        const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
        await acceptCookiesButton.click();
    });

    
   

    test('5 Jahre Garantie - Registrierung', async ({ page }) => {
      
    
        // Funktion zum Ausfüllen eines Textfeldes
        async function fillFormField(selector, text) {
            const field = await page.getByLabel(selector);
            await field.click();
            await field.fill(text);
        } 

         // Klicken des "Weiter"-Buttons
         const weiterButton = await page.getByRole('link', { name: 'Weiter' });
         await weiterButton.click();


        // Überprüfen Sie, ob alle obligatorischen Felder ausgefüllt sind
        const mandatoryFields = await page.locator('.mandatory').elementHandles();
        for (const field of mandatoryFields) {
         const isEmpty = await field.evaluate(node => (node as HTMLInputElement).value === '');
         if (isEmpty) {
        const fieldId = await field.evaluate(node => (node as HTMLElement).id);
        const errorElement = await page.locator(`#${fieldId} ~ .label-errorMsg.filled`);
        const errorMessage = await errorElement.innerText();
        expect(errorMessage).toBe('This Field must not be empty.');
    }
}
    
        // Liste aller Optionen
         const options = [
        'TruTool C 160', 'TruTool C 200', 'TruTool C 250', 'TruTool S 130', 
        'TruTool S 160', 'TruTool S 250', 'TruTool S 350', 'TruTool S 450', 
        'TruTool S 114', 'TruTool N 160', 'TruTool N 160 mit Verlängerung', 
        'TruTool N 160 E', 'TruTool N 200', 'TruTool N 350', 'TruTool N 500', 
        'TruTool N 700', 'TruTool N 1000', 'TruTool PN 130', 'TruTool PN 161', 
        'TruTool PN 200', 'TruTool PN 201', 'TruTool TPC 165', 'TruTool F 300', 
        'TruTool F 301', 'TruTool F 305', 'TruTool F 140', 'TruTool F 125', 
        'TruTool TF 350', 'TruTool TKA 500', 'TruTool TKA 700', 'TruTool TKA 1500', 
        'TruTool TKF 700', 'TruTool TKF 1100', 'TruTool TKF 1101', 'TruTool TKF 1500', 
        'TruTool TKF 2000', 'TruTool DD 1010', 'TruTool DD 1813', 'TruTool HD 1813', 
        'TruTool ID 1861', 'TruTool FCN 250', 'TruTool PS 100'
         ]; 
    
// Durch jede Option
for (const option of options) {
    // Option aus Dropdown-Menü wählen
    await page.selectOption('#powermail_field_typ', { value: option });

    // Überprüfen Sie, ob die Auswahl erfolgreich war
    const selectedOptionElement = await page.locator('#powermail_field_typ option[value="' + option + '"]:checked');
    await expect(selectedOptionElement).toHaveText(option);
}
    
        
        // Seriennummer eingeben
        await fillFormField('Z.B. 202301-12345, 202303-123456, 202305-1234567', '202301-12345'); 
    
     // Funktion zum Setzen des aktuellen Datums in der Vergangenheit
        function getPastDate(days) {
            const date = new Date();
            date.setDate(date.getDate() - days);
            return date;
          }
    
        async function selectDate(page, date) {
         // Klicken auf das Element, um den Kalender zu öffnen
          await page.getByPlaceholder('Geben Sie hier Ihr Kaufdatum ein').click();
      
          // Warten, bis der Kalender sichtbar wird
          await page.waitForSelector('.flatpickr-calendar.open', { visible: true });
      
          // Tag und Jahr aus dem Datum holen
          const day = date.getDate();
          const year = date.getFullYear();
      
            // Array von deutschen Monatsnamen
          const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
             // Monatsname auf Deutsch holen
          const month = months[date.getMonth()];
      
          // Datumstring bilden, indem der deutsche Monatsname mit dem englischen Datumsformat kombiniert wird

          const dateString = `${month} ${day}, ${year}`;
          const dateSelector = `.flatpickr-day[aria-label="${dateString}"]`;
      
          // Klicken auf den Tag im Kalender
          await page.click(dateSelector); 
    
    
       
    
      }
      const date = getPastDate(3); // Gets the date 3 days ago
      await selectDate(page, date);
    
    
    
        // Ausfüllen weiterer Formularfelder
        await page.getByPlaceholder('Händlername').click();
        await page.getByPlaceholder('Händlername').fill('test');

        //Schritt 1 click "Weiter" button

        await page.getByRole('link', { name: 'Weiter' }).click();



        


// Überprüfen Sie, ob alle obligatorischen Felder ausgefüllt sind
 // Klicken des "Weiter"-Buttons
 await weiterButton.click();
for (const field of mandatoryFields) {
    const isEmpty = await field.evaluate(node => (node as HTMLInputElement).value === '');
    if (isEmpty) {
        const fieldId = await field.evaluate(node => (node as HTMLElement).id);
        const errorElement = await page.locator(`#${fieldId} ~ .label-errorMsg.filled`);
        const errorMessage = await errorElement.innerText();
        expect(errorMessage).toBe('This Field must not be empty.');
    }
}

        await fillFormField('Firma\n                        *', 'test');
        await fillFormField('Vorname\n                        *', 'test');
        await fillFormField('Nachname\n                        *', 'test');
        await fillFormField('Funktion', 'test');
        await fillFormField('Straße und Nummer\n                        *', 'test');
        await fillFormField('PLZ\n                        *', '12345');
        await fillFormField('Ort\n                        *', 'test');
        await page.locator('#powermail_field_land').selectOption('54');
        await fillFormField('Telefon', '01238760985');
        await fillFormField('E-Mail Adresse\n                        *', 'testemail@email.com');// insert email to check if we receive the email
    
    
        // Klicken des "Weiter"-Buttons
        await weiterButton.click();
    



// Liste aller Dropdown-Optionen und ihrer erwarteten Texte
const dropdownOptions = [
    { value: '0', text: 'Bitte wählen ...' },
    { value: '1', text: 'Maschinen- und Anlagenbau' },
    { value: '2', text: 'Fahrzeug- und Karosseriebau' },
    { value: '3', text: 'Behälter- und Apparatebau' },
    { value: '4', text: 'Lüftungs- und Klimatechnik' },
    { value: '5', text: 'Spenglerei/Klempnerei' },
    { value: '6', text: 'Isolierer' },
    { value: '7', text: 'Sonstige Klima, Sanitär und Energietechnik' },
    { value: '8', text: 'Weisse Ware' },
    { value: '9', text: 'Elektrik, Elektronik' },
    { value: '10', text: 'Bedachung / Dachdeckerei' },
    { value: '11', text: 'Fassadenbauer' },
    { value: '12', text: 'Schlosserei' },
    { value: '13', text: 'Sonstige Stahl- und Metallbauhandwerk' },
    { value: '14', text: 'Tankdemontage / Abbruch' },
    { value: '15', text: 'Sicherheit, Wehrtechnik' },
    { value: '16', text: 'Sonstige' }
];

// Durch jede Option
for (const dropdownOption of dropdownOptions) {
    // Option aus Dropdown-Menü wählen
    await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"]').selectOption(dropdownOption.value);

    // Überprüfen Sie, ob die Auswahl erfolgreich war
    const selectedOptionElement = await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"] option[value="' + dropdownOption.value + '"]:checked');
    await expect(selectedOptionElement).toHaveText(dropdownOption.text);
} 
   // Auswahl aus zusätzlichen Dropdown-Menüs
        await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"]').selectOption('9');
        await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[EMPLOYEES\\]"]').selectOption('3');
    
// Überprüfen Sie den Text des Elements
const element = await page.locator('.powermail_fieldwrap.powermail_fieldwrap_type_text.powermail_fieldwrap_.no-gutter-left.gr-12');
await expect(element).toHaveText('Mehr zum Thema Datenschutz bei TRUMPF finden Sie in unserer Datenschutzerklärung.');

// Überprüfen Sie die URL der Verknüpfung
const link = await page.locator('div.powermail_fieldwrap a');
await expect(link).toHaveAttribute('href', '/de_DE/meta/datenschutz/');

        // Absenden des Formulars
        const submitButton = await page.getByRole('button', { name: 'Absenden' });
    
    //commented out to avoid sending the email
    
       /*  await submitButton.click();
    
            //Überprüfung auf erfolgreiche Anmeldung
        await expect(page.getByRole('heading', { name: 'Danke für Ihre Anmeldung zur 5-Jahres-Garantie.' })).toBeVisible(); */
    });
    

    // Weitere Tests...
});









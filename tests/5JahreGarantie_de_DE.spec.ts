import { test, expect } from '@playwright/test'; 

// Test suite description
test.describe('5-Year Warranty Tests', () => {
    test.beforeEach(async ({ page }) => {
        await test.step('Navigate to the website and accept cookies', async () => {
            // Open the website
            await page.goto('https://www.trumpf.com/de_DE/produkte/services/services-fuer-elektrowerkzeuge/5-jahres-garantie/registrierung-5-jahres-garantie/');
            
            // Accept cookies
            const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
            await acceptCookiesButton.click();
        });
    });

    test('5-Year Warranty - Registration', async ({ page }) => {
        // Function to fill a form field
        async function fillFormField(selector, text) {
            const field = await page.getByLabel(selector);
            await field.click();
            await field.fill(text);
        }

        await test.step('Click the "Next" button', async () => {
            const nextButton = await page.getByRole('link', { name: 'Weiter' });
            await nextButton.click();
        });

        await test.step('Check mandatory fields', async () => {
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
        });

        await test.step('Select options from dropdown and verify', async () => {
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

            for (const option of options) {
                await page.selectOption('#powermail_field_typ', { value: option });
                const selectedOptionElement = await page.locator('#powermail_field_typ option[value="' + option + '"]:checked');
                await expect(selectedOptionElement).toHaveText(option);
            }
        });

        await test.step('Enter serial number', async () => {
            await fillFormField('Z.B. 202301-12345, 202303-123456, 202305-1234567', '202301-12345');
        });

        // Function to set the current date in the past
        function getPastDate(days) {
            const date = new Date();
            date.setDate(date.getDate() - days);
            return date;
        }

        async function selectDate(page, date) {
            await page.getByPlaceholder('Geben Sie hier Ihr Kaufdatum ein').click();
            await page.waitForSelector('.flatpickr-calendar.open', { visible: true });

            const day = date.getDate();
            const year = date.getFullYear();
            const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            const month = months[date.getMonth()];
            const dateString = `${month} ${day}, ${year}`;
            const dateSelector = `.flatpickr-day[aria-label="${dateString}"]`;

            await page.click(dateSelector);
        }

        await test.step('Select purchase date', async () => {
            const date = getPastDate(3);
            await selectDate(page, date);
        });

        await test.step('Fill additional form fields', async () => {
            await fillFormField('Händler', 'test');
        });

        await test.step('Click the "Next" button', async () => {
            await page.getByRole('link', { name: 'Weiter' }).click();
        });

        await test.step('Verify and fill more mandatory fields', async () => {
            const mandatoryFields = await page.locator('.mandatory').elementHandles();
            for (const field of mandatoryFields) {
                const isEmpty = await field.evaluate(node => (node as HTMLInputElement).value === '');
                if (isEmpty) {
                    const fieldId = await field.evaluate(node => (node as HTMLElement).id);
                    const errorElement = await page.locator(`#${fieldId} ~ .label-errorMsg.filled`);
                    await expect(errorElement).toHaveText('This Field must not be empty.');
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
            await fillFormField('E-Mail Adresse\n                        *', 'testemail@email.com');
        });

        await test.step('Click the "Next" button', async () => {
            await page.getByRole('link', { name: 'Weiter' }).click();
        });

        await test.step('Select and verify dropdown options', async () => {
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

            for (const dropdownOption of dropdownOptions) {
                await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"]').selectOption(dropdownOption.value);
                const selectedOptionElement = await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"] option[value="' + dropdownOption.value + '"]:checked');
                await expect(selectedOptionElement).toHaveText(dropdownOption.text);
            }

            await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[BRANCHES\\]"]').selectOption('9');
            await page.locator('select[name="tx_trumpfforms_trumpfforms\\[warranty\\]\\[2\\]\\[EMPLOYEES\\]"]').selectOption('3');
        });

        await test.step('Verify privacy policy text and link', async () => {
            const element = await page.locator('.powermail_fieldwrap.powermail_fieldwrap_type_text.powermail_fieldwrap_.no-gutter-left.gr-12');
            await expect(element).toHaveText('Mehr zum Thema Datenschutz bei TRUMPF finden Sie in unserer Datenschutzerklärung.');

            const link = await page.locator('div.powermail_fieldwrap a');
            await expect(link).toHaveAttribute('href', '/de_DE/meta/datenschutz/');
        });

        await test.step('Submit the form', async () => {
            const submitButton = await page.getByRole('button', { name: 'Absenden' });
            // Commented out to avoid sending the email
            // await submitButton.click();
            // Verify successful registration
            // await expect(page.getByRole('heading', { name: 'Danke für Ihre Anmeldung zur 5-Jahres-Garantie.' })).toBeVisible();
        });
    });
});

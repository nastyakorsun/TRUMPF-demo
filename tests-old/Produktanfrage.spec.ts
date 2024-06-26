import { test, expect } from '@playwright/test';

test('Formulare Produktanfrage', async ({ page }) => {
  await page.goto('https://www.trumpf.com/de_DE/');
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  await page.locator('li').filter({ hasText: 'Kontakt' }).getByRole('link').click();
  await page.getByRole('link', { name: 'Jetzt kontaktieren' }).click();
  await expect (page.getByRole('heading', { name: 'Sie interessieren sich für ein Produkt?' })).toBeVisible();
  await page.locator('#powermail_field_produktanfrage-595634-salutation').selectOption('1');
  await page.getByLabel('Vorname\n\t\t\t\t\n*').click();
  await page.getByLabel('Vorname\n\t\t\t\t\n*').fill('Kate');
  await page.getByLabel('Nachname\n\t\t\t\t\n*').click();
  await page.getByLabel('Nachname\n\t\t\t\t\n*').fill('Testner');
  await page.getByLabel('Firma\n\t\t\t\t\n*').click();
  await page.getByLabel('Firma\n\t\t\t\t\n*').fill('Test');
  await page.getByLabel('Straße und Nr.').click();
  await page.getByLabel('Straße und Nr.').fill('Test');
  await page.getByLabel('PLZ').click();
  await page.getByLabel('PLZ').fill('12345');
  await page.getByLabel('Ort').click();
  await page.getByLabel('Ort').fill('Test');
  await page.getByLabel('Land/Region\n                \n*').click();
  await page.getByLabel('Land/Region\n                \n*').fill('d');
  await page.getByText('Deutschland', { exact: true }).click();
  await page.getByLabel('Telefon\n\t\t\t\t\n*').click();
  await page.getByLabel('Telefon\n\t\t\t\t\n*').fill('1234567890');
  await page.getByLabel('E-Mail\n\t\t\t\t\n*').click();
  await page.getByLabel('E-Mail\n\t\t\t\t\n*').fill('produkt@galaniprojectsteam.testinator.com');
  await page.getByLabel('Folgende Produkte interessieren mich / Ihre Nachricht an uns:\n\t\t\t\t\n*').click();
  await page.getByLabel('Folgende Produkte interessieren mich / Ihre Nachricht an uns:\n\t\t\t\t\n*').fill('test');
  await page.locator('#powermail_field_newsletter_0').check();
  await page.getByRole('button', { name: 'Absenden' }).click();
  await expect (page.getByText('Vielen Dank für Ihre Anfrage, wir werden uns mit Ihnen in Verbindung setzen.')).toBeVisible();  
}); 


test('Check the email and click on the conformation link', async ({ page }) => {
    await page.goto('https://www.mailinator.com/');
    await page.locator('#menu-item-7937').getByRole('link', { name: 'LOGIN' }).click();
    
    await page.locator('input[placeholder="Email"]').fill('korsun@galaniprojects.com');
    await page.locator('input[placeholder="Password"]').fill('IWilltest42!');
    await page.locator('input[placeholder="Password"]').press('Enter'); 
  
    const firstEmailSelector = 'tr.ng-scope:first-child';
    await page.waitForSelector(firstEmailSelector);
    await page.click(firstEmailSelector); 

    const page1Promise = page.waitForEvent('popup'); 
    

    await page.frameLocator('iframe[name="texthtml_msg_body"]').getByRole('link', { name: new RegExp('^https://de.trumpf-news.com/go') }).click();
    const page1 = await page1Promise;
    await page1.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
    await expect(page1.getByRole('heading', { name: 'Newsletteranmeldung erfolgreich' })).toBeVisible();

  
   
   
  });

  
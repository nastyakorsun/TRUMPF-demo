import { test, expect } from '@playwright/test';

test.describe('Whitepaper Request Form Tests', () => {



  test('Request Whitepaper and fill out the form', async ({ page }) => { 

 // Navigate to the landing page before each test
 await page.goto('https://www.trumpf.com/de_DE/landing-pages/de/whitepaper-selektives-laserreinigen-funktionsweise-und-industrielle-anwendungen/');

 // Accept cookies if the button is present
 const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
 await acceptCookiesButton.click();

    // Click on the "Whitepaper anfordern" button
    const requestWhitepaperButton = page.locator('button', { hasText: 'Whitepaper anfordern' });
    await requestWhitepaperButton.click();

    // Wait for the form to appear
    const form = page.locator('form#whitepaperux_standard');
    await expect(form).toBeVisible({ timeout: 10000 });

    // Fill out the form fields
    await page.selectOption('select[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][anrede]"]', '3'); // Divers
    await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][vorname]"]', 'Test');
    await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][nachname]"]', 'Test');
    await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][company-1]"]', 'Test GmbH');
    await page.fill('input[name="tx_trumpfforms_multiplewhitepaper[whitepaperux_standard][email]"]', 'test@galaniprojectsteam.testinator.com');
// Note: If the part before the domain in the email address remains the same each time, 
// the system will not send a newsletter registration confirmation email. 
// There are two potential solutions to this issue:
// 1. Use a new random name before the domain each time to ensure the email is unique.
// 2. Use the same email address consistently and skip checking the newsletter registration 
//    in this test, as newsletter registration verification should be handled in a separate test.
// For now is 2 solusion used 



    
     // Fill out the country field
     const countryField = page.locator('input#ux-unique-id-2');
     await countryField.click();
     await countryField.fill('Deutschland');
     const countrySuggestion = page.locator('.ux-autosuggest-input__suggestions >> text=Deutschland');
     await expect(countrySuggestion).toBeVisible({ timeout: 10000 });
     await countrySuggestion.click();

    
 // Scroll to the newsletter checkbox and check it
 const newsletterCheckboxLabel = page.locator('label.ux-checkbox', { hasText: 'Ich bin damit einverstanden' });
 await newsletterCheckboxLabel.scrollIntoViewIfNeeded();
 await newsletterCheckboxLabel.click();

    // Submit the form
    const submitButton = page.locator('button[type="submit"]', { hasText: 'Absenden' });
    await submitButton.click();

    // Wait for the confirmation message or redirect
    const confirmationMessage = page.locator('text=Vielen Dank');
    await expect(confirmationMessage).toBeVisible({ timeout: 10000 });
  });  


 


  test('Login to Mailinator, open email and click on attachments tab', async ({ page }) => {
    // Go to Mailinator
    await page.goto('https://www.mailinator.com/');
    
    // Click on the LOGIN link
    await page.locator('#menu-item-7937').getByRole('link', { name: 'LOGIN' }).click();
    
    // Fill in the login credentials and press Enter
    await page.locator('input[placeholder="Email"]').fill('korsun@galaniprojects.com');
    await page.locator('input[placeholder="Password"]').fill('IWilltest42!');
    await page.locator('input[placeholder="Password"]').press('Enter');
    
    // Wait for the email list to load and click on the first email
    const firstEmailSelector = 'tr.ng-scope:first-child';
    await page.waitForSelector(firstEmailSelector);
    await page.click(firstEmailSelector);
    
    // Wait for the new email popup
   // const emailPopup = await page.waitForEvent('popup');
    
    // Wait for the email content to load in the popup
    await page.waitForLoadState();
    
    // Click on the "ATTACHMENTS" tab
    const attachmentsTabSelector = 'a#pills-attachments-tab';
    await page.click(attachmentsTabSelector);
    
   // Wait for the attachments section to load and verify the presence of the download button
   const attachmentsSectionSelector = '#pills-attachments-content';
   await page.waitForSelector(attachmentsSectionSelector);
   const downloadButtonSelector = 'button.btn.btn-xs.btn-dark';
   const downloadButton = page.locator(downloadButtonSelector);
   
   // Verify the button with the specific PDF name is present
   await expect(downloadButton).toHaveText('TRUMPF-Whitepaper-Selektive-Reinigung-mittels-Laser.pdf');

   // Click the download button and verify that the download starts
   const [download] = await Promise.all([
     page.waitForEvent('download'), // Wait for the download to start
     downloadButton.click(), // Perform the action that initiates download
   ]);

   // Optional: Check the download path or name if needed
   const downloadPath = await download.path();
   const downloadName = download.suggestedFilename();
   console.log(`Download started: ${downloadName}`);
   
   await expect(downloadName).toBe('TRUMPF-Whitepaper-Selektive-Reinigung-mittels-Laser.pdf');
 });
  });
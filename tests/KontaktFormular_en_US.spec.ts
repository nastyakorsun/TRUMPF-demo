import { test, expect } from '@playwright/test';

test('Contact form submission', async ({ page }) => {
  await test.step('Navigate to the contact page and verify the title', async () => {
    await page.goto('https://www.trumpf.com/en_US/meta/contact/');
    await expect(page).toHaveTitle(/Contact | TRUMPF/);
  });

  await test.step('Accept all cookies', async () => {
    await page.getByRole('button', { name: 'Accept all cookies' }).click();
  });

  await test.step('Select the subject', async () => {
    await page.getByLabel('Subject').selectOption('General inquiry');
  });

  await test.step('Fill in the personal information', async () => {
    await page.locator('#powermail_field_kontaktformularwebsite-608876-salutation').selectOption('2'); // Mr.
    await page.getByLabel('First Name *').fill('Max');
    await page.getByLabel('Last Name *').fill('Mustermann');
    await page.getByLabel('Company').fill('Musterfirma');
    await page.getByLabel('Street and No.').fill('Musterstraße 1');
    await page.getByLabel('ZIP').fill('12345');
    await page.getByLabel('City').fill('Musterstadt');
    // Do not fill 'Federal State' here
    await page.getByLabel('Country/Region').click();
    await page.getByLabel('Country/Region').fill('United States');
    await page.getByLabel('Phone').fill('03012345678');
    await page.getByLabel('Email *').fill('test_en_contact@galaniprojectsteam.testinator.com');
  });

  await test.step('Specify products and message', async () => {
    await page.getByLabel('Products').fill('Just a test');
    await page.getByLabel('Your Message *').fill('Please do not reply');
  });

  await test.step('Opt-in for the newsletter', async () => {
    await page.locator('#powermail_field_newsletter_0').check();
  });

  await test.step('Submit the contact form', async () => {
    await page.getByRole('button', { name: 'Send' }).click();
  });

  await test.step('Verify the error message for Federal State', async () => {
    const errorMessage = await page.locator('text=THIS FIELD MUST BE COMPLETED');
    await expect(errorMessage).toBeVisible();
  });
});

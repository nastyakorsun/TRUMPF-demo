import { test, expect } from '@playwright/test';

test('Test the social media links', async ({ page, context }) => {
  await test.step('Navigate to the homepage and open the inspect page through right click', async () => {
    await page.goto('https://www.trumpf.com/de_DE/');
    await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
    await page.context().newPage(); // Open a new page to simulate opening inspect element
  });

  await test.step('Check attributes for Twitter link', async () => {
    const twitterLink = page.locator('a[aria-label="Besuchen Sie TRUMPF auf X"]');
    await expect(twitterLink).toHaveAttribute('role', 'button');
  });

  await test.step('Check attributes for Facebook link', async () => {
    const facebookLink = page.locator('a[aria-label="Besuchen Sie TRUMPF auf Facebook"]');
    await expect(facebookLink).toHaveAttribute('role', 'button');
  });

  await test.step('Check attributes for YouTube link', async () => {
    const youtubeLink = page.locator('a[aria-label="Besuchen Sie TRUMPF auf YouTube"]');
    await expect(youtubeLink).toHaveAttribute('role', 'button');
  });

  await test.step('Check attributes for Xing link', async () => {
    const xingLink = page.locator('a[aria-label="Besuchen Sie TRUMPF auf XING"]');
    await expect(xingLink).toHaveAttribute('role', 'button');
  });

  await test.step('Check attributes for LinkedIn link', async () => {
    const linkedinLink = page.locator('a[aria-label="Besuchen Sie TRUMPF auf LinkedIn"]');
    await expect(linkedinLink).toHaveAttribute('role', 'button');
  });

  await test.step('Check attributes for Instagram link', async () => {
    const instagramLink = page.locator('a[aria-label="Besuchen Sie TRUMPF auf Instagram"]');
    await expect(instagramLink).toHaveAttribute('role', 'button');
  });

  await test.step('Switch the language to English and verify attributes', async () => {
    const newPage = await context.newPage();
    await newPage.goto('https://www.trumpf.com/en_US/'); // Switch to English page
    const acceptCookiesButton = page.locator('button:has-text("Accept all cookies")');
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }
   // await newPage.getByRole('button', { name: 'Accept all cookies' }).click();
  
    const twitterLink = newPage.locator('a[aria-label="Check out TRUMPF on X"]');
    await expect(twitterLink).toHaveAttribute('role', 'button');

    const facebookLink = newPage.locator('a[aria-label="Check out TRUMPF on Facebook"]');
    await expect(facebookLink).toHaveAttribute('role', 'button');

    const youtubeLink = newPage.locator('a[aria-label="Check out TRUMPF on YouTube"]');
    await expect(youtubeLink).toHaveAttribute('role', 'button');

  

    const linkedinLink = newPage.locator('a[aria-label="Check out TRUMPF on LinkedIn"]');
    await expect(linkedinLink).toHaveAttribute('role', 'button');

    const instagramLink = newPage.locator('a[aria-label="Check out TRUMPF on Instagram"]');
    await expect(instagramLink).toHaveAttribute('role', 'button');
  });
});


import { test, expect } from '@playwright/test';

test('Test the social media links', async ({ page }) => {
  await page.goto('https://www.trumpf.com/de_DE/');
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();


// Checking Twitter link
const twitterPopupPromise = page.waitForEvent('popup');
await page.locator('.ux-iws-footer__social-icons > a').first().click();
const twitterPopup = await twitterPopupPromise;
expect(twitterPopup.url()).toContain('https://twitter.com/TRUMPF_News');

// Checking Facebook link
const facebookPopupPromise = page.waitForEvent('popup');
await page.locator('.ux-iws-footer__social-icons > a:nth-child(2)').click();
const facebookPopup = await facebookPopupPromise;
expect(facebookPopup.url()).toContain('https://www.facebook.com/TRUMPF.Career');

// Checking YouTube link
const youtubePopupPromise = page.waitForEvent('popup');
await page.locator('.ux-iws-footer__social-icons > a:nth-child(3)').click();
const youtubePopup = await youtubePopupPromise;

// Handle YouTube consent
if (await youtubePopup.url().startsWith('https://consent.youtube.com/')) {
    // Wait for the "Accept all" button to appear and click it
    const page1= await youtubePopupPromise;
    await page1.getByRole('button', { name: 'Accept all' }).click();

    // Wait for navigation to complete
    await youtubePopup.waitForNavigation({ waitUntil: 'networkidle' });
}

// Check if the final URL is the expected one
expect(youtubePopup.url()).toContain('https://www.youtube.com/user/TRUMPFtube');

// Checking Xing link
const xingPopupPromise = page.waitForEvent('popup');
await page.locator('.ux-iws-footer__social-icons > a:nth-child(4)').click();
const xingPopup = await xingPopupPromise;
expect(xingPopup.url()).toContain('https://www.xing.com/pages/trumpf');

// Checking LinkedIn link
const linkedinPopupPromise = page.waitForEvent('popup');
await page.locator('.ux-iws-footer__social-icons > a:nth-child(5)').click();
const linkedinPopup = await linkedinPopupPromise;
expect(linkedinPopup.url()).toContain('https://de.linkedin.com/company/trumpf-se-co-kg');

// Checking Instagram link
const instagramPopupPromise = page.waitForEvent('popup');
await page.locator('.ux-iws-footer__social-icons > a:nth-child(6)').click();
const instagramPopup = await instagramPopupPromise;
expect(instagramPopup.url()).toContain('https://www.instagram.com/trumpf.group');
});
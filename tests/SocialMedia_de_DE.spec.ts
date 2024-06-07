import { test, expect } from '@playwright/test';

test('Test the social media links', async ({ page }) => {
  await test.step('Navigate to the homepage and accept cookies', async () => {
    await page.goto('https://www.trumpf.com/de_DE/');
    await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  });

  await test.step('Check Twitter link', async () => {
    const twitterPopupPromise = page.waitForEvent('popup');
    await page.locator('.ux-iws-footer__social-icons > a').first().click();
    const twitterPopup = await twitterPopupPromise;
    expect(twitterPopup.url()).toContain('https://x.com/TRUMPF_News');
  });

  await test.step('Check Facebook link', async () => {
    const facebookPopupPromise = page.waitForEvent('popup');
    await page.locator('.ux-iws-footer__social-icons > a:nth-child(2)').click();
    const facebookPopup = await facebookPopupPromise;
    expect(facebookPopup.url()).toContain('https://www.facebook.com/TRUMPF.Career');
  });

  await test.step('Check YouTube link', async () => {
    const youtubePopupPromise = page.waitForEvent('popup');
    await page.locator('.ux-iws-footer__social-icons > a:nth-child(3)').click();
    const youtubePopup = await youtubePopupPromise;

    if (await youtubePopup.url().startsWith('https://consent.youtube.com/')) {
      await test.step('Handle YouTube consent', async () => {
        await youtubePopup.getByRole('button', { name: 'Accept all' }).click();
        await youtubePopup.waitForNavigation({ waitUntil: 'networkidle' });
      });
    }

    expect(youtubePopup.url()).toContain('https://www.youtube.com/user/TRUMPFtube');
  });

  await test.step('Check Xing link', async () => {
    const xingPopupPromise = page.waitForEvent('popup');
    await page.locator('.ux-iws-footer__social-icons > a:nth-child(4)').click();
    const xingPopup = await xingPopupPromise;
    expect(xingPopup.url()).toContain('https://www.xing.com/pages/trumpf');
  });

  await test.step('Check LinkedIn link', async () => {
    const linkedinPopupPromise = page.waitForEvent('popup');
    await page.locator('.ux-iws-footer__social-icons > a:nth-child(5)').click();
    const linkedinPopup = await linkedinPopupPromise;
    expect(linkedinPopup.url()).toContain('https://de.linkedin.com/company/trumpf-se-co-kg');
  });

  await test.step('Check Instagram link', async () => {
    const instagramPopupPromise = page.waitForEvent('popup');
    await page.locator('.ux-iws-footer__social-icons > a:nth-child(6)').click();
    const instagramPopup = await instagramPopupPromise;
    expect(instagramPopup.url()).toContain('https://www.instagram.com/trumpf.group');
  });
});
// maybe split the test into multiple tests for each social media platform
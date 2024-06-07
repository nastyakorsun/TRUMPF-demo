import { test, expect } from '@playwright/test';

test('Check cookie settings', async ({ page }) => {
  await test.step('Navigate to the homepage', async () => {
    await page.goto('https://www.trumpf.com/de_DE/');
  });

  await test.step('Open settings and check if the optional cookies are off', async () => {
    await page.locator('a.ux-cookie-layer__nav-item:has-text("Einstellungen")').click();
    await page.waitForSelector('.ux-cookie-layer-modal');
    const optionalCookiesSwitch = page.locator('body > ux-cookie-layer > ux-cookie-layer-modal > div.ux-cookie-layer-modal__outer > div > div.ux-cookie-layer-modal__slot > ux-cookie-layer-content > div > div.ux-cookie-layer__controls > ux-cookie-layer-switch.ux-cookie-layer-switch.hydrated.ux-cookie-layer-switch--off');
    await expect(optionalCookiesSwitch).toBeVisible();
    await page.locator('button:has-text("Einstellungen speichern")').click();
  });

  await test.step('Scroll down to the footer and open privacy settings again', async () => {
    await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
  });

  await test.step('Accept the optional cookies by clicking the specific button and save', async () => {
    await page.locator('button.ux-cookie-layer-switch__button[aria-labelledby="ux-cookie-layer-switch-2-label"]').click();
    await page.locator('button:has-text("Einstellungen speichern")').click();
  });

  await test.step('Open the privacy settings again to verify', async () => {
    await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
    await expect(page.locator('.ux-cookie-layer-switch--on:not(.ux-cookie-layer-switch--disabled)')).toBeVisible();
  });

  await test.step('Opt out of the optional cookies and save', async () => {
    await page.locator('.ux-cookie-layer-switch--on:not(.ux-cookie-layer-switch--disabled) button').click();
    await page.locator('button:has-text("Speichern")').click();
  });

  await test.step('Make changes in the settings again but click on "close" instead of "save"', async () => {
    await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
    await page.locator('.ux-cookie-layer-switch--off:not(.ux-cookie-layer-switch--disabled) button').click();
    await page.locator('button[type="button"].ux-cookie-layer-modal__close').click();
  });

  await test.step('Verify that the changes are not taken over', async () => {
    await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
    await expect(page.locator('.ux-cookie-layer-switch--off:not(.ux-cookie-layer-switch--disabled)')).toBeVisible();
  });
});


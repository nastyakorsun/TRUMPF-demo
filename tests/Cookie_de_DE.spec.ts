import { test, expect } from '@playwright/test';

test('Check cookie settings', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://www.trumpf.com/de_DE/');

  // Step 2: Open settings and check if the optional cookies are off
  await page.locator('a.ux-cookie-layer__nav-item:has-text("Einstellungen")').click();

  // Wait for the settings modal to appear
  await page.waitForSelector('.ux-cookie-layer-modal');

  // Check if the optional cookies switch is off
  const optionalCookiesSwitch = page.locator('body > ux-cookie-layer > ux-cookie-layer-modal > div.ux-cookie-layer-modal__outer > div > div.ux-cookie-layer-modal__slot > ux-cookie-layer-content > div > div.ux-cookie-layer__controls > ux-cookie-layer-switch.ux-cookie-layer-switch.hydrated.ux-cookie-layer-switch--off');
  await expect(optionalCookiesSwitch).toBeVisible();

  // Click the save button to save settings
  await page.locator('button:has-text("Einstellungen speichern")').click();

  // Step 3: Scroll down to the footer and open privacy settings again
 
  await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();

  // Step 4: Accept the optional cookies by clicking the specific button and save
  await page.locator('button.ux-cookie-layer-switch__button[aria-labelledby="ux-cookie-layer-switch-2-label"]').click();
  await page.locator('button:has-text("Einstellungen speichern")').click();

  // Step 5: Open the privacy settings again to verify

  await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
  await expect(page.locator('.ux-cookie-layer-switch--on:not(.ux-cookie-layer-switch--disabled)')).toBeVisible();

  // Step 6: Opt out of the optional cookies and save
  await page.locator('.ux-cookie-layer-switch--on:not(.ux-cookie-layer-switch--disabled) button').click();
  await page.locator('button:has-text("Speichern")').click();

  // Step 7: Make changes in the settings again but click on "close" instead of "save"
 
  await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
  await page.locator('.ux-cookie-layer-switch--off:not(.ux-cookie-layer-switch--disabled) button').click();
  await page.locator('button[type="button"].ux-cookie-layer-modal__close').click();


  // Verify that the changes are not taken over

  await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
  await expect(page.locator('.ux-cookie-layer-switch--off:not(.ux-cookie-layer-switch--disabled)')).toBeVisible();
});



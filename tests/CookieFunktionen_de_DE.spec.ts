import { test, expect } from '@playwright/test';

test('Verify cookies after saving settings', async ({ page }) => {
  let initialCookies;

  await test.step('Navigate to the homepage and accept cookies', async () => {
    await page.goto('https://www.trumpf.com/de_DE/');
  
  
  });

  await test.step('Open settings and verify the settings title', async () => {
    await page.locator('a.ux-cookie-layer__nav-item:has-text("Einstellungen")').click();
    const settingsModal = page.locator('.ux-cookie-layer-modal');
    await settingsModal.waitFor({ state: 'visible', timeout: 10000 });

    const settingsTitle = page.locator('h3.ux-cookie-layer__title');
    await expect(settingsTitle).toHaveText('Cookie Einstellungen', { timeout: 10000 });
    await expect(settingsTitle).toBeVisible({ timeout: 10000 });
  });

  await test.step('Check if the optional cookies switch is off', async () => {
    const optionalCookiesSwitch = page.locator('.ux-cookie-layer-switch--off');
    await expect(optionalCookiesSwitch).toBeVisible({ timeout: 10000 });
  });

  await test.step('Check the initial cookies state', async () => {
    initialCookies = await page.context().cookies();
    console.log('Initial cookies:', initialCookies);
  });

  await test.step('Click the save button to save settings', async () => {
    await page.locator('button:has-text("Einstellungen speichern")').click();
  });

  await test.step('Open privacy settings again from the footer', async () => {
    await page.waitForLoadState('load');
    await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();
    const settingsModal = page.locator('.ux-cookie-layer-modal');
    await settingsModal.waitFor({ state: 'visible', timeout: 10000 });

    const settingsTitle = page.locator('h3.ux-cookie-layer__title');
    await expect(settingsTitle).toHaveText('Cookie Einstellungen', { timeout: 10000 });
    await expect(settingsTitle).toBeVisible({ timeout: 10000 });
  });

  await test.step('Accept the optional cookies by clicking the specific button and save', async () => {
    await page.locator('button.ux-cookie-layer-switch__button[aria-labelledby="ux-cookie-layer-switch-2-label"]').click();
    await page.locator('button:has-text("Einstellungen speichern")').click();
  });

  await test.step('Check the cookies state after accepting optional cookies', async () => {
    let cookiesAfterAccepting = await page.context().cookies();
    console.log('Cookies after accepting optional:', cookiesAfterAccepting);

    expect(cookiesAfterAccepting.length).toBeGreaterThan(initialCookies.length);
    const optionalCookie = cookiesAfterAccepting.find(cookie => cookie.name === '_ux_cc');
    expect(optionalCookie).toBeTruthy();

    if (optionalCookie?.value) {
      const decodedValue = decodeURIComponent(optionalCookie.value);
      expect(decodedValue).toContain('"optional":true');
    }
  });
});

import { test, expect } from '@playwright/test';

test('Verify cookies after saving settings', async ({ page }) => {
  // Step 1: Navigate to the homepage
  await page.goto('https://www.trumpf.com/de_DE/');

  // Step 2: Open settings
  await page.locator('a.ux-cookie-layer__nav-item:has-text("Einstellungen")').click();

  // Wait for the settings modal to appear
  await page.waitForSelector('.ux-cookie-layer-modal');

  // Check if the optional cookies switch is off
  const optionalCookiesSwitch = page.locator('body > ux-cookie-layer > ux-cookie-layer-modal > div.ux-cookie-layer-modal__outer > div > div.ux-cookie-layer-modal__slot > ux-cookie-layer-content > div > div.ux-cookie-layer__controls > ux-cookie-layer-switch.ux-cookie-layer-switch.hydrated.ux-cookie-layer-switch--off');
  await expect(optionalCookiesSwitch).toBeVisible();

  // Step 3: Check the initial cookies state
  let initialCookies = await page.context().cookies();
  console.log('Initial cookies:', initialCookies);

  // Click the save button to save settings
  await page.locator('button:has-text("Einstellungen speichern")').click();

  // Step 4: Open privacy settings again from the footer
  await page.locator('#mainContent > footer > div > ul > li:nth-child(4) > a, a[data-ux-cookie-layer="settings"]').click();

  // Step 5: Accept the optional cookies by clicking the specific button and save
  await page.locator('button.ux-cookie-layer-switch__button[aria-labelledby="ux-cookie-layer-switch-2-label"]').click();
  await page.locator('button:has-text("Einstellungen speichern")').click();

  // Step 6: Check the cookies state after accepting optional cookies
  let cookiesAfterAccepting = await page.context().cookies();
  console.log('Cookies after accepting optional:', cookiesAfterAccepting);

 // Assertions to check if cookies are set correctly
expect(cookiesAfterAccepting.length).toBeGreaterThan(initialCookies.length);
const optionalCookie = cookiesAfterAccepting.find(cookie => cookie.name === '_ux_cc');
expect(optionalCookie).toBeTruthy();

if (optionalCookie?.value) {
    // Decode the cookie value before comparing
    const decodedValue = decodeURIComponent(optionalCookie.value);
    expect(decodedValue).toContain('"optional":true');
}});
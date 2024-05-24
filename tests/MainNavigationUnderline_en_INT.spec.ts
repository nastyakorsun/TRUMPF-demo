import { test, expect } from '@playwright/test';

test.describe('Main Navigation Menu Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('https://www.trumpf.com/en_INT/');

    // Accept cookies
    const acceptCookiesButton = await page.getByRole('button', { name: 'Accept all cookies' });
    await acceptCookiesButton.click();
  });

  // Test Case 1: Verify blue underline on hover for main navigation links
  test('Blue underline appears on hover for Products', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Products") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blue underline appears on hover for Solutions', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Solutions") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blue underline appears on hover for Company', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Company") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blue underline appears on hover for Sustainability', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Sustainability") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blue underline appears on hover for Newsroom', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Newsroom") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blue underline appears on hover for Careers', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Careers") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

// Test Case 2: Verify Newsroom link redirects correctly
test('Newsroom link redirects correctly', async ({ page }) => {
    await page.click('nav .ux-iws-nav__lvl1-item:has-text("Newsroom") a');
    await expect(page).toHaveURL('https://www.trumpf.com/en_INT/newsroom/');

});



});



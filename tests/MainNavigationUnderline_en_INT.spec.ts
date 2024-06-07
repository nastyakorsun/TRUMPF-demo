import { test, expect } from '@playwright/test';

test.describe('Main Navigation Menu Tests', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to the homepage and accept cookies', async () => {
      await page.goto('https://www.trumpf.com/en_INT/');
      const acceptCookiesButton = await page.getByRole('button', { name: 'Accept all cookies' });
      await acceptCookiesButton.click();
    });
  });

  test('Blue underline appears on hover for Products', async ({ page }) => {
    await test.step('Check the blue underline on hover for Products', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Products") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Solutions', async ({ page }) => {
    await test.step('Check the blue underline on hover for Solutions', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Solutions") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Company', async ({ page }) => {
    await test.step('Check the blue underline on hover for Company', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Company") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Sustainability', async ({ page }) => {
    await test.step('Check the blue underline on hover for Sustainability', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Sustainability") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Newsroom', async ({ page }) => {
    await test.step('Check the blue underline on hover for Newsroom', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Newsroom") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Careers', async ({ page }) => {
    await test.step('Check the blue underline on hover for Careers', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Careers") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Newsroom link redirects correctly', async ({ page }) => {
    await test.step('Click on Newsroom link and verify redirection', async () => {
      await page.click('nav .ux-iws-nav__lvl1-item:has-text("Newsroom") a');
      await expect(page).toHaveURL('https://www.trumpf.com/en_INT/newsroom/');
    });
  });

});



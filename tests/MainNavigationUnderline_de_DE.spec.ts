import { test, expect } from '@playwright/test';

test.describe('Main Navigation Menu Tests', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to the homepage and accept cookies', async () => {
      await page.goto('https://www.trumpf.com/de_DE/');
      const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
      await acceptCookiesButton.click();
    });
  });

  test('Blue underline appears on hover for Products', async ({ page }) => {
    await test.step('Check the blue underline on hover for Products', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Produkte") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Solutions', async ({ page }) => {
    await test.step('Check the blue underline on hover for Solutions', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Lösungen") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Company', async ({ page }) => {
    await test.step('Check the blue underline on hover for Company', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Unternehmen") a').first();
      await navigationLink.waitFor({ state: 'visible' });
      await navigationLink.scrollIntoViewIfNeeded();
      await navigationLink.hover({ force: true });
      const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
      expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
    });
  });

  test('Blue underline appears on hover for Sustainability', async ({ page }) => {
    await test.step('Check the blue underline on hover for Sustainability', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Nachhaltigkeit") a').first();
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

  test('Blue underline appears on hover for Career', async ({ page }) => {
    await test.step('Check the blue underline on hover for Career', async () => {
      const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Karriere") a').first();
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
      await expect(page).toHaveURL('https://www.trumpf.com/de_DE/newsroom/');
    });
  });

});

import { test, expect } from '@playwright/test';

test.describe('Hauptnavigationsmenü Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigieren Sie vor jedem Test zur Startseite
    await page.goto('https://www.trumpf.com/de_DE/');

    // Cookies akzeptieren
    const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
    await acceptCookiesButton.click();
  });

  // Testfall 1: Überprüfen Sie die blaue Unterstreichung beim Überfahren für Hauptnavigationslinks
  test('Blaue Unterstreichung erscheint beim Überfahren für Produkte', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Produkte") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blaue Unterstreichung erscheint beim Überfahren für Lösungen', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Lösungen") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blaue Unterstreichung erscheint beim Überfahren für Unternehmen', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Unternehmen") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blaue Unterstreichung erscheint beim Überfahren für Nachhaltigkeit', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Nachhaltigkeit") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blaue Unterstreichung erscheint beim Überfahren für Newsroom', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Newsroom") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  test('Blaue Unterstreichung erscheint beim Überfahren für Karriere', async ({ page }) => {
    const navigationLink = page.locator('nav .ux-iws-nav__lvl1-item:has-text("Karriere") a').first();
    await navigationLink.waitFor({ state: 'visible' });
    await navigationLink.scrollIntoViewIfNeeded();
    await navigationLink.hover({ force: true });

    const underlineStyle = await navigationLink.evaluate((el: Element) => window.getComputedStyle(el).getPropertyValue('text-decoration'));
    expect(underlineStyle).toContain('none solid rgb(19, 19, 19)');
  });

  // Testfall 2: Überprüfen Sie, ob der Newsroom-Link korrekt weiterleitet
  test('Newsroom-Link leitet korrekt weiter', async ({ page }) => {
    await page.click('nav .ux-iws-nav__lvl1-item:has-text("Newsroom") a');
    await expect(page).toHaveURL('https://www.trumpf.com/de_DE/newsroom/');

  });

});
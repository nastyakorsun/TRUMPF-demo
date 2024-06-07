import { test, expect } from '@playwright/test';

test.describe('Meta Container Header Tests', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to the homepage and accept cookies', async () => {
      await page.goto('https://www.trumpf.com/de_DE/');
      const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
      await acceptCookiesButton.click();
    });
  });

  test('Verify search element visibility and functionality', async ({ page }) => {
    await test.step('Check the search element visibility', async () => {
      const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
      await expect(searchIcon).toBeVisible();
    });

    await test.step('Activate the search form by clicking the search icon', async () => {
      const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
      await searchIcon.click();
      const searchForm = page.locator('div.ux-iws-navigation-meta__search form');
      await expect(searchForm).toBeVisible();
    });

    await test.step('Perform a search for "Laser"', async () => {
      const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
      await expect(searchInput).toBeVisible();
      await searchInput.fill('Laser');
      await searchInput.press('Enter');
      await expect(page).toHaveURL(/\/de_DE\/meta\/suche\/\?q=Laser/);
    });
  });

  test('Verify contact element visibility and functionality', async ({ page }) => {
    await test.step('Check the contact element visibility and navigate to contact page', async () => {
      const contactLink = page.getByRole('banner').getByRole('link', { name: 'Kontakt' });
      await expect(contactLink).toBeVisible();
      await contactLink.click();
      await expect(page).toHaveURL('https://www.trumpf.com/de_DE/meta/kontakt/');
    });
  });

  test('Verify login element visibility and functionality', async ({ page }) => {
    await test.step('Check the login element visibility and navigate to login page', async () => {
      const loginLink = page.getByRole('banner').getByRole('link', { name: 'Login' });
      await expect(loginLink).toBeVisible();
      await loginLink.click();
      await expect(page).toHaveURL(new RegExp('^https://identity\\.trumpf\\.com/authenticationendpoint/login'));
    });
  });

  test('Verify locale selection element visibility and functionality', async ({ page }) => {
    await test.step('Check the locale selection element visibility and open locale selection modal', async () => {
      const localeLink = page.getByRole('banner').getByRole('link', { name: /Deutschland \| DE/ }).first();
      await expect(localeLink).toBeVisible();
      await localeLink.click();
      const localeModal = page.locator('.ux-iws-navigation-locale-selection__wrapper');
      await expect(localeModal).toBeVisible();
    });

    await test.step('Select a country and apply', async () => {
      const localeModal = page.locator('.ux-iws-navigation-locale-selection__wrapper');
      const countrySelect = localeModal.locator('select.ux-select__select');
      await expect(countrySelect).toBeVisible();
      const applyButton = localeModal.locator('ux-button:has-text("Anwenden")');
      await expect(applyButton).toBeVisible();
      await countrySelect.selectOption('de_DE');
      await applyButton.click();
      await expect(page).toHaveURL('https://www.trumpf.com/de_DE/');
    });
  });

  test('Verify MyTRUMPF link visibility and functionality', async ({ page }) => {
    await test.step('Check the MyTRUMPF link visibility and navigate to MyTRUMPF page', async () => {
      const myTrumpfLink = page.getByRole('banner').getByRole('link', { name: 'Zu MyTRUMPF' }).first();
      await expect(myTrumpfLink).toBeVisible();
      await myTrumpfLink.click();
      await expect(page).toHaveURL(new RegExp('^https://www.trumpf.com/de_DE/mytrumpf/'));
    });
  });

});

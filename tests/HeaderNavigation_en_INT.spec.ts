import { test, expect } from '@playwright/test';

test.describe('Meta Container Header Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('https://www.trumpf.com/en_INT/');

    // Accept cookies
    const acceptCookiesButton = await page.getByRole('button', { name: 'Accept all cookies' });
    await acceptCookiesButton.click();
  });

  test('Verify search element visibility and functionality', async ({ page }) => {
    // Check the search element
    const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
    await expect(searchIcon).toBeVisible();
    
    // Click on search icon to activate the search form
    await searchIcon.click();
    
    // Check if the search form is visible after clicking the search icon
    const searchForm = page.locator('div.ux-iws-navigation-meta__search form');
    await expect(searchForm).toBeVisible();

    // Perform a search
    const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('laser');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/en_INT\/meta\/search\/\?q=laser/);
  });

  test('Verify contact element visibility and functionality', async ({ page }) => {
    // Check the contact element
    const contactLink = page.getByRole('banner').getByRole('link', { name: 'Contact' });
    await expect(contactLink).toBeVisible();
    await contactLink.click();
    await expect(page).toHaveURL('https://www.trumpf.com/en_INT/meta/contact/');
  });
  test('Verify login element visibility and functionality', async ({ page }) => {
    // Check the login element
    const loginLink = page.getByRole('banner').getByRole('link', { name: 'Login' });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL(new RegExp('^https://identity\\.trumpf\\.com/authenticationendpoint/login'));
  });



  test('Verify locale selection element visibility and functionality', async ({ page }) => {
    // Check the locale selection element
    const localeLink = page.getByRole('banner').getByRole('link', { name: /Other countries\/regions \| EN/ }).first();
    await expect(localeLink).toBeVisible();
    await localeLink.click();
    // Verify the locale selection modal is visible
    const localeModal = page.locator('.ux-iws-navigation-locale-selection__wrapper');
    await expect(localeModal).toBeVisible();
    // Check if the select box and apply button are visible
    const countrySelect = localeModal.locator('select.ux-select__select');
    await expect(countrySelect).toBeVisible();
    const applyButton = localeModal.locator('ux-button:has-text("Apply")');
    await expect(applyButton).toBeVisible();
    // Select a country and click apply
    await countrySelect.selectOption('en_US');
    await applyButton.click();
    await expect(page).toHaveURL('https://www.trumpf.com/en_US/');
  });

  test('Verify MyTRUMPF link visibility and functionality', async ({ page }) => {
    // Check the MyTRUMPF link
    const myTrumpfLink = page.getByRole('banner').getByRole('link', { name: 'To MyTRUMPF' }).first();
    await expect(myTrumpfLink).toBeVisible();
    await myTrumpfLink.click();
    await expect(page).toHaveURL(new RegExp('^https://www.my.trumpf.com/en_INT/'));
  });

});


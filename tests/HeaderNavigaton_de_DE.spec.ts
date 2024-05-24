import { test, expect } from '@playwright/test';

test.describe('Meta-Container-Header-Tests', () => {

  test.beforeEach(async ({ page }) => {
    // Navigieren Sie vor jedem Test zur Startseite
    await page.goto('https://www.trumpf.com/de_DE/');

    // Cookies akzeptieren
    const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
    await acceptCookiesButton.click();
  });

  test('Überprüfen Sie die Sichtbarkeit und Funktionalität des Suchelements', async ({ page }) => {
    // Überprüfen Sie das Suchelement
    const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
    await expect(searchIcon).toBeVisible();
    
    // Klicken Sie auf das Suchsymbol, um das Suchformular zu aktivieren
    await searchIcon.click();
    
    // Überprüfen Sie, ob das Suchformular nach dem Klicken auf das Suchsymbol sichtbar ist
    const searchForm = page.locator('div.ux-iws-navigation-meta__search form');
    await expect(searchForm).toBeVisible();

    // Führen Sie eine Suche durch
    const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Laser');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/de_DE\/meta\/suche\/\?q=Laser/);
  });

  test('Überprüfen Sie die Sichtbarkeit und Funktionalität des Kontaktelements', async ({ page }) => {
    // Überprüfen Sie das Kontaktelement
    const contactLink = page.getByRole('banner').getByRole('link', { name: 'Kontakt' });
    await expect(contactLink).toBeVisible();
    await contactLink.click();
    await expect(page).toHaveURL('https://www.trumpf.com/de_DE/meta/kontakt/');
  });

  test('Überprüfen Sie die Sichtbarkeit und Funktionalität des Anmeldeelements', async ({ page }) => {
    // Überprüfen Sie das Anmeldeelement
    const loginLink = page.getByRole('banner').getByRole('link', { name: 'Login' });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL(new RegExp('^https://identity\\.trumpf\\.com/authenticationendpoint/login'));
  });

  test('Überprüfen Sie die Sichtbarkeit und Funktionalität des Lokalauswahlelements', async ({ page }) => {
    // Überprüfen Sie das Lokalauswahlelement
    const localeLink = page.getByRole('banner').getByRole('link', { name: /Deutschland \| DE/ }).first();
    await expect(localeLink).toBeVisible();
    await localeLink.click();
    // Überprüfen Sie, ob das Lokalauswahlmodal sichtbar ist
    const localeModal = page.locator('.ux-iws-navigation-locale-selection__wrapper');
    await expect(localeModal).toBeVisible();
    // Überprüfen Sie, ob das Auswahlfeld und die Schaltfläche Anwenden sichtbar sind
    const countrySelect = localeModal.locator('select.ux-select__select');
    await expect(countrySelect).toBeVisible();
    const applyButton = localeModal.locator('ux-button:has-text("Anwenden")');
    await expect(applyButton).toBeVisible();
    // Wählen Sie ein Land aus und klicken Sie auf Anwenden
    await countrySelect.selectOption('de_DE');
    await applyButton.click();
    await expect(page).toHaveURL('https://www.trumpf.com/de_DE/');
  });

  test('Überprüfen Sie die Sichtbarkeit und Funktionalität des MyTRUMPF-Links', async ({ page }) => {
    // Überprüfen Sie den MyTRUMPF-Link
    const myTrumpfLink = page.getByRole('banner').getByRole('link', { name: 'Zu MyTRUMPF' }).first();
    await expect(myTrumpfLink).toBeVisible();
    await myTrumpfLink.click();
    await expect(page).toHaveURL(new RegExp('^https://www.trumpf.com/de_DE/mytrumpf/'));  });

});
import { test, expect } from '@playwright/test';

test.describe('Check navogation Submenu Lösungen on trumpf.com', () => {
  test('Check Links on "Lösungen"', async ({ page }) => {
    await page.goto('https://www.trumpf.com/de_DE/');
    await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();

    // Open "Lösungen"
    await page.getByRole('link', { name: 'Lösungen', exact: true }).click();



    await expect(page).toHaveURL('https://www.trumpf.com/de_DE/loesungen/');

    // All Selectors in Submenu "Lösungen"
    const menuItems = [
      '/de_DE/loesungen/',
      '/de_DE/loesungen/smart-factory/',
      '/de_DE/loesungen/smart-factory-consulting/',
      '/de_DE/loesungen/anwendungen/',
      '/de_DE/loesungen/beispielteile/', 
      '/de_DE/loesungen/branchen/', 
      '/de_DE/loesungen/erfolgsgeschichten/', 
      '/de_DE/loesungen/vorteile-trumpf-maschinen/'
    ];

    for (const item of menuItems) {
      // Click on submenu element and check the redirection link
      await page.click(`a[href="${item}"]`);
      await expect(page).toHaveURL(`https://www.trumpf.com${item}`);
      // go back
      await page.goBack();
    }
  });
});
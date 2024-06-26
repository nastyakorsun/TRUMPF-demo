import { test, expect } from '@playwright/test';

test('Enter a search term, a material number or a combination of both and click on "reset"', async ({ page }) => {
  await page.goto('https://www.trumpf.com/de_DE/unternehmen/grundsaetze/qualitaet/sicherheitsdatenblaetter-fuer-betriebsstoffe/?tx_trumpfdownloads_downloadmaterialsafetydatasheets%5Baction%5D=index&tx_trumpfdownloads_downloadmaterialsafetydatasheets%5Bcontroller%5D=DownloadSafetyDataSheet&tx_trumpfdownloads_downloadmaterialsafetydatasheets%5Bsearch%5D=1&cHash=36fda95c4923cb45a4f59e47abef1441');
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  
  await page.locator('input[name="tx_trumpfdownloads_downloadmaterialsafetydatasheets\\[download\\]\\[searchTerm\\]"]').fill('iron');
  await page.locator('input[name="tx_trumpfdownloads_downloadmaterialsafetydatasheets\\[download\\]\\[materialNumber\\]"]').fill('357480');
  await page.locator('a:has-text("Zurücksetzen")').click();
  await expect(page.locator('input[name="tx_trumpfdownloads_downloadmaterialsafetydatasheets\\[download\\]\\[searchTerm\\]"]')).toHaveValue('');
  await expect(page.locator('input[name="tx_trumpfdownloads_downloadmaterialsafetydatasheets\\[download\\]\\[materialNumber\\]"]')).toHaveValue('');
});

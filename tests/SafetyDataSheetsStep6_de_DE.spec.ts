import { test, expect } from '@playwright/test';
import { verifyPDFDownload } from '../utils.ts';

test('Enter a search term and a material number, don\'t restrict the language and press enter/click on "search"', async ({ page }) => {
  await page.goto('https://www.trumpf.com/de_DE/unternehmen/grundsaetze/qualitaet/sicherheitsdatenblaetter-fuer-betriebsstoffe/?tx_trumpfdownloads_downloadmaterialsafetydatasheets%5Baction%5D=index&tx_trumpfdownloads_downloadmaterialsafetydatasheets%5Bcontroller%5D=DownloadSafetyDataSheet&tx_trumpfdownloads_downloadmaterialsafetydatasheets%5Bsearch%5D=1&cHash=36fda95c4923cb45a4f59e47abef1441');
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  
  await page.locator('input[name="tx_trumpfdownloads_downloadmaterialsafetydatasheets\\[download\\]\\[searchTerm\\]"]').fill('iron');
  await page.locator('input[name="tx_trumpfdownloads_downloadmaterialsafetydatasheets\\[download\\]\\[materialNumber\\]"]').fill('357480');
  await page.getByLabel('Sprache:').selectOption('');
  await page.getByRole('button', { name: 'Suche', exact: true }).click();
  const resultList = await page.locator('text=Anzahl der Suchergebnisse').first();
  await expect(resultList).toBeVisible();
  await page.waitForLoadState('networkidle');
  
  const manufacturerLink = page.locator('a[href="https://www.mysds.henkel.com/index.html#/appSelection"]').first();
  await expect(manufacturerLink).toBeVisible();
  await expect(manufacturerLink).toHaveAttribute('target', '_blank');
  await expect(manufacturerLink).toHaveText('Zum Hersteller');

  await verifyPDFDownload(page);
});

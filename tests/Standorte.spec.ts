import { test, expect } from '@playwright/test';

test('Test the map on website', async ({ page }) => {
  await page.goto('https://www.trumpf.com/de_DE/');
  await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
  await page.getByRole('link', { name: 'Zur Standortsuche' }).click();
  await expect(page.getByRole('heading', { name: 'TRUMPF Standorte und Adressen' })).toBeVisible();
  await expect(page.getByText('Mit mehr als 70')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Deutschland Land/Region ändern' })).toBeVisible();
  await page.getByRole('button', { name: 'Land/Region ändern', exact: true }).click();
  await page.getByRole('button', { name: 'Land/Region ändern', exact: true }).click();
  await page.getByRole('button', { name: 'Land/Region ändern', exact: true }).click();
  await page.getByRole('button', { name: 'Land/Region ändern', exact: true }).click();
  await page.getByRole('button', { name: 'Land/Region ändern', exact: true }).click();
  await expect(page.getByText('Europa')).toBeVisible();
  await expect(page.getByText('Asien', { exact: true })).toBeVisible();
  await expect(page.getByText('Zentraler Kontakt für Deutschland TRUMPF SE + Co. KG Johann-Maus-Str. 2 71254')).toBeVisible();
  await expect(page.locator('#subpage div').filter({ hasText: 'Stammsitz' }).nth(3)).toBeVisible();
  await expect(page.locator('.ux-iws-location-map__legend > div:nth-child(2)')).toBeVisible();
  await expect(page.locator('#subpage div').filter({ hasText: 'Vertretung' }).nth(3)).toBeVisible();
  await expect(page.locator('.ux-iws-location-map__legend > div:nth-child(4)')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^TRUMPF SE \+ Co\. KGJohann-Maus-Str\. 271254 Ditzingen$/ }).first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^TRUMPF Laser AGAichhalder Straße 3978713 Schramberg$/ }).first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^TRUMPF Hüttinger GmbH \+ Co\. KGBötzinger Straße 8079111 Freiburg$/ }).first()).toBeVisible();
 
});
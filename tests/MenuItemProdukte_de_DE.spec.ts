import { test, expect } from '@playwright/test';

test.describe('Check navigation Submenu "Produkte" on trumpf.com', () => {
  test('Check Links on "Produkte"', async ({ page }) => {
    await test.step('Navigate to the homepage and accept cookies', async () => {
      await page.goto('https://www.trumpf.com/de_DE/');
      await page.getByRole('button', { name: 'Alle Cookies akzeptieren' }).click();
    });

    await test.step('Open "Produkte" submenu', async () => {
      await page.getByText('Produkte Zurück Übersicht').click();
    });

    await test.step('Verify visibility of top-level links under "Produkte"', async () => {
      await expect(page.getByText('Maschinen & Systeme Zurück Ü')).toBeVisible();
      await expect(page.getByText('Laser Zurück Übersicht Laser')).toBeVisible();
      await expect(page.getByRole('link', { name: 'Übersicht Produkte' })).toBeVisible();
      await expect(page.getByText('VCSEL Lösungen & Photodioden Zurück Übersicht VCSEL Lösungen & Photodioden')).toBeVisible();
      await expect(page.getByText('Echtzeit-Lokalisierung Zurück')).toBeVisible();
      await expect(page.getByText('Leistungselektronik Zurück Ü')).toBeVisible();
      await expect(page.getByText('Elektrowerkzeuge Zurück Ü')).toBeVisible();
      await expect(page.getByText('Software Zurück Übersicht')).toBeVisible();
      await expect(page.getByRole('navigation').getByRole('link', { name: 'Services' })).toBeVisible();
    });

    await test.step('Open "Maschinen & Systeme" submenu and verify links', async () => {
      await page.getByText('Maschinen & Systeme Zurück Ü').click();
      await expect(page.getByRole('link', { name: '2D-Laserschneidmaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Übersicht Maschinen & Systeme' })).toBeVisible();
      await expect(page.getByRole('link', { name: '3D-Laserschneidanlagen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Laserschweißanlagen und' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Laser-Rohrschneidmaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Markiersysteme' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Additive Fertigungssysteme' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Stanzmaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Stanz-Laser-Maschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Biegemaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Lagersysteme' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Automatisierung' })).toBeVisible();
    });

    await test.step('Open "Laser" submenu and verify links', async () => {
      await page.getByText('Laser Zurück Übersicht Laser').click();
      await expect(page.locator('li').filter({ hasText: 'Übersicht Laser' }).nth(2)).toBeVisible();
      await expect(page.getByRole('link', { name: 'Scheibenlaser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Faserlaser' })).toBeVisible();
      await expect(page.locator('li').filter({ hasText: 'Diodenlaser' }).nth(2)).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kurz- und Ultrakurzpulslaser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Beschriftungslaser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Gepulste Laser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'CO2-Laser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'EUV Drive Laser' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Sensorik' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Bearbeitungsoptiken' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Technologiepakete' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Wissenschaftslaser' })).toBeVisible();
    });

    await test.step('Open "VCSEL Lösungen & Photodioden" submenu and verify links', async () => {
      await page.getByText('VCSEL Lösungen & Photodioden Zurück Übersicht VCSEL Lösungen & Photodioden').click();
      await expect(page.getByRole('link', { name: 'Übersicht VCSEL Lösungen &' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Single & Multi-Mode-VCSEL' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Datacom VCSEL & Photodioden' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Integrierte VCSEL Lösungen' })).toBeVisible();
      //await expect(page.getByRole('link', { name: 'TruHeat VCSEL' })).toBeVisible();
    });

    await test.step('Open "Echtzeit-Lokalisierung" submenu and verify links', async () => {
      await page.getByText('Echtzeit-Lokalisierung Zurück').click();
      await expect(page.getByRole('link', { name: 'Übersicht Echtzeit-' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'CorivaEngine' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'CorivaSatellite' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'omlox – Der offene' })).toBeVisible();
    });

    await test.step('Open "Leistungselektronik" submenu and verify links', async () => {
      await page.getByText('Leistungselektronik Zurück Ü').click();
      await expect(page.getByRole('link', { name: 'Übersicht Leistungselektronik' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Plasmageneratoren' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Wechselrichter' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Generatoren zur industriellen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Mikrowellenverstärker' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'TRUMPF Hüttinger Whitepaper' })).toBeVisible();
    });

    await test.step('Open "Elektrowerkzeuge" submenu and verify links', async () => {
      await page.getByText('Elektrowerkzeuge Zurück Ü').click();
      await expect(page.getByRole('link', { name: 'Übersicht Elektrowerkzeuge' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Akkumaschinen' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Schlitzscheren' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Scheren', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Nibbler', exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Profilnibbler' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Panel Cutter' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Fiber Composite Nibbler' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Falzschließer' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Fügepresse' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kantenfräsgeräte' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Kantenkampagne' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Schweißkantenformer' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Auflageleisten-Reiniger' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Teileseparator' })).toBeVisible();
    });

    await test.step('Open "Software" submenu and verify links', async () => {
      await page.getByText('Software Zurück Übersicht').click();
      await expect(page.getByRole('link', { name: 'Übersicht Software' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Oseon – Software für' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Programmiersoftware' })).toBeVisible();
    });
  });
});

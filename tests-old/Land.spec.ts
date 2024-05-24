const { test, expect, chromium } = require('@playwright/test');

test.describe('Visit Trumpf website from different countries', () => {
  let browser;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  // Function to set geolocation and language
  async function visitSiteFromCountry(country) {
    let locale, timezone, geolocation, userAgent;

    switch (country) {
      case 'BE':
        locale = 'nl-BE';
        timezone = 'Europe/Brussels';
        geolocation = { latitude: 50.8503, longitude: 4.3517 }; // Brussels, Belgium
        userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        break;
      case 'CH':
        locale = 'de-CH';
        timezone = 'Europe/Zurich';
        geolocation = { latitude: 47.3769, longitude: 8.5417 }; // Zurich, Switzerland
        userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        break;
      case 'DE':
        locale = 'de-DE';
        timezone = 'Europe/Berlin';
        geolocation = { latitude: 52.5200, longitude: 13.4050 }; // Berlin, Germany
        userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
        break;
      default:
        locale = 'en-US';
        timezone = 'UTC';
        geolocation = { latitude: 0, longitude: 0 };
        userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
    }

    const context = await browser.newContext({
      geolocation,
      locale,
      permissions: ['geolocation'],
      userAgent,
      timezoneId: timezone
    });

    const page = await context.newPage();
    await page.goto('https://www.trumpf.com/');
    
    // Wait for a specific element to ensure the page has loaded
    await page.waitForSelector('html');
    
    // Extract and log the language of the page
    const language = await page.evaluate(() => document.documentElement.lang);
    console.log(`Visited site from ${country}. Detected language: ${language}`);
    
    return language;
  }

  test('Visit site from Belgium', async () => {
    const language = await visitSiteFromCountry('BE');
    expect(language).toBe('nl'); // Adjust if the expected language code is different
  });

  test('Visit site from Switzerland', async () => {
    const language = await visitSiteFromCountry('CH');
    expect(language).toBe('de'); // Adjust if the expected language code is different
  });

  test('Visit site from Germany', async () => {
    const language = await visitSiteFromCountry('DE');
    expect(language).toBe('de'); // Adjust if the expected language code is different
  });
});

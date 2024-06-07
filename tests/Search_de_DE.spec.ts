import { test, expect } from '@playwright/test';

test.describe('Search Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to the homepage and accept cookies', async () => {
      await page.goto('https://www.trumpf.com/de_DE/');
      const acceptCookiesButton = await page.getByRole('button', { name: 'Alle Cookies akzeptieren' });
      await acceptCookiesButton.click();
    });
  });

  test('Search and validate results', async ({ page }) => {
    test.setTimeout(60000);
    
    await test.step('Click the search icon', async () => {
      const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
      await searchIcon.click();
    });

    await test.step('Enter a relevant keyword and press enter', async () => {
      const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
      await searchInput.fill('batterie'); // maybe change to something with less results
      await searchInput.press('Enter');
    });

    await test.step('Verify redirection to the search page', async () => {
      await expect(page).toHaveURL(/\/de_DE\/meta\/suche\/\?q=batterie/, { timeout: 10000 });
    });

    await test.step('Wait for the search results container to appear', async () => {
      await page.waitForSelector('div.ux-iws-search-results__results-container', { timeout: 10000 });
    });

    await test.step('Verify the first 10 search results are displayed', async () => {
      const searchResults = page.locator('ux-iws-link-wrapper.ux-iws-teaser-page');
      await expect(searchResults).toHaveCount(10, { timeout: 10000 });
    });

    await test.step('Verify the total number of results is displayed', async () => {
      const totalResults = page.locator('.ux-iws-search-results__summary');
      await expect(totalResults).toBeVisible();
    });

    await test.step('Verify "Show more" button is displayed', async () => {
      const showMoreButton = page.locator('ux-button:has-text("Mehr Zeigen")');
      await expect(showMoreButton).toBeVisible();
    });

    await test.step('Click the "Show more" button and verify the next 10 results', async () => {
      const showMoreButton = page.locator('ux-button:has-text("Mehr Zeigen")');
      await showMoreButton.click();
      const searchResults = page.locator('ux-iws-link-wrapper.ux-iws-teaser-page');
      const loadingCircle = page.locator('.loading-spinner');
      await expect(loadingCircle).toBeVisible({ timeout: 10000 });
      await expect(searchResults).toHaveCount(20, { timeout: 10000 });
    });

    await test.step('Click the "Show more" button again and verify the next 10 results', async () => {
      const showMoreButton = page.locator('ux-button:has-text("Mehr Zeigen")');
      const searchResults = page.locator('ux-iws-link-wrapper.ux-iws-teaser-page');
      await showMoreButton.click();
      await expect(searchResults).toHaveCount(30, { timeout: 10000 });
    });

    await test.step('Repeat clicking "Show more" button until no results left to show', async () => {
      const showMoreButton = page.locator('ux-button:has-text("Mehr Zeigen")');
      const searchResults = page.locator('ux-iws-link-wrapper.ux-iws-teaser-page');
      const loadingCircle = page.locator('.loading-spinner');
      let resultsCount = 30;
      while (true) {
        const previousResultsCount = await searchResults.count();
        if (!await showMoreButton.isVisible()) {
          break;
        }
        await showMoreButton.click();
        await expect(loadingCircle).toBeVisible({ timeout: 15000 });
        await page.waitForTimeout(2000); // Wait for 2 seconds
        const currentResultsCount = await searchResults.count();
        if (currentResultsCount <= previousResultsCount) {
          break;
        }
        resultsCount = currentResultsCount;
        expect(currentResultsCount).toBeGreaterThanOrEqual(resultsCount);
      }
    });
  });

  test('Search with no match', async ({ page }) => {
    await test.step('Click the search icon', async () => {
      const searchIcon = page.locator('div.ux-iws-navigation-meta__search ux-icon[name="nav-search"]');
      await searchIcon.click();
    });

    await test.step('Enter a keyword with no match and press enter', async () => {
      const searchInput = page.locator('input.ux-iws-navigation-meta__search__input');
      await searchInput.fill('qq');
      await searchInput.press('Enter');
    });

    await test.step('Wait for the search results summary to appear', async () => {
      const totalResults = page.locator('div.ux-iws-search-results__summary');
      await expect(totalResults).toHaveText(/0 Ergebnisse/, { timeout: 10000 });
    });

    await test.step('Verify no results are displayed', async () => {
      const searchResults = page.locator('div.ux-iws-teaser-page');
      await expect(searchResults).toHaveCount(0, { timeout: 10000 });
    });
  });

});

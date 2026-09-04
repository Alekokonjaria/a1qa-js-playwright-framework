/* eslint-disable playwright/no-standalone-expect */
import { testWithAuth, expect } from '#framework/ui/fixtures/browser.fixture.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import BasicAuth from './pages/BasicAuth';
import MainPage from './pages/MainPage';

testWithAuth('should perform Basic Auth action', async ({ customBrowser: browser }) => {
  const testData = ConfigReader.getTestData();
  const mainPage = new MainPage(browser.page);
  // Navigate to 'Basic Auth'
  await mainPage.clickNavigationLink('Basic Auth');

  const basicAuth = new BasicAuth(browser.page);

  // Verify that the success message is displayed
  await basicAuth.waitForPageToLoad();
  // Assert that the Basic Auth page is opened
  expect(await basicAuth.isPageOpened()).toBe(true);

  // Assert that the success message is displayed and contains the expected text
  expect(await basicAuth.getSuccessMessage()).toContain(testData.successfulBasicAuthMessage);

});

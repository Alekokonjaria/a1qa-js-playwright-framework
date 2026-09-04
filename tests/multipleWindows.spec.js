// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import NewWindowPage from './pages/MultipleWindowsPages/NewWindowPage.js';
import OpenNewWindowPage from './pages/MultipleWindowsPages/OpenNewWindowPage.js';

const newWindowText = 'New Window';

test('interact with New Window', async ({ customBrowser: browser }) => {

  // Navigate to the main page and click on the "Multiple Windows" link
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Multiple Windows');

  // Wait for the "Open New Window" page to load and click on the link to open a new window
  const openNewWindowPage = new OpenNewWindowPage(browser.page);
  await openNewWindowPage.waitForPageToLoad();
  const newPage = await openNewWindowPage.openNewWindowLink();

  // Wait for the new window to load and verify the text on the new window page
  const newWindowPage = new NewWindowPage(newPage);
  await newWindowPage.waitForPageToLoad();
  expect(await newWindowPage.getNewWindowLabelText()).toEqual(newWindowText);
});

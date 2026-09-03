// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import MainPage from './pages/MainPage.js';
import DynamicControlsPage from './pages/DynamicControlsPage.js';
import Timeouts from '#framework/ui/constants/Timeouts.js';

const randomString = crypto.randomUUID();

test('Check state of Dynamic control', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('Dynamic Controls');

  const dynamicControlsPage = new DynamicControlsPage(browser.page);
  //Checking if field Enable button works
  await dynamicControlsPage.waitForPageToLoad();
  await dynamicControlsPage.clickEnableButton();

  //Filling field with 'randomtext'
  await expect.poll(async () => await dynamicControlsPage.isInputFieldEnabled()).toBe(true);
  await dynamicControlsPage.inputTextIntoInputField(randomString);

  //Asserting if field is filled with 'randomtext'
  const text = await dynamicControlsPage.getValueFromInputField();
  expect(text).toEqual(randomString);
});

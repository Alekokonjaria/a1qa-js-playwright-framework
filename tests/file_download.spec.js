// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import fs from 'fs';
import FileDownloadPage from './pages/FileDownloadPage.js';
import MainPage from './pages/MainPage.js';

test('Check that file downloaded', async ({ customBrowser: browser }) => {
  const mainPage = new MainPage(browser.page);
  await mainPage.clickNavigationLink('File Download');

  const fileDownloadPage = new FileDownloadPage(browser.page);

  await fileDownloadPage.waitForPageToLoad();
  expect(await fileDownloadPage.isPageOpened()).toBe(true);

  const fileName = 'some-file.txt';

  // Checking if the file name is displayed
  const isLabelDisplayed = await fileDownloadPage.isFileLabelDisplayed(fileName);
  expect(isLabelDisplayed).toBe(true);

  // Click the download link and wait for the file to be downloaded
  const downloadedFilePath = await browser.downloadAndSave(
    async () => await fileDownloadPage.clickDownloadFile(fileName),
    fileName
  );

  // Checking that the file exists in the download directory
  const fileExists = fs.existsSync(downloadedFilePath);
  expect(fileExists).toBe(true);

  // Checking that the downloaded file is not empty
  const fileStats = fs.statSync(downloadedFilePath);
  expect(fileStats.size).toBeGreaterThan(0);
});

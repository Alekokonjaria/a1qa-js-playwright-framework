// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import fs from 'fs';
import path from 'path';
import MainPage from './pages/MainPage.js';
import FileUploaderPage from './pages/FileUploaderPages/FileUploaderPage.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import UploadedFilesPage from './pages/FileUploaderPages/UploadedFilesPage.js';

const testData = ConfigReader.getTestData();
const fileName = testData.uploadFileName || 'test.txt';
const fileContent = testData.uploadFileContent || 'Hello World QA Test';
const filePath = path.join(process.cwd(), fileName);

test('Check file upload functionality', async ({ customBrowser: browser }) => {
  // Create a temporary file for testing
  fs.writeFileSync(filePath, fileContent);

  try {
    const mainPage = new MainPage(browser.page);
    await mainPage.clickNavigationLink('File Upload');

    const fileUploaderPage = new FileUploaderPage(browser.page);

    // Waiting for the FileUploaderPage to load and asserting that it is opened
    await fileUploaderPage.waitForPageToLoad();
    expect(await fileUploaderPage.isPageOpened()).toBe(true);

    // Uploading the file using the uploadFile method of FileUploaderPage
    await fileUploaderPage.uploadFile(filePath);

    // Switching to the UploadedFilesPage and asserting that it is opened
    const uploadedFilesPage = new UploadedFilesPage(browser.page);
    await uploadedFilesPage.waitForPageToLoad();
    expect(await uploadedFilesPage.isPageOpened()).toBe(true);

    // Asserting that the uploaded file name is displayed correctly on the UploadedFilesPage
    const uploadedFileName = await uploadedFilesPage.getUploadedFileName();
    expect(uploadedFileName.trim()).toBe(fileName);

  } finally {
    // After the test is completed, we delete the temporary file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
});

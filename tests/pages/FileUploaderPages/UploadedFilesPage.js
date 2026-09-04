import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';

export default class UploadedFilesPage extends BasePage {
  constructor(page) {
    super(
      new Label(page.getByRole('heading', { name: 'File Uploaded!' }), 'File Uploaded page unique element'),
      'Uploaded Files Page'
    );

    this.uploadedFileNameLabel = new Label(page.locator('#uploaded-files'), 'Uploaded File Name label');
  }

  async getUploadedFileName() {
    return await this.uploadedFileNameLabel.getText();
  }
}

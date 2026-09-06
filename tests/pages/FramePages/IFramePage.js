import BasePage from '#framework/ui/page/BasePage.js';
import { Label, TextBox } from '#framework/ui/elements/index.js';
import FrameUtils from '#framework/utils/FrameUtils.js';

export default class IFramePage extends BasePage {
  constructor(page) {
    super(
      new Label(page.getByText('An iFrame containing the TinyMCE WYSIWYG Editor', { exact: true }), 'unique element of iFrame Page'), 'iFrame Page'
    );

    this.page = page;
    this.frameUtils = new FrameUtils(page);
    this.editorLocator = this.frameUtils.locatorInFrames(['#mce_0_ifr'], '#tinymce');
    this.editorTextBox = new TextBox(this.editorLocator, 'TinyMCE Editor Text Area');
  }

  async getFrameText() {
    return (await this.editorTextBox.getText()).trim();
  }

  async typeInFrame(text) {
    const frameElement = this.page.frameLocator('#mce_0_ifr').locator('#tinymce');

    await frameElement.evaluate((el, textToSet) => {
      el.innerText = textToSet;
    }, text);
  }


}

import BasePage from '#framework/ui/page/BasePage.js';
import { Label, Button } from '#framework/ui/elements/index.js';

export default class OpenNewWindowPage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('.example h3'), 'Open New Window page unique element'), 'Open New Window Page');
    this.page = page;
    this.openNewWindowPageLink = new Button(page.locator('a[href="/windows/new"]'), 'Open new windows page');
  }

  async openNewWindowLink() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.openNewWindowPageLink.click(),
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }
};

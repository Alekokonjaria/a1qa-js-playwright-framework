import BasePage from '#framework/ui/page/BasePage.js';
import { Label } from '#framework/ui/elements/index.js';

export default class BasicAuth extends BasePage {
  constructor(page) {
    super(new Label(page.getByRole('heading', { name: 'Basic Auth' }), 'basic auth page unique element'), 'Basic Auth Page');
    // Add elements to interact with
    this.successMessage = new Label(page.locator('#content p'), 'Basic Auth success message');
    this.authLink = new Label(page.getByText('Basic Auth'));
  }

  async clickOnBasicAuth(){
    await this.authLink.click();
  }

  async getSuccessMessage() {
    return this.successMessage.getText();
  }
}

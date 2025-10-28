import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(3000);            // 10s para acciones/locators
    this.page.setDefaultNavigationTimeout(3000);  // 15s para navegaciones
  }

  async closeBrowser() {
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

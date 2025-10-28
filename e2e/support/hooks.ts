import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  await this.openBrowser();
});

After(async function (this: CustomWorld) {
  await this.closeBrowser();
});

import 'chromedriver';
import { equal } from 'assert';
import { Builder, Key, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
const screen = {
    width: 640,
    height: 480
  };

describe('Checkout Google.com', function () {
    let driver;

    before(async function() {

        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();

    });

    it('Search on Google', async function() {
        await driver.get('https://meddirectory.azurewebsites.net/');
        await driver.findElement(By.linkText("Lista de médicos")).click();

        let title = await driver.findElement(By.className("input form-control")).getAttribute("placeholder");
        equal(title, "Nombre del médico");
    });

    after(() => driver && driver.quit());
})
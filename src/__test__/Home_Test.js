import 'chromedriver';
import { equal } from 'assert';
import { Builder, Key, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

const screen = {
    width: 1920,
    height: 1080
  };

describe('Checkout Google.com', function () {
    let driver;

    before(async function() {

        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize(screen)).build();

    });

    it('Prueba de Suite', async function() {
        await driver.get('https://meddirectory.azurewebsites.net/');
        await driver.findElement(By.linkText("Lista de médicos")).click();

        let title = await driver.findElement(By.className("input form-control")).getAttribute("placeholder");
        equal(title, "Nombre del médico");
    });
    
    it('Crear médico', async function() {
        await driver.get('https://meddirectory.azurewebsites.net/');
        await driver.findElement(By.linkText("Añadir médico")).click();

        await driver.findElement(By.id("name")).sendKeys("Prueba Selenium");
        await driver.findElement(By.id("email")).sendKeys("prueba@selenium.com");
        await driver.findElement(By.id("password")).sendKeys("prueba");
        await driver.findElement(By.id("specialization")).sendKeys("prueba selenium");
        await driver.findElement(By.id("experience")).sendKeys("prueba selenium");

        await driver.findElement(By.className("btn btn-primary")).click();

        await driver.wait(until.elementLocated(By.className("input form-control")), 10000);
        const name = await driver.findElement(By.className("input form-control")).getAttribute("placeholder");
        equal(name, "Nombre del médico");
    });

    
    it('Editar médico', async function() {
        await driver.get('https://meddirectory.azurewebsites.net/');
        await driver.findElement(By.linkText("Lista de médicos")).click();

        await driver.findElement(By.className("input form-control")).sendKeys("john doe");
        await driver.wait(until.elementLocated(By.xpath(`/html/body/div/div/ul/li/button[1]`)), 100000);
        await driver.findElement(By.xpath(`/html/body/div/div/ul/li/button[1]`)).click();

        await driver.wait(until.elementLocated(By.xpath(`/html/body/div/div/form/div[3]/input`)), 100000);
        await driver.findElement(By.xpath(`/html/body/div/div/form/div[3]/input`)).sendKeys("12");

        await driver.findElement(By.className("btn btn-primary")).click();

        await driver.wait(until.elementLocated(By.className("doctor-details")), 100000);
        const exp = await driver.findElement(By.className("doctor-details")).getAttribute("innerHTML");
        equal(exp, "Doctor Details");

    });
    
    after(() => driver && driver.quit());
})
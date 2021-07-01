const { expect } = require('chai');
const { browser } = require('protractor');
const EC = protractor.ExpectedConditions;

//const loginButton = element(by.css('button.ui.primary.button'));
describe('clickability', function() {
    it('should click to the login button and info should be visible', async function() {
      await browser.waitForAngularEnabled(false);
      await browser.get('http://localhost:3000/login');
      const loginButton = element(by.css('button.ui.primary.button'));
      const userName = element(by.css('input[name*=user]'));
      const password = element(by.css('input[name*=password]'));
      await userName.sendKeys('admin');
      await password.sendKeys('123456');
      await browser.wait(EC.elementToBeClickable(loginButton));
      await loginButton.click();
      const titlePlaceholder = element(by.css('input[placeholder*=Title]'));
      await browser.wait(EC.elementToBeClickable(titlePlaceholder));
      expect('http://localhost:3000/').equals(await browser.getCurrentUrl());
    });

    it('should return the error if user does not exist', async function() {
      await browser.waitForAngularEnabled(false);
      await browser.get('http://localhost:3000/login');
      const loginButton = element(by.css('button.ui.primary.button'));
      const userName = element(by.css('input[name*=user]'));
      const password = element(by.css('input[name*=password]'));
      await userName.sendKeys('admi');
      await password.sendKeys('123456');
      await browser.wait(EC.elementToBeClickable(loginButton));
      await loginButton.click();
      await browser.sleep(1000);
      const errorMessage = element(by.css('div.ui.error.message > ul'));
      const expectedText = await errorMessage.getText();
      expect(expectedText).equals('User not found');
    });

    it('should check that creating new good is available', async function() {
      await browser.waitForAngularEnabled(false);
      await browser.get('http://localhost:3000/login');
      const loginButton = element(by.css('button.ui.primary.button'));
      const userName = element(by.css('input[name*=user]'));
      const password = element(by.css('input[name*=password]'));
      await userName.sendKeys('admin');
      await password.sendKeys('123456');
      await browser.wait(EC.elementToBeClickable(loginButton));
      await loginButton.click();
      const titlePlaceholder = element(by.css('input[placeholder*=Title]'));
      const description = element(by.css('input[placeholder*=Description]'));
      const price = element(by.css('input[placeholder*=Price]'));
      const author = element(by.css('input[placeholder*=Autor]'));
      const pageNumber = element(by.css('input[placeholder*=pageNumber]'));
      const publishYear = element(by.css('input[placeholder*=publishYear]'));
      await browser.wait(EC.elementToBeClickable(titlePlaceholder));
      await titlePlaceholder.sendKeys('Game of Thrones');
      await description.sendKeys('mama mila ramu');
      await price.sendKeys('12');
      await author.sendKeys('J.Martin');
      await pageNumber.sendKeys('1');
      await publishYear.sendKeys('1997');
      const createGood = element(by.css('button.ui.primary'));
      await createGood.click();
      const newGood = element(by.cssContainingText('div.content > a.header', 'Game of Thrones'));
      await browser.wait(EC.elementToBeClickable(newGood));
      await newGood.click();
      const newGoodTitle = element(by.css('div.header > h1'));
      await browser.wait(EC.elementToBeClickable(newGoodTitle));
      expect('Game of Thrones').equals(await newGoodTitle.getText());
    })

    it('should delete created good', async function() {
      await browser.waitForAngularEnabled(false);
      await browser.get('http://localhost:3000/login');
      const loginButton = element(by.css('button.ui.primary.button'));
      const userName = element(by.css('input[name*=user]'));
      const password = element(by.css('input[name*=password]'));
      await userName.sendKeys('admin');
      await password.sendKeys('123456');
      await browser.wait(EC.elementToBeClickable(loginButton));
      await loginButton.click();
      const titlePlaceholder = element(by.css('input[placeholder*=Title]'));
      await browser.wait(EC.elementToBeClickable(titlePlaceholder));
      const searchInput = element(by.css('div.Search > input[type*=text]'));
      await searchInput.sendKeys('Game of Thrones');
      const searchResult = element(by.cssContainingText('div.content > a.header', 'Game of Thrones'));
      await browser.wait(EC.elementToBeClickable(searchResult));
      expect('Game of Thrones').equals(await searchResult.getText());
    });

  });
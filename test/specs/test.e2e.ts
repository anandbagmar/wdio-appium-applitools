import {driver, browser} from '@wdio/globals'
import {Eyes, Target} from "@applitools/eyes-webdriverio";

describe('My Login application', () => {
    let eyes: Eyes;  // Declare Eyes instance
    it('should open the app and perform a simple test', async () => {
        console.log('Opening Eyes for visual testing...');
        eyes = await new Eyes();
        var applitoolsApiKey = process.env.APPLITOOLS_API_KEY || "NOT_SET"
        eyes.setApiKey(applitoolsApiKey);
        eyes.setServerUrl("https://eyesapi.applitools.com");
        const osName = driver.capabilities.platformName || driver.capabilities.platform;
        console.log(`Operating System: ${osName}`);
        await eyes.setAppName("Android Native WDIO App");
        await eyes.setTestName("Android Native WDIO Test");
        await eyes.setHostOS(osName);
        await eyes.setBranchName("main");
        await eyes.setIsDisabled(false);
        await eyes.setForceFullPageScreenshot(true);

        await console.log("Browser: " + browser);
        await console.log("Browser: " + JSON.stringify(browser));
        await eyes.open(browser, 'Android Native App', 'should open the app and perform a simple test');
        console.log('Eyes config: ' + eyes.getConfiguration());
        console.log('Server url: ' + eyes.getServerUrl());
        console.log('API key: ' + eyes.getApiKey());

        let loginTab = await browser.$("-android uiautomator:new UiSelector().text(\"Login\")");
        await eyes.check('launch', Target.window());
        await loginTab.click();
        await eyes.check('login', Target.window());
        await eyes.check('login button', Target.region(loginTab));

        const loginButton = await driver.$("-android uiautomator:new UiSelector().text(\"LOGIN\")");
        await loginButton.click();
        await eyes.check('login with no creds', Target.window());

        const webviewTab = await driver.$("-android uiautomator:new UiSelector().text(\"Webview\")");
        await webviewTab.click();

        const getStartedButton = await driver.$("-android uiautomator:new UiSelector().text(\"Get Started\")");
        await eyes.check('webview', Target.window());
        await getStartedButton.click();

        await eyes.check('Getting Started', Target.window());

        const swipeTab = await driver.$("-android uiautomator:new UiSelector().text(\"Swipe\")");
        await swipeTab.click();

        browser.pause(2000);

        await eyes.check('swipe', Target.window());

        console.log('Closing Eyes...');
        let testResults = await eyes.close(false);
        console.log(testResults);
    });
})


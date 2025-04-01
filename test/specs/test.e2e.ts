import {driver, browser} from '@wdio/globals'
import {Eyes, Target, FileLogHandler} from "@applitools/eyes-webdriverio";
const fs = require('fs');
const path = require('path');

// Function to generate the required folder structure
function createLogFilePath() {
    const now = new Date();

    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Ex: APR
    const year = now.getFullYear();
    const day = String(now.getDate()).padStart(2, '0');
    const monthNum = String(now.getMonth() + 1).padStart(2, '0');
    const date = `${day}-${monthNum}-${year}`;
    const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // Convert HH:MM:SS to HH-MM-SS

    // Create the folder structure inside the current directory
    const logDir = path.join(process.cwd(), 'reports', `${month}-${year}`, date, time);
    const logFile = path.join(logDir, 'eyes.log');

    // Ensure the directory exists
    fs.mkdirSync(logDir, { recursive: true });

    return logFile;
}

describe('My Login application', () => {
    let eyes: Eyes;  // Declare Eyes instance
    it('should open the app and perform a simple test', async () => {
        console.log('Opening Eyes for visual testing...');
        const logFilePath = await createLogFilePath();
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

        await eyes.setLogHandler(new FileLogHandler(true, logFilePath, false));

        // await eyes.setLogHandler(new FileLogHandler(true, 'applitools.log', true));

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
        await eyes.check('webview', Target.window().fully());
        await getStartedButton.click();

        await eyes.check('Getting Started', Target.window().fully());
        await eyes.check('Getting Started-systemscreenshot', Target.window().useSystemScreenshot());

        const swipeTab = await driver.$("-android uiautomator:new UiSelector().text(\"Swipe\")");
        await swipeTab.click();

        browser.pause(2000);

        await eyes.check('swipe', Target.window().fully());
        await eyes.check('swipe-systemscreenshot', Target.window().useSystemScreenshot());

        console.log('Closing Eyes...');
        let testResults = await eyes.close(false);
        console.log(testResults);
    });
})


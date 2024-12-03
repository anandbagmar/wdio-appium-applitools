import {driver} from '@wdio/globals'
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

        await eyes.open(driver, 'Android Native App', 'should open the app and perform a simple test');

        await driver.$("-android uiautomator:new UiSelector().text(\"Login\")").click();
        // await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(16)").click();

        console.log('Eyes config: ' + eyes.getConfiguration());
        console.log('Server url: ' + eyes.getServerUrl());
        console.log('API key: ' + eyes.getApiKey());

        // Perform a visual validation
        await eyes.check('login', Target.window().fully().withName("Login page"));

        console.log('Closing Eyes...');
        let testResults = await eyes.close(false);
        console.log(testResults);
    });
})


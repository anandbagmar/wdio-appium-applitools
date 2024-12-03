# wdio-appium-applitools

## Steps to run the test
1. In [test.e2e.ts](test/specs/test.e2e.ts), replace APPLITOOLS-API-KEY with the actual APPLITOOLS API KEY
2. Install the dependencies
```bash
    npm install
```
3. Start the Android emulator or connect a real device to your laptop. 
4. Update the capabilities based on the device you have [here](wdio.conf.ts)
5. Start appium server manually
```bash
    ./node_modules/.bin/appium
```
6. Run the test: 
```bash 
    npx wdio run wdio.conf.ts
```

const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch({ }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads messages in textarea', async () => {
        await page.goto('http://localhost:5500');
        await page.click('text=Refresh');
        // await page.screenshot({path: 'site.png'});     
        // await page.waitForSelector('textarea');

        let rowData = await page.$eval('textarea', rows => rows.value);

        expect(rowData).to.contains('Spami: Hello, are you there?');       
    });

    it.only('creates message', async () => {
        await page.goto('http://localhost:5500');
        // await page.screenshot({path: 'site.png'});     

        let testName = 'Test name';
        let testMessage = 'Test message';

        await page.fill('#author', testName);
        await page.fill('#content', testMessage);
        let [request, _] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Send')
        ])

        let data = JSON.parse(request.postData());

        expect(data.author).to.equal(testName);
        expect(data.content).to.equal(testMessage);       
    });    
});
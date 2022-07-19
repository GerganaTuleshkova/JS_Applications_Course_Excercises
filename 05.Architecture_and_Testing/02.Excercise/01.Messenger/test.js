const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


let browser, page; // Declare reusable variables

describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 1000 }); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads article titles', async () => {
        await page.goto('http://localhost:5500');
        await page.click('#refresh');
        await page.screenshot({path: 'site.png'});    
        
        await page.waitForSelector('#messages');

        const testMessages = await page.textContent('#messages');
        console.log(testMessages)

        expect(testMessages).to.contain('Spami: Hello, are you there?');
        // expect(content).to.contain('Open standard');
        // expect(content).to.contain('Unix');
        // expect(content).to.contain('ALGOL');
    });

    // it('loads article content when more is clicked', async () => {
    //     await page.goto('http://localhost:5500');
    //     await page.click('text=More');

    //     const visibleParagraph = await page.isVisible('.accordion p');

    //     expect(visibleParagraph).to.be.true;
    // });

    // it('hide article content when Less is clicked', async () => {
    //     await page.goto('http://localhost:5500');

    //     await page.click('text=More');
    //     await page.waitForSelector('.accordion p');

    //     let visibleParagraph = await page.isVisible('.accordion p');
    //     expect(visibleParagraph).to.be.true;

    //     await page.click('text=Less');
    //     notVisible = await page.isVisible('.accordion p');
    //     expect(notVisible).to.be.false;
    // });

    // it.only('fills input form', async () => {
    //     await page.goto('http://localhost:5500');
    //     await page.fill('[name="email"]', 'peter@abv.bg');       
    // });
});
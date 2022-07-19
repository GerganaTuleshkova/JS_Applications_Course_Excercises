const { chromium, request } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; // Declare reusable variables

const url = 'http://localhost:5500';
let mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
}


describe('E2E tests', async function () {
    this.timeout(5000);

    before(async () => { browser = await chromium.launch({}); });
    after(async () => { await browser.close(); });

    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });

    it('loads books', async function () {

        // moking the API service
        await page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                status: 200,
                header: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })
        })

        await page.goto(url);
        await page.click('text=Load all books');
        // await page.screenshot({path: 'site.png'});          

        await page.waitForSelector('text=Harry Potter');

        let rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('Nakov');



    });

    it('creates book', async function () {
        await page.goto(url);

        let testTitle = 'Test title';
        let testAuthor = 'Test author';

        await page.fill('input[name=title]', testTitle);
        await page.fill('input[name=author]', testAuthor);
        let [request, _] = await Promise.all([
            page.waitForRequest((request) => request.method() == 'POST'),
            page.click('text=Submit')
        ])

        let data = JSON.parse(request.postData());
        expect(data.title).to.equal(testTitle);
        expect(data.author).to.equal(testAuthor);
    });
});
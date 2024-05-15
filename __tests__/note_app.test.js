describe('Basic user flow for Website', () => {
    // First, visit the notes app website
    beforeAll(async () => {
        await page.goto("http://127.0.0.1:5500/index.html");
    });

    // Next check add new note
    it('Make sure clicking on add new note adds a new note', async() => {
        console.log("checking add new note button");
        const button = await page.$('button');
        await button.click();
        const note = await page.$('textarea');
        const exist = note != null;
        expect(exist).toBe(true);
    });

    // Next check edit new note and save
    it('Make sure new notes can be editted and saved', async() => {
        console.log("checking new note editing and saving");
        const note = await page.$('textarea');
        await page.click('textarea');
        await page.type('textarea', "Hi, I am typing some notes.");
        await note.press('Tab');
        const text = await page.$eval('textarea', note => {
            return note.value;
        });
        expect(text).toBe("Hi, I am typing some notes.");
    });

    // Next check adding to exisiting notes and save
    it('Make sure existing notes can be edited and saved', async() => {
        console.log("checking exisitng note editing and saving");
        const note = await page.$('textarea');
        await page.click('textarea');
        await page.type('textarea', " Typing more notes.");
        await note.press('Tab');
        const text = await page.$eval('textarea', note => {
            return note.value;
        });
        expect(text).toBe("Hi, I am typing some notes. Typing more notes.");
    })

    // Next check if notes are saved locally
    it("Make sure notes are saved after refreshing", async() => {
        console.log("reload the page and checks if notes are saved");
        await page.reload();
        const text = await page.$eval('textarea', note => {
            return note.value;
        });
        expect(text).toBe("Hi, I am typing some notes. Typing more notes.");
        const storage = await page.evaluate(() => {
            const str = window.localStorage.getItem("stickynotes-notes");
            return JSON.parse(str);
        });
        expect(storage[0]["content"]).toBe("Hi, I am typing some notes. Typing more notes.");
    });

    // Next check if notes can be deleted
    it("Make sure note is deleted after double clicking", async() => {
        console.log("double click the existing note and checks if it is deleted");
        const note = await page.$('textarea');
        await note.click({count: 2});
        expect(await page.$('textarea')).toBe(null);
        const storage = await page.evaluate(() => {
            return window.localStorage.getItem("stickynotes-notes");
        });
        expect(storage).toBe('[]');
    });
});
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

let executablePath = null;
for (const p of chromePaths) {
  if (fs.existsSync(p)) {
    executablePath = p;
    break;
  }
}

if (!executablePath) {
  console.error('Could not find system Chrome/Edge installation.');
  process.exit(1);
}

console.log('Using browser executable:', executablePath);

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ 
        executablePath, 
        headless: 'new', 
        defaultViewport: { width: 1440, height: 900 },
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    const screenshotDir = path.join(__dirname, '../screenshots/week-3-4');
    if (!fs.existsSync(screenshotDir)){
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const delay = ms => new Promise(res => setTimeout(res, ms));

    try {
        console.log("Navigating to Home/Login...");
        await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
        await delay(2000);
        await page.screenshot({ path: path.join(screenshotDir, '01-home.png') });
        await page.screenshot({ path: path.join(screenshotDir, '02-login.png') });
        console.log("Saved 01-home.png and 02-login.png");

        // Try to log in
        console.log("Logging in...");
        const emailInput = await page.$('input[type="email"]');
        const passInput = await page.$('input[type="password"]');
        if (emailInput && passInput) {
            await emailInput.type('testuser1@example.com');
            await passInput.type('password123');
            
            // Find the button and click it
            const loginBtn = await page.$('form button');
            if (loginBtn) {
                await loginBtn.click();
            } else {
                await page.keyboard.press('Enter');
            }
            
            await delay(3000); // Wait for login and navigation
        } else {
            console.log("Could not find login inputs.");
        }
        
        console.log("Navigating to Dashboard...");
        await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle0' });
        await delay(2000); // Give it time to load data
        
        console.log("Taking Dashboard screenshot...");
        await page.screenshot({ path: path.join(screenshotDir, '03-dashboard.png') });
        console.log("Saved 03-dashboard.png");

        // Open Create Project Modal
        console.log("Opening Project CRUD modal...");
        const createBtns = await page.$$('button');
        let createBtnClicked = false;
        for(let btn of createBtns){
            const text = await page.evaluate(el => el.textContent, btn);
            if(text.includes('New Project') || text.includes('Create Project')){
                await btn.click();
                createBtnClicked = true;
                break;
            }
        }

        if(createBtnClicked){
            await delay(1000); // Wait for modal animation
            console.log("Taking Project CRUD screenshot...");
            await page.screenshot({ path: path.join(screenshotDir, '04-project-crud.png') });
            console.log("Saved 04-project-crud.png");
            
            // close modal (click outside or escape)
            await page.keyboard.press('Escape');
            await delay(1000);
        } else {
            console.log("Could not find Create Project button.");
        }

        console.log("Testing search and filter...");
        const searchInput = await page.$('input[placeholder*="Search"]');
        if (searchInput) {
            await searchInput.type('Test');
            await delay(2000);
            await page.screenshot({ path: path.join(screenshotDir, '05-search-filter.png') });
            console.log("Saved 05-search-filter.png");
            
            // Clear search
            await page.evaluate(el => el.value = '', searchInput);
            await searchInput.type(' ');
            await page.keyboard.press('Backspace');
            await delay(2000);
        } else {
            console.log("No search input found.");
        }

        console.log("Taking Final Dashboard screenshot...");
        await page.screenshot({ path: path.join(screenshotDir, '06-final-dashboard.png') });
        console.log("Saved 06-final-dashboard.png");

    } catch (e) {
        console.error("Error during capture:", e);
    } finally {
        await browser.close();
        console.log("Done.");
    }
})();

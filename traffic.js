const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');

puppeteer.use(StealthPlugin());

// --- CONFIG ---
const DIRECT_LINK = "https://www.profitablecpmratenetwork.com/ps6gmuwz?key=2f7949a92a531f39ffa88eda7c062d01"; // Apnar link-ta eikhane boshan
const VISITS_PER_RUN = 5; 

async function runEngine() {
    for (let i = 0; i < VISITS_PER_RUN; i++) {
        console.log(`🚀 Starting Visit #${i + 1}`);

        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        try {
            const page = await browser.newPage();
            
            // Random User Agent rotation
            const agents = [
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
            ];
            await page.setUserAgent(agents[Math.floor(Math.random() * agents.length)]);

            // Referrer faking (Google search theke asche mone hobe)
            await page.setExtraHTTPHeaders({ 'Referer': 'https://www.google.com.bd/' });

            await page.goto(DIRECT_LINK, { waitUntil: 'networkidle2', timeout: 60000 });

            // Human Touch: Random Scrolling
            await page.evaluate(() => {
                window.scrollBy(0, 400);
            });

            console.log("✅ Impression Counted. Staying for 25 seconds...");
            await new Promise(r => setTimeout(r, 25000)); // Retention baranor jonno opekkhya

        } catch (e) {
            console.log("❌ Error occurred, skipping this session.");
        } finally {
            await browser.close();
        }
    }
}

runEngine();

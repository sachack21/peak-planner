// index.js
const TrekkingPackageScraper = require('./src/scrapers/TrekkingPackageScraper');
const sitesConfig = require('./src/config/sites');
const logger = require('./src/utils/logger');
require('./src/server');

async function main() {
    const scraper = new TrekkingPackageScraper();
    
    try {
        await scraper.initialize();
        logger.info('Starting scraping process...');
        
        const results = await scraper.scrapeAll(sitesConfig);
        await scraper.saveResults(results);
        
        logger.info('Scraping completed successfully!');
    } catch (error) {
        logger.error(`Scraping failed: ${error.message}`);
    } finally {
        await scraper.close();
    }
}

main();
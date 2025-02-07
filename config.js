// src/config/config.js
require('dotenv').config();

module.exports = {
    scraper: {
        headless: process.env.SCRAPER_HEADLESS === 'true',
        timeout: parseInt(process.env.SCRAPER_TIMEOUT) || 30000,
        delay: parseInt(process.env.SCRAPER_DELAY) || 2000,
    },
    output: {
        path: process.env.OUTPUT_PATH || './data',
        filename: process.env.OUTPUT_FILENAME || 'trekking-packages.json'
    }
};
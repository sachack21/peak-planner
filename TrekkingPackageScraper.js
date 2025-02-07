// src/scrapers/TrekkingPackageScraper.js
const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");
const config = require("../config/config");
const logger = require("../utils/logger");

class TrekkingPackageScraper {
  constructor() {
    this.browser = null;
  }

  async initialize() {
    logger.info("Initializing scraper...");
    this.browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
  }

  async close() {
    if (this.browser) {
      logger.info("Closing browser...");
      await this.browser.close();
    }
  }

  // async scrapePackage(siteConfig) {
  //     const page = await this.browser.newPage();
  //     try {
  //         // Set user agent
  //         await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');

  //         logger.info(`Scraping ${siteConfig.url}`);

  //         // Configure page
  //         await page.setDefaultNavigationTimeout(60000);

  //         // Navigate to page
  //         await page.goto(siteConfig.url, {
  //             waitUntil: 'networkidle0',
  //             timeout: 60000
  //         });

  //         // // Wait for title element to load instead of product-details-content
  //         // await page.waitForSelector('.titles', { timeout: 60000 });
  //         // await page.waitForSelector('.elementor-heading-title .elementor-size-defaults', { timeout: 60000 });

  //         try {
  //             await Promise.race([
  //                 page.waitForSelector('.titles h2', { timeout: 60000 }),
  //                 page.waitForSelector('.elementor-heading-title .elementor-size-defaults', { timeout: 60000 })
  //             ]);
  //             console.log("One of the selectors was found, proceeding with scraping.");
  //         } catch (error) {
  //             console.error("Neither selector was found within the timeout period.");
  //         }

  //         // Extract package data
  //         const packageData = await page.evaluate((selectors) => {
  //             const getData = (selector) => {
  //                 const element = document.querySelector(selector);
  //                 return element ? element.textContent.trim() : null;
  //             };

  //             return {
  //                 title: getData(selectors.title),
  //                 description: getData(selectors.description),
  //                 itinerary: getData(selectors.itinerary)
  //             };
  //         }, siteConfig.selectors); // Pass selectors from config

  //         // Log successful scrape
  //         logger.info(`Successfully scraped data for: ${packageData.title || 'Unknown Trek'}`);

  //         await page.close();

  //         return {
  //             site: siteConfig.name,
  //             url: siteConfig.url,
  //             status: 'success',
  //             data: packageData,
  //             scrapedAt: new Date().toISOString()
  //         };

  //     } catch (error) {
  //         logger.error(`Error scraping ${siteConfig.url}: ${error.message}`);
  //         // Take screenshot of failed page
  //         try {
  //             await page.screenshot({
  //                 path: `./data/error-screenshot-${Date.now()}.png`,
  //                 fullPage: true
  //             });
  //         } catch (screenshotError) {
  //             logger.error('Failed to take error screenshot');
  //         }
  //         await page.close();
  //         return {
  //             site: siteConfig.name,
  //             url: siteConfig.url,
  //             status: 'error',
  //             error: error.message,
  //             scrapedAt: new Date().toISOString()
  //         };
  //     }
  // }

  async scrapePackage(siteConfig) {
    const page = await this.browser.newPage();
    try {
      // Set user agent
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
      );

      logger.info(`Scraping ${siteConfig.url}`);

      // Configure page
      await page.setDefaultNavigationTimeout(60000);

      // Navigate to page
      await page.goto(siteConfig.url, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      // Use Promise.race to wait for either of the selectors to appear
      await Promise.race([
        page.waitForSelector(".titles h2", { timeout: 60000 }),
        page.waitForSelector(".BannerWIthCaption_bannerCaption__5ZPkg", {
          timeout: 60000,
        }),
      ]);

      console.log("One of the selectors was found, proceeding with scraping.");

      // Extract package data
      const packageData = await page.evaluate((selectors, siteName) => {
        const getData = (selector) => {
          const element = document.querySelector(selector);
          return element ? element.textContent.trim() : "N/A";
        };

        // // To ensure only the <h2> inside the titles div is selected
        // const titleElement = document.querySelector(selectors.title);
        // let title = null;

        // if (titleElement) {
        //   // If the element is a div, search for <h2> within it
        //   if (titleElement.tagName.toLowerCase() === "div") {
        //     const h2Element = titleElement.querySelector("h2");
        //     if (h2Element) {
        //       title = h2Element.textContent.trim();
        //     }
        //   } else {
        //     // Otherwise, just get the text content directly
        //     title = titleElement.textContent.trim();
        //   }
        // }

        const title = getData(selectors.title);
        console.log("Scraped Title:", title); // Add this log to verify title extraction.

        return {
          title: getData(selectors.title), // Scrape the title
          description: getData(selectors.description),
          itinerary: getData(selectors.itinerary),
          altitude: getData(selectors.altitude),
          duration: getData(selectors.duration),
          difficulty: getData(selectors.difficulty),
          bestTimeToVisit: getData(selectors.bestTimeToVisit),
          state: getData(selectors.state),
          siteName: siteName === "India Hikes" ? "India Hikes" : getData(selectors.siteName), // Manually entered for India Hikes
          dayAndNight: getData(selectors.dayAndNight), // Add day and night here
          price: getData(selectors.price), // Add price here
          rating: getData(selectors.rating), // Add rating here
          img_url: getData(selectors.img_url), // Add company's image/logo url here
          // seasonToVisit: getData(selectors.seasonToVisit), // Add season to visit here
        };
      }, siteConfig.selectors, siteConfig.name); // Pass selectors from config

      // Ensure some default values
      packageData.title = packageData.title || "No Title";
      packageData.description =
        packageData.description || "No description available";

      // Log successful scrape
      logger.info(
        `Successfully scraped data for: ${packageData.title || "Unknown Trek"}`
      );

      await page.close();

      return {
        site: siteConfig.name,
        url: siteConfig.url,
        status: "success",
        data: packageData,
        scrapedAt: new Date().toISOString(),
      };
    } catch (error) {
      logger.error(`Error scraping ${siteConfig.url}: ${error.message}`);
      // Take screenshot of failed page
      try {
        await page.screenshot({
          path: `./data/error-screenshot-${Date.now()}.png`,
          fullPage: true,
        });
      } catch (screenshotError) {
        logger.error("Failed to take error screenshot");
      }
      await page.close();
      return {
        site: siteConfig.name,
        url: siteConfig.url,
        status: "error",
        error: error.message,
        scrapedAt: new Date().toISOString(),
      };
    }
  }

  async scrapeAll(sitesConfig) {
    const results = [];

    for (const siteConfig of sitesConfig) {
      const result = await this.scrapePackage(siteConfig);
      results.push(result);
      await new Promise((resolve) => setTimeout(resolve, config.scraper.delay));
    }

    return results;
  }

  // async saveResults(results) {
  //   try {
  //     const outputPath = path.join(config.output.path, config.output.filename);
  //     await fs.mkdir(path.dirname(outputPath), { recursive: true });
  //     await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
  //     logger.info(`Results saved to ${outputPath}`);
  //   } catch (error) {
  //     logger.error(`Error saving results: ${error.message}`);
  //     throw error;
  //   }
  // }

  //   async saveResults(results) {
  //     try {
  //       const outputPath = path.join(config.output.path, config.output.filename);
  //       await fs.mkdir(path.dirname(outputPath), { recursive: true });
  //       await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
  //       logger.info(`Results saved to ${outputPath}`);
  //     } catch (error) {
  //       logger.error(`Error saving results: ${error.message}`);
  //       throw error;
  //     }
  //   }
  // }

  async saveResults(results) {
    try {
      // Recommended data directory
      const dataDir = path.join(__dirname, "..", "..", "data");

      // Create the data directory if it doesn't exist
      await fs.mkdir(dataDir, { recursive: true });

      // Full path to the JSON file
      const outputPath = path.join(dataDir, "trekking-packages.json");

      // Write results to the JSON file
      await fs.writeFile(outputPath, JSON.stringify(results, null, 2));

      console.log(`Results saved to ${outputPath}`);
      return outputPath;
    } catch (error) {
      console.error(`Error saving results: ${error.message}`);
      throw error;
    }
  }
}

module.exports = TrekkingPackageScraper;

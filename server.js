// COMBINED CODE OF THE ABOVE TWO CODE COMPONENTS -
// Required imports and initial configurations

require("dotenv").config();
console.log("API Key present:", !!process.env.GEMINI_API_KEY);
console.log("API Key length:", process.env.GEMINI_API_KEY?.length);

// const imageMapping = require('../src/articles/image_mapping.json');
const express = require("express");
// const readTrekNames = require('./utils/csvReader');
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const pool = require("./db");
const puppeteer = require("puppeteer"); // Add puppeteer
const sites = require("../src/config/sites");
const TrekkingPackageScraper = require("../src/scrapers/TrekkingPackageScraper");

console.log("Environment variables loaded from:", path.resolve(".env"));
console.log("Current working directory:", process.cwd());
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Debug logging for API key
console.log("API Key present:", !!process.env.GEMINI_API_KEY);
console.log("API Key length:", process.env.GEMINI_API_KEY?.length);

// Initialize Gemini API
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

// Add a test endpoint to verify API connection
app.get("/api/test-gemini", async (req, res) => {
  if (!genAI) {
    return res
      .status(500)
      .json({ success: false, error: "Gemini API Key not provided" });
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Test message");
    const response = await result.response;
    res.json({ success: true, message: response.text() });
  } catch (error) {
    console.error("Gemini API Test Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


//WORKING CODE ABOVE 4-12-24





// Serve static files
// app.use(
//   "/images",
//   express.static(path.join(__dirname, "src", "datas1", "articlesTrekImgs"))
// );




















app.post("/api/search-treks", async (req, res) => {
  console.log("Search request received:", req.body);
  const { trek, destination, daysRange, difficulty } = req.body;

  let query = "SELECT * FROM client_trek_descriptions WHERE 1=1";
  const values = [];

  // Add conditions based on the provided values
  if (trek) {
    query += ' AND "Trek Name" ILIKE $' + (values.length + 1);
    values.push(`%${trek.trim()}%`);
  }
  if (destination) {
    query += ' AND "State" ILIKE $' + (values.length + 1);
    values.push(`%${destination.trim()}%`);
  }
  if (daysRange) {
    query += ' AND "Days Range" ILIKE $' + (values.length + 1);
    values.push(`%${daysRange.trim()}%`);
  }
  if (difficulty) {
    query += ' AND "Difficulty Level" ILIKE $' + (values.length + 1);
    values.push(`%${difficulty.trim()}%`);
  }

  console.log("Constructed SQL Query:", query);
  console.log("Query Values:", values);

  try {
    const { rows } = await pool.query(query, values);
    console.log("Data fetched from PostgreSQL:", rows);
    res.json(rows);
  } catch (error) {
    console.error(
      "Error fetching search results from PostgreSQL:",
      error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

// Helper function to generate trek article content
// Helper function to generate trek article content
async function generateTrekArticle(query, existingTrekData = null) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // let prompt = `Generate a detailed trek article about ${query}. Return the response in JSON format without any markdown code blocks or backticks. Include the following fields:
    //       {
    //           "title": "Trek Title",
    //           "description": "Detailed description",
    //           "keyHighlights": ["highlight1", "highlight2"],
    //           "bestTimeToVisit": "season information",
    //           "difficultyLevel": "difficulty rating",
    //           "requiredFitness": "fitness requirements",
    //           "essentialGear": ["item1", "item2"]
    //       }`;
    let prompt = `Generate a detailed trek article about ${query}. Return the response in JSON format without any markdown code blocks or backticks. Include the following fields:
          {
              "title": "Trek Title",
          }`;

    if (existingTrekData) {
      prompt = `Enhance the following trek information and return in JSON format without any markdown or code blocks:
              Title: ${existingTrekData.title}
              Altitude: ${existingTrekData.altitude}
              Duration: ${existingTrekData.duration}
              Season: ${existingTrekData.season}
              
              Return the enhanced information in this exact JSON structure:
              {
                  "title": "${existingTrekData.title}",
                  "description": "Enhanced description",
                  "keyHighlights": ["highlight1", "highlight2"],
                  "bestTimeToVisit": "season information",
                  "difficultyLevel": "difficulty rating",
                  "requiredFitness": "fitness requirements",
                  "essentialGear": ["item1", "item2"]
              }`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response text
    text = text
      .replace(/```json\n?|```\n?/g, "") // Remove code block markers
      .replace(/^\s+|\s+$/g, "") // Trim whitespace
      .replace(/\n/g, " "); // Replace newline characters with space

    try {
      const parsedData = JSON.parse(text);
      // Ensure parsedData is not null before returning
      if (!parsedData) {
        throw new Error("Parsed data is null");
      }
      return parsedData;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.error("Cleaned text:", text);
      throw parseError; // Propagate the error
    }
  } catch (error) {
    console.error("Error generating trek article:", error);
    throw error;
  }
}

// Endpoint to fetch detailed trek information using Puppeteer
// app.get("/api/trek-details/:trekName", async (req, res) => {
//   const trekName = req.params.trekName.toLowerCase();
//   const matchingSites = sites.filter((site) =>
//     site.url.toLowerCase().includes(trekName)
//   );

//   if (matchingSites.length === 0) {
//     return res
//       .status(404)
//       .json({ error: "No matching sites found for the given trek" });
//   }

//   const results = [];
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     for (const site of matchingSites) {
//       const page = await browser.newPage();
//       await page.goto(site.url, { waitUntil: "domcontentloaded" });

//       // Scraping all the required data based on the updated selectors in sites.js
//       const title = await page
//         .$eval(site.selectors.title, (el) => el.textContent.trim())
//         .catch(() => null);
//       const description = await page
//         .$eval(site.selectors.description, (el) => el.textContent.trim())
//         .catch(() => null);
//       const itinerary = await page
//         .$eval(site.selectors.itinerary, (el) => el.textContent.trim())
//         .catch(() => null);
//       const altitude = await page
//         .$eval(site.selectors.altitude, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const duration = await page
//         .$eval(site.selectors.duration, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const difficulty = await page
//         .$eval(site.selectors.difficulty, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const bestTimeToVisit = await page
//         .$eval(site.selectors.bestTimeToVisit, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const state = await page
//         .$eval(site.selectors.state, (el) => el.textContent.trim())
//         .catch(() => "N/A");

//       results.push({
//         site: site.name,
//         title,
//         description,
//         itinerary,
//         altitude,
//         duration,
//         difficulty,
//         bestTimeToVisit,
//         state,
//         url: site.url,
//       });

//       await page.close();
//     }

//     await browser.close();
//     res.json(results);
//   } catch (error) {
//     console.error("Error scraping trek details:", error);
//     res
//       .status(500)
//       .json({ error: "Error fetching trek details", details: error.message });
//   }
// });

// WORKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
// app.get("/api/trek-details/:trekName", async (req, res) => {
//   // Normalizing the trekName to match the format used in sites
//   const trekName = req.params.trekName.toLowerCase().replace(/ /g, "-");
//   console.log(`Received trek name for scraping: ${trekName}`);

//   // Adjust the filtering logic to match the format used in `sites`
//   const matchingSites = sites.filter((site) =>
//     site.url.toLowerCase().includes(trekName)
//   );
//   console.log(`Matching sites found: ${matchingSites.length}`);

//   if (matchingSites.length === 0) {
//     return res
//       .status(404)
//       .json({ error: "No matching sites found for the given trek" });
//   }

//   const results = [];
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     for (const site of matchingSites) {
//       const page = await browser.newPage();
//       await page.goto(site.url, { waitUntil: "domcontentloaded" });

//       // Scraping all the required data based on the updated selectors in sites.js
//       // const title = await page.$eval(site.selectors.title, el => el.textContent.trim()).catch(() => null);
//       const title = await page
//         .$eval(site.selectors.title, (el) => el.textContent.trim())
//         .catch(() => null);
//       const description = await page
//         .$eval(site.selectors.description, (el) => el.textContent.trim())
//         .catch(() => null);
//       const itinerary = await page
//         .$eval(site.selectors.itinerary, (el) => el.textContent.trim())
//         .catch(() => null);
//       const altitude = await page
//         .$eval(site.selectors.altitude, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const duration = await page
//         .$eval(site.selectors.duration, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const difficulty = await page
//         .$eval(site.selectors.difficulty, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const bestTimeToVisit = await page
//         .$eval(site.selectors.bestTimeToVisit, (el) => el.textContent.trim())
//         .catch(() => "N/A");
//       const state = await page
//         .$eval(site.selectors.state, (el) => el.textContent.trim())
//         .catch(() => "N/A");

//       results.push({
//         site: site.name,
//         title,
//         description,
//         itinerary,
//         altitude,
//         duration,
//         difficulty,
//         bestTimeToVisit,
//         state,
//         url: site.url,
//       });

//       await page.close();
//     }

//     await browser.close();
//     res.json(results);
//   } catch (error) {
//     console.error("Error scraping trek details:", error);
//     res
//       .status(500)
//       .json({ error: "Error fetching trek details", details: error.message });
//   }
// });






// app.get("/api/trek-details/:trekName", async (req, res) => {
//   const trekName = req.params.trekName.toLowerCase().replace(/ /g, "-");
//   console.log(`Received trek name for scraping: ${trekName}`);

//   // Adjust the filtering logic to match the format used in `sites`
//   const matchingSites = sites.filter((site) =>
//     site.url.toLowerCase().includes(trekName)
//   );
//   console.log(`Matching sites found: ${matchingSites.length}`);

//   if (matchingSites.length === 0) {
//     return res
//       .status(404)
//       .json({ error: "No matching sites found for the given trek" });
//   }

//   const scraper = new TrekkingPackageScraper();

//   try {
//     // Initialize the browser
//     await scraper.initialize();

//     // Use the existing scrapeAll method
//     const results = await scraper.scrapeAll(matchingSites);

//     // Close the browser
//     await scraper.close();

//     res.json(results);
//   } catch (error) {
//     console.error("Error scraping trek details:", error);
//     res
//       .status(500)
//       .json({ error: "Error fetching trek details", details: error.message });
//   }
// });




app.get("/api/trek-details/:trekName", async (req, res) => {
  // Normalizing the trekName to match the format used in sites
  const trekName = req.params.trekName.toLowerCase().replace(/-/g, " ");
  console.log(`Received trek name for fetching details: ${trekName}`);

  try {
    const query = "SELECT * FROM trekking_packages WHERE LOWER(title) = $1";
    const { rows } = await pool.query(query, [trekName]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: "Trek not found" });
    }
  } catch (error) {
    console.error("Error fetching trek details from PostgreSQL:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});





// app.get("/api/seasonal-treks", async (req, res) => {

//   const { season } = req.query; // Get the season query parameter
//     let query = "SELECT * FROM client_trek_descriptions";
//     const values = [];

//     if (season) {
//         query += " WHERE LOWER(season) = LOWER($1)";
//         values.push(season);
//     }

//     try {
//         const { rows } = await pool.query(query, values); // Query the database
//         if (rows.length === 0) {
//             return res.status(404).json({ error: "No treks found for this season" });
//         }
//         res.json(rows); // Send the query results as the response
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }

// });


app.get("/api/seasonal-treks", async (req, res) => {
  const { season } = req.query; // Get the season query parameter
  let query = "SELECT * FROM client_trek_descriptions";
  const values = [];

  // Use "Best time to visit" column for filtering
  if (season) {
      query += ` WHERE LOWER("Best time to visit") LIKE $1`;
      values.push(`%${season.toLowerCase()}%`); // Match partial season names
  }

  try {
      const { rows } = await pool.query(query, values); // Query the database
      if (rows.length === 0) {
          return res.status(404).json({ error: "No treks found for this season" });
      }
      res.json(rows); // Send the query results as the response
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});




//LAST WORKING FEATURED TREKS API

app.get("/api/featured-treks", async (req, res) => {
  try {
    // Fetch all trek data from the `client_trek_descriptions` table
    const query = "SELECT * FROM client_trek_descriptions";
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: "No featured treks found" });
    }

    // Send the fetched rows as a JSON response
    res.json(rows);
  } catch (error) {
    console.error("Error fetching featured treks:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});



// app.get("/api/featured-treks", async (req, res) => {
//   try {
//     // Fetch all trek data from the `client_trek_descriptions` table
//     const query = "SELECT * FROM client_trek_descriptions";
//     const { rows } = await pool.query(query);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "No featured treks found" });
//     }

//     // Map the image paths to the trek data
//     const treksWithImages = rows.map(trek => {
//       const trekName = trek["Trek Name"]; // Assuming this is how the trek name is stored in your database
//       // const imagePath = imageMapping[trekName] || null; // Get the image path or null if not found
      
//       return {
//         ...trek,
//         imagePath: imagePath
//       };
//     });

//     // Send the enhanced data with image paths
//     res.json(treksWithImages);
//   } catch (error) {
//     console.error("Error fetching featured treks:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Also add a new endpoint to serve the images statically
// app.use("/trek-images", express.static(path.join(__dirname, "src", "datas1", "articlesTrekImgs")));



// app.get("/api/featured-treks", async (req, res) => {
//   try {
//       // Fetch all trek data from the `client_trek_descriptions` table
//       const query = "SELECT * FROM client_trek_descriptions";
//       const { rows } = await pool.query(query);
      
//       // Ensure the data is returned with the expected structure
//       const formattedData = rows.map((row) => ({
//           trekName: row["Trek Name"],
//           description: row.Description,
//           altitude: row.Altitude,
//           duration: row.Duration,
//           bestTimeToVisit: row["Best time to visit"],
//           state: row.State,
//           imagePath: row.image_path, // Use image_path instead of image_url
//       }));

//       res.json(formattedData);
//   } catch (error) {
//       console.error("Error fetching featured treks:", error.message);
//       res.status(500).json({ error: "Failed to fetch featured treks" });
//   }
// });

// const fetchFeaturedArticles = async () => {
//   try {
//       const response = await fetch("http://localhost:5000/api/featured-treks");
//       if (!response.ok) {
//           throw new Error("Failed to fetch featured articles");
//       }
//       const data = await response.json();
//       console.log("Fetched Featured Articles:", data);
//       setFeaturedArticles(data);
//   } catch (error) {
//       console.error("Error fetching featured articles:", error);
//       setError("Failed to load featured articles");
//   }
// };






// app.get("/api/featured-treks", async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         "Trek Name" AS title,
//         "Altitude" AS altitude,
//         "Duration" AS duration,
//         "Image URL" AS image_url,
//         "Best time to visit" AS season,
//         "Itinerary Link" AS itinerary_link,
//         "Description" AS description
//       FROM client_trek_descriptions
//     `;
//     const { rows } = await pool.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error("Error fetching featured treks:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });








//LAST WORKING API 2-12-24 3AM
// Existing endpoints for trek data
app.get("/api/trekking-packages", async (req, res) => {
  const { season } = req.query;
  let query = "SELECT * FROM trekking_packages";
  const values = [];

  if (season) {
    query += " WHERE season = $1";
    values.push(season);
  }

  try {
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get('/api/trekking-packages', async (req, res) => {
//   const season = req.query.season.toLowerCase();

//   let query = 'SELECT * FROM client_trek_descriptions WHERE 1=1';
//   const values = [];

//   if (season) {
//     if (season === 'all-seasons') {
//       query += ' AND LOWER("Best time to visit") LIKE $' + (values.length + 1);
//       values.push('%all season%');
//     } else {
//       query += ' AND LOWER("Best time to visit") LIKE $' + (values.length + 1);
//       values.push(`%${season}%`);
//     }
//   }

//   try {
//     const { rows } = await pool.query(query, values);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching trekking packages:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/api/trekking-packages', async (req, res) => {
//   try {
//     const season = req.query.season ? req.query.season.toLowerCase() : null;

//     let query = 'SELECT * FROM client_trek_descriptions WHERE 1=1';
//     const values = [];

//     // If season is provided, add it to the query
//     if (season) {
//       if (season === 'all-seasons') {
//         query += ' AND LOWER("Best time to visit") LIKE $' + (values.length + 1);
//         values.push('%all season%');
//       } else {
//         query += ' AND LOWER("Best time to visit") LIKE $' + (values.length + 1);
//         values.push(`%${season}%`);
//       }
//     }

//     // Add logic to randomly select 3 or 4 treks
//     query += ' ORDER BY RANDOM() LIMIT 4';

//     const { rows } = await pool.query(query, values);
//     console.log('Fetched trekking packages:', rows);
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching trekking packages:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Endpoint for Gemini-enhanced trek articles
app.post("/api/trek-articles", async (req, res) => {
  if (!genAI) {
    return res.status(500).json({ error: "Gemini API Key not provided" });
  }
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const article = await generateTrekArticle(query);
    article.imageURL = `https://source.unsplash.com/1600x900/?trek,${encodeURIComponent(
      query
    )}`;

    res.json(article);
  } catch (error) {
    console.error("Error generating article:", error);
    res
      .status(500)
      .json({ error: "Error generating article", details: error.message });
  }
});






// Function to run scraper and save results
async function runScraperAndSaveData() {
  try {
    const scraper = new TrekkingPackageScraper();
    
    // Initialize the browser
    await scraper.initialize();
    
    // Scrape all sites
    const results = await scraper.scrapeAll(sites);
    
    // Save results to JSON file
    await scraper.saveResults(results);
    
    // Close the browser
    await scraper.close();
    
    console.log("Scraping completed and results saved.");
    return results;
  } catch (error) {
    console.error("Error in scraper process:", error);
    throw error;
  }
}


// Insert data function
// const insertScrapedData = () => {
//   const filePath = path.join(__dirname, "..", "data", "trekking-packages.json");

//    // Check if file exists before reading
//    if (!fs.existsSync(filePath)) {
//     console.log(`Scraped data file not found at ${filePath}. Skipping data insertion.`);
//     return;
//   }


//   fs.readFile(filePath, "utf8", async (err, data) => {
//     if (err) {
//       console.error("Error reading JSON file:", err);
//       return;
//     }

//     try {
//       const trekkingPackages = JSON.parse(data);

//       for (const trek of trekkingPackages) {
//         const { site, url, status, data: trekData } = trek;

//         if (status !== "success" || !trekData || !trekData.title) {
//           console.warn(
//             `Skipping entry due to missing or invalid title: ${url}`
//           );
//           continue;
//         }

//         // const title = trekData.title.trim();
//         const description = trekData.description
//           ? trekData.description.trim()
//           : "No description available";
//         const itinerary = trekData.itinerary
//           ? trekData.itinerary.trim()
//           : "No itinerary available";
//         const altitude = trekData.altitude || "N/A";
//         const duration = trekData.duration || "N/A";
//         const imageURL = "https://via.placeholder.com/200";
//         const season = trekData.season || "unknown";
//         const itineraryLink = url;

//         const title = trekData.title ? trekData.title.trim() : "No Title";

//         await pool.query(
//           `INSERT INTO trekking_packages (title, description, altitude, duration, image_url, season, itinerary_link) 
//            VALUES ($1, $2, $3, $4, $5, $6, $7)
//            ON CONFLICT (title) DO NOTHING`,
//           [
//             title,
//             description,
//             altitude,
//             duration,
//             imageURL,
//             season,
//             itineraryLink,
//           ]
//         );
//       }
//       console.log("Data successfully inserted into PostgreSQL");
//     } catch (error) {
//       console.error("Error inserting data into PostgreSQL:", error);
//     }
//   });
// };

// // Insert data when the server starts
// insertScrapedData();







// Modify insertScrapedData to use the new scraper workflow
const insertScrapedData = async () => {
  const filePath = path.join(__dirname, "..", "data", "trekking-packages.json");

  try {
    // First, ensure the scraper has run and created the file
    await runScraperAndSaveData();

    // Read the JSON file
    const data = await fs.promises.readFile(filePath, "utf8");
    const trekkingPackages = JSON.parse(data);

    for (const trek of trekkingPackages) {
      const { site, url, status, data: trekData } = trek;

      if (status !== "success" || !trekData || !trekData.title) {
        console.warn(`Skipping entry due to missing or invalid title: ${url}`);
        continue;
      }

      const description = trekData.description
        ? trekData.description.trim()
        : "No description available";
      const itinerary = trekData.itinerary
        ? trekData.itinerary.trim()
        : "No itinerary available";
      const altitude = trekData.altitude || "N/A";
      const duration = trekData.duration || "N/A";
      const siteName = trekData.siteName || "Unknown Site";
      const seasonToVisit = trekData.seasonToVisit || "N/A";
      const dayAndNight = trekData.dayAndNight || "N/AAA";
      const price = trekData.price || "No Money Got";
      const rating = trekData.rating || "No Rating";
      const img_url = trekData.img_url || "N/A";
      const season = trekData.season || "unknown";
      const itineraryLink = url;

      const title = trekData.title ? trekData.title.trim() : "No Title";

      // await pool.query(
      //   `INSERT INTO trekking_packages (title, description, altitude, duration, image_url, season, itinerary_link, site_name, day_and_night, price, rating) 
      //    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      //    ON CONFLICT (title) DO NOTHING`,
      //   [
      //     title,
      //     description,
      //     altitude,
      //     duration,
      //     img_url,
      //     season,
      //     itineraryLink,
      //     siteName,
      //     dayAndNight,
      //     price,
      //     rating,
      //   ]
      // );
 
      await pool.query(
        `INSERT INTO trekking_packages (
           title, description, altitude, duration, image_url, season, itinerary_link, site_name, day_and_night, price, rating
         ) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (title, site_name) DO NOTHING`,
        [
          title,
          description,
          altitude,
          duration,
          img_url,
          season,
          itineraryLink,
          siteName,
          dayAndNight,
          price,
          rating,
        ]
      );
      
      console.log(`Inserting trek: ${title} from ${siteName}`);
      
 
    }
    console.log("Data successfully inserted into PostgreSQL");
  } catch (error) {
    console.error("Error in insertScrapedData:", error);
  }
};

// Modify how you call insertScrapedData
insertScrapedData().then(() => {
  console.log("Scraping and data insertion process completed.");
});














// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

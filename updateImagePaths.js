// const { Pool } = require("pg");
// const fs = require("fs");

// // PostgreSQL connection configuration
// const pool = new Pool({
//     user: 'postgres',          // Replace with your PostgreSQL user
//     host: 'localhost',             // Replace if your database is on a different server
//     database: 'trekking_db',       // Replace with your database name
//     password: '@ShwathS@xena26',  // Replace with your database password
//     port: 5432                     // Default PostgreSQL port
// });

// async function updateImagePaths() {
//   try {
//     // Read the JSON mapping file
//     const data = JSON.parse(fs.readFileSync("articles","image_mapping.json", "utf8"));

//     for (const { "Trek Name": trekName, "Image Path": imagePath } of data) {
//       // Update the table with image paths
//       const query = `
//         UPDATE client_trek_descriptions
//         SET image_path = $1
//         WHERE "Trek Name" = $2
//       `;
//       await pool.query(query, [imagePath, trekName]);
//       console.log(`Updated image path for: ${trekName}`);
//     }

//     console.log("All image paths updated successfully!");
//   } catch (error) {
//     console.error("Error updating image paths:", error);
//   } finally {
//     pool.end();
//   }
// }

// updateImagePaths();

const fs = require("fs");
const path = require("path"); // Ensure this line is present to import 'path' module
const { Pool } = require("pg");

// Create a pool instance to connect to the database
const pool = new Pool({
  user: "postgres", // Replace with your PostgreSQL user
  host: "localhost", // Replace if your database is on a different server
  database: "trekking_db", // Replace with your database name
  password: "@ShwathS@xena26", // Replace with your database password
  port: 5432, // Default PostgreSQL port
});

async function updateImagePaths() {
  try {
    const imageMappingPath = path.join(__dirname, "articles", "image_mapping.json");

    // Ensure the file is read with 'utf-8' encoding
    const imageMappingRaw = fs.readFileSync(imageMappingPath, "utf-8");
    const imageMapping = JSON.parse(imageMappingRaw);

    for (const [trekName, imagePath] of Object.entries(imageMapping)) {
      const query = `
        UPDATE client_trek_descriptions
        SET image_path = $1
        WHERE "Trek Name" = $2
      `;
      const values = [imagePath, trekName];

      const result = await pool.query(query, values);
      console.log(
        `Updated ${result.rowCount} row(s) for trek: ${trekName} with image path: ${imagePath}`
      );
    }

    console.log("Image paths updated successfully!");
  } catch (error) {
    console.error("Error updating image paths:", error);
  } finally {
    // Close the pool connection
    await pool.end();
  }
}

updateImagePaths();

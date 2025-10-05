import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageUrls = {
  products: [
    "https://source.unsplash.com/random/800x1000/?sports,tshirt",
    "https://source.unsplash.com/random/800x1000/?gym,tshirt",
    "https://source.unsplash.com/random/800x1000/?running,tshirt",
    "https://source.unsplash.com/random/800x1000/?fitness,tshirt",
  ],
  hero: [
    "https://source.unsplash.com/random/1920x1080/?gym,fitness",
    "https://source.unsplash.com/random/1920x1080/?running,track",
  ],
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const writeStream = fs.createWriteStream(filepath);
          response.pipe(writeStream);

          writeStream.on("finish", () => {
            writeStream.close();
            console.log(`Downloaded: ${filepath}`);
            resolve();
          });
        } else {
          response.resume();
          reject(new Error(`Request Failed: ${response.statusCode}`));
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function downloadAllImages() {
  // Navigate up two levels from 'scripts' to the project root
  const publicDir = path.join(__dirname, "..", "public");
  const productsDir = path.join(publicDir, "images", "products");
  const placeholdersDir = path.join(publicDir, "images", "placeholders");

  // Create directories if they don't exist
  [productsDir, placeholdersDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log("Downloading images to:");
  console.log("Products directory:", productsDir);
  console.log("Placeholders directory:", placeholdersDir);

  // Download product images
  const productPromises = imageUrls.products.map((url, index) => {
    const filepath = path.join(productsDir, `sport-tshirt-${index + 1}.jpg`);
    console.log(`Starting download: sport-tshirt-${index + 1}.jpg`);
    return downloadImage(url, filepath);
  });

  // Download hero images
  const heroPromises = imageUrls.hero.map((url, index) => {
    const name = index === 0 ? "hero-gym.jpg" : "hero-running.jpg";
    const filepath = path.join(placeholdersDir, name);
    console.log(`Starting download: ${name}`);
    return downloadImage(url, filepath);
  });

  try {
    await Promise.all([...productPromises, ...heroPromises]);
    console.log("All images downloaded successfully!");
  } catch (error) {
    console.error("Error downloading images:", error);
    process.exit(1);
  }
}

// Run the download
downloadAllImages();

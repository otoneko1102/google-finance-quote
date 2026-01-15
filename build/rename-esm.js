const fs = require("fs");
const path = require("path");

const dir = path.resolve(__dirname, "..", "dist", "esm");

try {
  if (!fs.existsSync(dir)) {
    console.warn("No ESM output directory found, skipping rename.");
    process.exit(0);
  }
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (file.endsWith(".js")) {
      const oldPath = path.join(dir, file);
      const newPath = path.join(dir, file.replace(/\.js$/, ".mjs"));
      fs.renameSync(oldPath, newPath);
    }
  });
  console.log("Renamed ESM .js files to .mjs in dist/esm");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "dist", "index.d.ts");
const destRoot = path.join(root, "index.d.ts");

try {
  if (!fs.existsSync(src))
    throw new Error(`Declaration file not found: ${src}`);
  // Copy compiled root declaration to project root for packages/tools that expect index.d.ts at repo root
  fs.copyFileSync(src, destRoot);
  console.log("Copied types to index.d.ts");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

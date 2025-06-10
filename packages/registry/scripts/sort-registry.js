const fs = require("fs");
const path = require("path");

const registryPath = path.resolve(__dirname, "../registry.json");

try {
  const registryData = JSON.parse(fs.readFileSync(registryPath, "utf-8"));

  if (Array.isArray(registryData.items)) {
    registryData.items.sort((a, b) => a.name.localeCompare(b.name));

    fs.writeFileSync(registryPath, JSON.stringify(registryData, null, 2), "utf-8");
    console.log("Registry sorted successfully by name.");
  } else {
    console.error("Invalid registry format: 'items' is not an array.");
  }
} catch (error) {
  console.error("Error reading or writing registry file:", error);
}

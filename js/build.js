const fs = require("fs");
const path = require("path");

const ROOT = "./files";

function scan(dir) {
  const items = fs.readdirSync(dir).sort();

  return items.map(name => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      return {
        type: "folder",
        name,
        children: scan(full)
      };
    } else {
      return {
        type: "file",
        name,
        path: full.replace(/\\/g, "/")
      };
    }
  });
}

const data = scan(ROOT);

fs.writeFileSync(
  "index.json",
  JSON.stringify(data, null, 2),
  "utf-8"
);

console.log("index.json generated");
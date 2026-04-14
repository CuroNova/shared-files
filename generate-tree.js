const fs = require("fs");
const path = require("path");

const outputDir = "./data";
const outputFile = path.join(outputDir, "tree.json");

function scan(dir) {
  const entries = fs.readdirSync(dir);

  return entries.map(name => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      return {
        name,
        type: "folder",
        children: scan(full)
      };
    }

    return {
      name,
      type: "file",
      path: full.replace(process.cwd(), "")
    };
  });
}

fs.mkdirSync(outputDir, { recursive: true });

const tree = {
  name: "files",
  type: "folder",
  children: scan("./files")
};

fs.writeFileSync(outputFile, JSON.stringify(tree, null, 2));
const fs = require("fs");
const path = require("path");

function scan(dir) {
  const items = fs.readdirSync(dir);

  return items.map(name => {
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
      type: "file"
    };
  });
}

const tree = scan("./files");

fs.writeFileSync(
  "./files-tree.json",
  JSON.stringify(tree, null, 2)
);
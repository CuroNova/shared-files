const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const outputDir = path.join(ROOT, "data");
const outputFile = path.join(outputDir, "tree.json");
const filesDir = path.join(ROOT, "files");

/* 1. output 폴더 생성 */
fs.mkdirSync(outputDir, { recursive: true });

/* 2. files 존재 체크 (중요) */
if (!fs.existsSync(filesDir)) {
  console.error("❌ files 폴더가 존재하지 않습니다:", filesDir);
  process.exit(1);
}

/* 3. 안전한 scan */
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
      path: full.replace(ROOT, "")
    };
  });
}

/* 4. 트리 생성 */
const tree = {
  name: "files",
  type: "folder",
  children: scan(filesDir)
};

/* 5. 저장 */
fs.writeFileSync(outputFile, JSON.stringify(tree, null, 2));

console.log("✅ tree.json 생성 완료");
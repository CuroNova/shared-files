const fs = require("fs");
const path = require("path");

/* 출력 경로 */
const outputDir = "./data";
const outputFile = path.join(outputDir, "tree.json");

/* 1. 폴더 자동 생성 (핵심) */
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/* 2. 파일 트리 스캔 함수 */
function scan(dir) {
  const entries = fs.readdirSync(dir);

  return entries.map(name => {
    const fullPath = path.join(dir, name);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      return {
        name,
        type: "folder",
        children: scan(fullPath)
      };
    }

    return {
      name,
      type: "file",
      path: fullPath.replace(process.cwd(), "")
    };
  });
}

/* 3. 루트 트리 구조 */
const tree = {
  name: "files",
  type: "folder",
  children: scan("./files")
};

/* 4. JSON 저장 */
fs.writeFileSync(
  outputFile,
  JSON.stringify(tree, null, 2),
  "utf-8"
);

console.log("Tree generated successfully:", outputFile);
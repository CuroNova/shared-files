import { initAuth } from "./auth.js";
import { renderFolder } from "./ui.js";
import { setupSearch } from "./search.js";

async function load() {
  const container = document.getElementById("content");
  await renderFolder("files", container);
  setupSearch();
}

// 초기화
initAuth(load);

// 버튼 연결
window.checkPassword = () => {
  import("./auth.js").then(mod => mod.checkPassword(load));
};
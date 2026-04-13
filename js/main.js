import { initAuth } from "./auth.js";
import { render } from "./ui.js";
import { setupSearch } from "./search.js";

async function load() {
  const res = await fetch("./index.json");
  const data = await res.json();

  const container = document.getElementById("content");

  render(data, container);
  setupSearch();
}

// 로그인 초기화
initAuth(load);

// 버튼 연결
window.checkPassword = () => {
  import("./auth.js").then(mod => mod.checkPassword(load));
};
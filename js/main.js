import { renderFolder } from "./ui.js";
import { setupSearch } from "./search.js";
import { initAuth } from "./auth.js";

async function load() {
  const container = document.getElementById("content");

  const res = await fetch("./index.json");
  const data = await res.json();

  await renderFolder(data, container);
  setupSearch();
}

initAuth(load);

window.checkPassword = () => {
  import("./auth.js").then(mod => mod.checkPassword(load));
};
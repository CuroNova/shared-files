import { allFiles } from "./ui.js";

export function setupSearch() {
  const input = document.getElementById("search");

  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();

    allFiles.forEach(file => {
      file.element.style.display =
        file.name.includes(keyword) ? "block" : "none";
    });
  });
}
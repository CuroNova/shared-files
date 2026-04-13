import { allFiles } from "./ui.js";

export function setupSearch() {
  const input = document.getElementById("search");

  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();

    if (!keyword) {
      allFiles.forEach(f => f.element.style.display = "block");
      return;
    }

    allFiles.forEach(f => {
      f.element.style.display =
        f.name.includes(keyword) ? "block" : "none";
    });
  });
}
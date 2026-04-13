import { allFiles } from "./ui.js";

export function setupSearch() {
  const input = document.getElementById("search");

  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();

    // ⭐ 핵심: 빈 검색어면 전체 표시
    if (!keyword) {
      allFiles.forEach(file => {
        file.element.style.display = "block";
      });
      return;
    }

    // 검색 필터
    allFiles.forEach(file => {
      file.element.style.display =
        file.name.includes(keyword) ? "block" : "none";
    });
  });

  // ⭐ 초기 상태 보정 (핵심)
  allFiles.forEach(file => {
    file.element.style.display = "block";
  });
}
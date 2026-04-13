import { fetchFiles } from "./api.js";

export let allFiles = [];

export async function renderFolder(path, container) {
  const items = await fetchFiles(path);

  const folders = items.filter(i => i.type === "dir");
  const files = items.filter(i => i.type === "file");

  folders.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => a.name.localeCompare(b.name));

  for (const item of folders) {
    const folder = document.createElement("div");
    folder.className = "folder";
    folder.textContent = "📂 " + item.name;

    const children = document.createElement("div");
    children.className = "children";

    folder.onclick = () => {
      const open = children.style.display === "block";
      children.style.display = open ? "none" : "block";
      folder.classList.toggle("open");
    };

    container.append(folder, children);

    await renderFolder(item.path, children);
  }

  for (const item of files) {
    const div = document.createElement("div");
    div.className = "file";

    const link = document.createElement("a");
    link.href = item.download_url;
    link.textContent = "📄 " + item.name;

    div.appendChild(link);

    // ⭐ 선택 강조 기능 추가
    div.onclick = () => {
      document.querySelectorAll(".file").forEach(f => {
        f.classList.remove("selected");
      });

      div.classList.add("selected");
    };

    container.appendChild(div);

    allFiles.push({
      name: item.name.toLowerCase(),
      element: div
    });
  }
}
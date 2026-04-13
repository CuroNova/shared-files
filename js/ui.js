import { allFiles } from "./search.js";

export async function renderFolder(data, container) {
  for (const item of data) {

    if (item.type === "folder") {
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

      await renderFolder(item.children, children);
    }

    if (item.type === "file") {
      const div = document.createElement("div");
      div.className = "file";

      const link = document.createElement("a");
      link.href = item.path.replace("files/", "");
      link.textContent = "📄 " + item.name;

      div.appendChild(link);
      container.appendChild(div);

      allFiles.push({
        name: item.name.toLowerCase(),
        element: div
      });
    }
  }
}
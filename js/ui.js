export let allFiles = [];

export function render(items, container) {
  for (const item of items) {
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

      render(item.children, children);
    } else {
      const div = document.createElement("div");
      div.className = "file";

      const a = document.createElement("a");
      a.href = item.path;
      a.textContent = "📄 " + item.name;

      div.appendChild(a);

      // 선택 강조
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
}
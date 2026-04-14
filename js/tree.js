function createNode(node, container) {
  const el = document.createElement("div");

  if (node.type === "folder") {
    const folder = document.createElement("div");
    folder.textContent = "📁 " + node.name;

    const children = document.createElement("div");
    children.style.paddingLeft = "15px";
    children.style.display = "none";

    folder.onclick = () => {
      children.style.display =
        children.style.display === "none" ? "block" : "none";
    };

    el.appendChild(folder);

    node.children?.forEach(child => {
      createNode(child, children);
    });

    el.appendChild(children);
  } else {
    const file = document.createElement("div");
    file.textContent = "📄 " + node.name;

    el.appendChild(file);
  }

  container.appendChild(el);
}
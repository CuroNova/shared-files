function createNode(node, container) {
  const wrapper = document.createElement("div");

  if (node.type === "folder") {
    const folder = document.createElement("div");
    folder.className = "folder";
    folder.textContent = "📁 " + node.name;

    const children = document.createElement("div");
    children.className = "children hidden";

    folder.onclick = () => {
      children.classList.toggle("hidden");
    };

    wrapper.appendChild(folder);

    if (node.children) {
      node.children.forEach(child => {
        createNode(child, children);
      });
    }

    wrapper.appendChild(children);
  }

  else {
    const file = document.createElement("div");
    file.className = "file";
    file.textContent = "📄 " + node.name;
    file.dataset.path = node.path;

    wrapper.appendChild(file);
  }

  container.appendChild(wrapper);
}
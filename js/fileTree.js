async function loadTree() {
  const res = await fetch("files-tree.json");
  const tree = await res.json();

  const container = document.getElementById("file-tree");
  container.innerHTML = renderTree(tree, "");
}

function renderTree(node, path) {
  let html = "";

  node.forEach(item => {
    if (item.type === "folder") {
      html += `<div class="folder">📁 ${item.name}</div>`;
      html += `<div class="folder-children">${renderTree(item.children, path + item.name)}</div>`;
    } else {
      html += `<div class="file">📄 ${item.name}</div>`;
    }
  });

  return html;
}

loadTree();
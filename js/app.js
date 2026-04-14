let treeData = null;

const sidebar = document.getElementById("sidebar");
const fileView = document.getElementById("fileView");

document.getElementById("connectBtn").onclick = async () => {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("explorer").classList.remove("hidden");

  const res = await fetch("data/tree.json");
  treeData = await res.json();

  sidebar.innerHTML = "";
  createNode(treeData, sidebar);
};

document.getElementById("logo").onclick = () => {
  document.body.classList.toggle("light");
};

document.getElementById("homeBtn").onclick = () => {
  document.getElementById("welcomeScreen").style.display = "flex";
  document.getElementById("explorer").classList.add("hidden");
};

/* 검색 */
document.getElementById("searchInput").addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (!value) {
    fileView.innerHTML = "";
    sidebar.innerHTML = "";
    createNode(treeData, sidebar);
    return;
  }

  const results = searchTree(treeData, value);

  sidebar.innerHTML = "";
  fileView.innerHTML = "";

  results.forEach(f => {
    const div = document.createElement("div");
    div.className = "highlight";
    div.textContent = f.path;
    fileView.appendChild(div);
  });
});
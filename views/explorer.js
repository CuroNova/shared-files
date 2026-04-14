function renderExplorer(treeData) {
  const app = document.getElementById("app");

  const wrap = document.createElement("div");

  wrap.innerHTML = `
    <header>
      <button id="homeBtn">처음으로</button>
      <input id="searchInput" placeholder="파일 검색..." />
      <a href="https://github.com/CuroNova" target="_blank">by CuroNova</a>
    </header>

    <div style="display:flex;">
      <aside id="sidebar" style="width:260px;"></aside>
      <main id="fileView"></main>
    </div>
  `;

  app.appendChild(wrap);

  document.getElementById("homeBtn").onclick = () => {
    setPage("welcome");
  };

  const sidebar = document.getElementById("sidebar");

  createNode(treeData, sidebar);
}
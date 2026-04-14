function renderWelcome() {
  const app = document.getElementById("app");

  const wrap = document.createElement("div");

  wrap.style.textAlign = "center";
  wrap.style.marginTop = "120px";

  wrap.innerHTML = `
    <img src="images/logo.png" style="width:120px"/>
    <h1>환영합니다</h1>
    <button id="connectBtn">Connect</button>
  `;

  wrap.querySelector("#connectBtn").onclick = async () => {
    await loadTree();
    setPage("explorer");
  };

  app.appendChild(wrap);
}
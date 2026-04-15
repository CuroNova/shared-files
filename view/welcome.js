export function renderWelcome(root, navigate) {
  root.innerHTML = `
    <div class="container" style="text-align:center;margin-top:20vh;">
      <h1>LOGO</h1>
      <button id="connect">Connect</button>
    </div>
  `;

  document.getElementById("connect").onclick = () => {
    navigate("main");
  };
}
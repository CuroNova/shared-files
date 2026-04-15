export function toast(msg) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    padding: 10px 14px;
    color: #fff;
    border-radius: 6px;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
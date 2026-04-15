export function toast(msg) {
    const div = document.createElement("div");
    div.innerText = msg;
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#222";
    div.style.padding = "10px";
    div.style.borderRadius = "6px";
    document.body.appendChild(div);

    setTimeout(() => div.remove(), 1500);
}
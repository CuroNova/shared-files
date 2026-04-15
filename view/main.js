import { loadTree } from "../model/tree.js";
import { search } from "../service/search.js";
import { toast } from "../js/toast.js";

let cache = null;

export async function renderMain(root) {
  if (!cache) cache = await loadTree();

  root.innerHTML = `
    <header>
      <img id="profile" src="/shared-files/images/profile.png" width="28"/>
      <div id="github">by CuroNova</div>
    </header>

    <div class="container">
      <input id="search" placeholder="search"/>
      <div id="list"></div>
    </div>

    <footer>
      <div>Home | About | CC BY 4.0</div>
    </footer>
  `;

  document.getElementById("github").onclick =
    () => window.open("https://github.com/CuroNova");

  document.getElementById("profile").onclick =
    () => {
      navigator.clipboard.writeText(location.href);
      toast("복사 성공");
    };

  const input = document.getElementById("search");
  const list = document.getElementById("list");

  const top8 = [...cache.index]
    .sort((a, b) => a.name.localeCompare(b.name, "en"))
    .slice(0, 8);

  function render(items) {
    list.innerHTML = items.map(i =>
      `<div class="item">${i.name}</div>`
    ).join("");
  }

  render(top8);

  input.addEventListener("input", (e) => {
    const q = e.target.value;
    if (!q) return render(top8);
    render(search(cache, q));
  });
}
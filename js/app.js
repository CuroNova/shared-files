let state = {
  tree: null
};

const app = document.getElementById("app");

function setPage(page) {
  app.innerHTML = "";

  if (page === "welcome") {
    renderWelcome();
  }

  if (page === "explorer") {
    renderExplorer(state.tree);
  }
}

async function loadTree() {
  const res = await fetch("data/tree.json");
  state.tree = await res.json();
}

setPage("welcome");
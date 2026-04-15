import { renderWelcome } from "../view/welcome.js";
import { renderMain } from "../view/main.js";

const app = document.getElementById("app");

function getView() {
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");

  if (redirect) {
    history.replaceState({ view: "main" }, "", "/shared-files/#main");
    return "main";
  }

  return history.state?.view || "welcome";
}

function route() {
  const view = getView();

  if (view === "main") renderMain(app);
  else renderWelcome(app, navigate);
}

function navigate(view) {
  history.pushState({ view }, "", `/shared-files/#${view}`);
  route();
}

window.addEventListener("popstate", route);
window.addEventListener("resize", route);

route();
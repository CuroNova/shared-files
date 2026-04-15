import TreeModel from "../model/treeModel.js";
import WelcomeView from "../view/welcome.js";
import MainView from "../view/main.js";
import FooterView from "../view/footer.js";

class AppController {
    constructor() {
        this.model = new TreeModel();
        this.app = document.getElementById("app");
        this.footer = document.getElementById("footer");

        this.init();
    }

    init() {
        window.onpopstate = () => this.renderWelcome();
        this.renderWelcome();

        document.getElementById("profileBtn").onclick = () => {
            navigator.clipboard.writeText(location.origin + location.pathname);
            alert("복사 성공");
        };
    }

    renderWelcome() {
        this.app.innerHTML = WelcomeView.render();
        this.footer.innerHTML = FooterView.render();

        WelcomeView.bind(() => this.renderMain());
    }

    async renderMain() {
        history.pushState(null, null, location.pathname);

        const data = await this.model.load();
        this.drawMain(data);

        this.footer.innerHTML = FooterView.render();
    }

    drawMain(data, keyword = "") {
        this.app.innerHTML = MainView.render(data, keyword);

        MainView.bind((kw) => {
            this.drawMain(data, kw);
        });
    }
}

new AppController();
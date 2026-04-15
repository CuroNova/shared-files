// 위치: controller/RouteController.js
// 루트로 나간 뒤 view 폴더로 진입
import WelcomeView from '../view/welcome.js';
import MainView from '../view/main.js';

export default class RouteController {
    constructor() {
        this.container = document.getElementById('router-view');
    }

    init() {
        this.renderWelcome();
    }

    renderWelcome() {
        const welcome = new WelcomeView(() => this.renderMain());
        this.container.innerHTML = welcome.render();
        const btn = document.getElementById('connect-btn');
        if (btn) btn.onclick = () => this.renderMain();
        history.pushState(null, null, null);
    }

    async renderMain() {
        const main = new MainView();
        try {
            this.container.innerHTML = await main.render();
            main.bindEvents();
            history.pushState(null, null, null);
        } catch (e) {
            console.error("Main 로드 실패", e);
        }
    }
}
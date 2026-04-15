import WelcomeView from '../view/welcome.js';
import MainView from '../view/main.js';

export default class RouteController {
    constructor() {
        this.container = document.getElementById('router-view');
    }

    init() {
        this.renderWelcome();
        document.getElementById('profile-img').addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.origin + window.location.pathname);
            this.showToast("복사 성공");
        });
    }

    renderWelcome() {
        const welcome = new WelcomeView(() => this.renderMain());
        this.container.innerHTML = '';
        this.container.appendChild(welcome.getElement());
        history.pushState(null, null, null);
    }

    renderMain() {
        const main = new MainView();
        this.container.style.opacity = '0';
        setTimeout(() => {
            this.container.innerHTML = '';
            this.container.appendChild(main.getElement());
            this.container.style.opacity = '1';
            history.pushState(null, null, null);
        }, 300);
    }

    showToast(msg) {
        const toast = document.getElementById('toast-container');
        toast.innerText = msg;
        toast.className = 'show';
        setTimeout(() => toast.className = '', 2000);
    }
}
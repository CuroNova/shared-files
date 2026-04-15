import WelcomeView from '../view/welcome.js';
import MainView from '../view/main.js';

export default class RouteController {
    constructor() {
        this.container = document.getElementById('router-view');
    }

    init() {
        this.renderWelcome();
        // 프로필 클릭 이벤트
        document.getElementById('profile-img').addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.origin + window.location.pathname);
            this.showToast("복사 성공");
        });
    }

    renderWelcome() {
        const welcome = new WelcomeView(() => this.renderMain());
        this.container.innerHTML = welcome.render();
        // 버튼 이벤트 바인딩
        const btn = document.getElementById('connect-btn');
        if(btn) btn.onclick = () => this.renderMain();
        history.pushState(null, null, null);
    }

    async renderMain() {
        const main = new MainView();
        this.container.style.opacity = '0.5'; // 페이드 효과 시작
        try {
            this.container.innerHTML = await main.render();
            main.bindEvents(); // 이벤트 바인딩 별도 실행
            this.container.style.opacity = '1';
            history.pushState(null, null, null);
        } catch (e) {
            console.error("데이터 로딩 실패:", e);
            this.container.innerHTML = "<p>데이터를 불러오지 못했습니다. (json/tree.json 확인 필요)</p>";
        }
    }

    showToast(msg) {
        const toast = document.getElementById('toast-container');
        toast.innerText = msg;
        toast.className = 'show';
        setTimeout(() => toast.className = '', 2000);
    }
}
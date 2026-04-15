import RouteController from './controller/RouteController.js';
import FooterView from './view/footer.js';

// DOM이 완전히 로드된 후 실행
window.addEventListener('load', () => {
    const controller = new RouteController();
    controller.init();
    new FooterView().render();
});
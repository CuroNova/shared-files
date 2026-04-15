// 위치: js/app.js
import RouteController from '../controller/RouteController.js';
import FooterView from '../view/footer.js';

window.addEventListener('DOMContentLoaded', () => {
    const controller = new RouteController();
    controller.init();
    
    new FooterView().render();
});
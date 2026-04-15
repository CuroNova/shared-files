import RouteController from './controller/RouteController.js';
import FooterView from './view/footer.js';

const controller = new RouteController();
controller.init();
new FooterView().render();
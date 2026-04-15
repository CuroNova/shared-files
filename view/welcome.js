export default class WelcomeView {
    constructor(onConnect) {
        this.onConnect = onConnect;
        this.el = document.createElement('div');
        this.el.className = 'welcome-page';
    }

    getElement() {
        this.el.innerHTML = `
            <div class="welcome-content">
                <img src="images/logo.png" class="main-logo">
                <button id="connect-btn">Connect</button>
            </div>
        `;
        this.el.querySelector('#connect-btn').onclick = this.onConnect;
        return this.el;
    }
}
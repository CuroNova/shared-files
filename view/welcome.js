export default class WelcomeView {
    static render() {
        return `
            <div class="welcome">
                <img src="../images/logo.png" width="120"/>
                <button id="connectBtn">Connect</button>
            </div>
        `;
    }

    static bind(onConnect) {
        document.getElementById("connectBtn").onclick = () => {
            document.body.style.opacity = "0";
            setTimeout(onConnect, 300);
        };
    }
}
export default class FooterView {
    render() {
        const footer = document.getElementById('footer-container');
        footer.innerHTML = `
            <div class="footer-links">
                <span>Home</span> | <span>About</span>
            </div>
            <p>© CuroNova. <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>
        `;
    }
}
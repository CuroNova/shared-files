import FileModel from '../model/FileModel.js';
import FileService from '../service/FileService.js';

export default class MainView {
    constructor() {
        this.model = new FileModel();
        this.el = document.createElement('div');
    }

    getElement() {
        this.render();
        return this.el;
    }

    async render() {
        await this.model.fetchData();
        this.el.innerHTML = `
            <div class="search-wrap">
                <input type="text" id="search-input" placeholder="Search Files..." autocomplete="off">
            </div>
            <div id="list-container"></div>
        `;
        const input = this.el.querySelector('#search-input');
        input.oninput = (e) => this.handleSearch(e.target.value);
        this.displayItems(this.model.getInitialFolders());
    }

    handleSearch(q) {
        if (!q) return this.displayItems(this.model.getInitialFolders());
        const filtered = this.model.index.filter(i => i.name.toLowerCase().includes(q.toLowerCase()));
        this.displayItems(filtered, q);
    }

    displayItems(items, highlight = "") {
        const container = this.el.querySelector('#list-container');
        container.innerHTML = items.map(item => `
            <div class="item">
                <span>${this.highlight(item.name, highlight)}</span>
                ${!item.isFolder ? `<a href="${FileService.encode(item.path)}" download>📥</a>` : '📁'}
            </div>
        `).join('');
    }

    highlight(text, q) {
        if (!q) return text;
        return text.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
    }
}
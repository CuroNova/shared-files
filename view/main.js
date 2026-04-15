import FileService from '../service/FileService.js';

export default class MainView {
    constructor() {
        this.allData = [];
    }

    async render() {
        // 경로를 현재 위치 기준으로 명확히 설정
        const response = await fetch('json/tree.json');
        const data = await response.json();
        this.allData = data.index || [];

        return `
            <div class="search-wrap">
                <input type="text" id="search-input" placeholder="파일명 검색..." autocomplete="off">
            </div>
            <div id="list-container">${this.generateList(this.getInitialFolders())}</div>
        `;
    }

    getInitialFolders() {
        // 초기 8개 항목 추출
        return this.allData.slice(0, 8);
    }

    generateList(items, query = "") {
        if (items.length === 0) return "<p>검색 결과가 없습니다.</p>";
        return items.map(item => `
            <div class="item">
                <span>${this.highlight(item.name, query)}</span>
                <a href="${FileService.encode(item.path)}" download class="dl-icon">📥</a>
            </div>
        `).join('');
    }

    highlight(text, q) {
        if (!q) return text;
        const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 정규식 에러 방지
        return text.replace(new RegExp(`(${escapedQ})`, 'gi'), '<mark>$1</mark>');
    }

    bindEvents() {
        const input = document.getElementById('search-input');
        const container = document.getElementById('list-container');
        if (!input) return;

        input.oninput = (e) => {
            const q = e.target.value.toLowerCase();
            if (!q) {
                container.innerHTML = this.generateList(this.getInitialFolders());
                return;
            }
            const filtered = this.allData.filter(i => i.name.toLowerCase().includes(q));
            container.innerHTML = this.generateList(filtered, q);
        };
    }
}
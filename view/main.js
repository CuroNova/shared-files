// 위치: view/main.js
// 루트로 나간 뒤 service 폴더로 진입
import FileService from '../service/FileService.js';

export default class MainView {
    async render() {
        // fetch는 브라우저 주소창 기준이므로 json/tree.json 그대로 사용
        const res = await fetch('json/tree.json');
        const data = await res.json();
        this.allData = data.index || [];

        return `
            <div class="search-box">
                <input type="text" id="search-input" placeholder="Search Files...">
            </div>
            <div id="list-container">${this.generateList(this.allData.slice(0, 8))}</div>
        `;
    }

    generateList(items, q = "") {
        return items.map(item => `
            <div class="item">
                <span>${item.name}</span>
                <a href="${FileService.encode(item.path)}" download>📥</a>
            </div>
        `).join('');
    }

    bindEvents() {
        const input = document.getElementById('search-input');
        if (input) {
            input.oninput = (e) => {
                const q = e.target.value.toLowerCase();
                const filtered = this.allData.filter(i => i.name.toLowerCase().includes(q));
                document.getElementById('list-container').innerHTML = this.generateList(filtered, q);
            };
        }
    }
}
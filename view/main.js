import SearchService from "../service/searchService.js";

export default class MainView {
    static render(data, keyword = "") {
        const list = SearchService.search(data.index, keyword);

        const items = list.map(item => {
            const name = SearchService.highlight(item.name, keyword);

            if (item.type === "file") {
                return `
                    <div class="file">
                        <span>${name}</span>
                        <a href="./sharedfiles/${SearchService.encodePath(item.path)}" download>📥</a>
                    </div>
                `;
            }

            return `
                <div class="folder">
                    <span>${name}</span>
                </div>
            `;
        }).join("");

        return `
            <input class="search" id="searchBar" placeholder="Search..."/>
            <div id="list">${items}</div>
        `;
    }

    static bind(onSearch) {
        const input = document.getElementById("searchBar");
        input.addEventListener("input", (e) => {
            onSearch(e.target.value);
        });
    }
}
export default class SearchService {
    static normalize(str) {
        return str.toLowerCase();
    }

    static score(item, keyword) {
        const k = this.normalize(keyword);
        if (item.name.toLowerCase().includes(k)) return 3;
        if (item.path.toLowerCase().includes(k)) return 2;
        if ((item.keywords || "").toLowerCase().includes(k)) return 1;
        return 0;
    }

    static search(list, keyword) {
        if (!keyword) return list;

        return list
            .map(item => ({
                ...item,
                score: this.score(item, keyword)
            }))
            .filter(i => i.score > 0)
            .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.path.localeCompare(b.path);
            });
    }

    static highlight(text, keyword) {
        if (!keyword) return text;
        const re = new RegExp(`(${keyword})`, "gi");
        return text.replace(re, "<mark>$1</mark>");
    }

    static encodePath(path) {
        return encodeURIComponent(path);
    }
}
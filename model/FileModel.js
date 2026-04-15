export default class FileModel {
    constructor() {
        this.data = null;
        this.index = [];
    }

    async fetchData() {
        if (this.data) return;
        const res = await fetch('./json/tree.json');
        this.data = await res.json();
        this.index = this.data.index || [];
    }

    getInitialFolders(limit = 8) {
        // 중복 제거된 최상위 폴더 추출 및 정렬
        const folders = [...new Set(this.index.map(item => item.path.split('/')[1]))]
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b, 'en', { caseFirst: 'upper' }));
        return folders.slice(0, limit).map(name => ({ name, isFolder: true, path: `sharedfiles/${name}` }));
    }
}
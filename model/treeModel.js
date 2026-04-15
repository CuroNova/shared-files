export default class TreeModel {
    constructor() {
        this.data = null;
    }

    async load() {
        if (this.data) return this.data;
        const res = await fetch("./json/tree.json");
        this.data = await res.json();
        return this.data;
    }

    getIndex() {
        return this.data?.index || [];
    }

    getTree() {
        return this.data?.tree || {};
    }
}
export class Page {
    constructor(params) {
        this.params = params || Date.now().toString()
    }

    getRoot() {
        throw new Error('Method getRoot should be defined')
    }

    afterRender() {}

    destroy() {}
}

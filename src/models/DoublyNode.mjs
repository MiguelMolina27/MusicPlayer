export class Node {
    #data
    #next
    #prev

    constructor(data){
        this.#data = data
        this.#next = undefined
        this.#prev = undefined
    }
    getData () {
        return this.#data
    }
}
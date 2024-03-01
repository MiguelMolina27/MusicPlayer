import { Node } from "./DoublyNode.mjs"
import { defaultEquals } from "./util.js"

export class LinkedList {
    #count
    #head
    #equalsFn
    #tail

    constructor(equalsFn = defaultEquals){
        this.#count = 0
        this.#head = undefined
        this.#equalsFn = equalsFn
    }

    push(item) {
        const node = new Node(item)
        let current
        if (this.#head == null) {
            this.#head = node
        } else {
            if(this.#count > 1)
                this.#tail.next = null
            current = this.#head
            while (current.next != null)
                current = current.next
            current.next = node
            node.prev = current
            node.next = this.#head
            this.#tail = node
        }
        this.#head.prev = this.#tail
        this.#count++
    }

    getElementAt(index) {
        if (index>=0 && index<this.#count) {
            let node = this.#head
            for (let i=0;i<index && node != null; i++)
                node = node.next
            return node
        }
        return undefined
    }
    isEmpty(){
        return this.size() === 0
    }
    size(){
        return this.#count
    }

    removeAt(index) {
        if (index >= 0 && index < this.#count) { 
            let current = this.#head; 
        
            if (index === 0) { 
                this.#head = current.next
                this.#tail.next = this.#head
                this.#head.prev = this.#tail
            } else {
                let previous;
                let next 
                for (let i = 0; i < index; i++) { 
                    current = current.next
                }
                next = current.next
                previous = current.prev
                next.prev = previous
                previous.next = next

            }
            this.#count--; 
            return current.getData();
        }
        return undefined; 
    }

    insert(element, index) {
        if (index >= 0 && index <= this.#count) { 
            const node = new Node(element);
            if (index === 0) { 
                const current = this.#head;
                node.next = current; 
                current.prev = node
                this.#head = node;
            } else {
                const previous = this.getElementAt(index - 1); 
                const current = previous.next; 
                node.next = current; 
                current.prev = node
                node.prev = previous
                previous.next = node;
                if(index == this.#count){
                    this.#tail = node
                } 
            }
            this.#count++; 
            return true;
        }
        return false; 
    }

    

    indexOf(element) {
        let current = this.#head; 
        for (let i = 0; i < this.#count && current != null; i++) { 
            if (this.#equalsFn(element, current.getData())) { 
                return i;
            }
            current = current.next; 
        }
        return -1;
    }

    

    toString() {
        if (this.#head == null) { 
            return '';
        }
        let objString = `${this.#head.getData()}`; 
        let current = this.#head.next; 
        for (let i = 1; i < this.size() && current != null; i++) { 
            objString = `${objString},${current.getData()}`;
            current = current.next;
        }
        return objString; 
    }

    remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }


}
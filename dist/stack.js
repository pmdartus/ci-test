"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    get size() {
        return this.head ?
            this.head.size :
            0;
    }
    push(value) {
        const next = this.head;
        this.head = {
            value,
            next,
            size: next ? next.size + 1 : 1
        };
    }
    peek() {
        return this.head ?
            this.head.value :
            undefined;
    }
    pop() {
        if (this.head) {
            const { value, next } = this.head;
            this.head = next;
            return value;
        }
    }
    clear() {
        this.head = undefined;
    }
}
exports.default = Stack;

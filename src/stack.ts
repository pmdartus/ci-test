interface StackItem<u> {
    value: u;
    size: number;
    next: StackItem<u> | undefined;
}

export default class Stack<u> {
    head: StackItem<u> | undefined;

    get size(): number {
        return this.head ?
            this.head.size :
            0;
    }

    push(value: u): void {
        const next = this.head;
        this.head = {
            value,
            next,
            size: next ? next.size + 1 : 1 
        };
    }

    peek(): u | undefined {
        return this.head ? 
            this.head.value : 
            undefined;
    }

    pop(): u | undefined {
        if (this.head) {
            const { value, next } = this.head;
            
            this.head = next;
            return value;
        }
    }

    clear(): void {
        this.head = undefined;
    }
}
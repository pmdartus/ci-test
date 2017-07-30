type TagChild = Node | string;

function tag(name: string): Element;
function tag(name: string, children: TagChild[]): Element;
function tag(name: string, props: any, children: TagChild[]): Element;
function tag(name: string): Element {
    let props: any = {};
    let children: TagChild[] = [];

    if (arguments.length === 2) {
        children = arguments[1];
    } else if (arguments.length === 3) {
        props = arguments[1];
        children = arguments[2];
    }

    const elm = document.createElement(name);
    for (let child of children) {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        elm.appendChild(child);
    }

    for (let attr in props) {
        if (attr === 'style') {
            for (let key in props.style) {
                (elm.style as any)[key] = props.style[key];
            }
        } else {
            (elm as any)[attr] = props[attr];
        }
    }

    return elm;
}

interface TagFactory {
    (): Element;
    (children: TagChild[]): Element;
    (props: object, children?: TagChild[]): Element;
} 

type TagCache = { [name: string]: TagFactory };

export default new Proxy<TagCache>({}, {
    get(target, key) {
        if (typeof key !== 'string') {
            throw new TypeError(`Unexpected type of key ${typeof key}`);
        }

        if (key in target) {
            return target[key];
        }

        const ret: TagFactory = (...args: any[]) => (
            tag(key, ...args)
        );
        target[key] = ret;

        return ret;
    },

    set() {
        return false;
    },

    has(_, key) {
        return typeof key === 'string';
    }
})
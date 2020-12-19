import {tailwind} from "@/components/tailwind.classes";

export interface CssClassData {
    rules: string;
    className: string;
}

export function tokens(classes: CssClassData[]): { [token: string]: CssClassData[] } {
    const tokens: { [token: string]: CssClassData[] } = {}
    for (const tc of classes) {
        const {className} = tc
        const classTokens = className.split("-").filter(t => t.length > 0)
        for (const token of classTokens) {
            tokens[token] = tokens[token] || []
            tokens[token].push(tc)
        }
    }
    return tokens
}

export function classesMap() {
    const classes: { [className: string]: CssClassData } = {}
    for (const tc of tailwind.all) {
        const {className} = tc
        classes[className] = tc
    }

    return {tokens: tokens(tailwind.all), classes}
}

export function tokensTree(classes: CssClassData[]): { token: string; children: string[]; tree: any } {
    const root: { token: string; children: string[]; tree: any } = {
        token: "",
        children: [],
        tree: {}
    }
    for (const tc of classes) {
        const {className} = tc
        const classTokens = className.split("-").filter(t => t.length > 0)
        let node = root
        for (let i = 0; i < classTokens.length; i++) {
            const token = classTokens[i]
            node.tree[token] = node.tree[token] || {
                token,
                children: [],
                tree: {}
            }
            if (node.children.indexOf(token) < 0)
                node.children.push(token)
            node = node.tree[token]
            if (i == classTokens.length - 1)
                node.tree = tc
        }
    }
    return root
}


const levenshtein = (function () {
    function _min(d0: number, d1: number, d2: number, bx: any, ay: any) {
        return d0 < d1 || d2 < d1
            ? d0 > d2
                ? d2 + 1
                : d0 + 1
            : bx === ay
                ? d1
                : d1 + 1;
    }

    return function (a: string, b: string) {
        if (a === b) {
            return 0;
        }

        if (a.length > b.length) {
            const tmp = a;
            a = b;
            b = tmp;
        }

        let la = a.length;
        let lb = b.length;

        while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
            la--;
            lb--;
        }

        let offset = 0;

        while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
            offset++;
        }

        la -= offset;
        lb -= offset;

        if (la === 0 || lb < 3) {
            return lb;
        }

        let x = 0;
        let y;
        let d0;
        let d1;
        let d2;
        let d3;
        let dd;
        let dy;
        let ay;
        let bx0;
        let bx1;
        let bx2;
        let bx3;

        const vector: number[] = [];

        for (y = 0; y < la; y++) {
            vector.push(y + 1);
            vector.push(a.charCodeAt(offset + y));
        }

        const len = vector.length - 1;

        for (; x < lb - 3;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            bx1 = b.charCodeAt(offset + (d1 = x + 1));
            bx2 = b.charCodeAt(offset + (d2 = x + 2));
            bx3 = b.charCodeAt(offset + (d3 = x + 3));
            dd = (x += 4);
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                ay = vector[y + 1];
                d0 = _min(dy, d0, d1, bx0, ay);
                d1 = _min(d0, d1, d2, bx1, ay);
                d2 = _min(d1, d2, d3, bx2, ay);
                dd = _min(d2, d3, dd, bx3, ay);
                vector[y] = dd;
                d3 = d2;
                d2 = d1;
                d1 = d0;
                d0 = dy;
            }
        }

        for (; x < lb;) {
            bx0 = b.charCodeAt(offset + (d0 = x));
            dd = ++x;
            for (y = 0; y < len; y += 2) {
                dy = vector[y];
                vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
                d0 = dy;
            }
        }

        return dd;
    };
})();

export function closest(className: string): CssClassData[] {
    let all = tailwind.all.filter(c => c.className.startsWith(className))
    if(all.length == 0)
        all = tailwind.all
    const classes = all.map(c => ({...c, distance: levenshtein(className, c.className) ?? -1}))
    return classes.filter(c => c.distance != -1).sort((c1, c2) => {
        return c1.distance - c2.distance
    }).slice(0, 10)
}

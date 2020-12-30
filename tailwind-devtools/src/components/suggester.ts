import {closest, computeRules, CssClassData, tokensTree} from "@/components/tailwind-classes-parser";
import {tailwind} from "@/components/tailwind.classes";

export class Suggester {
    node: { token: string; children: string[]; tree: any; parent? } = tokensTree([...tailwind.all])

    suggest(className: string, classNameUpToCaret: string) {
        const prefix = this.prefix(className);

        className = this.removePrefix(className, prefix)
        classNameUpToCaret = this.removePrefix(classNameUpToCaret, prefix)


        if (classNameUpToCaret == '')
            classNameUpToCaret = className

        const emptyClassName = className == ''

        let suggested
        if (emptyClassName) {
            suggested = this.baseClasses()
        } else {
            const relevantToKnownCollection = this.classesForTokenUnderCaretMatchingKnownCollection(className, classNameUpToCaret)
            if (relevantToKnownCollection.length > 0) {
                suggested = relevantToKnownCollection
            } else {
                if ((className == classNameUpToCaret) && this.nodeExists(className)) {
                    suggested = this.nodeClasses(this.nodeFor(className).node).slice(0, 20)
                } else {
                    const startingWithClassUpToCaret = this.startingWith(classNameUpToCaret)
                    if (startingWithClassUpToCaret.length > 0) {
                        suggested = startingWithClassUpToCaret.slice(0, 20)
                    } else {
                        suggested = closest(className)
                    }
                }
            }
        }
        return this.mapToTwClasses(suggested, prefix)
    }

    protected removePrefix(c: string, prefix: string) {
        return prefix.length > 0 ? c.replace(prefix + ":", '') : c;
    }

    private startingWith(className: string) {
        return tailwind.all.filter(c => c.className.startsWith(className)).map(c => ({...c}))
    }

    private classesForTokenUnderCaretMatchingKnownCollection(className: string, classNameUpToCaret: string) {
        let relevantClasses: CssClassData[] = []
        const {tokens, currentTokenIndex, currentToken} = this.currentToken(classNameUpToCaret, className);
        const lcr = ["left", "center", "right"]
        const nsizes = ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "px", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12"]
        const csizes = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        const lsizes = ["xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]
        const colors = ["black", "white", "gray", "red", "yellow", "green", "blue", "indigo", "purple", "pink"]
        const relevantToCollection = collection => {
            const prefix = tokens.slice(0, currentTokenIndex).join("-")
            const postfix = tokens.slice(currentTokenIndex + 1).join("-")
            const found = collection.map(c => prefix + '-' + c + (['transparent', 'current'].indexOf(c) < 0 && postfix ? '-' + postfix : ''))
            return tailwind.all.filter(c => {
                return found.indexOf(c.className) >= 0
            }).map(c => ({...c}))
        }
        const fillRelevant = collection => {
            const found = relevantToCollection(collection)
            const foundIndex = found.findIndex((c: CssClassData) => c.className == className)
            relevantClasses = this.windowed(found, foundIndex)
        }
        const classWithColorInTheMIddle = colors.indexOf(currentToken) >= 0 && currentTokenIndex < tokens.length - 1
        if (classWithColorInTheMIddle) {
            fillRelevant(colors)
        } else {
            [lcr, lsizes, csizes, nsizes].forEach(collection => {
                if (collection.indexOf(currentToken) >= 0) {
                    fillRelevant(collection)
                }
            })

        }

        return relevantClasses

    }

    private currentToken(classNameUpToCaret: string, className: string) {
        const {tokens, currentTokenIndex} = this.tokens(className, classNameUpToCaret);
        const currentToken = tokens[currentTokenIndex]
        return {tokens, currentTokenIndex, currentToken};
    }

    private classesForTokenUnderCaretFromNode(className: string, classNameUpToCaret: string) {
        const {tokens, currentTokenIndex} = this.tokens(className, classNameUpToCaret);
        let node = {...this.node}
        let level = 0
        while (level < currentTokenIndex) {
            const parent = node
            if (!node.tree[tokens[level]])
                break;
            node = node.tree[tokens[level]]
            node.parent = parent
            level++
        }
        const all: CssClassData[] = this.nodeClasses(node)
        return all;
    }

    private recursiveNodeClasses(n) {
        const classes: CssClassData[] = []
        if (n.tree.className)
            return [{...n.tree}]
        else {
            for (const ck in n.tree) {
                classes.push(...this.recursiveNodeClasses(n.tree[ck]))
            }
        }
        return classes

    }

    private nodeClasses(n) {
        let classes: CssClassData[] = this.recursiveNodeClasses(n)
        if (classes.length == 1 && n.parent && n.parent.token != '') {
            classes = this.nodeClasses(n.parent)
        }
        return classes

    }


    private baseClasses() {
        return ['text', 'w', 'h', 'p', 'm', 'font', 'cursor'].map(c => ({className: c} as CssClassData))
    }

    private nodeTokens(n, slice = 20) {
        let prefix = n.token
        let parent = n.parent
        while (parent) {
            prefix = parent.token + (parent.token ? '-' : '') + prefix
            parent = parent.parent
        }
        return n.children.map(c => {
            return {className: prefix + (prefix ? '-' : '') + c}
        }).slice(0, slice)

    }

    private windowed(cs, relevantIndex) {
        let min = relevantIndex - 10
        let max = relevantIndex + 10
        if (min < 0)
            min = 0
        if (max < 10)
            max = 10
        return cs.slice(min, max)
    }

    private tokens(className: string, classNameUpToCaret: string) {
        const dashesBeforeCaret = classNameUpToCaret.split("").filter(c => c == '-').length
        const tokens = className.split("-").filter(t => t.length > 0)
        let currentTokenIndex = dashesBeforeCaret
        if (currentTokenIndex > 0 && (!tokens[currentTokenIndex] || tokens[currentTokenIndex].length == 0))
            currentTokenIndex--
        return {tokens, currentTokenIndex};
    }

    protected prefix(className: string) {
        let prefix = ''
        if (className.indexOf(":") >= 0) {
            prefix = className.split(":")[0]
        }
        return prefix
    }

    private mapToTwClasses(relevant: CssClassData[], prefix = ''): TwSuggestedClass[] {
        return relevant.map((c: CssClassData) => {
            const computed = computeRules(c.rules)
            let color = ''
            const vc = computed.filter(r => r.color)
            if (vc.length > 0)
                color = vc[0].color
            let valuePx = ''
            const vpx = computed.filter(r => r.valuePx)
            if (vpx.length > 0)
                valuePx = vpx[0].valuePx
            const tw = {
                twClass: (prefix ? prefix + ":" : '') + c.className,
                color,
                valuePx
            }

            return tw
        })
    }


    private nodeFor(className: string) {
        const {tokens} = this.tokens(className, className);
        let n = this.node
        let cti = 0
        while (n.tree[tokens[cti]]) {
            const parent = n
            n = n.tree[tokens[cti]]
            n.parent = parent
            cti++
        }
        return {node: n, level: cti - 1}
    }

    private nodeExists(className: string) {
        const {currentTokenIndex} = this.tokens(className, className);
        const {node, level} = this.nodeFor(className)
        return node != this.node && currentTokenIndex == level
    }
}

export interface TwSuggestedClass {
    twClass: string;
    color?: string;
    valuePx?: string;
    presets?: string;
}
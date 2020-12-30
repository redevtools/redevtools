import {Suggester, TwSuggestedClass} from "@/components/suggester";
import {presets} from "@/components/tailwind.presets";


export class SuggesterWithPresets extends Suggester {

    suggest(className: string, classNameUpToCaret: string): TwSuggestedClass[] {
        const prefix = this.prefix(className)
        const isPreset = prefix == "p"
        if (!isPreset)
            return super.suggest(className, classNameUpToCaret);
        else {
            className = this.removePrefix(className, prefix)
            classNameUpToCaret = this.removePrefix(classNameUpToCaret, prefix)
            let found = presets.filter(p => p.twClass.startsWith(classNameUpToCaret)).map(tw => ({
                ...tw,
                twClass: 'p:' + tw.twClass
            }))
            if (found.length <= 1) {
                const tokens = classNameUpToCaret.split("-")
                const tokensToConsider = tokens.slice(0, Math.max(0, tokens.length - 1))
                const newClass = tokensToConsider.join("-")
                found = presets.filter(p => p.twClass.startsWith(newClass)).map(tw => ({
                    ...tw,
                    twClass: 'p:' + tw.twClass
                }))
            }
            return found
        }
    }


}


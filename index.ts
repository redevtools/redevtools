const log = (c1: string, c2: string) => console.log.bind(window.console, '%c%s',
    `color: ${c1}; background: ${c2}; font-size: 10px; border-radius: 2px; font-weight: bold; padding: 2px`)
const logi = log('#284271', '#a8e9ff')
const logw = log('#7c4400', '#ffd06f')
const loge = log('#be0000', '#ffcaca')


type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | Json | JSONArray;
type Json = { [member: string]: JSONValue | any };
type JSONArray = JSONValue[];

declare global {
    interface Window {
        re: (ReDevTools & Json);
    }
}


const scriptPromise = (src: string) => {
    return new Promise((resolve, reject) => {
        let alreadyLoaded = document.querySelectorAll(`script[src="${src}"]`).length > 0
        if (alreadyLoaded) {
            logw("ReDevTools", `${src} already loaded. Ignoring.`)
            resolve()
        } else {
            const script = document.createElement('script');
            document.head.appendChild(script);
            script.onload = resolve;
            script.onerror = reject;
            script.src = src;
        }
    })
};

interface RDTState {
    local: {}
    session: {}
}

interface RDTProfile {
}

class RDTStorage {

    constructor(private name: string, private version = 1) {
    }

    withStorage<T>(action: (s: RDTState) => T): T {
        let ls = JSON.parse(localStorage.getItem(this.name) ?? JSON.stringify({version: this.version}))
        let ss = JSON.parse(sessionStorage.getItem(this.name) ?? "{}")
        let s = {local: ls, session: ss}
        let result = action(s)
        localStorage.setItem(this.name, JSON.stringify(s.local))
        sessionStorage.setItem(this.name, JSON.stringify(s.session))
        return result
    }

    get storage(): RDTState {
        return this.withStorage(s => s)
    }

}

class ReDevTools {

    state = new RDTStorage("ReDevTools")
    private profile: RDTProfile;

    constructor() {
        this.init()
        this.profile = {}
    }

    async init() {
        let defaultPlugins = await fetch("https://cdn.jsdelivr.net/gh/redevtools/redevtools@master/plugins.json").then(r => r.json())
        console.log("defaultPlugins: ", defaultPlugins)
        logi("ReDevTools", `Ready to help you. type \`re. \` in the console to explore available plugins. Go to https://redevtools.com for more information`)
    }

}

export const redevtools = {
    init: () => {
        window.re = new ReDevTools() as any;
        const registry = new ReDevToolsRegistry()
        window.re.functions = registry
    }
}


class ReDevToolsRegistry {
    methods: { [name: string]: { name: string, method: any, original: any, instance: any } } = {}

    has(name: string) {
        return this.methods[name] != null
    }

    setMethod(name: string, method: any, original: any, instance: any) {
        this.methods[name] = {name, method, instance, original}
        if (["methods", "has", "setMethod", "callMethod"].indexOf(name) < 0)
            (this as any)[name] = method.bind(instance)
    }

    callMethod(name: string, params: any[]) {
        let m = this.methods[name]
        try {
            m.method.apply(m.instance, params)
        } catch (e) {

        }
    }

}


/**
 *
 * @param hookName The name of your plugin hook
 * @constructor
 */
export function re(hookName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (!window.re.registry.has(propertyKey))
                window.re.registry.setMethod(propertyKey, descriptor.value, originalMethod, this)
            let hookData: any = {
                functionName: propertyKey,
                functionReference: descriptor.value,
                arguments: args,
                originalFunctionReference: originalMethod,
                target: this,
                when: 'before',
                skipExecution: false
            }
            window.re[hookName](hookData)
            if (hookData.skipExecution)
                return

            let result = originalMethod.apply(this, args);
            hookData.result = result
            hookData.when = 'after'
            window.re[hookName](hookData)
            return result;
        }
    }
}


const log = (c1, c2) => console.log.bind(window.console, '%c%s', `color: ${c1}; background: ${c2}; font-size: 10px; border-radius: 2px; font-weight: bold; padding: 2px`);
const logi = log('#284271', '#a8e9ff');
const logw = log('#7c4400', '#ffd06f');
const loge = log('#be0000', '#ffcaca');
const scriptPromise = (src) => {
    return new Promise((resolve, reject) => {
        let alreadyLoaded = document.querySelectorAll(`script[src="${src}"]`).length > 0;
        if (alreadyLoaded) {
            logw("ReDevTools", `${src} already loaded. Ignoring.`);
            resolve();
        }
        else {
            const script = document.createElement('script');
            document.head.appendChild(script);
            script.onload = resolve;
            script.onerror = reject;
            script.src = src;
        }
    });
};
class RDTStorage {
    constructor(name, version = 1) {
        this.name = name;
        this.version = version;
    }
    withStorage(action) {
        var _a, _b;
        let ls = JSON.parse((_a = localStorage.getItem(this.name)) !== null && _a !== void 0 ? _a : JSON.stringify({ version: this.version }));
        let ss = JSON.parse((_b = sessionStorage.getItem(this.name)) !== null && _b !== void 0 ? _b : "{}");
        let s = { local: ls, session: ss };
        let result = action(s);
        localStorage.setItem(this.name, JSON.stringify(s.local));
        sessionStorage.setItem(this.name, JSON.stringify(s.session));
        return result;
    }
    get storage() {
        return this.withStorage(s => s);
    }
}
class ReDevTools {
    constructor() {
        this.state = new RDTStorage("ReDevTools");
        this.init();
        this.profile = {};
    }
    async init() {
        let defaultPlugins = await fetch("https://cdn.jsdelivr.net/gh/redevtools/redevtools@master/plugins.json").then(r => r.json());
        console.log("defaultPlugins: ", defaultPlugins);
        logi("ReDevTools", `Ready to help you. type \`re. \` in the console to explore available plugins. Go to https://redevtools.com for more information`);
    }
}
export const redevtools = {
    init: () => {
        window.re = new ReDevTools();
        const registry = new ReDevToolsRegistry();
        window.re.functions = registry;
    }
};
class ReDevToolsRegistry {
    constructor() {
        this.methods = {};
    }
    has(name) {
        return this.methods[name] != null;
    }
    setMethod(name, method, original, instance) {
        this.methods[name] = { name, method, instance, original };
        if (["methods", "has", "setMethod", "callMethod"].indexOf(name) < 0)
            this[name] = method.bind(instance);
    }
    callMethod(name, params) {
        let m = this.methods[name];
        try {
            m.method.apply(m.instance, params);
        }
        catch (e) {
        }
    }
}
/**
 *
 * @param hookName The name of your plugin hook
 * @constructor
 */
export function re(hookName) {
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (!window.re.registry.has(propertyKey))
                window.re.registry.setMethod(propertyKey, descriptor.value, originalMethod, this);
            let hookData = {
                functionName: propertyKey,
                functionReference: descriptor.value,
                arguments: args,
                originalFunctionReference: originalMethod,
                target: this,
                when: 'before',
                skipExecution: false
            };
            window.re[hookName](hookData);
            if (hookData.skipExecution)
                return;
            let result = originalMethod.apply(this, args);
            hookData.result = result;
            hookData.when = 'after';
            window.re[hookName](hookData);
            return result;
        };
    };
}

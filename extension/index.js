const log = (c1, c2) => console.log.bind(window.console, '%c%s', `color: ${c1}; background: ${c2}; font-size: 10px; border-radius: 2px; font-weight: bold; padding: 2px`);
const logi = log('#284271', '#a8e9ff');
const logw = log('#7c4400', '#ffd06f');
const loge = log('#be0000', '#ffcaca');
logw("ReDevTools", "ReDevTools loading");
class ReDevToolsMethodRegistry {
    constructor() {
        this.methods = {};
    }
    has(name) {
        return this.methods[name] != null;
    }
    setMethod(name, method, original, instance) {
        this.methods[name] = { name, method, instance, original };
    }
}
class ReDevToolsHookRegistry {
    constructor() {
        this.hooks = {};
    }
    has(name) {
        return this.hooks[name] != null;
    }
    register(name, hook) {
        this.hooks[name] = hook;
    }
    fireHookEvent(hookData) {
        let returnedByHook = undefined;
        for (let hookName in this.hooks) {
            let m = this.hooks[hookName];
            try {
                let result = m(hookData);
                if (hookData.replaceReturned)
                    returnedByHook = result;
            }
            catch (e) {
                console.error(e);
            }
        }
        return returnedByHook;
    }
}
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
            script.onload = _ => resolve();
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
        let ls = JSON.parse(localStorage.getItem(this.name) ?? JSON.stringify({ version: this.version }));
        let ss = JSON.parse(sessionStorage.getItem(this.name) ?? "{}");
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
const pluginInfo = (plugin) => {
    let params = [];
    for (let p in plugin.params)
        params.push(`${p}: ${plugin.params[p]}`);
    return `
        Function Name: ${plugin.name}
        Params: 
            ${params.join("\t\n")}
        Example: ${plugin.example} 
        
        ${plugin.description}
        Full description at ${plugin.readme}
        `;
};
async function logImage(url) {
    if (!url)
        return;
    return new Promise(r => {
        const img = new Image();
        img.onload = function () {
            const style = "font-size: 1px; padding: " + Math.floor(img.height / 2) + "px " + Math.floor(img.width / 2) + "px; ";
            console.log("%c+", style + "background: url(" + url + "); background-size: " + (img.width) + "px " + (img.height) + "px; color: transparent;");
            r();
        };
        img.onerror = _ => r();
        img.src = url;
    });
}
async function printPluginInfo(plugin) {
    try {
        await logImage(plugin.preview);
        console.log(pluginInfo(plugin));
    }
    catch {
    }
}
const loadPlugin = async (plugin) => {
    if (!plugin.loaded) {
        console.log("Plugins are lazy. Loading plugin for the first time.");
        await scriptPromise(plugin.url);
        await new Promise(r => setTimeout(r));
        plugin.loaded = true;
    }
};
const proxy = {
    apply: async (f, that, args) => {
        try {
            await loadPlugin(f.plugin);
            if (f.plugin.loaded)
                return window.redevtools[f.plugin.name](...args);
        }
        catch (e) {
            loge("PLUGIN", "Could not load ", f.plugin.name);
        }
    },
    get: function (f, name) {
        if (name == 'info')
            printPluginInfo(f.plugin);
        return '↓';
    }
};
class ReDevTools {
    constructor() {
        this.state = new RDTStorage("ReDevTools");
        this.init();
        this.registry = new ReDevToolsMethodRegistry();
        this.hooks = new ReDevToolsHookRegistry();
    }
    async init(options = { plugins: [] }) {
        let pluginsData = await fetch("https://unpkg.com/redevtools/dist/plugins/plugins.json").then(r => r.json());
        for (let plugin of pluginsData.plugins) {
            const f = new Function(Object.keys(plugin.params).join(","), '');
            f._ = `Usage: \`re.${plugin.name}(${Object.keys(plugin.params).join(",")})\` - type \`re.${plugin.name}.info\` for more details. `;
            f.plugin = plugin;
            this[plugin.name] = new Proxy(f, proxy);
        }
        if (options?.plugins?.length > 0) {
            for (let p of options.plugins) {
                if (this[p])
                    await loadPlugin(p);
            }
        }
    }
    get methods() {
        return new Proxy(this.registry.methods, {
            get: (f, name) => {
                let result = this.registry.methods[name].method.bind(this.registry.methods[name].instance);
                if (!result)
                    console.warn("returned value was undefined");
                return result;
            }
        });
    }
}
export const redevtools = {
    init: () => {
        const re = new ReDevTools();
        if (window.re) {
            window.re = new Proxy(window.re, {
                apply(target, thisArg, argArray) {
                    return target.bind(thisArg).apply(argArray);
                },
                get(target, p, receiver) {
                    return re[p];
                }
            });
        }
        else {
            window.re = re;
        }
        logi("ReDevtools", `Type \`re. \` to discover available plugins. More info at https://redevtools.com`);
        window.redevtools = re;
        return re;
    }
};
function thisLine() {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const match = regex.exec(e.stack.split("\n")[2]);
    return {
        filepath: match[1],
        line: match[2],
        column: match[3]
    };
}
/**
 *
 * The method gets registered and is available at re.methods.methodName(...)
 * Every time the method is called in the code, any registered hook is called.
 * To register a hook use re.hooks.register(yourHook) in your plugin code
 *
 */
function Re() {
    return function (target, propertyKey, descriptor) {
        // @ts-ignore
        let originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            if (!window.redevtools.registry.has(propertyKey))
                window.redevtools.registry.setMethod(propertyKey, descriptor.value, originalMethod, this);
            let hookData = {
                functionName: propertyKey,
                functionReference: descriptor.value,
                arguments: args,
                callMethodWithCurrentArgs: () => {
                    return originalMethod.apply(this, args);
                },
                target: this,
                skipExecution: false,
                replaceReturned: false
            };
            let returnedByHook = window.redevtools.hooks.fireHookEvent(hookData);
            if (hookData.replaceReturned)
                return returnedByHook;
            if (hookData.skipExecution)
                return;
            let result = originalMethod.apply(hookData.target, hookData.arguments);
            hookData.result = result;
            return result;
        };
    };
}

import json2ts from "./plugins/json2ts/json2ts";
import jwtDecode from "./plugins/jwtDecode/jwtDecode";
import {logi, logImage, logw} from "./console.utils";
import {PluginInfo, ReDevTools} from "./redevtools.model";
import tailwindDevtool from "./plugins/tailwindDevtool/tailwind-devtool";


const pluginInfo = (plugin: PluginInfo) => {
    let params: string[] = []
    for (let p in plugin.params)
        params.push(`${p}: ${plugin.params[p]}`)

    return `
        Function Name: ${plugin.name}
        Params: 
            ${params.join("\t\n")}
        Example: ${plugin.example} 
        
        ${plugin.description}
        Full description at ${plugin.readme}
        `
}

async function printPluginInfo(plugin: PluginInfo) {
    try {
        await logImage(plugin.preview)
        console.log(pluginInfo(plugin))
    } catch {
    }
}

logi("ReDevTools", "ReDevTools loading")
const re = new ReDevTools()
re.json2ts = json2ts()
re.jwtDecode = jwtDecode()
re.tailwind = tailwindDevtool()

const info = {
    "json2ts": ()=> printPluginInfo((re.json2ts as any).info),
    "jwtDecode": ()=> printPluginInfo((re.jwtDecode as any).info),
    "tailwind": ()=> printPluginInfo((re.tailwind as any).info)
}
re.info = info
re.info = new Proxy(info, {
    get: function (f, name) {
        printPluginInfo(re[name].info)
    }
})

logi("ReDevtools", `Type \`re. \` to discover available plugins. More info at https://redevtools.com`);
logi("ReDevtools", `
To auto-reload add this snippet to your code:

document.head.appendChild(document.createElement("script")).src = "//r8s.io"

Enjoy 
`);


window.redevtools = re

if(!window.re)
    window.re = re
else {
    logw("window.re not set", "window re is already set. using window.r8s")
    
    if(!window.r8s)
        window.r8s = re
    
}


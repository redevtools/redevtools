

export class ReDevTools {
    json2ts!: RDTPlugin
    jwtDecode!: RDTPlugin
    tailwind!: RDTPlugin
    info!: {[plugin:string]: ()=>void}

}

declare global {
    interface Window {
        re?: ReDevTools;
        r8s?: ReDevTools;
        redevtools: ReDevTools;
    }
}

export interface PluginInfo {
    name: string
    params: { [param: string]: string },
    example: string,
    description: string
    readme: string
    preview: string
}
export type RDTPlugin = (...params) => Promise<void> & { version: string, info: PluginInfo }

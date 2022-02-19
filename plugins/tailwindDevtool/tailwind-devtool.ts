import {RDTPlugin} from "../../redevtools.model";
import {RDTStorage} from "../../shared/storage.util";

const R8S_TAILWIND_STORAGE = "R8S_TAILWIND_STORAGE"
let tailwindStorage = new RDTStorage(R8S_TAILWIND_STORAGE)
let enabled = false
const alreadyPresent = document.querySelector('script[src="//r8s.io/tailwind.js"]')
if (!alreadyPresent)
    document.head.appendChild(document.createElement("script")).src = "//r8s.io/tailwind.js"

tailwindStorage.withStorage<{ iconEnabled: boolean }>(s => {
    if(s.local.iconEnabled)
        (window as any).r8sTailwindInspector.enableTwIcon()
})


export default () => {
    async function tailwindDevtool(name: string) {
        
        if (enabled) {
            (window as any).r8sTailwindInspector.disableTwIcon()
            tailwindStorage.withStorage<{ iconEnabled: boolean }>(s => {
                s.local.iconEnabled = false
            })
        } else {
            (window as any).r8sTailwindInspector.enableTwIcon()
            tailwindStorage.withStorage<{ iconEnabled: boolean }>(s => {
                s.local.iconEnabled = true
            })

        }
        enabled = !enabled
    }

    tailwindDevtool.version = "1.0"
    tailwindDevtool.info = {
        "name": "Tailwind Devtool Inspector",
        "params": {},
        "example": "re.tailwind()",
        "description": "The fastest Tailwind Devtool available today",
        "readme": "https://www.redevtools.com/blog/tailwind-devtools-inspector-how-to-quickly-edit-tailwind-classes-and-apply-tailwind-templates/",
        "preview": "https://www.redevtools.com/blog/tailwind-devtools-inspector-how-to-quickly-edit-tailwind-classes-and-apply-tailwind-templates/tailwind-devtool.gif"
    }
    return tailwindDevtool as unknown as RDTPlugin
}

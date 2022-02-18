import {RDTPlugin} from "../../redevtools.model";

let enabled = true
export default () => {
    async function tailwindDevtool(name: string) {
        const alreadyPresent = document.querySelector('script[src="//r8s.io/tailwind.js"]')
        if (!alreadyPresent)
            document.head.appendChild(document.createElement("script")).src = "//r8s.io/tailwind.js"
        setTimeout(() => {
            if (enabled)
                (window as any).r8sTailwindInspector.disableTwIcon()
            else
                (window as any).r8sTailwindInspector.enableTwIcon()
            enabled = !enabled
        }, 2500)
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

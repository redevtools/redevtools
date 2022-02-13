import {RDTPlugin} from "../../redevtools.model";

export default () => {
    async function hello(name: string) {
        console.log("hello " + name)
    }

    hello.version = "1.0"
    hello.info = {
        "name": "hello",
        "params": {
            "name": "The string to be printed after hello"
        },
        "example": "re.hello('World')",
        "description": "A simple hello world plugin",
        "readme": "https://github.com/redevtools/redevtools/tree/main/plugins/hello",
        "preview": "https://raw.githubusercontent.com/redevtools/redevtools/main/plugins/hello/preview.gif"
    }
    return hello as unknown as RDTPlugin
}

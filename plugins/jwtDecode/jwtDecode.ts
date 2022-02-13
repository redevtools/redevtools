/**
 * Author: Buglink.com Team
 *
 */
import {RDTPlugin} from "../../redevtools.model";

export default () => {
    const parse = (j, i = 1) => console.log(JSON.parse(atob(j.split(".")[i])))

    const jwtDecode = json => parse(json)
    jwtDecode.header = json => parse(json, 0)
    jwtDecode.version = "1.0"
    jwtDecode.info = {
        "name": "jwtDecode",
        "params": {
            "jwtToken": "A jwt token. Usually from the localStorage, but you can pass a string, of course "
        },
        "example": "re.jwtDecode(localStorage.TOKEN)",
        "description": "A plugin to decode a JWT token to a JSON object and explore it in the console",
        "readme": "https://www.redevtools.com/blog/jwtdecode-how-to-decode-a-jwt-token-from-the-console/",
        "preview": "https://raw.githubusercontent.com/redevtools/redevtools/main/plugins/jwtDecode/preview.gif"
    }
    return jwtDecode as unknown as RDTPlugin
}

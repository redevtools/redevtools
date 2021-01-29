/**
 * Author: Buglink.com Team
 *
 */

declare var copy;
;
(async (re) => {
        const parse = (j, i = 1) => console.log(JSON.parse(atob(j.split(".")[i])))

        re.jwtDecode = json => parse(json)
        re.jwtDecode.header = json => parse(json, 0)
        re.jwtDecode.version = "1.0"
    }
)(window.redevtools);

"use strict";
(async (re) => {
    async function hello(name) {
        console.log("hello " + name);
    }
    re.hello = hello;
    re.hello.version = "1.0";
})(window.re);
//# sourceMappingURL=hello.js.map
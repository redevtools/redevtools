"use strict";
(async (re) => {
    async function hello(name) {
        console.log("hello " + name);
    }
    re.hello = hello;
})(window.re);

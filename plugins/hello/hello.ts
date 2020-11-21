(async (re) => {
        async function hello(name: string) {
            console.log("hello " + name)
        }
        re.hello = hello
        re.hello.version = "1.0"
    }
)(window.re);

(async (re) => {

        async function hello(name: string) {
            console.log("hello " + name)
        }

        re.hello = hello

    }
)(window.re);

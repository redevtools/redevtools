export function  scriptLoad(src:string, options = {loadAsync: false}){
    function alreadyLoaded(url:string, type: "script" | "style"){
        let selector = `script[src="${url}"]`
        if(type == "style")
            selector = `link[href="${url}"]`
        return document.querySelectorAll(selector).length > 0
    }
    return new Promise<any>((resolve, reject) => {
        if (alreadyLoaded(src, "script")) {
            console.log("script already loaded. skipping " + src)
            resolve('')
        } else {
            const script = document.createElement('script');
            document.head.appendChild(script);
            script.onload = resolve;
            script.onerror = reject;
            if(options.loadAsync)
                script.async = true;
            script.src = src;
        }
    })
}

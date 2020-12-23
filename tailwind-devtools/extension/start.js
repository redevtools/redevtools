var checkExist = setInterval(function () {
    if (document.body) {
        clearInterval(checkExist);
        var div = document.createElement("div");
        div.id = "redevtools-tailwind";
        document.body.appendChild(div);
        Vue.createApp(rdt_tailwind).mount('#redevtools-tailwind');
    }
}, 16);

window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        window.rdt_tailwind_options = window.rdt_tailwind_options || {}
        window.rdt_tailwind_options.enabled = event.data.enabled


    }
}, false);
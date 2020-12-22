export const classes = [
    {className: "container", rules: "width: 100%;"},
    {className: "box-border", rules: "box-sizing: border-box;"},
    {className: "box-content", rules: "box-sizing: content-box;"},

    {className: "float-right", rules: "float: right;"},
    {className: "float-left", rules: "float: left;"},
    {className: "float-none", rules: "float: none;"},
    {className: "clear-left", rules: "clear: left;"},
    {className: "clear-right", rules: "clear: right;"},
    {className: "clear-both", rules: "clear: both;"},
    {className: "clear-none", rules: "clear: none;"},

    {className: "object-contain", rules: "object-fit: contain;"},
    {className: "object-cover", rules: "object-fit: cover;"},
    {className: "object-fill", rules: "object-fit: fill;"},
    {className: "object-none", rules: "object-fit: none;"},
    {className: "object-scale-down", rules: "object-fit: scale-down;"},
    {className: "object-bottom", rules: "object-position: bottom;"},
    {className: "object-center", rules: "object-position: center;"},
    {className: "object-left", rules: "object-position: left;"},
    {className: "object-left-bottom", rules: "object-position: left bottom;"},
    {className: "object-left-top", rules: "object-position: left top;"},
    {className: "object-right", rules: "object-position: right;"},
    {className: "object-right-bottom", rules: "object-position: right bottom;"},
    {className: "object-right-top", rules: "object-position: right top;"},
    {className: "object-top", rules: "object-position: top;"},

    {className: "visible", rules: "visibility: visible;"},
    {className: "invisible", rules: "visibility: hidden;"},

    {className: "z-0", rules: "z-index: 0;"},
    {className: "z-10", rules: "z-index: 10;"},
    {className: "z-20", rules: "z-index: 20;"},
    {className: "z-30", rules: "z-index: 30;"},
    {className: "z-40", rules: "z-index: 40;"},
    {className: "z-50", rules: "z-index: 50;"},
    {className: "z-auto", rules: "z-index: auto;"},

    {
        className: "shadow-sm",
        rules: "--tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow",
        rules: "--tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow-md",
        rules: "--tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow-lg",
        rules: "--tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow-xl",
        rules: "--tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow-2xl",
        rules: "--tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow-inner",
        rules: "--tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);"
    },
    {
        className: "shadow-none",
        rules: "--tw-shadow: 0 0 #0000; box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);     "
    },

    {className: "opacity-0", rules: "opacity: 0;"},
    {className: "opacity-5", rules: "opacity: 0.05;"},
    {className: "opacity-10", rules: "opacity: 0.1;"},
    {className: "opacity-20", rules: "opacity: 0.2;"},
    {className: "opacity-25", rules: "opacity: 0.25;"},
    {className: "opacity-30", rules: "opacity: 0.3;"},
    {className: "opacity-40", rules: "opacity: 0.4;"},
    {className: "opacity-50", rules: "opacity: 0.5;"},
    {className: "opacity-60", rules: "opacity: 0.6;"},
    {className: "opacity-70", rules: "opacity: 0.7;"},
    {className: "opacity-75", rules: "opacity: 0.75;"},
    {className: "opacity-80", rules: "opacity: 0.8;"},
    {className: "opacity-90", rules: "opacity: 0.9;"},
    {className: "opacity-95", rules: "opacity: 0.95;"},
    {className: "opacity-100", rules: "opacity: 1;"},

    {className: "border-collapse", rules: "border-collapse: collapse;"},
    {className: "border-separate", rules: "border-collapse: separate"},
    {className: "table-auto", rules: "table-layout: auto;"},
    {className: "table-fixed", rules: "table-layout: fixed"},

    {className: "transition-none", rules: "transition-property: none;"},
    {
        className: "transition-all",
        rules: "transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;"
    },
    {
        className: "transition",
        rules: "transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;"
    },
    {
        className: "transition-colors",
        rules: "transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;"
    },
    {
        className: "transition-opacity",
        rules: "transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;"
    },
    {
        className: "transition-shadow",
        rules: "transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;"
    },
    {
        className: "transition-transform",
        rules: "transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; "
    },
    {className: "duration-75", rules: "transition-duration: 75ms;"},
    {className: "duration-100", rules: "transition-duration: 100ms;"},
    {className: "duration-150", rules: "transition-duration: 150ms;"},
    {className: "duration-200", rules: "transition-duration: 200ms;"},
    {className: "duration-300", rules: "transition-duration: 300ms;"},
    {className: "duration-500", rules: "transition-duration: 500ms;"},
    {className: "duration-700", rules: "transition-duration: 700ms;"},
    {className: "duration-1000", rules: "transition-duration: 1000ms"},
    {className: "ease-linear", rules: "transition-timing-function: linear;"},
    {className: "ease-in", rules: "transition-timing-function: cubic-bezier(0.4, 0, 1, 1);"},
    {className: "ease-out", rules: "transition-timing-function: cubic-bezier(0, 0, 0.2, 1);"},
    {className: "ease-in-out", rules: "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)"},
    {className: "delay-75", rules: "transition-delay: 75ms;"},
    {className: "delay-100", rules: "transition-delay: 100ms;"},
    {className: "delay-150", rules: "transition-delay: 150ms;"},
    {className: "delay-200", rules: "transition-delay: 200ms;"},
    {className: "delay-300", rules: "transition-delay: 300ms;"},
    {className: "delay-500", rules: "transition-delay: 500ms;"},
    {className: "delay-700", rules: "transition-delay: 700ms;"},
    {className: "delay-1000", rules: "transition-delay: 1000ms;"},
    {className: "delay-1000", rules: "transition-delay: 1000ms;"},
    {className: ".animate-none", rules: "animation: none;"},
    {
        className: ".animate-spin", rules: "animation: spin 1s linear infinite;\n" +
            "\n" +
            "@keyframes spin {\n" +
            "    from {\n" +
            "        transform: rotate(0deg);\n" +
            "    }\n" +
            "    to {\n" +
            "        transform: rotate(360deg);\n" +
            "    }\n" +
            "}"
    },
    {
        className: ".animate-ping", rules: "animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;\n" +
            "\n" +
            "@keyframes ping {\n" +
            "    0% {\n" +
            "        transform: scale(1);\n" +
            "        opacity: 1;\n" +
            "    }\n" +
            "    75%, 100% {\n" +
            "        transform: scale(2);\n" +
            "        opacity: 0;\n" +
            "    }\n" +
            "}"
    },
    {
        className: ".animate-pulse", rules: "animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n" +
            "\n" +
            "@keyframes pulse {\n" +
            "    0%, 100% {\n" +
            "        opacity: 1;\n" +
            "    }\n" +
            "    50% {\n" +
            "        opacity: .5;\n" +
            "    }\n" +
            "}"
    },
    {
        className: ".animate-bounce", rules: "animation: bounce 1s infinite;\n" +
            "\n" +
            "@keyframes bounce {\n" +
            "    0%, 100% {\n" +
            "        transform: translateY(-25%);\n" +
            "        animationTimingFunction: cubic-bezier(0.8, 0, 1, 1);\n" +
            "    }\n" +
            "    50% {\n" +
            "        transform: translateY(0);\n" +
            "        animationTimingFunction: cubic-bezier(0, 0, 0.2, 1);\n" +
            "    }\n" +
            "}"
    },


    {
        className: "transform",
        rules: "--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
    },
    {
        className: "transform-gpu",
        rules: "--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;transform: translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));"
    },
    {className: "transform-none", rules: "transform: none;"},

    {className: "origin-center", rules: "transform-origin: center;"},
    {className: "origin-top", rules: "transform-origin: top;"},
    {className: "origin-top-right", rules: "transform-origin: top right;"},
    {className: "origin-right", rules: "transform-origin: right;"},
    {className: "origin-bottom-right", rules: "transform-origin: bottom right;"},
    {className: "origin-bottom", rules: "transform-origin: bottom;"},
    {className: "origin-bottom-left", rules: "transform-origin: bottom left;"},
    {className: "origin-left", rules: "transform-origin: left;"},
    {className: "origin-top-left", rules: "transform-origin: top left;"},




    {className: "scale-0", rules: "--tw-scale-x: 0; --tw-scale-y: 0;"},
    {className: "scale-50", rules: "--tw-scale-x: .5; --tw-scale-y: .5;"},
    {className: "scale-75", rules: "--tw-scale-x: .75; --tw-scale-y: .75;"},
    {className: "scale-90", rules: "--tw-scale-x: .9; --tw-scale-y: .9;"},
    {className: "scale-95", rules: "--tw-scale-x: .95; --tw-scale-y: .95;"},
    {className: "scale-100", rules: "--tw-scale-x: 1; --tw-scale-y: 1;"},
    {className: "scale-105", rules: "--tw-scale-x: 1.05; --tw-scale-y: 1.05;"},
    {className: "scale-110", rules: "--tw-scale-x: 1.1; --tw-scale-y: 1.1;"},
    {className: "scale-125", rules: "--tw-scale-x: 1.25; --tw-scale-y: 1.25;"},
    {className: "scale-150", rules: "--tw-scale-x: 1.5; --tw-scale-y: 1.5;"},
    {className: "scale-x-0", rules: "--tw-scale-x: 0;"},
    {className: "scale-x-50", rules: "--tw-scale-x: .5;"},
    {className: "scale-x-75", rules: "--tw-scale-x: .75;"},
    {className: "scale-x-90", rules: "--tw-scale-x: .9;"},
    {className: "scale-x-95", rules: "--tw-scale-x: .95;"},
    {className: "scale-x-100", rules: "--tw-scale-x: 1;"},
    {className: "scale-x-105", rules: "--tw-scale-x: 1.05;"},
    {className: "scale-x-110", rules: "--tw-scale-x: 1.1;"},
    {className: "scale-x-125", rules: "--tw-scale-x: 1.25;"},
    {className: "scale-x-150", rules: "--tw-scale-x: 1.5;"},
    {className: "scale-y-0", rules: "--tw-scale-y: 0;"},
    {className: "scale-y-50", rules: "--tw-scale-y: .5;"},
    {className: "scale-y-75", rules: "--tw-scale-y: .75;"},
    {className: "scale-y-90", rules: "--tw-scale-y: .9;"},
    {className: "scale-y-95", rules: "--tw-scale-y: .95;"},
    {className: "scale-y-100", rules: "--tw-scale-y: 1;"},
    {className: "scale-y-105", rules: "--tw-scale-y: 1.05;"},
    {className: "scale-y-110", rules: "--tw-scale-y: 1.1;"},
    {className: "scale-y-125", rules: "--tw-scale-y: 1.25;"},
    {className: "scale-y-150", rules: "--tw-scale-y: 1.5;"},
    {className: "rotate-0", rules: "--tw-rotate: 0deg;"},
    {className: "rotate-1", rules: "--tw-rotate: 1deg;"},
    {className: "rotate-2", rules: "--tw-rotate: 2deg;"},
    {className: "rotate-3", rules: "--tw-rotate: 3deg;"},
    {className: "rotate-6", rules: "--tw-rotate: 6deg;"},
    {className: "rotate-12", rules: "--tw-rotate: 12deg;"},
    {className: "rotate-45", rules: "--tw-rotate: 45deg;"},
    {className: "rotate-90", rules: "--tw-rotate: 90deg;"},
    {className: "rotate-180", rules: "--tw-rotate: 180deg;"},
    {className: "-rotate-180", rules: "--tw-rotate: -180deg;"},
    {className: "-rotate-90", rules: "--tw-rotate: -90deg;"},
    {className: "-rotate-45", rules: "--tw-rotate: -45deg;"},
    {className: "-rotate-12", rules: "--tw-rotate: -12deg;"},
    {className: "-rotate-6", rules: "--tw-rotate: -6deg;"},
    {className: "-rotate-3", rules: "--tw-rotate: -3deg;"},
    {className: "-rotate-2", rules: "--tw-rotate: -2deg;"},
    {className: "-rotate-1", rules: "--tw-rotate: -1deg;"},
    {className: "translate-x-0", rules: "--tw-translate-x: 0px;"},
    {className: "translate-x-0.5", rules: "--tw-translate-x: 0.125rem;"},
    {className: "translate-x-1", rules: "--tw-translate-x: 0.25rem;"},
    {className: "translate-x-1.5", rules: "--tw-translate-x: 0.375rem;"},
    {className: "translate-x-2", rules: "--tw-translate-x: 0.5rem;"},
    {className: "translate-x-2.5", rules: "--tw-translate-x: 0.625rem;"},
    {className: "translate-x-3", rules: "--tw-translate-x: 0.75rem;"},
    {className: "translate-x-3.5", rules: "--tw-translate-x: 0.875rem;"},
    {className: "translate-x-4", rules: "--tw-translate-x: 1rem;"},
    {className: "translate-x-5", rules: "--tw-translate-x: 1.25rem;"},
    {className: "translate-x-6", rules: "--tw-translate-x: 1.5rem;"},
    {className: "translate-x-7", rules: "--tw-translate-x: 1.75rem;"},
    {className: "translate-x-8", rules: "--tw-translate-x: 2rem;"},
    {className: "translate-x-9", rules: "--tw-translate-x: 2.25rem;"},
    {className: "translate-x-10", rules: "--tw-translate-x: 2.5rem;"},
    {className: "translate-x-11", rules: "--tw-translate-x: 2.75rem;"},
    {className: "translate-x-12", rules: "--tw-translate-x: 3rem;"},
    {className: "translate-x-14", rules: "--tw-translate-x: 3.5rem;"},
    {className: "translate-x-16", rules: "--tw-translate-x: 4rem;"},
    {className: "translate-x-20", rules: "--tw-translate-x: 5rem;"},
    {className: "translate-x-24", rules: "--tw-translate-x: 6rem;"},
    {className: "translate-x-28", rules: "--tw-translate-x: 7rem;"},
    {className: "translate-x-32", rules: "--tw-translate-x: 8rem;"},
    {className: "translate-x-36", rules: "--tw-translate-x: 9rem;"},
    {className: "translate-x-40", rules: "--tw-translate-x: 10rem;"},
    {className: "translate-x-44", rules: "--tw-translate-x: 11rem;"},
    {className: "translate-x-48", rules: "--tw-translate-x: 12rem;"},
    {className: "translate-x-52", rules: "--tw-translate-x: 13rem;"},
    {className: "translate-x-56", rules: "--tw-translate-x: 14rem;"},
    {className: "translate-x-60", rules: "--tw-translate-x: 15rem;"},
    {className: "translate-x-64", rules: "--tw-translate-x: 16rem;"},
    {className: "translate-x-72", rules: "--tw-translate-x: 18rem;"},
    {className: "translate-x-80", rules: "--tw-translate-x: 20rem;"},
    {className: "translate-x-96", rules: "--tw-translate-x: 24rem;"},
    {className: "translate-x-px", rules: "--tw-translate-x: 1px;"},
    {className: "translate-x-1/2", rules: "--tw-translate-x: 50%;"},
    {className: "translate-x-1/3", rules: "--tw-translate-x: 33.333333%;"},
    {className: "translate-x-2/3", rules: "--tw-translate-x: 66.666667%;"},
    {className: "translate-x-1/4", rules: "--tw-translate-x: 25%;"},
    {className: "translate-x-2/4", rules: "--tw-translate-x: 50%;"},
    {className: "translate-x-3/4", rules: "--tw-translate-x: 75%;"},
    {className: "translate-x-full", rules: "--tw-translate-x: 100%;"},
    {className: "-translate-x-0", rules: "--tw-translate-x: 0px;"},
    {className: "-translate-x-0.5", rules: "--tw-translate-x: -0.125rem;"},
    {className: "-translate-x-1", rules: "--tw-translate-x: -0.25rem;"},
    {className: "-translate-x-1.5", rules: "--tw-translate-x: -0.375rem;"},
    {className: "-translate-x-2", rules: "--tw-translate-x: -0.5rem;"},
    {className: "-translate-x-2.5", rules: "--tw-translate-x: -0.625rem;"},
    {className: "-translate-x-3", rules: "--tw-translate-x: -0.75rem;"},
    {className: "-translate-x-3.5", rules: "--tw-translate-x: -0.875rem;"},
    {className: "-translate-x-4", rules: "--tw-translate-x: -1rem;"},
    {className: "-translate-x-5", rules: "--tw-translate-x: -1.25rem;"},
    {className: "-translate-x-6", rules: "--tw-translate-x: -1.5rem;"},
    {className: "-translate-x-7", rules: "--tw-translate-x: -1.75rem;"},
    {className: "-translate-x-8", rules: "--tw-translate-x: -2rem;"},
    {className: "-translate-x-9", rules: "--tw-translate-x: -2.25rem;"},
    {className: "-translate-x-10", rules: "--tw-translate-x: -2.5rem;"},
    {className: "-translate-x-11", rules: "--tw-translate-x: -2.75rem;"},
    {className: "-translate-x-12", rules: "--tw-translate-x: -3rem;"},
    {className: "-translate-x-14", rules: "--tw-translate-x: -3.5rem;"},
    {className: "-translate-x-16", rules: "--tw-translate-x: -4rem;"},
    {className: "-translate-x-20", rules: "--tw-translate-x: -5rem;"},
    {className: "-translate-x-24", rules: "--tw-translate-x: -6rem;"},
    {className: "-translate-x-28", rules: "--tw-translate-x: -7rem;"},
    {className: "-translate-x-32", rules: "--tw-translate-x: -8rem;"},
    {className: "-translate-x-36", rules: "--tw-translate-x: -9rem;"},
    {className: "-translate-x-40", rules: "--tw-translate-x: -10rem;"},
    {className: "-translate-x-44", rules: "--tw-translate-x: -11rem;"},
    {className: "-translate-x-48", rules: "--tw-translate-x: -12rem;"},
    {className: "-translate-x-52", rules: "--tw-translate-x: -13rem;"},
    {className: "-translate-x-56", rules: "--tw-translate-x: -14rem;"},
    {className: "-translate-x-60", rules: "--tw-translate-x: -15rem;"},
    {className: "-translate-x-64", rules: "--tw-translate-x: -16rem;"},
    {className: "-translate-x-72", rules: "--tw-translate-x: -18rem;"},
    {className: "-translate-x-80", rules: "--tw-translate-x: -20rem;"},
    {className: "-translate-x-96", rules: "--tw-translate-x: -24rem;"},
    {className: "-translate-x-px", rules: "--tw-translate-x: -1px;"},
    {className: "-translate-x-1/2", rules: "--tw-translate-x: -50%;"},
    {className: "-translate-x-1/3", rules: "--tw-translate-x: -33.333333%;"},
    {className: "-translate-x-2/3", rules: "--tw-translate-x: -66.666667%;"},
    {className: "-translate-x-1/4", rules: "--tw-translate-x: -25%;"},
    {className: "-translate-x-2/4", rules: "--tw-translate-x: -50%;"},
    {className: "-translate-x-3/4", rules: "--tw-translate-x: -75%;"},
    {className: "-translate-x-full", rules: "--tw-translate-x: -100%;"},
    {className: "translate-y-0", rules: "--tw-translate-y: 0px;"},
    {className: "translate-y-0.5", rules: "--tw-translate-y: 0.125rem;"},
    {className: "translate-y-1", rules: "--tw-translate-y: 0.25rem;"},
    {className: "translate-y-1.5", rules: "--tw-translate-y: 0.375rem;"},
    {className: "translate-y-2", rules: "--tw-translate-y: 0.5rem;"},
    {className: "translate-y-2.5", rules: "--tw-translate-y: 0.625rem;"},
    {className: "translate-y-3", rules: "--tw-translate-y: 0.75rem;"},
    {className: "translate-y-3.5", rules: "--tw-translate-y: 0.875rem;"},
    {className: "translate-y-4", rules: "--tw-translate-y: 1rem;"},
    {className: "translate-y-5", rules: "--tw-translate-y: 1.25rem;"},
    {className: "translate-y-6", rules: "--tw-translate-y: 1.5rem;"},
    {className: "translate-y-7", rules: "--tw-translate-y: 1.75rem;"},
    {className: "translate-y-8", rules: "--tw-translate-y: 2rem;"},
    {className: "translate-y-9", rules: "--tw-translate-y: 2.25rem;"},
    {className: "translate-y-10", rules: "--tw-translate-y: 2.5rem;"},
    {className: "translate-y-11", rules: "--tw-translate-y: 2.75rem;"},
    {className: "translate-y-12", rules: "--tw-translate-y: 3rem;"},
    {className: "translate-y-14", rules: "--tw-translate-y: 3.5rem;"},
    {className: "translate-y-16", rules: "--tw-translate-y: 4rem;"},
    {className: "translate-y-20", rules: "--tw-translate-y: 5rem;"},
    {className: "translate-y-24", rules: "--tw-translate-y: 6rem;"},
    {className: "translate-y-28", rules: "--tw-translate-y: 7rem;"},
    {className: "translate-y-32", rules: "--tw-translate-y: 8rem;"},
    {className: "translate-y-36", rules: "--tw-translate-y: 9rem;"},
    {className: "translate-y-40", rules: "--tw-translate-y: 10rem;"},
    {className: "translate-y-44", rules: "--tw-translate-y: 11rem;"},
    {className: "translate-y-48", rules: "--tw-translate-y: 12rem;"},
    {className: "translate-y-52", rules: "--tw-translate-y: 13rem;"},
    {className: "translate-y-56", rules: "--tw-translate-y: 14rem;"},
    {className: "translate-y-60", rules: "--tw-translate-y: 15rem;"},
    {className: "translate-y-64", rules: "--tw-translate-y: 16rem;"},
    {className: "translate-y-72", rules: "--tw-translate-y: 18rem;"},
    {className: "translate-y-80", rules: "--tw-translate-y: 20rem;"},
    {className: "translate-y-96", rules: "--tw-translate-y: 24rem;"},
    {className: "translate-y-px", rules: "--tw-translate-y: 1px;"},
    {className: "translate-y-1/2", rules: "--tw-translate-y: 50%;"},
    {className: "translate-y-1/3", rules: "--tw-translate-y: 33.333333%;"},
    {className: "translate-y-2/3", rules: "--tw-translate-y: 66.666667%;"},
    {className: "translate-y-1/4", rules: "--tw-translate-y: 25%;"},
    {className: "translate-y-2/4", rules: "--tw-translate-y: 50%;"},
    {className: "translate-y-3/4", rules: "--tw-translate-y: 75%;"},
    {className: "translate-y-full", rules: "--tw-translate-y: 100%;"},
    {className: "-translate-y-0", rules: "--tw-translate-y: 0px;"},
    {className: "-translate-y-0.5", rules: "--tw-translate-y: -0.125rem;"},
    {className: "-translate-y-1", rules: "--tw-translate-y: -0.25rem;"},
    {className: "-translate-y-1.5", rules: "--tw-translate-y: -0.375rem;"},
    {className: "-translate-y-2", rules: "--tw-translate-y: -0.5rem;"},
    {className: "-translate-y-2.5", rules: "--tw-translate-y: -0.625rem;"},
    {className: "-translate-y-3", rules: "--tw-translate-y: -0.75rem;"},
    {className: "-translate-y-3.5", rules: "--tw-translate-y: -0.875rem;"},
    {className: "-translate-y-4", rules: "--tw-translate-y: -1rem;"},
    {className: "-translate-y-5", rules: "--tw-translate-y: -1.25rem;"},
    {className: "-translate-y-6", rules: "--tw-translate-y: -1.5rem;"},
    {className: "-translate-y-7", rules: "--tw-translate-y: -1.75rem;"},
    {className: "-translate-y-8", rules: "--tw-translate-y: -2rem;"},
    {className: "-translate-y-9", rules: "--tw-translate-y: -2.25rem;"},
    {className: "-translate-y-10", rules: "--tw-translate-y: -2.5rem;"},
    {className: "-translate-y-11", rules: "--tw-translate-y: -2.75rem;"},
    {className: "-translate-y-12", rules: "--tw-translate-y: -3rem;"},
    {className: "-translate-y-14", rules: "--tw-translate-y: -3.5rem;"},
    {className: "-translate-y-16", rules: "--tw-translate-y: -4rem;"},
    {className: "-translate-y-20", rules: "--tw-translate-y: -5rem;"},
    {className: "-translate-y-24", rules: "--tw-translate-y: -6rem;"},
    {className: "-translate-y-28", rules: "--tw-translate-y: -7rem;"},
    {className: "-translate-y-32", rules: "--tw-translate-y: -8rem;"},
    {className: "-translate-y-36", rules: "--tw-translate-y: -9rem;"},
    {className: "-translate-y-40", rules: "--tw-translate-y: -10rem;"},
    {className: "-translate-y-44", rules: "--tw-translate-y: -11rem;"},
    {className: "-translate-y-48", rules: "--tw-translate-y: -12rem;"},
    {className: "-translate-y-52", rules: "--tw-translate-y: -13rem;"},
    {className: "-translate-y-56", rules: "--tw-translate-y: -14rem;"},
    {className: "-translate-y-60", rules: "--tw-translate-y: -15rem;"},
    {className: "-translate-y-64", rules: "--tw-translate-y: -16rem;"},
    {className: "-translate-y-72", rules: "--tw-translate-y: -18rem;"},
    {className: "-translate-y-80", rules: "--tw-translate-y: -20rem;"},
    {className: "-translate-y-96", rules: "--tw-translate-y: -24rem;"},
    {className: "-translate-y-px", rules: "--tw-translate-y: -1px;"},
    {className: "-translate-y-1/2", rules: "--tw-translate-y: -50%;"},
    {className: "-translate-y-1/3", rules: "--tw-translate-y: -33.333333%;"},
    {className: "-translate-y-2/3", rules: "--tw-translate-y: -66.666667%;"},
    {className: "-translate-y-1/4", rules: "--tw-translate-y: -25%;"},
    {className: "-translate-y-2/4", rules: "--tw-translate-y: -50%;"},
    {className: "-translate-y-3/4", rules: "--tw-translate-y: -75%;"},
    {className: "-translate-y-full", rules: "--tw-translate-y: -100%;"},
    {className: "skew-x-0", rules: "--tw-skew-x: 0deg;"},
    {className: "skew-x-1", rules: "--tw-skew-x: 1deg;"},
    {className: "skew-x-2", rules: "--tw-skew-x: 2deg;"},
    {className: "skew-x-3", rules: "--tw-skew-x: 3deg;"},
    {className: "skew-x-6", rules: "--tw-skew-x: 6deg;"},
    {className: "skew-x-12", rules: "--tw-skew-x: 12deg;"},
    {className: "-skew-x-12", rules: "--tw-skew-x: -12deg;"},
    {className: "-skew-x-6", rules: "--tw-skew-x: -6deg;"},
    {className: "-skew-x-3", rules: "--tw-skew-x: -3deg;"},
    {className: "-skew-x-2", rules: "--tw-skew-x: -2deg;"},
    {className: "-skew-x-1", rules: "--tw-skew-x: -1deg;"},
    {className: "skew-y-0", rules: "--tw-skew-y: 0deg;"},
    {className: "skew-y-1", rules: "--tw-skew-y: 1deg;"},
    {className: "skew-y-2", rules: "--tw-skew-y: 2deg;"},
    {className: "skew-y-3", rules: "--tw-skew-y: 3deg;"},
    {className: "skew-y-6", rules: "--tw-skew-y: 6deg;"},
    {className: "skew-y-12", rules: "--tw-skew-y: 12deg;"},
    {className: "-skew-y-12", rules: "--tw-skew-y: -12deg;"},
    {className: "-skew-y-6", rules: "--tw-skew-y: -6deg;"},
    {className: "-skew-y-3", rules: "--tw-skew-y: -3deg;"},
    {className: "-skew-y-2", rules: "--tw-skew-y: -2deg;"},
    {className: "-skew-y-1", rules: "--tw-skew-y: -1deg;"},
    {className: "appearance-none", rules: "appearance: none;"},
    {className: "cursor-auto", rules: "cursor: auto;"},
    {className: "cursor-default", rules: "cursor: default;"},
    {className: "cursor-pointer", rules: "cursor: pointer;"},
    {className: "cursor-wait", rules: "cursor: wait;"},
    {className: "cursor-text", rules: "cursor: text;"},
    {className: "cursor-move", rules: "cursor: move;"},
    {className: "cursor-not-allowed", rules: "cursor: not-allowed;"},
    {className: "outline-none", rules: "outline: 2px solid transparent; outline-offset: 2px;"},
    {className: "outline-white", rules: "outline: 2px dotted white; outline-offset: 2px;"},
    {className: "outline-black", rules: "outline: 2px dotted black; outline-offset: 2px;"},
    {className: "pointer-events-none", rules: "pointer-events: none;"},
    {className: "pointer-events-auto", rules: "pointer-events: auto;"},
    {className: "resize-none", rules: "resize: none;"},
    {className: "resize-y", rules: "resize: vertical;"},
    {className: "resize-x", rules: "resize: horizontal;"},
    {className: "resize", rules: "resize: both;"},
    {className: "select-none", rules: "user-select: none;"},
    {className: "select-text", rules: "user-select: text;"},
    {className: "select-all", rules: "user-select: all;"},
    {className: "select-auto", rules: "user-select: auto;"},
    {className: "fill-current", rules: "fill: currentColor;"},
    {className: "stroke-current", rules: "stroke: currentColor;"},
    {className: "stroke-0", rules: "stroke-width: 0;"},
    {className: "stroke-1", rules: "stroke-width: 1;"},
    {className: "stroke-2", rules: "stroke-width: 2;"},
    {className: "sr-only", rules: "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;"},
    {className: "not-sr-only", rules: "position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip: auto; white-space: normal;"},
]

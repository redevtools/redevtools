import {TwSuggestedClass} from "@/components/suggester";

const typographyPostfix = " mb-2 font-medium leading-tight"

const typography = [
    {twClass: "h1", presets: "text-4xl" + typographyPostfix},
    {twClass: "h2", presets: "text-3xl" + typographyPostfix},
    {twClass: "h3", presets: "text-2xl" + typographyPostfix},
    {twClass: "h4", presets: "text-xl" + typographyPostfix},
    {twClass: "h5", presets: "text-lg" + typographyPostfix},

]

const alertPrefix = "relative px-5 py-3 mb-4 rounded border border-transparent "
const alerts = [
    {twClass: "alert-primary", presets: alertPrefix + "text-blue-800 bg-blue-200 border-blue-300"},
    {twClass: "alert-secondary", presets: alertPrefix + "text-gray-800 bg-gray-300 border-gray-400"},
    {twClass: "alert-success", presets: alertPrefix + "text-green-800 bg-green-200 border-green-300"},
    {twClass: "alert-danger", presets: alertPrefix + "text-red-800 bg-red-200 border-red-300"},
    {twClass: "alert-error", presets: alertPrefix + "text-red-800 bg-red-200 border-red-300"},
    {twClass: "alert-warning", presets: alertPrefix + "text-yellow-800 bg-yellow-200 border-yellow-300"},
    {twClass: "alert-info", presets: alertPrefix + "text-indigo-800 bg-indigo-200 border-indigo-300"},
]

const buttonPrefix = "inline-block font-normal text-center px-3 py-2 leading-normal text-base rounded cursor-pointer "


const buttons = [
    {twClass: "button-primary-small", presets: buttonPrefix + "bg-blue-400 text-white px-1 text-sm rounded-sm hover:bg-blue-600 cursor-pointer"},
    {twClass: "button-primary", presets: buttonPrefix + "text-white bg-blue-600 hover:text-white hover:bg-blue-700"},
    {twClass: "button-secondary", presets: buttonPrefix + "text-white bg-gray-600 hover:text-white hover:bg-gray-700"},
    {twClass: "button-success", presets: buttonPrefix + "text-white bg-green-600 hover:text-white hover:bg-green-700"},
    {twClass: "button-danger", presets: buttonPrefix + "text-white bg-red-600 hover:text-white hover:bg-red-700"},
    {twClass: "button-warning", presets: buttonPrefix + "text-black bg-yellow-500 hover:text-black hover:bg-yellow-600"},
    {twClass: "button-info", presets: buttonPrefix + "text-white bg-teal-500 hover:text-white hover:bg-teal-600"},
    {twClass: "button-light", presets: buttonPrefix + "text-black bg-gray-200 hover:text-black hover:bg-gray-300"},
    {twClass: "button-dark", presets: buttonPrefix + "text-white bg-gray-900 hover:text-white hover:bg-black"},
    {twClass: "button-link", presets: buttonPrefix + "text-blue-500 hover:text-blue-800"},
]

const positions = [
    {twClass: "top-right", presets: "fixed top-1 right-1 z-10"},
    {twClass: "top-left", presets: "fixed top-1 left-1 z-10"},
    {twClass: "bottom-left", presets: "fixed bottom-1 left-1 z-10"},
    {twClass: "bottom-right", presets: "fixed bottom-1 right-1 z-10"},

]

const custom = [
    {twClass: "center-children-vertically", presets: "flex items-center flex-wrap"},
    {twClass: "basic-top-navbar", presets: "fixed top-0 left-0 w-full h-8 bg-gray-50 shadow p-1"},
    {twClass: "basic-link", presets: "mx-2 text-blue-300 hover:underline hover:text-blue-800 cursor-pointer"},
]

export const presets: TwSuggestedClass[] = [...alerts, ...typography, ...buttons, ...positions, ...custom]
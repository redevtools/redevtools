import {Suggester} from "@/components/suggester";


function expectSuggestedToContain(className: string, classNameUpToCaret: string, collectionOfClasses: string[]) {
    let suggested: { twClass: string }[] = new Suggester().suggest(className, classNameUpToCaret)
    console.log("suggested: ", className, classNameUpToCaret, suggested)
    collectionOfClasses.forEach(c => {
        expect(suggested.map(s => s.twClass)).toContain(c)
    })
    return suggested
}

test("Suggest red classes", async () => {

    let redClasses = ['text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900']

    expectSuggestedToContain("text-r", "text-r", redClasses)
    expectSuggestedToContain("text-re", "text-re", redClasses)
    expectSuggestedToContain("text-red", "text-red", redClasses)
    expectSuggestedToContain("text-red-50", "text-red-", redClasses)
    expectSuggestedToContain("text-red-50", "text-red-50", redClasses)
    expectSuggestedToContain("text-red-500", "text-red-500", redClasses)

})

test("Suggest first token classes when caret is on first token", async () => {

    let redClasses = []

    expectSuggestedToContain("text-red-500", "tex", redClasses)
    expectSuggestedToContain("text-red-500", "t", redClasses)
    expectSuggestedToContain("text-red-500", "text", redClasses)

})


test("Suggest color classes", async () => {

    let colors = ['text-gray-50', 'text-red-50', 'text-yellow-50', 'text-green-50', 'text-blue-50', 'text-indigo-50', 'text-purple-50', 'text-pink-50']

    expectSuggestedToContain("text-red-50", "text-r", colors)
    expectSuggestedToContain("text-red-50", "text-", colors)
    expectSuggestedToContain("text-red-50", "text-red", colors)

})

test("Suggest starting classes", async () => {

    expectSuggestedToContain("t", "t", ['to-transparent', 'to-current'])
    expectSuggestedToContain("te", "te", ['text-transparent', 'text-current'])
    expectSuggestedToContain("tex", "tex", ['text-transparent', 'text-current'])
    expectSuggestedToContain("text", "text", ['text-transparent', 'text-current'])
    expectSuggestedToContain("text-", "text-", ['text-transparent', 'text-current'])

})

test("Suggest for empty classNameUpToCaret", async () => {
    const classes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl']
    expectSuggestedToContain("text-sm", "", classes)

})




module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        '^.+\\.tsx?$': 'ts-jest', '^.+\\.vue$': 'vue-jest'
    }
}

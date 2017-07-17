module.exports = {
    globals: {
        __DEV__: true
    },
    unmockedModulePathPatterns: [
        '<rootDir>/node_modules/react',
        '<rootDir>/node_modules/react-dom',
        '<rootDir>/node_modules/react-addons-test-utils',
        '<rootDir>/node_modules/fbjs',
        '<rootDir>/node_modules/numeral',
        '<rootDir>/node_modules/i18next-client',
        '<rootDir>/node_modules/focus-core'
    ],
    testPathIgnorePatterns: ['/node_modules/', 'fixture.js']
} 
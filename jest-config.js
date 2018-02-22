module.exports = {
    globals: {
        __DEV__: true,
        __IS_VERTIGO__: false
    },
    automock: false,
    unmockedModulePathPatterns: [
        '<rootDir>/node_modules/prop-types',
        '<rootDir>/node_modules/create-react-class',
        '<rootDir>/node_modules/react',
        '<rootDir>/node_modules/react-dom',
        '<rootDir>/node_modules/react-addons-test-utils',
        '<rootDir>/node_modules/fbjs',
        '<rootDir>/node_modules/numeral',
        '<rootDir>/node_modules/i18next-client',
        '<rootDir>/node_modules/focus-core'
    ],
    testPathIgnorePatterns: ['/node_modules/', 'fixture.js', '.history', '.localhistory', 'test-focus.jsx'],
    transformIgnorePatterns: ['/node_modules(?!\/focus-core)/']
} 
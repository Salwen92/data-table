module.exports = {
    '**/*.{ts,tsx}': [
        // 'eslint --fix',
        'prettier --write',
        'jest --bail --findRelatedTests',
    ],
    '**/*.{html,css,js,jsx,json,yaml,yml}': ['prettier --write'],
}

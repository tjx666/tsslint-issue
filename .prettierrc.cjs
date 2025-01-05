const config = require('@yutengjing/prettier-config');

/** @type {import('prettier').Config} */
module.exports = {
    ...config,
    quoteProps: 'as-needed',
    overrides: [
        ...config.overrides,
        {
            files: '.cursorrules',
            options: {
                parser: 'markdown',
                tabWidth: 2,
            },
        },
        {
            // for .markdownlint.jsonc
            files: '*.jsonc',
            options: {
                trailingComma: 'none',
            },
        },
    ],
};

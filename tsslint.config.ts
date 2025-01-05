import { createIgnorePlugin, defineConfig } from '@tsslint/config';
import { convertConfig, createShowDocsActionPlugin } from '@tsslint/eslint';

export default defineConfig({
    exclude: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', './.next/**/*.ts'],
    plugins: [
        createIgnorePlugin('@tsslint-ignore', false),
        createIgnorePlugin('@tsslint-expect-error', true),
        createShowDocsActionPlugin(),
    ],
    rules: convertConfig({
        // '@typescript-eslint/ban-ts-comment': 'error',
        // '@typescript-eslint/no-explicit-any': 'error',
        // '@typescript-eslint/no-floating-promises': 'suggestion',
        // '@typescript-eslint/no-misused-promises': 'error',
        // '@typescript-eslint/no-unsafe-argument': 'error',
        // '@typescript-eslint/no-unsafe-assignment': 'error',
        // '@typescript-eslint/no-unsafe-call': 'error',
        // '@typescript-eslint/no-unsafe-member-access': 'error',
        // '@typescript-eslint/no-unsafe-return': 'error',
        // '@typescript-eslint/no-unused-vars': 'error',
        // '@typescript-eslint/ban-types': 'error',

        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/consistent-type-exports': 'error',
        'no-array-constructor': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-loss-of-precision': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unnecessary-type-constraint': 'error',
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/require-await': 'suggestion',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/return-await': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/unbound-method': 'error',

        // none official recommended
        '@typescript-eslint/prefer-destructuring': [
            'error',
            {
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
            },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
    }),
});

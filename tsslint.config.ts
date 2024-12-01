import { createRequire } from 'module';
import path from 'path';

import type { Plugin } from '@tsslint/config';
import { defineConfig } from '@tsslint/config';
import { convertRule } from '@tsslint/eslint';

type ESLintRules = Record<string, [number, ...any[]]>;
const suggestion = 0;
const error = 1;

/**
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-type-checked.ts
 */
const rules: ESLintRules = {
    // 'ban-ts-comment': [error],
    // 'no-explicit-any': [error],
    // 'no-floating-promises': [suggestion],
    // 'no-misused-promises': [error],
    // 'no-unsafe-argument': [error],
    // 'no-unsafe-assignment': [error],
    // 'no-unsafe-call': [error],
    // 'no-unsafe-member-access': [error],
    // 'no-unsafe-return': [error],
    // 'no-unused-vars': [error],
    // 'ban-types': [error],

    'await-thenable': [error],
    'consistent-type-exports': [error],
    'no-array-constructor': [error],
    'no-base-to-string': [error],
    'no-duplicate-enum-values': [error],
    'no-duplicate-type-constituents': [error],
    'no-extra-non-null-assertion': [error],
    'no-for-in-array': [error],
    'no-implied-eval': [error],
    'no-loss-of-precision': [error],
    'no-misused-new': [error],
    'no-namespace': [error],
    'no-non-null-asserted-optional-chain': [error],
    'no-redundant-type-constituents': [error],
    'no-this-alias': [error],
    'no-unnecessary-type-assertion': [error],
    'no-unnecessary-type-constraint': [error],
    'no-unsafe-declaration-merging': [error],
    'no-unsafe-enum-comparison': [error],
    'no-var-requires': [error],
    'prefer-as-const': [error],
    'prefer-optional-chain': [error],
    'require-await': [suggestion],
    'restrict-plus-operands': [error],
    'restrict-template-expressions': [error],
    'return-await': [error],
    'triple-slash-reference': [error],
    'unbound-method': [error],

    // none official recommended
    'prefer-destructuring': [
        error,
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
};

export default defineConfig({
    exclude: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    plugins: [
        createIgnorePlugin(/\/\/ tsslint-disable-next-line.*\n/g),
        createIgnorePlugin(/\/\/ eslint-disable-next-line.*\n/g),
    ],
    rules: await convertESLintRulesToTSSLint(rules),
});

/**
 * @see https://github.com/johnsoncodehk/tsslint/issues/10#issuecomment-2169565542
 */
async function convertESLintRulesToTSSLint(rules: ESLintRules) {
    const require = createRequire(import.meta.url);
    const rulesDir = path.dirname(require.resolve('@typescript-eslint/eslint-plugin/package.json'));
    return Object.fromEntries(
        await Promise.all(
            Object.entries(rules).map(async ([ruleName, [severity, ...options]]) => {
                const rulePath = path.join(rulesDir, 'dist', 'rules', `${ruleName}.js`);
                return [
                    ruleName,
                    convertRule((await import(rulePath)).default.default, options, severity),
                ];
            }),
        ),
    );
}

function createIgnorePlugin(pattern: RegExp): Plugin {
    return ({ languageService }) => ({
        resolveDiagnostics(fileName, results) {
            const sourceFile = languageService.getProgram()?.getSourceFile(fileName);
            if (!sourceFile) {
                return results;
            }
            const comments = [...sourceFile.text.matchAll(pattern)];
            const lines = new Set(
                comments.map(
                    (comment) => sourceFile.getLineAndCharacterOfPosition(comment.index).line,
                ),
            );
            return results.filter(
                (result) =>
                    !lines.has(sourceFile.getLineAndCharacterOfPosition(result.start).line - 1),
            );
        },
    });
}

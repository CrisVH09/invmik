import { execFileSync } from 'node:child_process';
import {
    copyFileSync,
    cpSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync,
} from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const event = JSON.parse(
    execFileSync(
        'php',
        ['-r', "echo json_encode(require 'config/birthday.php');"],
        { encoding: 'utf8' },
    ),
);
for (const key of Object.keys(event)) {
    if (key.toLowerCase().endsWith('image'))
        event[key] = `./${event[key].replace(/^\//, '')}`;
}
const escape = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[character]!,
    );
const title = escape(`${event.name} cumple ${event.age} | Capy Basketball`);
// Font stylesheet is emitted separately by the existing Laravel build.
import { readdirSync } from 'node:fs';
const fontCss = readdirSync('public/build/assets').find((name) =>
    /^fonts-.*\.css$/.test(name),
);
if (!fontCss)
    throw new Error('Run npm run build first to generate local fonts.');

export default defineConfig({
    root: '.',
    base: './',
    publicDir: false,
    define: { __BIRTHDAY_EVENT__: JSON.stringify(event) },
    plugins: [
        react(),
        {
            name: 'birthday-pages',
            transformIndexHtml(html) {
                return html.replace(
                    '</head>',
                    `<title>${title}</title><meta property="og:title" content="${title}" /><meta property="og:image" content="https://crisvh09.github.io/invmik/images/capy-8.png" /><link rel="stylesheet" href="./assets/${fontCss}" /></head>`,
                );
            },
            closeBundle() {
                const output = resolve('docs');
                const generated = resolve(output, 'pages/index.html');
                if (!existsSync(generated))
                    throw new Error('Missing generated invitation.');
                // Vite nests an HTML entry under pages; publish it at the Pages root.
                writeFileSync(
                    resolve(output, 'index.html'),
                    readFileSync(generated, 'utf8').replaceAll(
                        '../assets/',
                        './assets/',
                    ),
                );
                mkdirSync(resolve(output, 'assets'), { recursive: true });
                for (const name of readdirSync('public/build/assets')) {
                    if (
                        /\.(woff2?|css)$/.test(name) &&
                        (name === fontCss || /\.woff2?$/.test(name))
                    )
                        copyFileSync(
                            resolve('public/build/assets', name),
                            resolve(output, 'assets', name),
                        );
                }
                cpSync('public/images', resolve(output, 'images'), {
                    recursive: true,
                });
                writeFileSync(
                    resolve(output, 'assets', fontCss!),
                    readFileSync(
                        resolve('public/build/assets', fontCss!),
                        'utf8',
                    ).replaceAll('/build/assets/', './'),
                );
                writeFileSync(resolve(output, '.nojekyll'), '');
            },
        },
    ],
    build: {
        outDir: 'docs',
        emptyOutDir: false,
        rollupOptions: { input: 'pages/index.html' },
    },
});

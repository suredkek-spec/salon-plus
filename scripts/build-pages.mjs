import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const root = process.cwd();
const temp = path.join(root, '.pages-build');
const output = path.join(root, 'docs');
fs.mkdirSync(temp, { recursive: true });
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(temp, 'package.json'), '{"type":"commonjs"}');
for (const file of ['data.ts', 'page.tsx', 'layout.tsx']) {
  const source = fs.readFileSync(path.join(root, 'app', file), 'utf8').replace(/import ['"]\.\/globals\.css['"];?/, '');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    fileName: file,
  });
  fs.writeFileSync(path.join(temp, file.replace(/\.tsx?$/, '.js')), compiled.outputText);
}
const require = createRequire(import.meta.url);
const Page = require(path.join(temp, 'page.js')).default;
const { default: Layout, metadata } = require(path.join(temp, 'layout.js'));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
const head = `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(metadata.title)}</title><meta name="description" content="${escape(metadata.description)}"><link rel="icon" href="./favicon.svg"><link rel="stylesheet" href="./styles.css"></head>`;
const rendered = renderToStaticMarkup(React.createElement(Layout, null, React.createElement(Page)));
const html = '<!doctype html>' + (rendered.includes('<head>') ? rendered.replace('<head>', head.slice(0, -7)) : rendered.replace('<html lang="ru">', '<html lang="ru">' + head));
fs.writeFileSync(path.join(output, 'index.html'), html);
fs.writeFileSync(path.join(output, 'styles.css'), fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8').replace(/^@import[^;]+;\s*/gm, ''));
fs.copyFileSync(path.join(root, 'public/favicon.svg'), path.join(output, 'favicon.svg'));
fs.cpSync(path.join(root, 'public/images'), path.join(output, 'images'), { recursive: true });
fs.writeFileSync(path.join(output, '.nojekyll'), '');
fs.rmSync(temp, { recursive: true, force: true });
if (!html.includes('Мужская стрижка') || /маникюр|педикюр/i.test(html)) throw new Error('Unexpected site content');
console.log('GitHub Pages site built in docs/');


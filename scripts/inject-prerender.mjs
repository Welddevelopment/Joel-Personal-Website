import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {renderSeoPage} from '../.seo-ssr/ssr-entry.mjs';

const outputPath=resolve('dist/index.html');
const document=await readFile(outputPath,'utf8');
const prerenderedRoot=`<div id="root" data-prerendered="true">${renderSeoPage()}</div>`;

if(!document.includes('<div id="root"></div>')){
  throw new Error('Could not find the root mount in dist/index.html');
}

await writeFile(outputPath,document.replace('<div id="root"></div>',prerenderedRoot));

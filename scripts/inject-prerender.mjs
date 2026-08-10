import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {renderSeoPage,renderTechnicalPage} from '../.seo-ssr/ssr-entry.mjs';

async function inject(relativePath,markup){
  const outputPath=resolve(relativePath);
  const document=await readFile(outputPath,'utf8');
  const prerenderedRoot=`<div id="root" data-prerendered="true">${markup}</div>`;

  if(!document.includes('<div id="root"></div>')){
    throw new Error(`Could not find the root mount in ${relativePath}`);
  }

  await writeFile(outputPath,document.replace('<div id="root"></div>',prerenderedRoot));
}

await inject('dist/index.html',renderSeoPage());
await inject('dist/capability-factory/index.html',renderTechnicalPage('capability-factory'));
await inject('dist/dynamic-agent-specialisation/index.html',renderTechnicalPage('dynamic-agent-specialisation'));

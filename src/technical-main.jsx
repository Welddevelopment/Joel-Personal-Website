import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import {TECHNICAL_ARTICLES,TechnicalArticle} from './TechnicalArticle';

const slug=window.location.pathname.split('/').filter(Boolean)[0]||'capability-factory';
const article=TECHNICAL_ARTICLES[slug]||TECHNICAL_ARTICLES['capability-factory'];
const root=document.getElementById('root');
const page=<TechnicalArticle article={article}/>;

if(root.dataset.prerendered==='true')hydrateRoot(root,page);
else createRoot(root).render(page);

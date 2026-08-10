import React from 'react';
import {renderToString} from 'react-dom/server';
import {DesignLab} from './DesignLab';
import {TECHNICAL_ARTICLES,TechnicalArticle} from './TechnicalArticle';

export function renderSeoPage(){
  return renderToString(<DesignLab direction="hybrid" labMode={false}/>);
}

export function renderTechnicalPage(slug){
  return renderToString(<TechnicalArticle article={TECHNICAL_ARTICLES[slug]}/>);
}

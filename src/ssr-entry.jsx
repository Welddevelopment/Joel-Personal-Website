import React from 'react';
import {renderToString} from 'react-dom/server';
import {DesignLab} from './DesignLab';
import {JawadBaseline} from './JawadBaseline';
import {TECHNICAL_ARTICLES,TechnicalArticle} from './TechnicalArticle';

export function renderSeoPage(){
  return renderToString(<JawadBaseline/>);
}

export function renderTechnicalPage(slug){
  return renderToString(<TechnicalArticle article={TECHNICAL_ARTICLES[slug]}/>);
}

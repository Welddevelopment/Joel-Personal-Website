import React from 'react';
import {renderToString} from 'react-dom/server';
import {DesignLab} from './DesignLab';

export function renderSeoPage(){
  return renderToString(<DesignLab direction="hybrid" labMode={false}/>);
}

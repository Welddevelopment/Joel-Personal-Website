import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {JawadBaseline} from './JawadBaseline';
import './jawad-baseline.css';

if (new URLSearchParams(location.search).has('direction')) {
  import('./main.jsx');
} else {
  const root = document.getElementById('root');
  const page = <JawadBaseline/>;
  if (root.dataset.prerendered === 'true') hydrateRoot(root, page);
  else createRoot(root).render(page);
}

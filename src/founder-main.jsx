import React from 'react';
import {createRoot} from 'react-dom/client';
import {FOUNDER_INTRO_PROFILES, RaehyeonIntro} from './RaehyeonIntro';
import './raehyeon.css';

const slug = window.location.pathname.split('/').filter(Boolean)[0];
const profile = FOUNDER_INTRO_PROFILES[slug] || FOUNDER_INTRO_PROFILES.raehyeon;

createRoot(document.getElementById('root')).render(<RaehyeonIntro profile={profile}/>);

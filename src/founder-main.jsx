import React from 'react';
import {createRoot} from 'react-dom/client';
import {FounderOutreach, FOUNDER_PROFILES} from './FounderOutreach';
import './founder-outreach.css';

const slug = window.location.pathname.split('/').filter(Boolean)[0];
const profile = FOUNDER_PROFILES[slug] || FOUNDER_PROFILES.heeyoung;

createRoot(document.getElementById('root')).render(<FounderOutreach profile={profile}/>);

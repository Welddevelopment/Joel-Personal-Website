import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const work = [
  {index:'01',eyebrow:'FIRST HACKATHON',title:'Pop the Bubble',meta:'36 hours · 12% acceptance · £10k top prize',body:'A few weeks into coding, with EWOR judges and the largest prize in London, I built Synapse—an AI growth-analytics tool. Youngest person there, and I barely made it through. But I finished.',tone:'acid'},
  {index:'02',eyebrow:'SECOND PLACE',title:'GTM Hack',meta:'Lightfern track · ~150 people',body:"Built the Voiceprint Funnel with my friend Jawad. We placed second—and the two of us were the only people in the room who weren’t university students.",tone:'blue'},
  {index:'03',eyebrow:'SECOND · SOLO · TWO CATEGORIES',title:'LicenseTrace',meta:'Multiagents Hack London · £300 + £15k credits',body:'An agent that traces hidden open-source license contamination through a dependency tree and proves the exact path. I built it solo and placed second across two sponsor categories.',tone:'orange'}
];

function Arrow(){return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 16h21M18 8l8 8-8 8"/></svg>}

function App(){
  const root=useRef(null); const [copied,setCopied]=useState(false);
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const safety=window.setTimeout(()=>{const overlay=document.querySelector('.intro');if(overlay){overlay.style.display='none';document.body.style.overflow=''}},5500);const ctx=gsap.context(()=>{
    const intro=gsap.timeline({defaults:{ease:'power4.inOut'}});
    intro.set(document.body,{overflow:'hidden'})
      .from('.intro-word span',{yPercent:120,duration:.9,stagger:.06})
      .from('.intro-crosshair',{scale:0,rotate:-180,duration:1},'<.1')
      .to('.intro-progress i',{scaleX:1,duration:1.25,ease:'power2.inOut'},'<')
      .to('.intro-word span',{yPercent:-115,duration:.7,stagger:.035},'+=.15')
      .to('.intro-panel-a',{yPercent:-100,duration:1.1},'<.05')
      .to('.intro-panel-b',{yPercent:100,duration:1.1},'<')
      .to('.intro',{autoAlpha:0,duration:.1})
      .set(document.body,{overflow:''})
      .from('.hero-line',{yPercent:110,rotate:2,duration:1.15,stagger:.1},'-=.35')
      .from('.hero-support, .nav, .hero-kicker',{opacity:0,y:20,duration:.75,stagger:.1},'-=.75');
    gsap.to('.page-progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:'main',start:'top top',end:'bottom bottom',scrub:.2}});
    gsap.from('.proof-item',{y:50,opacity:0,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:'.proof-ledger',start:'top 82%'}});
    gsap.to('.hero-orbit',{rotate:140,scale:1.12,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
    gsap.utils.toArray('.reveal-copy').forEach(el=>gsap.from(el,{opacity:.12,scrollTrigger:{trigger:el,start:'top 78%',end:'bottom 50%',scrub:true}}));
    const cards=gsap.utils.toArray('.work-card'); cards.forEach((card,i)=>gsap.to(card,{scale:1-(cards.length-i)*.025,scrollTrigger:{trigger:card,start:'top 11%',end:'bottom top',scrub:true}}));
    gsap.to('.now-rail',{xPercent:-49,ease:'none',scrollTrigger:{trigger:'.now',start:'top top',end:'+=1700',pin:true,scrub:1,anticipatePin:1}});
    gsap.from('.future-main span',{yPercent:120,stagger:.08,scrollTrigger:{trigger:'.future',start:'top 60%',end:'center center',scrub:1}});
  },root); return()=>{window.clearTimeout(safety);ctx.revert();document.body.style.overflow=''}},[]);
  const copy=async()=>{await navigator.clipboard.writeText('joeljeon7@gmail.com');setCopied(true);setTimeout(()=>setCopied(false),1800)};
  return <main ref={root}>
    <div className="intro" aria-hidden="true"><div className="intro-panel intro-panel-a"/><div className="intro-panel intro-panel-b"/><div className="intro-crosshair"><i/><i/></div><div className="intro-code">JJ / DIGITAL ARCHIVE<br/>EST. 2026 — LDN</div><div className="intro-word"><span>J</span><span>O</span><span>E</span><span>L</span></div><div className="intro-progress"><span>INITIALISING FRONTIER</span><i/></div></div>
    <nav className="nav"><a className="monogram" href="#top">JJ<span>®</span></a><div className="nav-center"><a href="#story">Story</a><a href="#work">Work</a><a href="#contact">Contact</a></div><a className="available" href="mailto:joeljeon7@gmail.com"><i/>Open to conversations</a><span className="page-progress"/></nav>

    <header className="hero" id="top"><div className="hero-orbit"><span/><span/><span/></div><div className="hero-coordinate">51.5072° N<br/>0.1276° W</div><div className="hero-kicker">Founder · Builder · Growth & GTM<br/>London / 2026</div><h1><span className="clip"><span className="hero-line">I build what</span></span><span className="clip italic"><span className="hero-line">I can’t stop</span></span><span className="clip"><span className="hero-line">thinking about.</span></span></h1><div className="hero-support"><p>I’m Joel. I’m 15. A month after I learned what a startup was, I was working at one.</p><a className="round-link" href="#story" aria-label="Read the story"><Arrow/></a></div><div className="scroll-cue">SCROLL TO START <span/></div><div className="hero-index">AETHER / PERSONAL ARCHIVE / 001</div></header>

    <section className="proof-ledger" aria-label="At a glance"><div className="proof-title">THE SIGNAL<br/><span>Before the story.</span></div><a className="proof-item" href="#now"><span>OPERATING</span><strong>Leading GTM</strong><small>Tsenta · YC S26</small></a><a className="proof-item" href="#work"><span>BUILDING</span><strong>From zero to shipped</strong><small>Self-taught in public</small></a><a className="proof-item" href="#work"><span>COMPETING</span><strong>Two second places</strong><small>Youngest in the room</small></a></section>

    <section className="manifesto" id="story"><div className="manifesto-aside">The shortest version<br/>of a long story.</div><p className="reveal-copy">While most people my age were playing Roblox, I was looking at it and seeing a gap: thousands of developers and studios, with no real way to find each other.</p><p className="reveal-copy accent-copy">So I built <em>weld.</em></p></section>

    <section className="origin"><div className="origin-sticky"><span>ONE IDEA</span><strong>Zero lines<br/>of code.</strong></div><div className="origin-copy"><p>I’d never written a line of code. I taught myself because the thing needed to exist—and shipped the landing page the same day I started coding.</p><blockquote>“That was the first code I ever wrote.”</blockquote><p><em>weld.</em> never found a business model, so I killed it. But it left me with the one skill that’s mattered ever since:</p><div className="statement">I can build the thing I imagine.</div></div></section>

    <section className="audit-story"><div className="signal">10<span>+</span><small>hours a day</small></div><div><h2>I made myself<br/><i>impossible to dismiss.</i></h2><p>Barely a month after I figured out what a startup even was, I was doing Growth at a YC-backed company. I didn’t apply through a form.</p><p>I spent my holiday break sending YC founders unsolicited growth audits—one company per day, specific teardowns of exactly what I’d fix. Until one of them said yes.</p></div></section>

    <section className="now" id="now"><div className="now-head"><span>WHAT I’M DOING NOW</span><span>DRAGGED BY SCROLL →</span></div><div className="now-rail"><article><b>01</b><h2>Leading GTM at <i>Tsenta</i></h2><p>YC S26. An AI job-application tool. I build the things I strategise—like a “doom timer” that tells job seekers how long their search will take and quietly funnels them into the product.</p></article><article><b>02</b><h2>Building on the side</h2><p>An 11+ tutoring agency I co-founded, and an open-source developer tool I’m building in the open.</p></article><article><b>03</b><h2>Shipping, then learning</h2><p>Now I lead GTM there. On the side I keep showing up to hackathons. Ship fast, cut what doesn’t work, start the next thing.</p></article></div></section>

    <section className="selected" id="work"><div className="selected-intro"><span>SELECTED WORK</span><h2>Proof over<br/><i>potential.</i></h2><p>Three rooms. Very little sleep. A useful habit of finishing.</p></div><div className="work-stack">{work.map(x=><article className={`work-card ${x.tone}`} key={x.index}><div className="card-top"><span>{x.index}</span><span>{x.eyebrow}</span></div><div className="card-mark" aria-hidden="true">{x.index}</div><div className="card-body"><div><h3>{x.title}</h3><p className="meta">{x.meta}</p></div><p>{x.body}</p></div></article>)}</div></section>

    <section className="future"><div className="future-top">WHERE THIS GOES <span>↓</span></div><p>Building isn’t a side thing—it’s the thing. I put in 8 hours a day on schooldays, after school and around it.</p><h2 className="future-main"><span>The plan:</span><span>finish GCSEs,</span><span>drop out,</span><span>go to YC.</span></h2><p className="not-backup">Not a backup plan. The plan.</p></section>

    <footer id="contact"><div className="footer-kicker">HAVE SOMETHING WORTH BUILDING?</div><h2>Say <i>hi.</i></h2><button onClick={copy}>{copied?'Copied to clipboard':'joeljeon7@gmail.com'} <Arrow/></button><div className="footer-bottom"><div className="links"><a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://x.com/JoelJeonDev" target="_blank" rel="noreferrer">X / Twitter ↗</a><span className="linkedin-dead"><del>LinkedIn</del><b>Age-gated by LinkedIn</b></span></div><p>About LinkedIn: I hit 1k followers in under a month, connected with YC founders and Forbes 30-under-30s—and then got banned for being underage. Fastest growth curve I’ve ever killed without meaning to.</p><small>Built in an afternoon. Rebuilt with intent. 2026.</small></div></footer>
  </main>
}
createRoot(document.getElementById('root')).render(<App/>);

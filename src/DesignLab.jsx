import React,{useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects=[
  {n:'01',title:'weld.',art:'/work-weld.png',meta:'First product / Roblox talent marketplace',copy:'A marketplace for Roblox developers and studios. I taught myself to code to build it, shipped the landing page on day one, then killed it when the business model did not hold.'},
  {n:'02',title:'Pop the Bubble',art:'/work-pop-the-bubble.png',meta:'36 hours / 12% acceptance / £10k top prize',copy:'A few weeks into coding, I built Synapse, an AI growth-analytics tool, for the largest hackathon prize in London. Youngest person there. I barely made it through, but I finished.'},
  {n:'03',title:'GTM Hack',art:'/work-gtm-hack-v2.png',meta:'Lightfern track / ~150 people / second place',copy:'Built the Voiceprint Funnel with my friend Jawad. We were the only two people in the room who were not university students.'},
  {n:'04',title:'LicenseTrace',art:'/work-license-trace-v2.png',meta:'Solo / two sponsor categories / second place',copy:'An agent that traces hidden open-source license contamination through a dependency tree and proves the exact path. £300 cash and £15k in ontology-AI credits.'}
];

const directionCopy={
  arc:{mark:'A-R-C / JOEL',index:'CONSTRUCTING THE IMPROBABLE',hero:['Build the thing.','Prove it','in public.'],verb:'construct'},
  lumen:{mark:'JOEL JEON / ATELIER',index:'A STUDY IN MOMENTUM',hero:['Ideas, made','real before','permission.'],verb:'shape'},
  spatial:{mark:'JJ / OBSERVATION NODE',index:'FOUNDER SIGNAL / ACTIVE',hero:['I move from','possibility','to proof.'],verb:'map'},
  hybrid:{mark:'JJ / WORK IN PUBLIC',index:'FOUNDER SIGNAL / ACTIVE',hero:['Build first.','Talk after.','Repeat.'],verb:'prove'}
};

function LabArrow(){return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 16h23M19 8l8 8-8 8"/></svg>}

function PortalHero(){return <header className="portal-hero" id="top">
  <div className="portal-identity">
    <div className="portal-orbit" aria-hidden="true"><i/><i/><i/></div>
    <h1><span className="portal-title-line">Build first.</span><span className="portal-title-line">Talk after.</span><span className="portal-title-line">Repeat.</span></h1>
    <p>I build infrastructure for capable, verifiable AI agents: specialists, capabilities, and systems that check real outcomes.</p>
    <div className="portal-direct"><a href="mailto:joeljeon7@gmail.com">joeljeon7@gmail.com</a><a href="https://github.com/Welddevelopment" target="_blank" rel="noreferrer">GitHub ↗</a></div>
  </div>
  <nav className="portal-grid" aria-label="Explore Joel's work">
    <a className="portal-card portal-work" href="#work"><span>Past Work</span><strong>weld. + hackathons</strong><small>One product. Three builds under pressure.</small><b>↘</b></a>
    <a className="portal-card portal-current" href="#now"><span>Current Work</span><strong>DAS + Capability Factory</strong><small>Specialists, capabilities, verified outcomes.</small><b>↘</b></a>
    <a className="portal-card portal-story" href="#story"><span>Founder Story</span><strong>How I started.</strong><small>From no code to shipped.</small><b>↘</b></a>
    <a className="portal-card portal-contact" href="mailto:joeljeon7@gmail.com"><span>Contact Me</span><strong>Email me</strong><small>Usually the fastest route.</small><b>↗</b></a>
  </nav>
</header>}

export function DesignLab({direction,labMode=true}){
  const root=useRef(null);const [copied,setCopied]=useState(false);const d=directionCopy[direction];
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const safety=setTimeout(()=>{const intro=document.querySelector('.lab-intro');if(intro)intro.style.display='none';document.body.style.overflow=''},5200);const ctx=gsap.context(()=>{
    const tl=gsap.timeline({defaults:{ease:'power4.inOut'}}).set(document.body,{overflow:'hidden'});
    if(direction==='arc')tl.from('.arc-slab',{scaleX:0,transformOrigin:'left',duration:.85,stagger:.1}).from('.lab-intro-name span',{yPercent:120,duration:.7,stagger:.045},'<.25').to('.arc-slab',{scaleX:0,transformOrigin:'right',duration:.85,stagger:.08},'+=.35');
    if(direction==='hybrid')tl.from('.arc-slab',{scaleX:0,transformOrigin:'left',duration:.85,stagger:.1}).from('.hybrid-rail',{scaleX:0,transformOrigin:'left',duration:.65,stagger:.12},'<.28').from('.lab-intro-name span',{yPercent:125,rotate:2,duration:.8,stagger:.055},'<.08').from('.hybrid-counter',{opacity:0,y:12,duration:.45},'<.3').to('.hybrid-rail.a',{xPercent:100,duration:.65},'+=.28').to('.hybrid-rail.b',{xPercent:-100,duration:.65},'<').to('.lab-intro-name span',{yPercent:-125,rotate:-2,duration:.72,stagger:.045},'<.02').to('.arc-slab',{scaleX:0,transformOrigin:'right',duration:.78,stagger:.075},'<.2').to('.lab-intro',{clipPath:'inset(0 0 100% 0)',duration:.72},'<.06');
    if(direction==='lumen')tl.from('.lumen-shutter',{scaleY:0,transformOrigin:'top',duration:1,stagger:.08}).from('.lab-intro-name span',{opacity:0,filter:'blur(16px)',y:25,duration:1,stagger:.05},'<.2').to('.lumen-shutter',{scaleY:0,transformOrigin:'bottom',duration:1,stagger:.08},'+=.25');
    if(direction==='spatial')tl.from('.spatial-ring',{scale:0,opacity:0,duration:1.25,stagger:.12,ease:'expo.out'}).from('.spatial-scan',{scaleY:0,transformOrigin:'top',duration:1},'<').from('.lab-intro-name span',{opacity:0,y:18,duration:.7,stagger:.05},'<.4').to('.lab-intro',{clipPath:'inset(50% 0 50% 0)',duration:1},'+=.3');
    tl.to('.lab-intro',{autoAlpha:0,duration:.12}).set(document.body,{overflow:''});
    if(labMode)tl.from('.lab-hero-line',{yPercent:115,rotate:1.5,duration:1.05,stagger:.1},'-=.25').from('.lab-nav',{opacity:0,duration:.7},'-=.65').from('.lab-hero-copy,.lab-hero-index',{opacity:0,y:18,duration:.7,stagger:.08},'<.08');
    else tl.from('.portal-title-line',{yPercent:115,rotate:1,duration:.9,stagger:.08},'-=.2').from('.portal-card',{opacity:0,y:24,scale:.985,duration:.7,stagger:.055},'<.18').from('.portal-direct,.portal-identity>p',{opacity:0,y:14,duration:.55,stagger:.06},'<.12').from('.lab-nav',{opacity:0,duration:.5},'<');
    gsap.to('.lab-progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom bottom',scrub:.2}});
    const heroVisual=labMode?'.lab-visual-core':'.portal-orbit';const heroTrigger=labMode?'.lab-hero':'.portal-hero';gsap.to(heroVisual,{rotate:direction==='arc'?145:-90,scale:1.08,scrollTrigger:{trigger:heroTrigger,start:'top top',end:'bottom top',scrub:1}});
    gsap.utils.toArray('.lab-reveal').forEach(el=>gsap.from(el,{y:70,opacity:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%'}}));
    gsap.utils.toArray('.lab-project').forEach((el,i)=>gsap.to(el,{scale:1-(projects.length-i)*.018,scrollTrigger:{trigger:el,start:'top 11%',end:'bottom top',scrub:true}}));
    gsap.utils.toArray('.lab-project-art').forEach(el=>gsap.fromTo(el,{scale:1.075},{scale:1,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'top 11%',scrub:1}}));
  },root);return()=>{clearTimeout(safety);ctx.revert();document.body.style.overflow=''}},[direction,labMode]);
  const copy=async()=>{await navigator.clipboard.writeText('joeljeon7@gmail.com');setCopied(true);setTimeout(()=>setCopied(false),1600)};
  return <main className={`lab lab-${direction}`} ref={root}>
    <div className="lab-intro" aria-hidden="true">
      <div className="arc-slab a"/><div className="arc-slab b"/><div className="arc-slab c"/>
      <div className="hybrid-rail a"/><div className="hybrid-rail b"/><div className="hybrid-counter">00&nbsp;&nbsp;→&nbsp;&nbsp;01</div>
      <div className="lumen-shutter a"/><div className="lumen-shutter b"/><div className="lumen-shutter c"/>
      <div className="spatial-ring a"/><div className="spatial-ring b"/><div className="spatial-ring c"/><div className="spatial-scan"/>
      <div className="lab-intro-code">{labMode?`IDENTITY STUDY / ${direction.toUpperCase()}`:'JOEL JEON / FOUNDER-BUILDER'}<br/>LONDON / 2026</div>
      <div className="lab-intro-name">{'JOEL'.split('').map((x,i)=><span key={i}>{x}</span>)}</div>
    </div>
    <nav className="lab-nav"><a className="lab-mark" href={labMode?`?direction=${direction}#top`:'#top'}>{d.mark}</a><div className="lab-nav-links">{labMode?<><a href="#story">Story</a><a href="#work">Work</a><a href="#contact">Contact</a></>:<><a href="#now">Current Work</a><a href="#work">Past Work</a><a href="#story">Founder Story</a><a href="mailto:joeljeon7@gmail.com">Contact Me</a></>}</div>{labMode?<div className="lab-switch"><a href="?direction=aether">Aether</a><a className={direction==='arc'?'active':''} href="?direction=arc">ARC</a><a className={direction==='lumen'?'active':''} href="?direction=lumen">Lumen</a><a className={direction==='spatial'?'active':''} href="?direction=spatial">Spatial</a><a className={direction==='hybrid'?'active':''} href="?direction=hybrid">Hybrid</a></div>:<a className="lab-home" href="#top" aria-label="Back to the top of the page">Home / Back to top</a>}<i className="lab-progress"/></nav>
    {labMode?<header className="lab-hero" id="top"><div className="lab-grid"/><div className="lab-visual"><div className="lab-visual-core"><i/><i/><i/><span/></div></div><div className="lab-hero-index">{d.index}<br/>LONDON · 51.5072° N</div><h1>{d.hero.map((line,i)=><span className={`lab-clip l${i}`} key={line}><span className="lab-hero-line">{line}</span></span>)}</h1><div className="lab-hero-copy"><p>I’m Joel. I’m 15. A month after I learned what a startup was, I was working at one.</p><a href="#proof" aria-label="See the evidence"><LabArrow/></a></div><div className="lab-scroll">SCROLL / OR CHOOSE A CHAPTER</div></header>:<PortalHero/>}
    <section className="lab-proof" id="proof"><div className="lab-proof-lead"><span>THE EVIDENCE</span><strong>Built, then<br/>verified.</strong></div><a href="#now"><span>CURRENT</span><strong>Dynamic Agent Specialisation</strong><small>Private local prototype</small></a><a href="#now"><span>TESTED</span><strong>Three fictional roles</strong><small>Separate outcome verification</small></a><a href="#now"><span>DISCIPLINE</span><strong>250+ local checks</strong><small>No unproved upgrades</small></a></section>
    <section className="lab-now lab-das" id="now"><div><span>CURRENT WORK</span><h2>Dynamic Agent<br/>Specialisation.</h2></div><p>DAS takes a bounded business role, builds several complete specialist-agent configurations, tests them against independently checked outcomes, and recommends the strongest safe option only when the evidence justifies switching.</p><p>The private local prototype has been exercised across procurement, SaaS support, and CRM/revenue operations, with more than 250 automated checks. No real customer system has been activated. I also work on Growth/GTM and growth-engineering experiments at Tsenta (YC S26).</p></section>
    <section className="lab-audit" id="system"><div className="lab-audit-mark">6</div><div className="lab-reveal"><span>CAPABILITY FACTORY / SIX DAYS</span><h2>A missing ability should not end the goal.</h2><p>Capability Factory lets an agent diagnose a missing ability, acquire or reuse the smallest permissioned capability, independently verify the result, and resume its goal. It is a working local pilot MVP for constrained HTTP APIs, tested only with fictional data.</p><a className="lab-audit-link" href="https://capability-factory-website.vercel.app" target="_blank" rel="noreferrer">Visit Capability Factory ↗</a></div></section>
    <section className="lab-future"><span>FUTURE ARCHITECTURE</span><p>DAS and Capability Factory are separate products today. Longer term, a bounded Fleet Brain could coordinate specialists against company goals, call for new capabilities, verify external outcomes, and stop for human authority.</p><h2>Build specialists.<br/>Give them abilities.<br/><em>Coordinate the fleet.</em></h2><small>The Agent Fleet Brain is a plan, not a built product. YC at 16 remains my personal target.</small></section>
    <section className="lab-work" id="work"><div className="lab-work-head"><span>PAST WORK</span><h2>Things I built.</h2><p>weld. first, then three hackathons under pressure.</p></div><div className="lab-projects">{projects.map(p=><article className="lab-project" key={p.n}><img className="lab-project-art" src={p.art} alt="" loading="lazy" decoding="async"/><div className="lab-project-top"><span>{p.n}</span><span>{p.meta}</span></div><h3>{p.title}</h3><p>{p.copy}</p></article>)}</div></section>
    <section className="lab-story" id="story"><div className="lab-story-sticky"><span>FOUNDER STORY</span><h2>It started with<br/>a gap in Roblox.</h2></div><div className="lab-story-copy"><p className="lab-reveal">Thousands of developers and studios were building on it, with no real way to find each other. So I decided to build <a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer">weld. ↗</a></p><p className="lab-reveal">I had never written a line of code. I taught myself because the thing needed to exist, then shipped its landing page the same day I started coding.</p><blockquote className="lab-reveal">The first code I ever wrote.</blockquote><p className="lab-reveal"><em>weld.</em> never found a business model, so I killed it. What survived was more valuable: I can build the thing I imagine.</p></div></section>
    <footer className="lab-footer" id="contact"><span>CONTACT ME</span><h2>Say hi.</h2><button onClick={copy}>{copied?'COPIED':'joeljeon7@gmail.com'}<LabArrow/></button><div className="lab-footer-base"><div><a href="https://capability-factory-website.vercel.app" target="_blank" rel="noreferrer">Capability Factory ↗</a><a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer">weld. GitHub ↗</a><a href="https://x.com/JoelJeonDev" target="_blank" rel="noreferrer">X ↗</a><span className="lab-linkedin"><del>LinkedIn</del> / BANNED FOR BEING UNDERAGE</span></div><p>I hit 1k followers in under a month, connected with YC founders and Forbes 30-under-30s, and then got banned. Fastest growth curve I’ve ever killed without meaning to.</p></div></footer>
  </main>
}

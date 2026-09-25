import React, {useEffect, useRef, useState} from 'react';

const EMAIL = 'joeljeon7@gmail.com';
const sections = [
  ['about', 'About'], ['now', 'Now'], ['projects', 'Projects'],
  ['past', 'Also mine'], ['skills', 'Skills'], ['elsewhere', 'Elsewhere'], ['contact', 'Contact'], ['overlaps', 'Where it overlaps']
];

function Arrow({external=false}) { return <span aria-hidden="true">{external ? '↗' : '↘'}</span>; }

function Corvus() { return <svg viewBox="0 0 100 100" aria-hidden="true" className="jj-corvus"><path d="M12 14c19-1 35 1 49 8 7 3 13 9 17 15l-19-6-12-7H29l14-6Z"/><path d="M7 47 17 30h34l14 9 13 3 19 15-30-9-17-7-19-3L7 47Z"/><path d="m15 36 24 1-12 24L4 74l7-26Z"/><path d="m29 65 20-13 14 43-41-24Z"/><path fill="#c19857" d="m48 30 15 7-10-1-8-4Z"/></svg>; }
function SearchMark() { return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="16" cy="16" r="10"/><path d="M16 2v8m0 12v8M2 16h8m12 0h8"/></svg>; }
function Monogram({alternate=false}) { return <span className={`jj-monogram ${alternate?'alternate':''}`} aria-label="Joel Jeon initials">{alternate?'조엘':'JJ'}</span>; }

function Roles() {
  const roles=['Founder & builder','Growth Engineering · Tsenta (YC S26)','Building Search Operator + Nooli'];
  const [index,setIndex]=useState(0);
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const id=setInterval(()=>setIndex(i=>(i+1)%roles.length),3600);return()=>clearInterval(id)},[]);
  return <p className="jj-roles"><span className="jj-sr-only">{roles.join(' · ')}</span><span key={index} aria-hidden="true">{roles[index]}</span></p>;
}

function CursorLabel() {
  const ref=useRef(null);
  useEffect(()=>{const move=e=>{const el=ref.current;if(!el)return;const target=e.target.closest('a,button');el.style.transform=`translate(${e.clientX+13}px,${e.clientY+15}px)`;el.textContent=target?.dataset.cur|| (target?.tagName==='A'?'open':'');el.hidden=!target||!el.textContent;};window.addEventListener('pointermove',move);return()=>window.removeEventListener('pointermove',move)},[]);
  return <span className="jj-cursor-label" ref={ref} hidden aria-hidden="true"/>;
}

function DotField({theme}) {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext('2d');
    const pointer = {x:-1000, y:-1000};
    let frame = 0;
    const draw = () => {
      frame = 0;
      const width = el.clientWidth;
      const height = el.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const color = theme === 'dark' ? '200,200,200' : '118,118,118';
      for (let y = 12; y < height; y += 20) {
        for (let x = 12; x < width; x += 20) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const force = Math.max(0, 1 - distance / 105) ** 2;
          const edge = Math.min(1, x / 80, (width - x) / 80);
          const offset = distance ? force * 11 / distance : 0;
          ctx.beginPath();
          ctx.arc(x + dx * offset, y + dy * offset, 1.25 + force * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${Math.max(.08, edge * (.38 + force * .35))})`;
          ctx.fill();
        }
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const onMove = event => {
      const box = el.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      queue();
    };
    const onLeave = () => { pointer.x = -1000; pointer.y = -1000; queue(); };
    const resize = new ResizeObserver(queue);
    resize.observe(el);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    draw();
    return () => { resize.disconnect(); el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); if (frame) cancelAnimationFrame(frame); };
  }, [theme]);
  return <div className="jj-dots" ref={ref} aria-hidden="true"><canvas ref={canvasRef}/></div>;
}

function Section({id, title, children, className='', meta='', initiallyOpen=true}) {
  const [open,setOpen]=useState(initiallyOpen);
  useEffect(()=>{const reveal=()=>{const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(target&&document.getElementById(id)?.contains(target))setOpen(true)};window.addEventListener('hashchange',reveal);reveal();return()=>window.removeEventListener('hashchange',reveal)},[id]);
  return <section id={id} className={`jj-section ${className}`}><div className="jj-section-heading"><h2>{title}</h2><span className="jj-section-meta">{meta}</span><button aria-expanded={open} aria-controls={`${id}-body`} aria-label={`${open?'Hide':'Show'} ${title}`} data-cur={open?'hide':'show'} onClick={()=>setOpen(!open)} className={`jj-section-chevron ${open?'open':''}`}>›</button></div><div id={`${id}-body`} className={`jj-collapse ${open?'open':''}`} inert={open?undefined:true}><div className="jj-collapse-inner"><div className="jj-section-body">{children}</div></div></div></section>;
}

export function JawadBaseline() {
  const [theme, setTheme] = useState('light');
  const [menu, setMenu] = useState(null);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState('about');
  const [avatarFlip, setAvatarFlip] = useState(false);
  const [showHeaderEmail,setShowHeaderEmail] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('jj-baseline-theme');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
    const items = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, {rootMargin:'-10% 0px -68% 0px'});
    items.forEach(item => observer.observe(item));
    const heroObserver=new IntersectionObserver(([entry])=>setShowHeaderEmail(!entry.isIntersecting));
    const heroActions=document.querySelector('.jj-hero-actions');
    if(heroActions)heroObserver.observe(heroActions);
    return () => {observer.disconnect();heroObserver.disconnect();};
  }, []);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = event => { if (event.key === 'Escape') setMenu(null); };
    const closeOutside = event => { if (!event.target.closest('.jj-menu-wrap')) setMenu(null); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => { document.removeEventListener('keydown', closeOnEscape); document.removeEventListener('pointerdown', closeOutside); };
  }, [menu]);
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('jj-baseline-theme', next);
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${EMAIL}`; }
  };
  return <main className="jj-page" data-theme={theme} id="top">
    <a className="jj-skip" href="#about">Skip to content</a><CursorLabel/>
    <div className="jj-layout">
      <aside className="jj-side" aria-label="Page sections"><span className="jj-side-label">ON THIS PAGE</span>{sections.map(([id,label]) => <a key={id} className={active===id?'is-active':''} href={`#${id}`}>{label}</a>)}</aside>
      <div className="jj-document">
        <header className="jj-header">
          <a className="jj-logo" href="#top" aria-label="Joel Jeon home">JOEL<span>®</span></a>
          <nav className="jj-nav" aria-label="Main navigation">
            <div className="jj-menu-wrap"><button type="button" aria-expanded={menu==='work'} onClick={() => setMenu(menu==='work'?null:'work')}>Work <span>⌄</span></button>{menu==='work'&&<div className="jj-dropdown"><a href="#now" onClick={()=>setMenu(null)}>Current work</a><a href="#projects" onClick={()=>setMenu(null)}>Projects</a><a href="#past" onClick={()=>setMenu(null)}>Past work</a></div>}</div>
            <div className="jj-menu-wrap"><button type="button" aria-expanded={menu==='page'} onClick={() => setMenu(menu==='page'?null:'page')}>Page <span>⌄</span></button>{menu==='page'&&<div className="jj-dropdown">{sections.map(([id,label])=><a key={id} href={`#${id}`} onClick={()=>setMenu(null)}>{label}</a>)}</div>}</div>
            <div className="jj-menu-wrap"><button type="button" aria-expanded={menu==='contact'} onClick={()=>setMenu(menu==='contact'?null:'contact')}>Contact <span>⌄</span></button>{menu==='contact'&&<div className="jj-dropdown"><a href={`mailto:${EMAIL}`}>Send an email ↗</a><a href="https://x.com/JoelJeonDev" target="_blank" rel="noreferrer">DM on X ↗</a><a href="#contact" onClick={()=>setMenu(null)}>All links ↘</a></div>}</div>
          </nav>
          <a className={`jj-header-email ${showHeaderEmail?'visible':''}`} tabIndex={showHeaderEmail?0:-1} aria-hidden={!showHeaderEmail} href={`mailto:${EMAIL}`}>✉&nbsp; Send an email</a>
          <button className="jj-theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme==='light'?'dark':'light'} mode`} title={`Switch to ${theme==='light'?'dark':'light'} mode`}>{theme==='light'?'◐':'◑'}</button>
        </header>
        <DotField theme={theme}/>
        <div className="jj-hero">
          <div className="jj-profile"><div className="jj-avatar"><Monogram alternate={avatarFlip}/></div><button type="button" role="switch" aria-checked={avatarFlip} aria-label="Switch initials" data-cur="swap" className="jj-profile-switch" onClick={()=>setAvatarFlip(!avatarFlip)}><span/></button></div>
          <div className="jj-hero-text"><h1>Joel Jeon</h1><Roles/><div className="jj-hero-actions"><a className="jj-pill jj-pill-dark" data-cur="say hi" href={`mailto:${EMAIL}`}>✉ Send an email</a><a className="jj-pill" data-cur="dm" href="https://x.com/JoelJeonDev" target="_blank" rel="me noreferrer">𝕏 DM on X</a><a className="jj-pill" href="#projects">See my work <Arrow/></a></div></div>
        </div>
        <Section id="about" title="About">
          <p>I'm Joel, a 15-year-old founder and builder in London. Right now most of my time goes into <a href="#search-operator">Search Operator</a> and <a href="#nooli">Nooli</a>. My work sits between <strong>software, AI systems, and growth</strong>.</p>
          <p>I also do <a href="#tsenta">Growth Engineering at Tsenta (YC S26)</a>—technical acquisition experiments, creator-intelligence tooling, CRM, and SEO. I got there by sending founders detailed growth audits during a school holiday, around six weeks after I started learning to code.</p>
          <p>I learned to code because I wanted to build a marketplace for Roblox developers. That first company, <a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer">weld.</a>, didn't find a business model. It did teach me how quickly an idea can become something real.</p>
          <div className="jj-mini-list"><a href="#search-operator"><span>Search Operator</span><small>Evidence-backed SEO for founders</small><Arrow/></a><a href="#nooli"><span>Nooli</span><small>Adaptive early learning</small><Arrow/></a><a href="#tsenta"><span>Tsenta · YC S26</span><small>Growth Engineering</small><Arrow/></a><a href="#capability-factory"><span>Capability Factory</span><small>Missing abilities for AI agents</small><Arrow/></a><a href="#dynamic-agent-specialisation"><span>DAS</span><small>Specialist-agent selection</small><Arrow/></a><a href="#past"><span>Earlier work</span><small>weld., hackathons, future ideas</small><Arrow/></a></div>
        </Section>
        <Section id="now" title="Now" meta="work + research">
          <div className="jj-now-row"><span className="jj-now-icon jj-now-so"><SearchMark/></span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#search-operator">Search Operator</a></h3><small>Building</small></div><strong>Founder</strong><p>Research-backed SEO software that turns high-intent search opportunities into source-checked drafts a founder can review.</p></div></div>
          <div className="jj-now-row"><span className="jj-now-icon jj-now-nooli">n</span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#nooli">Nooli</a></h3><small>Now</small></div><strong>Product + learning system</strong><p>Adaptive early-learning experiences for roughly ages three to five, guided by a child's progress and interests.</p></div></div>
          <div className="jj-now-row jj-tsenta" id="tsenta"><span className="jj-now-icon jj-now-tsenta"><img src="https://tsenta.com/assets/brand/tsenta-black.png" alt="" width="32" height="32"/></span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="https://tsenta.com" target="_blank" rel="noreferrer">Tsenta <Arrow external/></a></h3><small>YC S26</small></div><strong>Growth Engineering</strong><p>I build technical growth experiments: an AI-native creator-discovery and ranking prototype with Attio CRM integration, the Doom Timer acquisition concept, and early SEO work.</p><p>My creator-intelligence system explored graph-based discovery and predicted acquisition cost rather than follower counts. It reached a working prototype; Tsenta kept its existing creator workflow.</p></div></div>
          <div className="jj-now-row"><span className="jj-now-icon jj-now-cf"><Corvus/></span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#capability-factory">Capability Factory</a></h3><small>Research</small></div><strong>Founder</strong><p>Agents that resolve a missing digital ability within authority, check the real result, and return to the original goal. Local MVP for constrained HTTP.</p></div></div>
          <div className="jj-now-row"><span className="jj-now-icon jj-now-das">D</span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#dynamic-agent-specialisation">Dynamic Agent Specialisation</a></h3><small>Research</small></div><strong>Founder</strong><p>Build and compare specialist-agent configurations for a bounded role, then retain the existing agent when a challenger has not proved better.</p></div></div>
        </Section>
        <Section id="projects" title="Projects" className="jj-projects-section" meta="selected work">
          <div className="jj-project-grid">
            <article className="jj-project-card" id="search-operator"><div className="jj-project-art jj-search-art"><SearchMark/><span>Search Operator</span></div><div className="jj-project-title"><h3>Search Operator</h3><span title="Being built">ϟ</span></div><p>Find high-intent searches, research the source material, and draft articles whose claims can be checked before publishing.</p><div className="jj-project-tags"><span>Research</span><span>SEO</span><span>Source checks</span><span>WordPress</span></div></article>
            <article className="jj-project-card" id="nooli"><div className="jj-project-art jj-nooli-art"><span>nooli</span><i>✳</i></div><div className="jj-project-title"><h3>Nooli</h3><span>⚡</span></div><p>Learning for young children that adapts the next lesson to what they know, how they respond, and what holds their attention.</p><div className="jj-project-tags"><span>Learning</span><span>Adaptive curriculum</span><span>iOS + web</span><span>Product</span></div></article>
            <article className="jj-project-card" id="capability-factory"><a href="/capability-factory" className="jj-project-art jj-cf-art" aria-label="Read about Capability Factory"><Corvus/><em>Capability Factory</em></a><div className="jj-project-title"><h3>Capability Factory</h3><span title="Local research">◌</span></div><p>A local agent system for resolving a missing ability, checking the real outcome, and continuing the original task.</p><div className="jj-project-tags"><span>AI agents</span><span>Verification</span><span>Research</span><span>Local MVP</span></div></article>
            <article className="jj-project-card" id="dynamic-agent-specialisation"><a href="/dynamic-agent-specialisation" className="jj-project-art jj-das-art" aria-label="Read about Dynamic Agent Specialisation"><span>DAS</span><small>specialists / tested</small></a><div className="jj-project-title"><h3>Dynamic Agent Specialisation</h3><span>◌</span></div><p>Build and compare complete specialist agents for a bounded role, then keep the current agent if a challenger has not proved better.</p><div className="jj-project-tags"><span>AI agents</span><span>Evaluation</span><span>Safety</span><span>Prototype</span></div></article>
          </div>
        </Section>
        <Section id="past" title="Also mine" meta="earlier work">
          <div className="jj-past-list"><a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer"><span className="jj-past-title">weld.</span><span className="jj-past-copy">The Roblox talent marketplace that made me learn to code. Closed after the business model didn't work.</span><Arrow external/></a><div className="jj-past-item"><span className="jj-past-title">Agent Fleet Brain</span><span className="jj-past-copy">A future coordination layer: assign work across specialists, resolve missing capabilities, and check real outcomes. Still a concept; CF and DAS remain separate projects.</span></div></div>
          <div className="jj-hack-list" id="hackathons"><h3>Hackathons</h3><div className="jj-small-project"><img src="/work-pop-the-bubble.png" alt="Abstract visual for Pop the Bubble" loading="lazy"/><div><strong>Pop the Bubble</strong><p>Built Synapse, an AI growth-analytics experiment, during my first hackathon.</p></div></div><div className="jj-small-project"><img src="/work-gtm-hack-v2.png" alt="Abstract visual for GTM Hack" loading="lazy"/><div><strong>GTM Hack</strong><p>Built the Voiceprint Funnel with Jawad. We placed second in the Lightfern track.</p></div></div><div className="jj-small-project"><img src="/work-license-trace-v2.png" alt="Abstract visual for LicenseTrace" loading="lazy"/><div><strong>LicenseTrace</strong><p>A solo agent experiment tracing open-source licence dependencies. It placed second in two sponsor categories.</p></div></div></div>
        </Section>
        <Section id="skills" title="Skills">
          <div className="jj-skills-table"><div><strong>Build</strong><p>Full-stack prototypes and product systems, with AI coding tools.</p><span>React · TypeScript · Python · SQLite</span></div><div><strong>Growth</strong><p>Acquisition experiments, CRM architecture, and research-backed SEO.</p><span>Attio · PostHog · SEO · GTM</span></div><div><strong>AI systems</strong><p>Permission-bounded agents and independently verified outcomes.</p><span>Agent tooling · Evaluation · APIs</span></div><div><strong>Product</strong><p>Turning a blocked task into a small, testable product.</p><span>Prototyping · Research · Experiments</span></div></div>
        </Section>
        <Section id="elsewhere" title="Elsewhere" meta="4 more" initiallyOpen={false}>
          <div className="jj-links"><a href="https://github.com/Welddevelopment" target="_blank" rel="me noreferrer">GitHub <Arrow external/></a><a href="https://x.com/JoelJeonDev" target="_blank" rel="me noreferrer">X / Twitter <Arrow external/></a><a href="https://capability-factory-website.vercel.app" target="_blank" rel="me noreferrer">Capability Factory site <Arrow external/></a><span><del>LinkedIn</del> <small>Apparently 1k followers was fine; being 15 wasn't.</small></span></div>
        </Section>
        <Section id="contact" title="Contact">
          <div className="jj-contact-grid"><a href={`mailto:${EMAIL}`}>Email <Arrow external/></a><a href="https://github.com/Welddevelopment" target="_blank" rel="me noreferrer">GitHub <Arrow external/></a><a href="https://x.com/JoelJeonDev" target="_blank" rel="me noreferrer">X <Arrow external/></a><button type="button" onClick={copy}>{copied?'Address copied':'Copy email address'} <Arrow external/></button></div>
        </Section>
        <Section id="overlaps" title="Where it overlaps">
          <div className="jj-venn" aria-label="The overlap between product, growth engineering, building, and AI systems"><i className="jj-circle jj-circle-top"/><i className="jj-circle jj-circle-left"/><i className="jj-circle jj-circle-right"/><i className="jj-circle jj-circle-bottom"/><span className="jj-venn-top">Product</span><span className="jj-venn-left">Growth Engineering</span><span className="jj-venn-right">Software & Build</span><span className="jj-venn-bottom">AI Systems</span><div className="jj-venn-me"><Monogram/></div></div>
        </Section>
        <footer className="jj-final-cta"><p>Still reading? That means something clicked. Let's talk.</p><a data-cur="say hi" href={`mailto:${EMAIL}`}><span className="jj-cta-me">JJ</span><span className="jj-cta-you">+ <i>You</i></span><strong>Send an email</strong></a></footer>
      </div>
    </div>
  </main>;
}

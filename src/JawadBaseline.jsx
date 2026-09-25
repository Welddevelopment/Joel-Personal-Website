import React, {useEffect, useRef, useState} from 'react';

const EMAIL = 'joeljeon7@gmail.com';
const sections = [
  ['about', 'About'], ['now', 'Now'], ['projects', 'Projects'],
  ['past', 'Also mine'], ['skills', 'Skills'], ['elsewhere', 'Elsewhere'], ['contact', 'Contact'], ['overlaps', 'Where it overlaps']
];

function Arrow({external=false}) { return <span aria-hidden="true">{external ? '↗' : '↘'}</span>; }

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
  return <section id={id} className={`jj-section ${className}`}><details open={initiallyOpen}><summary><h2>{title}</h2><span className="jj-section-meta">{meta}</span><span className="jj-section-chevron">›</span></summary><div className="jj-section-body">{children}</div></details></section>;
}

export function JawadBaseline() {
  const [theme, setTheme] = useState('light');
  const [menu, setMenu] = useState(null);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState('about');
  const [avatarFlip, setAvatarFlip] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('jj-baseline-theme');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
    const items = sections.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, {rootMargin:'-10% 0px -68% 0px'});
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
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
    <div className="jj-layout">
      <aside className="jj-side" aria-label="Page sections"><span className="jj-side-label">ON THIS PAGE</span>{sections.map(([id,label]) => <a key={id} className={active===id?'is-active':''} href={`#${id}`}>{label}</a>)}</aside>
      <div className="jj-document">
        <header className="jj-header">
          <a className="jj-logo" href="#top" aria-label="Joel Jeon home">JOEL<span>®</span></a>
          <nav className="jj-nav" aria-label="Main navigation">
            <div className="jj-menu-wrap"><button type="button" aria-expanded={menu==='work'} onClick={() => setMenu(menu==='work'?null:'work')}>Work <span>⌄</span></button>{menu==='work'&&<div className="jj-dropdown"><a href="#now" onClick={()=>setMenu(null)}>Current work</a><a href="#projects" onClick={()=>setMenu(null)}>Projects</a><a href="#past" onClick={()=>setMenu(null)}>Past work</a></div>}</div>
            <div className="jj-menu-wrap"><button type="button" aria-expanded={menu==='page'} onClick={() => setMenu(menu==='page'?null:'page')}>Page <span>⌄</span></button>{menu==='page'&&<div className="jj-dropdown"><a href="#about" onClick={()=>setMenu(null)}>About me</a><a href="#skills" onClick={()=>setMenu(null)}>How I work</a><a href="#elsewhere" onClick={()=>setMenu(null)}>Elsewhere</a></div>}</div>
            <a href="#contact">Contact <span>›</span></a>
          </nav>
          <a className="jj-header-email" href={`mailto:${EMAIL}`}>✉&nbsp; Send an email</a>
          <button className="jj-theme" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme==='light'?'dark':'light'} mode`} title={`Switch to ${theme==='light'?'dark':'light'} mode`}>{theme==='light'?'◐':'◑'}</button>
        </header>
        <DotField theme={theme}/>
        <div className="jj-hero">
          <button className={`jj-avatar ${avatarFlip?'is-flipped':''}`} type="button" onClick={()=>setAvatarFlip(!avatarFlip)} aria-label="Flip Joel's portrait card"><span className="jj-avatar-front">J<span>J</span></span><span className="jj-avatar-back">build<br/>→<br/>learn</span></button>
          <div className="jj-hero-text"><h1>Joel Jeon<span className="jj-wave" aria-hidden="true">✳</span></h1><p>15-year-old founder building things I can't stop thinking about.</p><div className="jj-hero-actions"><a className="jj-pill jj-pill-dark" href={`mailto:${EMAIL}`}>Send an email <Arrow external/></a><a className="jj-pill" href="https://x.com/JoelJeonDev" target="_blank" rel="me noreferrer">DM on X <Arrow external/></a><a className="jj-pill" href="#projects">See my work <Arrow/></a></div></div>
          <span className="jj-flip-hint">click to flip ↗</span>
        </div>
        <Section id="about" title="About">
          <p>I'm Joel, a founder in London. I like finding a real problem, building a version people can touch, and learning from what breaks. Right now most of my time goes into <a href="#search-operator">Search Operator</a> and <a href="#nooli">Nooli</a>.</p>
          <p>I learned to code because I wanted to build a marketplace for Roblox developers. That first company, <a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer">weld.</a>, didn't find a business model. It did teach me how quickly an idea can become something real.</p>
          <div className="jj-mini-list"><a href="#search-operator"><span>Search Operator</span><small>Evidence-backed SEO for founders</small><Arrow/></a><a href="#nooli"><span>Nooli</span><small>Adaptive early learning</small><Arrow/></a><a href="#capability-factory"><span>Capability Factory</span><small>Missing abilities for AI agents</small><Arrow/></a><a href="#dynamic-agent-specialisation"><span>DAS</span><small>Specialist-agent selection</small><Arrow/></a><a href="#past"><span>Earlier work</span><small>Tsenta, weld., hackathons</small><Arrow/></a></div>
        </Section>
        <Section id="now" title="Now" meta="4 things">
          <div className="jj-now-row"><span className="jj-now-icon jj-now-so">S</span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#search-operator">Search Operator</a></h3><small>Now</small></div><strong>Founder</strong><p>Research-backed SEO software that turns high-intent search opportunities into source-checked drafts a founder can review.</p></div></div>
          <div className="jj-now-row"><span className="jj-now-icon jj-now-nooli">n</span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#nooli">Nooli</a></h3><small>Now</small></div><strong>Product + learning system</strong><p>Adaptive early-learning experiences for roughly ages three to five, guided by a child's progress and interests.</p></div></div>
          <div className="jj-now-row"><span className="jj-now-icon jj-now-cf">C</span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#capability-factory">Capability Factory</a></h3><small>Research</small></div><strong>Founder</strong><p>Agents that resolve a missing digital ability within authority, check the real result, and return to the original goal. Local MVP for constrained HTTP.</p></div></div>
          <div className="jj-now-row"><span className="jj-now-icon jj-now-das">D</span><div className="jj-now-content"><div className="jj-now-heading"><h3><a href="#dynamic-agent-specialisation">Dynamic Agent Specialisation</a></h3><small>Research</small></div><strong>Founder</strong><p>Build and compare specialist-agent configurations for a bounded role, then retain the existing agent when a challenger has not proved better.</p></div></div>
        </Section>
        <Section id="projects" title="Projects" className="jj-projects-section" meta="selected work">
          <div className="jj-project-grid">
            <article className="jj-project-card" id="search-operator"><div className="jj-project-art jj-search-art"><span>SO<span className="jj-search-cursor">_</span></span></div><div className="jj-project-title"><h3>Search Operator</h3><span>⚡</span></div><p>Find high-intent searches, research the source material, and draft articles whose claims can be checked before publishing.</p><div className="jj-project-tags"><span>Research</span><span>SEO</span><span>Source checks</span><span>WordPress</span></div></article>
            <article className="jj-project-card" id="nooli"><div className="jj-project-art jj-nooli-art"><span>nooli</span><i>✳</i></div><div className="jj-project-title"><h3>Nooli</h3><span>⚡</span></div><p>Learning for young children that adapts the next lesson to what they know, how they respond, and what holds their attention.</p><div className="jj-project-tags"><span>Learning</span><span>Adaptive curriculum</span><span>iOS + web</span><span>Product</span></div></article>
            <article className="jj-project-card" id="capability-factory"><a href="/capability-factory" className="jj-project-art jj-cf-art" aria-label="Read about Capability Factory"><span className="jj-cf-mark">C<span>F</span></span><em>capability factory</em></a><div className="jj-project-title"><h3>Capability Factory</h3><span>◌</span></div><p>A local agent system for resolving a missing ability, checking the real outcome, and continuing the original task.</p><div className="jj-project-tags"><span>AI agents</span><span>Verification</span><span>Research</span><span>Local MVP</span></div></article>
            <article className="jj-project-card" id="dynamic-agent-specialisation"><a href="/dynamic-agent-specialisation" className="jj-project-art jj-das-art" aria-label="Read about Dynamic Agent Specialisation"><span>DAS</span><small>specialists / tested</small></a><div className="jj-project-title"><h3>Dynamic Agent Specialisation</h3><span>◌</span></div><p>Build and compare complete specialist agents for a bounded role, then keep the current agent if a challenger has not proved better.</p><div className="jj-project-tags"><span>AI agents</span><span>Evaluation</span><span>Safety</span><span>Prototype</span></div></article>
          </div>
        </Section>
        <Section id="past" title="Also mine" meta="earlier work">
          <div className="jj-past-list"><div className="jj-past-item"><span className="jj-past-title">Tsenta (YC S26)</span><span className="jj-past-copy">Growth/GTM work and growth-engineering experiments. I learned a lot by building and testing ideas alongside a startup team.</span></div><a href="https://github.com/Welddevelopment/Weld" target="_blank" rel="noreferrer"><span className="jj-past-title">weld.</span><span className="jj-past-copy">The Roblox talent marketplace that made me learn to code. Closed after the business model didn't work.</span><Arrow external/></a></div>
          <div className="jj-hack-list" id="hackathons"><h3>Hackathons</h3><div className="jj-small-project"><img src="/work-pop-the-bubble.png" alt="Abstract visual for Pop the Bubble" loading="lazy"/><div><strong>Pop the Bubble</strong><p>Built Synapse, an AI growth-analytics experiment, during my first hackathon.</p></div></div><div className="jj-small-project"><img src="/work-gtm-hack-v2.png" alt="Abstract visual for GTM Hack" loading="lazy"/><div><strong>GTM Hack</strong><p>Built the Voiceprint Funnel with Jawad. We placed second in the Lightfern track.</p></div></div><div className="jj-small-project"><img src="/work-license-trace-v2.png" alt="Abstract visual for LicenseTrace" loading="lazy"/><div><strong>LicenseTrace</strong><p>A solo agent experiment tracing open-source licence dependencies. It placed second in two sponsor categories.</p></div></div></div>
        </Section>
        <Section id="skills" title="Skills">
          <div className="jj-skill-grid"><div><strong>Find the problem</strong><p>I start with the user, the blocked task, and the evidence that it matters.</p></div><div><strong>Build the smallest version</strong><p>Something real enough to test, not a slide deck dressed as progress.</p></div><div><strong>Check the outcome</strong><p>I want to know what happened outside the demo, especially when a system says it succeeded.</p></div></div>
        </Section>
        <Section id="elsewhere" title="Elsewhere" meta="4 more" initiallyOpen={false}>
          <div className="jj-links"><a href="https://github.com/Welddevelopment" target="_blank" rel="me noreferrer">GitHub <Arrow external/></a><a href="https://x.com/JoelJeonDev" target="_blank" rel="me noreferrer">X / Twitter <Arrow external/></a><a href="https://capability-factory-website.vercel.app" target="_blank" rel="me noreferrer">Capability Factory site <Arrow external/></a><span><del>LinkedIn</del> <small>Apparently 1k followers was fine; being 15 wasn't.</small></span></div>
        </Section>
        <Section id="contact" title="Contact">
          <div className="jj-contact-grid"><a href={`mailto:${EMAIL}`}>Email <Arrow external/></a><a href="https://github.com/Welddevelopment" target="_blank" rel="me noreferrer">GitHub <Arrow external/></a><a href="https://x.com/JoelJeonDev" target="_blank" rel="me noreferrer">X <Arrow external/></a><button type="button" onClick={copy}>{copied?'Address copied':'Copy email address'} <Arrow external/></button></div>
        </Section>
        <Section id="overlaps" title="Where it overlaps">
          <div className="jj-overlap-list"><span>Founder-led products</span><span>Research-backed search</span><span>Adaptive learning</span><span>Verifiable AI agents</span></div>
          <p className="jj-fleet"><strong>Longer term: Agent Fleet Brain.</strong> My future idea is a coordination layer that could assign work across specialist agents, give them the capabilities they need, and verify what actually happened. It's a plan, not a built product or an integration of CF and DAS today.</p>
        </Section>
        <div className="jj-final-cta"><p>Still reading? That means something clicked. Let's talk.</p><a href={`mailto:${EMAIL}`}>Send an email <Arrow external/></a></div>
        <footer className="jj-footer"><span>Joel Jeon © 2026</span><a href="#top">Back to top ↑</a></footer>
      </div>
    </div>
  </main>;
}

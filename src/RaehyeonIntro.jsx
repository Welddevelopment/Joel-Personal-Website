import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTIONS = ['intro', 'thesis', 'systems', 'vision', 'meet'];

const PRODUCTS = {
  das: {
    short: 'DAS',
    name: 'Dynamic Agent Specialisation',
    eyebrow: 'It compiles the worker',
    proof: 'Three fictional role families tested. One challenger activated. Two existing agents correctly retained.',
    speed: 'Three-role technical mechanism closed about 26 hours after the first repository commit.',
    summary: 'DAS takes a bounded business role, constructs several complete specialist-agent configurations, tests them against frozen baselines and independently verified outcomes, then switches only when a challenger genuinely wins.',
    steps: [
      ['Define the role', 'Outcome, systems, policies, authority and success criteria become a strict contract.'],
      ['Construct candidates', 'Model, instructions, context, tools, memory, escalation and budgets vary together.'],
      ['Reject invalid shapes', 'Wrong verifiers, excessive tools or unsafe authority fail before model execution.'],
      ['Run frozen trials', 'Finalists face strong baselines, sealed cases, safety gates and repeated fresh runs.'],
      ['Verify real outcomes', 'A separate verifier inspects the resulting external system state.'],
      ['Activate on proof', 'The current agent stays live unless the challenger proves the committed improvement.']
    ],
    details: [
      'A specialist is more than a prompt. DAS treats the complete operating package as the thing to compile: model and settings, instructions, context policy, tools, memory, authority, escalation behaviour, verifier, cost, latency and provenance.',
      'The system generates meaningfully different candidates, rejects structurally unsafe ones, diagnoses failures on development cases, freezes finalists and baselines, then releases unseen cases. Candidates cannot grade themselves; separate logic checks the real system state they were supposed to change.',
      'The important outcome is not that every generated agent wins. In the current local evidence, DAS created the winning SaaS-support specialist, but retained the existing procurement and RevOps agents when the challengers did not prove enough improvement. Refusing a fashionable but weaker upgrade is part of the product.'
    ],
    competitors: {
      intro: 'DAS turns a plain-English role into hundreds of complete candidate agents, narrows them through internal evaluation, tests the finalists inside a realistic workspace to see what they actually do, and lets the user switch between the strongest proved options.',
      headers: ['Product', 'Core workflow', 'What this means'],
      rows: [
        ['DAS', 'Plain-English role → hundreds of complete candidates → internal evaluation → workspace trials → verified best options', 'Most specialist construction and comparison work is automated. The user can inspect and switch among agents that proved themselves.'],
        ['CrewAI', 'A human configures agents, roles, tools, tasks and the crew or flow; CrewAI makes that system easier to run', 'Manual agent engineering becomes easier, but the specialist still has to be designed, tested and tuned by a human.'],
        ['LangChain / LangGraph / Forge', 'A human assembles models, tools, state graphs, evaluators and deployment logic from flexible primitives', 'Powerful building blocks, but still expertise-heavy and time-consuming. The framework does not compile the best specialist from a role description.']
      ]
    }
  },
  cf: {
    short: 'CF',
    name: 'Capability Factory',
    eyebrow: 'It resolves the missing ability',
    proof: 'Working local constrained-HTTP pilot MVP, including a fictional ERPNext procurement run with verified external state.',
    speed: 'Six days from idea to the constrained-HTTP MVP submitted to YC.',
    summary: 'Capability Factory lets an agent notice that it cannot complete part of an ordinary goal, acquire or reuse the smallest permissioned capability it needs, verify the real result and continue the original work.',
    steps: [
      ['Observe the block', 'The agent reaches a required action that its configured abilities cannot complete.'],
      ['Diagnose the gap', 'CF identifies the exact action, target, inputs, evidence and completion criteria.'],
      ['Check authority', 'Missing credentials, permission or approval produce a precise handoff, not a workaround.'],
      ['Reuse or build', 'Retained and trusted tools come first; only the unsupported residual is constructed.'],
      ['Act and reconcile', 'Execution stays inside exact authority; uncertain writes are read back before retry.'],
      ['Verify and resume', 'A separate observer checks external state, then the original goal continues.']
    ],
    details: [
      'CF begins inside ordinary work, not on an integration-building screen. When an agent is blocked, it diagnoses the smallest missing action, separates technical capability from human authority, and searches retained or trusted options before creating anything new.',
      'A usable capability is a bundle rather than a loose code snippet: bounded runtime, manifest, target and permissions, pre-use checks, independent outcome verifier, reconciliation rules, provenance and retention identity. Secrets remain customer-local references, and an executing capability cannot certify its own success.',
      'After safe execution, CF reads the target system to prove the intended business state exists. Lost responses are reconciled before retry, ambiguous capabilities can be quarantined, and the exact parent task resumes from its saved state. The capability is retained only with the scope and evidence that made it valid.'
    ],
    competitors: {
      intro: 'Capability Factory starts with the agent’s original goal, notices the exact ability it is missing, acquires or builds only that capability, verifies the real-world effect and returns the agent to the work it was already doing.',
      headers: ['Product', 'Core workflow', 'What remains'],
      rows: [
        ['Capability Factory', 'Ordinary goal → diagnose missing ability → reuse or build the smallest capability → permissioned action → external verification → resume', 'The unforeseen gap is resolved inside the original task, without waiting for a new integration cycle.'],
        ['Composio / Pipedream / Nango', 'Expose known connectors, authenticated tools and execution infrastructure for a developer or agent to call', 'The calling system still selects and wires the tool, handles unsupported gaps, verifies the outcome and resumes the parent goal.'],
        ['Custom integration work', 'An engineer diagnoses the gap, builds the connector, tests it, deploys it and restarts the blocked workflow', 'Human integration engineering remains in the critical path; CF automates that complete resolution loop.']
      ]
    }
  }
};

const SUMMARY_PARTS = [
  ['I’m building toward AI workforces that can ', ''],
  ['build the right worker', 'das'],
  [', ', ''],
  ['acquire missing abilities', 'cf'],
  [', and ', ''],
  ['prove the real outcome', 'future'],
  ['. A future Fleet Brain coordinates the system.', '']
];

function track(eventName, detail) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, {props: {route: '/raehyeon', detail}});
  } else if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {page_path: '/raehyeon', detail});
  }
}

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
}

function ScrollButton({target, children, secondary = false}) {
  const go = () => document.getElementById(target)?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  return <button className={`rh-cta ${secondary ? 'is-secondary' : ''}`} onClick={go}>{children}<Arrow/></button>;
}

function ProductDiagram({product}) {
  return <ol className="rh-product-flow">
    {product.steps.map(([title, body], index) => <li key={title} style={{'--index': index}}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><small>{body}</small></div></li>)}
  </ol>;
}

function ProductCard({kind, onOpen}) {
  const product = PRODUCTS[kind];
  return <article className={`rh-system-card is-${kind}`}>
    <div className="rh-system-topline"><span>{product.short}</span><span>{product.eyebrow}</span></div>
    <h3>{product.name}</h3>
    <p className="rh-system-summary">{product.summary}</p>
    <ProductDiagram product={product}/>
    <div className="rh-proof-block">
      <p>{product.proof}</p>
      <span>{product.speed}</span>
    </div>
    <div className="rh-card-actions">
      <button onClick={() => onOpen(kind, 'technical')}>How it actually works <Arrow/></button>
      <button onClick={() => onOpen(kind, 'competitors')}>Competitive edge <Arrow/></button>
    </div>
  </article>;
}

function DetailPanel({active, onClose, onSwitch}) {
  useEffect(() => {
    if (!active) return undefined;
    const previous = document.body.style.overflow;
    const onKey = event => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, onClose]);

  if (!active) return null;
  const product = PRODUCTS[active.product];
  const isTechnical = active.view === 'technical';
  return <div className="rh-panel-shell" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className={`rh-detail-panel is-${active.product}`} role="dialog" aria-modal="true" aria-labelledby="rh-panel-title">
      <header className="rh-panel-header">
        <div><span>{product.short}</span><strong id="rh-panel-title">{product.name}</strong></div>
        <button className="rh-close" onClick={onClose} aria-label="Close details">Close <b>×</b></button>
      </header>
      <nav className="rh-panel-tabs" aria-label={`${product.short} detail views`}>
        <button className={isTechnical ? 'is-active' : ''} onClick={() => onSwitch('technical')}>Technical details</button>
        <button className={!isTechnical ? 'is-active' : ''} onClick={() => onSwitch('competitors')}>Competitors</button>
      </nav>
      <div className="rh-panel-body">
        {isTechnical ? <>
          <p className="rh-panel-lede">{product.summary}</p>
          <div className="rh-detail-grid">
            <div className="rh-detail-prose">{product.details.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
            <ol className="rh-detailed-flow">{product.steps.map(([title, body], index) => <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol>
          </div>
        </> : <>
          <p className="rh-panel-lede">{product.competitors.intro}</p>
          <div className="rh-compare-wrap">
            <table className="rh-compare-table">
              <thead><tr>{product.competitors.headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
              <tbody>{product.competitors.rows.map(row => <tr key={row[0]}><th>{row[0]}</th><td data-label={product.competitors.headers[1]}>{row[1]}</td><td data-label={product.competitors.headers[2]}>{row[2]}</td></tr>)}</tbody>
            </table>
          </div>
        </>}
      </div>
    </section>
  </div>;
}

export function RaehyeonIntro() {
  const root = useRef(null);
  const [activeSection, setActiveSection] = useState('intro');
  const [activePanel, setActivePanel] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    document.body.classList.add('rh-body');
    track('raehyeon_route_view', 'intro');
    return () => document.body.classList.remove('rh-body');
  }, []);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    gsap.timeline({defaults: {ease: 'power4.out'}})
      .from('.rh-hero-kicker', {y: 18, opacity: 0, duration: 0.65})
      .from('.rh-hero-message', {y: 38, opacity: 0, duration: 0.85, stagger: 0.52}, '-=.2')
      .from('.rh-hero .rh-cta', {y: 20, opacity: 0, duration: 0.7}, '-=.3');
    gsap.fromTo('.rh-hero-visual', {scale: 0.72, opacity: 0, rotate: -9}, {scale: 1, opacity: 0.5, rotate: 0, duration: 1.5, ease: 'power4.out'});

    gsap.from('.rh-build-intro', {
      y: 72,
      opacity: 0,
      stagger: 0.24,
      ease: 'power3.out',
      scrollTrigger: {trigger: '.rh-build-intros', start: 'top 78%', end: 'bottom 55%', scrub: 0.5}
    });

    gsap.fromTo('.rh-summary-word', {opacity: 0.12}, {
      opacity: 1,
      stagger: 0.15,
      ease: 'none',
      scrollTrigger: {trigger: '.rh-thesis-copy', start: 'top 72%', end: 'bottom 52%', scrub: 0.45}
    });

    gsap.utils.toArray('.rh-system-card').forEach((card, index) => {
      gsap.from(card, {
        y: 110 + index * 30,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {trigger: card, start: 'top 91%', end: 'top 58%', scrub: 0.6}
      });
    });

    gsap.fromTo('.rh-vision-rail i', {scaleX: 0}, {
      scaleX: 1,
      ease: 'none',
      stagger: 0.16,
      scrollTrigger: {trigger: '.rh-vision-rail', start: 'top 75%', end: 'bottom 45%', scrub: 0.5}
    });

    SECTIONS.forEach(id => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 52%',
        end: 'bottom 52%',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id)
      });
    });
  }, {scope: root});

  const openPanel = (product, view) => {
    setActivePanel({product, view});
    track('raehyeon_detail_open', `${product}_${view}`);
  };
  const closePanel = () => setActivePanel(null);
  const confirm = () => {
    setConfirmed(true);
    track('raehyeon_connection_ask', 'confirmed');
  };

  return <main className="rh-page" ref={root}>
    <div className="rh-grain" aria-hidden="true"/>
    <header className="rh-nav">
      <a href="#intro" className="rh-wordmark">Joel Jeon <span>/ Seoul</span></a>
      <nav aria-label="Page progress">{SECTIONS.map((id, index) => <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} aria-label={`Go to ${id}`} aria-current={activeSection === id ? 'step' : undefined}><span>{index + 1}</span></a>)}</nav>
      <a href="#meet" className="rh-nav-ask">Meet before Wednesday</a>
    </header>

    <section className="rh-chapter rh-hero" id="intro">
      <div className="rh-hero-copy">
        <p className="rh-hero-kicker">A short note, before Wednesday</p>
        <h1><span className="rh-hero-message">Hi, Raehyeon.</span><span className="rh-hero-message">I’d like to talk.</span></h1>
        <p className="rh-hero-message rh-intro-message">First, let me show you what I’ve built in the last few weeks.</p>
        <ScrollButton target="thesis">Show me</ScrollButton>
      </div>
      <div className="rh-hero-visual" aria-hidden="true">
        <div className="rh-visual-glow"/>
        <div className="rh-orbit is-outer"><span>REAL OUTCOME</span></div>
        <div className="rh-orbit is-middle"><span>CAPABILITY</span></div>
        <div className="rh-orbit is-inner"><span>SPECIALIST</span></div>
        <i className="rh-satellite is-one"/><i className="rh-satellite is-two"/>
        <div className="rh-core"><span>GOAL</span><b>→</b><span>PROOF</span></div>
      </div>
      <div className="rh-scroll-cue">Scroll or click <i/></div>
    </section>

    <section className="rh-chapter rh-thesis" id="thesis">
      <div className="rh-build-intros">
        <article className="rh-build-intro is-cf">
          <span>First</span><strong>Capability Factory</strong>
          <p>A way for an AI to notice a missing ability, gain it safely by itself, verify the result and keep going.</p>
        </article>
        <article className="rh-build-intro is-das">
          <span>Then</span><strong>Dynamic Agent Specialisation</strong>
          <p>A way to turn a plain-English role into hundreds of tested specialist agents, then choose between the best.</p>
        </article>
      </div>
      <div className="rh-thesis-index">The whole idea</div>
      <p className="rh-thesis-copy">{SUMMARY_PARTS.map(([text, tone], index) => <span className={`rh-summary-word ${tone ? `is-${tone}` : ''}`} key={`${text}-${index}`}>{text}</span>)}</p>
      <div className="rh-thesis-legend">
        <span><i className="is-cf"/>CF supplies the missing ability</span>
        <span><i className="is-das"/>DAS builds the worker</span>
        <span><i className="is-future"/>Fleet Brain coordinates the work</span>
      </div>
      <ScrollButton target="systems" secondary>Explore both systems</ScrollButton>
    </section>

    <section className="rh-chapter rh-systems" id="systems">
      <header className="rh-section-heading">
        <p>Two distinct technical advances</p>
        <h2>One lets AI gain a missing ability. The other builds the right specialist.</h2>
      </header>
      <div className="rh-system-grid">
        <ProductCard kind="cf" onOpen={openPanel}/>
        <ProductCard kind="das" onOpen={openPanel}/>
      </div>
      <ScrollButton target="vision" secondary>See how the pieces could connect</ScrollButton>
    </section>

    <section className="rh-chapter rh-vision" id="vision">
      <div className="rh-vision-copy">
        <p>The long-term direction</p>
        <h2>An operating layer for a company’s agent workforce.</h2>
        <div className="rh-vision-prose">
          <p>A future Agent Fleet Brain could take a broad company objective, decide what work exists, retrieve or request the right specialists, give each only the capabilities and authority it needs, and independently verify the combined business result.</p>
          <p>DAS and Capability Factory are separate systems today. The interesting possibility is that together they cover two lower layers a real autonomous workforce would need: the right worker, and a safe route through unfamiliar digital systems.</p>
        </div>
      </div>
      <div className="rh-vision-rail" aria-label="Future architecture from a company goal through DAS and Capability Factory to independently verified outcomes">
        <div><span>01</span><strong>Company goal</strong><small>Outcome, policies, budget</small></div><i/>
        <div className="is-das"><span>02</span><strong>DAS</strong><small>Construct the specialist</small></div><i/>
        <div className="is-cf"><span>03</span><strong>CF</strong><small>Resolve missing abilities</small></div><i/>
        <div><span>04</span><strong>Fleet Brain</strong><small>Coordinate and adapt</small></div><i/>
        <div><span>05</span><strong>Verified outcome</strong><small>Observe the real world</small></div>
      </div>
      <ScrollButton target="meet">Why I’m sending this to you</ScrollButton>
    </section>

    <section className="rh-chapter rh-meet" id="meet">
      <div className="rh-meet-note">
        <p>Why you</p>
        <h2>Your work across Potentivo and WorldClone sits near the same intersection: AI systems, simulation and evidence from real users.</h2>
      </div>
      <div className="rh-meet-ask">
        <p>I’m not looking for a formal pitch meeting. I’d genuinely like to compare notes on where these ideas overlap and hear how you think about building ambitious AI systems from Korea.</p>
        <h3>Would you be up for coffee, or even ten minutes, before Wednesday afternoon?</h3>
        {!confirmed ? <button className="rh-confirm-button" onClick={confirm}>Yes, connect us <Arrow/></button> : <div className="rh-confirm" role="status" aria-live="polite"><strong>Amazing.</strong><span>Josephine can connect us now.</span></div>}
      </div>
      <footer><span>Made personally by Joel</span><a href="#intro">Back to the beginning ↑</a></footer>
    </section>

    <DetailPanel active={activePanel} onClose={closePanel} onSwitch={view => setActivePanel(current => ({...current, view}))}/>
  </main>;
}

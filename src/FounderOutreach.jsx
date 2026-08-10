import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SECTIONS = ['hello', 'work', 'signals', 'joel', 'meet'];

export const FOUNDER_PROFILES = {
  heeyoung: {
    slug: 'heeyoung',
    name: 'Heeyoung Kim',
    first: 'Heeyoung',
    role: 'CEO and co-founder, Potentivo Lab',
    variant: 'research',
    heroKicker: 'A short note about evidence and trust',
    heroLine: 'I noticed the input you chose.',
    heroBody: 'Parentlyze does not begin with generic parenting advice. It begins with the conversations families are actually having.',
    signalKicker: 'The decision that caught my attention',
    signalTitle: 'You made research part of the product loop.',
    signalBody: 'A parent records an everyday conversation. AI reads patterns in it. Child-development experts review the analysis. The product returns reports and practical missions. The difficult part is not any single step. It is carrying evidence from a private moment all the way into something a family can trust and use again.',
    mechanism: [
      ['Conversation', 'The family supplies real context, not a generic questionnaire.'],
      ['Pattern', 'AI looks for emotions, responses and interaction flow.'],
      ['Judgement', 'Domain experts review what the model found.'],
      ['Practice', 'A report becomes a mission the family can try at home.']
    ],
    insightTitle: 'What I think your work is teaching',
    insights: [
      {
        index: '01',
        label: 'Start from evidence',
        fact: 'Potentivo says product decisions begin with research and real usage data.',
        take: 'The input is part of the product architecture. Better evidence changes what the software is allowed to conclude.',
        source: 'Potentivo principles',
        href: 'https://potentivolab.com/en'
      },
      {
        index: '02',
        label: 'Design for trust',
        fact: 'The published workflow includes expert review after AI analysis, and the company works with research and clinical partners.',
        take: 'You are not using a human reviewer as decoration. Review is part of how the output earns the right to influence a family.',
        source: 'Product and partnerships',
        href: 'https://potentivolab.com/en'
      },
      {
        index: '03',
        label: 'Finish the small loop',
        fact: 'Your team states a preference for building small and carrying features through operations and communication.',
        take: 'That is a useful counterweight to ambitious AI roadmaps: a narrow loop that reaches real use can teach more than a broad prototype.',
        source: 'How Potentivo works',
        href: 'https://potentivolab.com/en'
      }
    ],
    bridgeTitle: 'I am working on the same question from a different direction.',
    bridgeBody: 'Capability Factory and DAS both separate an AI system’s claim from proof of what actually happened. Your work makes that problem human: when the output affects a relationship, what evidence and review are enough to deserve trust?',
    question: 'How do you decide which parts of expert judgement can become product, and which should remain irreducibly human?',
    ask: 'Would you be up for coffee with Raehyeon, or even ten minutes, before Wednesday afternoon?'
  },
  sean: {
    slug: 'sean',
    name: 'Sean Lee',
    first: 'Sean',
    role: 'Community builder, MeetupLab',
    variant: 'network',
    heroKicker: 'A short note about rooms that compound',
    heroLine: 'You seem to build the room itself.',
    heroBody: 'MeetupLab is not presented as an occasional event. It is a repeating system for getting designers, developers and “blenders” into useful conversations.',
    signalKicker: 'The pattern that caught my attention',
    signalTitle: 'You treat community like infrastructure.',
    signalBody: 'The public MeetupLab system combines a four-day meetup cadence with attendance tracking, funnel analysis and messaging that learns from who actually turns up. Public posts also credit you directly for inviting people in and making the room legible once they arrive.',
    mechanism: [
      ['Invite', 'A specific person is given a reason to enter the room.'],
      ['Mix', 'Designers, developers and connectors meet across disciplines.'],
      ['Observe', 'Registration and attendance become a measurable funnel.'],
      ['Repeat', 'The next room improves from what converted in the last one.']
    ],
    insightTitle: 'What I think your work is teaching',
    insights: [
      {
        index: '01',
        label: 'Cadence beats spectacle',
        fact: 'MeetupLab publicly describes a meetup every four days, not a single flagship conference.',
        take: 'A community can become useful because people know another room is always about to exist.',
        source: 'MeetupLab',
        href: 'https://www.meetuplab.com/home'
      },
      {
        index: '02',
        label: 'Measure the real arrival',
        fact: 'Its published tools distinguish registrants from actual attendees and analyse customer messages by funnel stage.',
        take: 'You measure the behaviour the community needs, not the vanity metric sitting one step before it.',
        source: 'People Gathering Tech',
        href: 'https://www.meetuplab.com/home'
      },
      {
        index: '03',
        label: 'Make introductions usable',
        fact: 'Attendees publicly thank you for the invitation, the explanation and the second-round conversations that followed.',
        take: 'The connector’s job is not complete at “you two should meet.” It is complete when the conversation actually starts.',
        source: 'Attendee account',
        href: 'https://www.linkedin.com/posts/savannah-soohyeon_meetup-lab-in-hongdae-seoul-was-such-activity-7372138738992205824-onQn'
      }
    ],
    bridgeTitle: 'Most of my best opportunities also began with a useful artefact, not a networking ask.',
    bridgeBody: 'I joined a YC startup after sending an unsolicited growth audit. This page is the same instinct, made more personal. I am curious how you notice unusually serious builders early, and how you design a room where they can actually find one another.',
    question: 'What makes you decide that two people should be in the same room before either of them sees the connection?',
    ask: 'Would you spare ten minutes, or point me toward one unusually good builder I should meet before Wednesday afternoon?'
  },
  hyunsik: {
    slug: 'hyunsik',
    name: 'Hyunsik Ryan Kim',
    first: 'Hyunsik',
    role: 'Builder, StageNote',
    variant: 'stages',
    heroKicker: 'A short note about product constraints',
    heroLine: 'You built into the constraint.',
    heroBody: 'StageNote does not pretend an iPad is a laptop. It uses App Clips and Stage Manager to make the iPad’s own window model work better for task-based work.',
    signalKicker: 'The product choice that caught my attention',
    signalTitle: 'You turned an operating-system edge into the product.',
    signalBody: 'The problem is concrete: people doing several tasks on an iPad lose control of the windows belonging to each task. StageNote creates separate stages, opens the relevant apps together and lets the user switch between those work contexts. The implementation depends on the platform instead of hiding it.',
    mechanism: [
      ['Task', 'A user names the piece of work they are trying to complete.'],
      ['Stage', 'A dedicated context is created through StageNote’s App Clip.'],
      ['Windows', 'The apps needed for that task open together in Stage Manager.'],
      ['Switch', 'The user moves between complete work contexts, not loose windows.']
    ],
    insightTitle: 'What I think your work is teaching',
    insights: [
      {
        index: '01',
        label: 'Use the platform’s shape',
        fact: 'StageNote is explicitly built around App Clips and iPad Stage Manager.',
        take: 'The platform limitation becomes an architectural primitive. That is more interesting than rebuilding a desktop metaphor on top of it.',
        source: 'App Store',
        href: 'https://apps.apple.com/in/app/stagenote/id6739213294?platform=iphone'
      },
      {
        index: '02',
        label: 'Ship the narrow workflow',
        fact: 'The product reached the App Store, iterated through multiple releases and later moved to a subscription model.',
        take: 'You carried a specific interaction idea past prototype status into distribution and a commercial decision.',
        source: 'Version history',
        href: 'https://apps.apple.com/in/app/stagenote/id6739213294?platform=iphone'
      },
      {
        index: '03',
        label: 'Build with peers',
        fact: 'StageNote publicly lists a small team, and your profile also connects you with a young-founders network.',
        take: 'That combination matters to me: a real product, built by young people, without waiting for the conventional permission structure.',
        source: 'StageNote team',
        href: 'https://www.linkedin.com/company/stagenote'
      }
    ],
    bridgeTitle: 'I learned to code by trying to ship a company, so I recognise the build-first instinct.',
    bridgeBody: 'My current systems are far more backend-heavy, but the underlying question is similar: how do you use the primitives that actually exist, preserve the user’s goal and remove the orchestration burden around it?',
    question: 'Which part of StageNote came from user behaviour, and which part only became obvious once you fought the iPad APIs yourself?',
    ask: 'Would you be up for coffee, or even ten minutes, before Wednesday afternoon?'
  },
  jaehoon: {
    slug: 'jaehoon',
    name: 'Jaehoon Shim',
    first: 'Jaehoon',
    role: 'Robotics and machine-learning builder',
    variant: 'robotics',
    heroKicker: 'A short note about models in the physical world',
    heroLine: 'Your models have to touch reality.',
    heroBody: 'Collision detection, assistive robotics and sensor-based activity recognition leave very little room for an elegant model that does not work outside the notebook.',
    signalKicker: 'The technical thread that caught my attention',
    signalTitle: 'You keep closing the loop between sensing and action.',
    signalBody: 'Your public work spans advanced collision detection for industrial robots, a wearable assistive robot for flat-back syndrome and supervised activity recognition from sensor data. The last project won the 2023 Sejong AI Challenge among 196 participants.',
    mechanism: [
      ['Sense', 'A physical system produces noisy, time-dependent signals.'],
      ['Infer', 'The model turns those signals into a state or risk estimate.'],
      ['Act', 'A robot, device or operator has to respond correctly.'],
      ['Verify', 'Reality, not the model’s confidence, reveals whether the loop worked.']
    ],
    insightTitle: 'What I think your work is teaching',
    insights: [
      {
        index: '01',
        label: 'Optimise the whole loop',
        fact: 'Your listed projects connect machine learning with industrial collision detection and wearable assistance.',
        take: 'The useful unit is not the classifier. It is the complete path from a sensor to a safe physical response.',
        source: 'Project record',
        href: 'https://www.linkedin.com/in/jaehoon-shim'
      },
      {
        index: '02',
        label: 'Let constraints sharpen the model',
        fact: 'Your Sejong AI Challenge work used MATLAB and supervised learning for sensor-based activity recognition.',
        take: 'A bounded physical task gives the model a falsifiable job. That makes evaluation more useful than a vague claim of intelligence.',
        source: 'Sejong AI Challenge',
        href: 'https://www.linkedin.com/in/jaehoon-shim'
      },
      {
        index: '03',
        label: 'Technical peers matter',
        fact: 'Alongside the robotics work, your public profile places you inside MeetupLab’s experimental community formats.',
        take: 'I am interested in the combination: serious technical work and a willingness to keep meeting people outside its immediate discipline.',
        source: 'MeetupLab profile',
        href: 'https://www.meetuplab.com/home'
      }
    ],
    bridgeTitle: 'My systems act in software, but I am obsessed with the same boundary between a claim and a real outcome.',
    bridgeBody: 'Capability Factory does not accept “the tool call succeeded” as proof. It reads the external system again and checks the resulting state. I would like to compare that with embodied systems, where sensors, latency and physical uncertainty make the verification problem impossible to ignore.',
    question: 'What changes in your engineering judgement when a false positive can move hardware instead of merely changing a record?',
    ask: 'If you are in Seoul, would you be up for coffee or ten minutes before Wednesday afternoon?'
  }
};

const PRODUCTS = {
  cf: {
    short: 'CF',
    name: 'Capability Factory',
    line: 'An agent reaches a missing ability, acquires the smallest permissioned capability, verifies the external result and continues its original goal.',
    proof: 'Working local constrained-HTTP pilot MVP, built from idea to YC-submitted MVP in six days.',
    details: [
      'CF starts inside an ordinary task. When the agent becomes blocked, it diagnoses the exact missing action, separates technical capability from missing authority, and searches retained or trusted options before constructing anything new.',
      'Execution stays inside explicit permissions. A separate verifier reads the target system after the action, reconciles uncertain writes before retry and resumes the saved parent task only when the intended external state is present.'
    ],
    compare: [
      ['Capability Factory', 'Resolves the gap, checks authority, proves the result and resumes the parent goal.'],
      ['Composio', 'Supplies authenticated tools; the human still designs the wider resolution and proof loop.'],
      ['Pipedream', 'Supplies integrations and workflows; the human still diagnoses the gap and verifies the outcome.'],
      ['Nango', 'Handles auth and integration infrastructure; the human still builds the capability logic and continuation.'],
      ['Custom build', 'An engineer diagnoses, builds, deploys and restarts the blocked work.']
    ]
  },
  das: {
    short: 'DAS',
    name: 'Dynamic Agent Specialisation',
    line: 'Describe a bounded role. DAS constructs complete specialist configurations, tests them against strong baselines and switches only when a challenger proves better.',
    proof: 'Private local prototype exercised across three different fictional business roles.',
    details: [
      'DAS treats the whole specialist package as the object to build: model, instructions, context, tools, memory, authority, escalation, verifier, cost and latency. Structurally unsafe candidates fail before expensive trials.',
      'Finalists face frozen cases and separate external-state verification. The system can keep the existing worker when a new candidate does not prove the required improvement. A generated option does not win merely because it is new.'
    ],
    compare: [
      ['DAS', 'Builds, tests and selects the complete specialist, then exposes the best proved options.'],
      ['CrewAI', 'Makes roles and crews easier to configure; the human still designs and tests the workers.'],
      ['LangGraph', 'Provides powerful workflow primitives; the human still architects and compares each specialist.'],
      ['AutoGen', 'Coordinates configured agents; the human still builds the workers and decides what wins.'],
      ['Manual build', 'An expert explores and tests each configuration one at a time.']
    ]
  }
};

function track(profile, eventName, detail) {
  if (typeof window === 'undefined') return;
  const path = `/${profile.slug}`;
  if (typeof window.plausible === 'function') window.plausible(eventName, {props: {route: path, detail}});
  else if (typeof window.gtag === 'function') window.gtag('event', eventName, {page_path: path, detail});
}

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>;
}

function JumpButton({target, children, secondary = false}) {
  const go = () => document.getElementById(target)?.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  return <button className={`fo-button ${secondary ? 'is-secondary' : ''}`} onClick={go}>{children}<Arrow/></button>;
}

function HeroVisual({variant}) {
  if (variant === 'research') return <div className="fo-hero-art is-research" aria-hidden="true">
    <div className="fo-dialogue-ring is-one"/><div className="fo-dialogue-ring is-two"/><div className="fo-dialogue-ring is-three"/>
    <div className="fo-wave">{Array.from({length: 17}, (_, i) => <i key={i}/>)}</div>
    <span className="fo-art-label is-a">REAL CONVERSATION</span><span className="fo-art-label is-b">REVIEWED</span><b>TRUST</b>
  </div>;
  if (variant === 'network') return <div className="fo-hero-art is-network" aria-hidden="true">
    <svg viewBox="0 0 700 700"><g className="fo-links"><path d="M350 350 120 170M350 350 570 128M350 350 610 438M350 350 424 610M350 350 122 525M120 170 570 128M570 128 610 438M610 438 424 610M424 610 122 525M122 525 120 170"/></g></svg>
    {['DESIGN','CODE','IDEA','ROOM','BUILD','INTRO'].map((label, i) => <span className={`fo-node n-${i + 1}`} key={label}>{label}</span>)}
    <b>4 DAYS</b>
  </div>;
  if (variant === 'stages') return <div className="fo-hero-art is-stages" aria-hidden="true">
    <div className="fo-stage-window w-one"><span>01 / RESEARCH</span><i/><i/><i/></div>
    <div className="fo-stage-window w-two"><span>02 / BUILD</span><i/><i/></div>
    <div className="fo-stage-window w-three"><span>03 / SHIP</span><i/><i/><i/></div>
    <div className="fo-stage-dock"><i/><i/><i/><i/></div>
  </div>;
  return <div className="fo-hero-art is-robotics" aria-hidden="true">
    <div className="fo-scan"/><div className="fo-joint j-one"/><div className="fo-joint j-two"/><div className="fo-joint j-three"/>
    <i className="fo-arm a-one"/><i className="fo-arm a-two"/><span className="fo-signal s-one">0.82</span><span className="fo-signal s-two">SAFE</span><b>SENSE → ACT</b>
  </div>;
}

function ProductModal({active, onClose, onTab}) {
  useEffect(() => {
    if (!active) return undefined;
    const previous = document.body.style.overflow;
    const key = event => event.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key); };
  }, [active, onClose]);
  if (!active) return null;
  const product = PRODUCTS[active.product];
  return <div className="fo-modal-shell" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className={`fo-modal is-${active.product}`} role="dialog" aria-modal="true" aria-labelledby="fo-modal-title">
      <header><div><span>{product.short}</span><strong id="fo-modal-title">{product.name}</strong></div><button onClick={onClose}>Close <b>×</b></button></header>
      <nav><button className={active.tab === 'technical' ? 'is-active' : ''} onClick={() => onTab('technical')}>Technical details</button><button className={active.tab === 'compare' ? 'is-active' : ''} onClick={() => onTab('compare')}>Compared</button></nav>
      <div className="fo-modal-body">
        <p className="fo-modal-lede">{product.line}</p>
        {active.tab === 'technical' ? <div className="fo-modal-copy">{product.details.map(text => <p key={text}>{text}</p>)}<div className="fo-modal-proof">{product.proof}</div></div> : <div className="fo-compare">{product.compare.map(([name, difference], index) => <article className={index === 0 ? 'is-own' : ''} key={name}><strong>{name}</strong><p>{difference}</p></article>)}</div>}
      </div>
    </section>
  </div>;
}

function ProductTile({kind, onOpen}) {
  const product = PRODUCTS[kind];
  return <article className={`fo-product is-${kind}`}>
    <div><span>{product.short}</span><small>{kind === 'cf' ? 'Build the missing ability' : 'Build the right worker'}</small></div>
    <h3>{product.name}</h3>
    <p>{product.line}</p>
    <strong className="fo-product-proof">{product.proof}</strong>
    <div className="fo-product-actions"><button onClick={() => onOpen(kind, 'technical')}>How it works <Arrow/></button><button onClick={() => onOpen(kind, 'compare')}>The difference <Arrow/></button></div>
  </article>;
}

export function FounderOutreach({profile}) {
  const root = useRef(null);
  const [activeSection, setActiveSection] = useState('hello');
  const [modal, setModal] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    document.body.classList.add('fo-body');
    track(profile, 'founder_route_view', 'hello');
    return () => document.body.classList.remove('fo-body');
  }, [profile]);

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const intro = gsap.timeline({defaults: {ease: 'power4.out'}});
    intro.from('.fo-hero-kicker', {y: 16, opacity: 0, duration: .75})
      .from('.fo-hero-name', {y: 46, opacity: 0, duration: 1.05}, '-=.05')
      .from('.fo-hero-line', {y: 46, opacity: 0, duration: 1.05}, '-=.22')
      .from('.fo-hero-body', {y: 28, opacity: 0, duration: .9}, '-=.15')
      .from('.fo-hero .fo-button', {y: 18, opacity: 0, duration: .75}, '-=.25');
    gsap.fromTo('.fo-hero-art', {scale: .74, opacity: 0, rotate: -5, filter: 'blur(24px)'}, {scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)', duration: 4.4, ease: 'power3.out'});
    gsap.fromTo('.fo-hero-haze', {opacity: 1, backdropFilter: 'blur(22px)'}, {opacity: 0, backdropFilter: 'blur(0px)', duration: 4.7, ease: 'power2.out'});
    gsap.utils.toArray('.fo-mechanism-step').forEach((step, index) => gsap.from(step, {opacity: 0, y: 80, rotate: index % 2 ? 1 : -1, scrollTrigger: {trigger: step, start: 'top 88%', end: 'top 58%', scrub: .5}}));
    gsap.utils.toArray('.fo-insight').forEach((row, index) => gsap.from(row, {opacity: 0, x: index % 2 ? 80 : -80, scrollTrigger: {trigger: row, start: 'top 90%', end: 'top 62%', scrub: .5}}));
    gsap.utils.toArray('.fo-product').forEach((tile, index) => gsap.from(tile, {opacity: 0, y: 90 + index * 30, scrollTrigger: {trigger: tile, start: 'top 90%', end: 'top 62%', scrub: .5}}));
    SECTIONS.forEach(id => ScrollTrigger.create({trigger: `#${id}`, start: 'top 52%', end: 'bottom 52%', onEnter: () => setActiveSection(id), onEnterBack: () => setActiveSection(id)}));
  }, {scope: root, dependencies: [profile.slug]});

  const openModal = (product, tab) => {
    setModal({product, tab});
    track(profile, 'founder_detail_open', `${product}_${tab}`);
  };
  const confirm = () => {
    setConfirmed(true);
    track(profile, 'founder_connection_ask', 'confirmed');
  };

  return <main className={`fo-page is-${profile.variant}`} ref={root}>
    <div className="fo-grain" aria-hidden="true"/>
    <header className="fo-nav">
      <a href="#hello" className="fo-wordmark">Joel Jeon <span>/ for {profile.first}</span></a>
      <nav aria-label="Page progress">{SECTIONS.map((id, index) => <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : ''} aria-label={`Go to ${id}`} aria-current={activeSection === id ? 'step' : undefined}><span>{index + 1}</span></a>)}</nav>
      <a href="#meet" className="fo-nav-ask">The question</a>
    </header>

    <section className="fo-section fo-hero" id="hello">
      <div className="fo-hero-copy">
        <p className="fo-hero-kicker">{profile.heroKicker}</p>
        <h1><span className="fo-hero-name">Hi, {profile.first}.</span><span className="fo-hero-line">{profile.heroLine}</span></h1>
        <p className="fo-hero-body">{profile.heroBody}</p>
        <JumpButton target="work">Show me why</JumpButton>
      </div>
      <HeroVisual variant={profile.variant}/>
      <div className="fo-hero-haze" aria-hidden="true"/>
      <div className="fo-scroll-cue">Scroll or click <i/></div>
    </section>

    <section className="fo-section fo-work" id="work">
      <header className="fo-heading"><p>{profile.signalKicker}</p><h2>{profile.signalTitle}</h2></header>
      <div className="fo-work-grid">
        <p className="fo-work-lede">{profile.signalBody}</p>
        <ol className="fo-mechanism">{profile.mechanism.map(([title, body], index) => <li className="fo-mechanism-step" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol>
      </div>
      <JumpButton target="signals" secondary>What I took from it</JumpButton>
    </section>

    <section className="fo-section fo-signals" id="signals">
      <header className="fo-heading"><p>Evidence, then interpretation</p><h2>{profile.insightTitle}</h2></header>
      <div className="fo-insight-list">{profile.insights.map(insight => <article className="fo-insight" key={insight.label}>
        <span>{insight.index}</span>
        <h3>{insight.label}</h3>
        <div><small>What is public</small><p>{insight.fact}</p><a href={insight.href} target="_blank" rel="noreferrer">{insight.source} ↗</a></div>
        <div><small>What I take from it</small><p>{insight.take}</p></div>
      </article>)}</div>
      <JumpButton target="joel">Why this connects to me</JumpButton>
    </section>

    <section className="fo-section fo-joel" id="joel">
      <header className="fo-heading"><p>Why I chose to reach out</p><h2>{profile.bridgeTitle}</h2></header>
      <p className="fo-bridge">{profile.bridgeBody}</p>
      <div className="fo-product-grid"><ProductTile kind="cf" onOpen={openModal}/><ProductTile kind="das" onOpen={openModal}/></div>
      <blockquote><span>The question I would actually ask</span><p>{profile.question}</p></blockquote>
      <JumpButton target="meet" secondary>One last thing</JumpButton>
    </section>

    <section className="fo-section fo-meet" id="meet">
      <div className="fo-meet-intro"><p>That is the whole pitch</p><h2>I’m fifteen, visiting from London, and trying to learn from people who have made difficult things real.</h2></div>
      <div className="fo-ask">
        <span>{profile.role}</span>
        <h3>{profile.ask}</h3>
        {!confirmed ? <button className="fo-confirm" onClick={confirm}>Yes, connect us <Arrow/></button> : <div className="fo-confirmed" role="status" aria-live="polite"><strong>Perfect.</strong><p>Josephine can connect us now.</p></div>}
      </div>
      <footer><span>Made personally by Joel</span><a href="#hello">Back to the beginning ↑</a></footer>
    </section>

    <ProductModal active={modal} onClose={() => setModal(null)} onTab={tab => setModal(current => ({...current, tab}))}/>
  </main>;
}

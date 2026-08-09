import React, {useEffect, useState} from 'react';

const DAS_STEPS = ['Role needed', 'Construct specialist', 'Test vs baseline', 'Activate if better'];
const CF_STEPS = ['Missing ability', 'Build capability', 'Act with authority', 'Verify outcome'];

function track(eventName, scene) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible === 'function') {
    window.plausible(eventName, {props: {route: '/raehyeon', scene}});
  } else if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {page_path: '/raehyeon', scene});
  }
}

function Progress({scene}) {
  return <div className="rh-progress" aria-label={`Scene ${scene} of 3`}>
    {[1, 2, 3].map(step => <span key={step} className={step <= scene ? 'is-filled' : ''}/>)}
  </div>;
}

function SceneHeader({scene, onBack}) {
  return <header className="rh-header">
    {scene > 1 ? <button className="rh-back" onClick={onBack} aria-label="Go to the previous scene">← Back</button> : <span className="rh-from">Joel Jeon / Seoul</span>}
    <Progress scene={scene}/>
  </header>;
}

function Mechanism({name, description, steps, variant}) {
  return <section className={`rh-mechanism rh-${variant}`} aria-label={`${name}: ${steps.join(' to ')}`}>
    <div className="rh-mechanism-title"><strong>{name}</strong><span>{description}</span></div>
    <ol className="rh-flow">
      {steps.map((step, index) => <li key={step} style={{'--step': index}}><i/><span>{step}</span></li>)}
    </ol>
  </section>;
}

export function RaehyeonIntro() {
  const [scene, setScene] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    document.body.classList.add('rh-body');
    track('raehyeon_route_view', 1);
    return () => document.body.classList.remove('rh-body');
  }, []);

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'ArrowRight' && scene < 3) advance();
      if (event.key === 'ArrowLeft' && scene > 1) retreat();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [scene]);

  const advance = () => {
    const next = Math.min(3, scene + 1);
    setScene(next);
    track('raehyeon_scene_progress', next);
  };

  const retreat = () => {
    setConfirmed(false);
    setScene(current => Math.max(1, current - 1));
  };

  const confirm = () => {
    setConfirmed(true);
    track('raehyeon_connection_ask', 3);
  };

  return <main className={`rh-page rh-scene-${scene}`}>
    <div className="rh-grain" aria-hidden="true"/>
    <div className="rh-stage" key={scene}>
      <SceneHeader scene={scene} onBack={retreat}/>

      {scene === 1 && <section className="rh-scene rh-intro-scene">
        <div className="rh-orbit" aria-hidden="true"><i/><i/><i/></div>
        <div className="rh-intro-copy">
          <p className="rh-personal">A personal note for Raehyeon</p>
          <h1><span>Raehyeon,</span><span>I made this for you.</span></h1>
          <p className="rh-lede">I’m Joel, 15, an AI founder visiting from London. I built two new agent systems in the last few weeks. I leave Wednesday afternoon.</p>
        </div>
        <button className="rh-primary" onClick={advance}>Here’s the short version <span>→</span></button>
      </section>}

      {scene === 2 && <section className="rh-scene rh-technical-scene">
        <div className="rh-technical-copy">
          <p className="rh-personal">What I’ve been building</p>
          <h1>One builds the specialist. The other resolves missing abilities.</h1>
        </div>
        <div className="rh-mechanisms">
          <Mechanism name="DAS" description="Build the right worker" steps={DAS_STEPS} variant="das"/>
          <Mechanism name="CF" description="Give it a missing ability" steps={CF_STEPS} variant="cf"/>
        </div>
        <p className="rh-comparison">CrewAI helps developers assemble and orchestrate agents. DAS takes on another layer: constructing, testing and selecting the specialist itself.</p>
        <button className="rh-primary" onClick={advance}>And the bigger idea <span>→</span></button>
      </section>}

      {scene === 3 && <section className="rh-scene rh-vision-scene">
        <div className="rh-vision-map" aria-hidden="true">
          <span className="rh-map-node">DAS</span><i/><span className="rh-map-core">Future<br/>Fleet Brain</span><i/><span className="rh-map-node">CF</span>
        </div>
        <div className="rh-vision-copy">
          <h1>The bigger idea: an Agent Fleet Brain.</h1>
          <p>If DAS builds the right specialist and CF gives it the abilities it needs, they could eventually support an operating layer for a company’s agent workforce. They are separate systems today.</p>
        </div>
        <p className="rh-relevance">I thought of you because your work across Potentivo and WorldClone connects AI systems, simulation and real-user evidence. I’d love to compare notes on where those ideas meet.</p>
        <div className="rh-ask">
          <h2>Would you be up for coffee, or even ten minutes, before Wednesday afternoon?</h2>
          {!confirmed ? <button className="rh-primary" onClick={confirm}>Yes, connect us <span>→</span></button> : <div className="rh-confirm" role="status" aria-live="polite"><strong>Amazing.</strong><span>Josephine can connect us now.</span></div>}
        </div>
      </section>}
    </div>
  </main>;
}

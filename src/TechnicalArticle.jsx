import React,{useEffect,useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './technical-article.css';

gsap.registerPlugin(ScrollTrigger);

export const TECHNICAL_ARTICLES={
  'capability-factory':{
    slug:'capability-factory',
    short:'CF',
    product:'Capability Factory',
    label:'Capability Factory by Joel Jeon',
    headline:'Agents that acquire missing abilities.',
    intro:'Capability resolution becomes part of the work, not a separate integration ticket.',
    thesis:'Capability Factory demonstrates a new capability-resolution loop. While pursuing an ordinary goal, an agent can recognize a missing ability, reuse or acquire the smallest permission-bounded capability, verify the real external outcome independently, and resume the work it was originally asked to complete.',
    consequence:'If this generalizes beyond the current bounded local system, agent companies would no longer need to predict and hand-build every capability before deployment. Their agents could resolve unfamiliar but authorized digital work as it arises.',
    stage:'Working local pilot MVP for constrained HTTP, with seven additional bounded experimental local capability routes.',
    mechanism:[
      {title:'Start with the ordinary goal',body:'Capability Factory sits behind an existing agent through an embedded software development kit or customer-local sidecar. The customer describes the result they need. They should not have to diagnose which integration is missing first.'},
      {title:'Diagnose the exact gap',body:'The system identifies the required action, target, inputs and observable completion criteria. The current system does this inside a trusted customer-local scope, rather than pretending to understand every possible business environment.'},
      {title:'Separate capability from authority',body:'A missing technical route is different from a missing credential, permission, approval, target detail or human judgement. Capability Factory may acquire the route. It must request missing authority precisely instead of manufacturing it.'},
      {title:'Search before building',body:'The order is retained capability, trusted existing source, bounded composition, smallest built manifest, isolated residual route, then bounded delegation. Existing tools should be reused when they fit. Rebuilding everything would make the system slower and less trustworthy.'},
      {title:'Bind the complete capability bundle',body:'A capability is more than generated code. Its bundle binds trusted runtime software, a constrained manifest, target, permissions, approvals, pre-use verification, external-outcome verification, recovery rules, provenance, scope and version. Customer credentials and payloads are not retained inside it.'},
      {title:'Prove it before use',body:'A candidate receives a bounded no-action or disposable-state probe. Unsafe, malformed or weakly observable routes fail closed before they are allowed to affect business state.'},
      {title:'Execute inside exact authority',body:'Trusted runtime code, not the language model, enforces which target, action, risk, approval and secret boundaries apply. A technically possible action still cannot exceed the authority the customer granted.'},
      {title:'Read the real external state',body:'An executor saying success is not proof. Separate read-only logic checks whether the intended business state actually exists. When several capabilities contribute to one goal, an additional aggregate check must prove the parent outcome.'},
      {title:'Reconcile uncertainty',body:'A write may commit even when its response is lost. Before retrying, the system reads the external state. Completed work is not repeated. Partial, incorrect and unknown results stay explicit, and risky capabilities can be quarantined.'},
      {title:'Resume and retain',body:'The climax is not capability creation. It is completing the original goal. A proven capability is retained with its scope and evidence so a fresh process can reuse it later.'}
    ],
    proofs:[
      {label:'Build speed',title:'Five development days',body:'Five development days separated the initial thesis from the first end-to-end constrained local loop. The constrained-HTTP application milestone followed on calendar day six.'},
      {label:'Recovery',title:'Uncertain write, no duplicate',body:'A deliberately lost response left a write uncertain. The local system checked real state before retry, discovered the committed result, avoided a duplicate and continued.'},
      {label:'Breadth',title:'Eight enabled local routes',body:'HTTP has the pilot-MVP label. Browser, file/EDI, signed message, pinned document, reviewed database, WebAssembly and signed delegation routes remain bounded experimental local systems.'}
    ],
    proofNote:'A frozen local development gate exercised all eight enabled routes, and the wider repository contains hundreds of automated local checks. The evidence is fictional and disposable, not a customer deployment or production-reliability result.',
    adjacentIntro:'Existing platforms already solve important pieces, and Capability Factory should reuse them when they fit. Its different thesis is the complete ordinary-goal loop around those pieces.',
    adjacent:[
      {name:'Nango',href:'https://nango.dev/docs/getting-started/use-cases/tool-calling',body:'Scoped agent access, authentication and integration functions.'},
      {name:'Pipedream Connect',href:'https://pipedream.com/connect',body:'Managed authentication and a large catalogue of agent tools.'},
      {name:'Composio',href:'https://docs.composio.dev/reference/v3/api-reference/tool-router',body:'Tool discovery, execution, authentication and session context.'},
      {name:'Riza',href:'https://riza.io/',body:'Isolated runtimes for code execution and tool creation.'}
    ],
    distinction:'Capability Factory joins diagnosis, reuse or acquisition, exact authority, independent outcome verification, safe recovery, retention and original-goal resumption. In current research, I have not found public evidence of another company demonstrating that same specific end-to-end loop.',
    boundary:'This is strong local evidence for a new capability-resolution architecture, not yet evidence of customer compatibility, production reliability or effective universality.',
    externalHref:'https://capability-factory-website.vercel.app/',
    externalLabel:'Visit Capability Factory',
    relatedSlug:'dynamic-agent-specialisation',
    relatedName:'Dynamic Agent Specialisation',
    relatedLine:'The companion question: how do you construct and prove the right specialist agent for a role?'
  },
  'dynamic-agent-specialisation':{
    slug:'dynamic-agent-specialisation',
    short:'DAS',
    product:'Dynamic Agent Specialisation',
    label:'Dynamic Agent Specialisation by Joel Jeon',
    headline:'Compile the role. Prove the worker.',
    intro:'Describe the job. DAS constructs complete specialists and switches only when a challenger proves better.',
    thesis:'Dynamic Agent Specialisation is a new technological advancement that compiles a bounded business role into several complete AI specialists, tests their actual external outcomes against strong baselines, and recommends a switch only when a challenger proves it should.',
    consequence:'A company can describe the job, systems, rules, authority, examples and operating priorities. DAS can assemble and compare plausible complete workers instead of asking the company to guess the right model, prompt and tool setup.',
    stage:'A working private bounded local system with a technically complete three-role specialist-compilation mechanism.',
    mechanism:[
      {title:'Define the role as a contract',body:'The input is not just a job title. It includes the desired business outcome, systems, policies, authority, examples, independent success criteria and the company’s quality, cost and speed priorities. An existing agent can enter as the baseline.'},
      {title:'Construct complete specialists',body:'Each candidate binds a model, instructions, context, tools, memory policy, allowed authority, escalation behaviour, independent verifier, cost limits and latency limits. The configuration being tested is the whole worker, not only its prompt.'},
      {title:'Reject invalid designs early',body:'Wrong tools, missing context, mismatched verification, excessive authority, unsafe memory scope, impossible budgets and invalid escalation rules are hard failures. Safety and authority cannot be averaged away by a high performance score.'},
      {title:'Use meaningful baselines',body:'DAS does not merely rank candidates it generated itself. The bounded campaigns compare them with strong general agents, ordinary manually configured agents and expert configurations where those alternatives can be run fairly.'},
      {title:'Freeze the exam',body:'Candidate and baseline identities are fixed before prospective unseen cases are released. Development, validation, adversarial, unseen and repeatability evidence stay separate so a good-looking result cannot be created through post-hoc score chasing.'},
      {title:'Check the world, not the claim',body:'A separate external-state verifier checks whether the intended order, ticket, CRM record or other business result exists and whether forbidden side effects occurred. The candidate is not allowed to grade itself.'},
      {title:'Preserve failures',body:'Missing outcomes, incorrect effects, handoffs, tool use, latency and cost remain in the evidence. A narrow repair may address a missing outcome. Incorrect or unsafe effects stop instead of disappearing behind an automatic retry.'},
      {title:'Select or retain',body:'A generated specialist activates only when it wins under the decision rule fixed in advance. Otherwise DAS recommends keeping the existing setup. Retaining the current agent is a valid and sometimes correct output.'},
      {title:'Connect bounded real tools',body:'Current local adapter work can import an explicitly selected safe subset of OpenAPI operations or a pinned customer-local Model Context Protocol tool list. Exact tool allowlists, authority, uncertain-write reconciliation and external-state visibility remain attached.'}
    ],
    proofs:[
      {label:'Generality',title:'Three different role families',body:'One unchanged compiler and evaluation mechanism has operated across fictional procurement, software support and customer-revenue operations worlds.'},
      {label:'Decision',title:'One switch, two retains',body:'A compiler-built specialist earned selection in one role. The existing specialist stayed in two because the challengers did not prove a better overall choice.'},
      {label:'Verification',title:'More than 250 checks',body:'The repository has passed more than 250 automated local checks across policy, persistence, evaluation and evidence layers. These are codebase checks, not 250 model-agent trials.'}
    ],
    proofNote:'A later local model-backed portfolio run completed three new fictional assignments through separate external-state checks, with no observed unsafe attempt in those tasks. No real customer system has been activated.',
    adjacentIntro:'Agent construction, orchestration and evaluation are active categories. DAS does not claim those components are absent. Its focus is joining them into one evidence-gated compilation and switch-or-retain decision.',
    adjacent:[
      {name:'LangSmith',href:'https://docs.langchain.com/langsmith/evaluation',body:'Agent evaluation, prompt versioning and optimization.'},
      {name:'CrewAI',href:'https://docs.crewai.com/index',body:'Agents, crews, flows, memory, guardrails and deployment.'},
      {name:'Microsoft Copilot Studio',href:'https://learn.microsoft.com/en-us/microsoft-copilot-studio/',body:'Agent construction, tools, evaluation and governance.'},
      {name:'DSPy',href:'https://github.com/stanfordnlp/dspy/blob/main/docs/docs/api/optimizers/MIPROv2.md',body:'Optimization of instructions and examples inside language-model programs.'}
    ],
    distinction:'DAS joins complete specialist-package construction, hard authority and safety contracts, strong-baseline comparison, independent external-state verification, and a final switch-or-retain decision. As of August 2026, my review of public product documentation has not found another system demonstrating this same specific loop.',
    boundary:'The bounded three-role technical mechanism is complete. Customer deployment, production reliability, real-company setup-time savings and demand remain unproved.',
    relatedSlug:'capability-factory',
    relatedName:'Capability Factory',
    relatedLine:'The companion question: what happens when an agent encounters a missing digital ability while it works?'
  }
};

function ConceptFigure({article}){
  if(article.short==='CF')return <figure className="tech-figure tech-figure-cf" aria-label="Capability Factory resolution loop">
    <div className="tech-orbit-ring ring-a"/><div className="tech-orbit-ring ring-b"/>
    {['goal','gap','search','verify','act','resume'].map((label,index)=><span className={`tech-orbit-node node-${index+1}`} key={label}>{label}</span>)}
    <strong>capability<br/>resolution</strong>
    <figcaption>Ordinary goal to verified outcome, without losing the original intent.</figcaption>
  </figure>;
  return <figure className="tech-figure tech-figure-das" aria-label="Dynamic Agent Specialisation comparison loop">
    <div className="tech-candidate candidate-a"><span>candidate</span><i/><i/><i/></div>
    <div className="tech-candidate candidate-b"><span>candidate</span><i/><i/><i/></div>
    <div className="tech-candidate candidate-c"><span>current</span><i/><i/><i/></div>
    <div className="tech-verifier"><span>external outcome</span><strong>prove before switching</strong></div>
    <figcaption>Complete specialists compete against strong baselines under one independent decision rule.</figcaption>
  </figure>;
}

export function TechnicalArticle({article}){
  const root=useRef(null);
  useEffect(()=>{
    document.body.classList.add('technical-body');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return()=>document.body.classList.remove('technical-body');
    const ctx=gsap.context(()=>{
      const intro=gsap.timeline({defaults:{ease:'power4.out'}})
        .from('.tech-nav',{opacity:0,y:-16,duration:.65})
        .from('.tech-kicker',{opacity:0,y:20,duration:.55},'<.1')
        .from('.tech-title-line',{yPercent:112,rotate:1.5,duration:1,stagger:.08},'<.05')
        .from('.tech-hero-copy',{opacity:0,y:24,duration:.65},'<.35')
        .from('.tech-figure',{opacity:0,scale:.86,filter:'blur(16px)',duration:1.4},'<-.05');
      gsap.to('.tech-progress',{scaleX:1,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'bottom bottom',scrub:.2}});
      gsap.to('.tech-figure',{rotate:article.short==='CF'?7:-2,y:-35,ease:'none',scrollTrigger:{trigger:'.tech-hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.utils.toArray('.tech-reveal').forEach(element=>gsap.from(element,{opacity:.12,y:34,scrollTrigger:{trigger:element,start:'top 88%',end:'top 58%',scrub:.45}}));
      gsap.utils.toArray('.tech-mechanism-item').forEach((element,index)=>gsap.from(element,{opacity:0,x:index%2?55:-55,scrollTrigger:{trigger:element,start:'top 90%',end:'top 64%',scrub:.5}}));
      void intro;
    },root);
    return()=>{ctx.revert();document.body.classList.remove('technical-body');};
  },[article.short]);

  return <main className={`technical-page is-${article.short.toLowerCase()}`} ref={root}>
    <nav className="tech-nav">
      <a className="tech-name" href="/">Joel Jeon</a>
      <div><a className={article.short==='CF'?'is-active':''} href="/capability-factory">Capability Factory</a><a className={article.short==='DAS'?'is-active':''} href="/dynamic-agent-specialisation">DAS</a></div>
      <a href="/">Personal site</a>
      <i className="tech-progress"/>
    </nav>

    <header className="tech-hero">
      <div className="tech-hero-text">
        <p className="tech-kicker">{article.label}</p>
        <h1>{article.headline.split(' ').reduce((lines,word)=>{const next=[...lines];if(!next.length||next[next.length-1].join(' ').length>20)next.push([word]);else next[next.length-1].push(word);return next;},[]).map((line,index)=><span className="tech-title-clip" key={index}><span className="tech-title-line">{line.join(' ')}</span></span>)}</h1>
        <p className="tech-hero-copy">{article.intro}</p>
      </div>
      <ConceptFigure article={article}/>
    </header>

    <section className="tech-thesis">
      <p className="tech-reveal">{article.thesis}</p>
      <aside className="tech-reveal"><strong>What changes if it works</strong><p>{article.consequence}</p><span>{article.stage}</span></aside>
    </section>

    <section className="tech-mechanism">
      <div className="tech-mechanism-sticky"><h2>How the mechanism works</h2><p>The control loop is the product. Each part exists to preserve authority, evidence and the original goal.</p></div>
      <div className="tech-mechanism-list">{article.mechanism.map(item=><article className="tech-mechanism-item" key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
    </section>

    <section className="tech-evidence">
      <header><h2>What has actually been demonstrated</h2><p>{article.proofNote}</p></header>
      <div className="tech-evidence-grid">{article.proofs.map(proof=><article className="tech-reveal" key={proof.title}><span>{proof.label}</span><h3>{proof.title}</h3><p>{proof.body}</p></article>)}</div>
    </section>

    <section className="tech-adjacent">
      <h2>The surrounding landscape</h2>
      <p className="tech-adjacent-intro tech-reveal">{article.adjacentIntro}</p>
      <div className="tech-adjacent-grid">{article.adjacent.map(item=><a className="tech-reveal" href={item.href} target="_blank" rel="noreferrer" key={item.name}><strong>{item.name}</strong><p>{item.body}</p><span>Official source ↗</span></a>)}</div>
      <blockquote className="tech-reveal">{article.distinction}</blockquote>
    </section>

    <section className="tech-boundary">
      <p>{article.boundary}</p>
      {article.externalHref&&<a href={article.externalHref} target="_blank" rel="noreferrer">{article.externalLabel} ↗</a>}
    </section>

    <footer className="tech-footer">
      <div><span>Written and built by</span><strong>Joel Jeon</strong><p>Founder building infrastructure for capable, verifiable AI agents.</p></div>
      <a className="tech-related" href={`/${article.relatedSlug}`}><span>Read next</span><strong>{article.relatedName}</strong><p>{article.relatedLine}</p></a>
      <a className="tech-email" href="mailto:joeljeon7@gmail.com">joeljeon7@gmail.com</a>
    </footer>
  </main>;
}

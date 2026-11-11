import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, Layers3,
  Menu, MessageCircle, MonitorSmartphone, MousePointer2, PanelsTopLeft,
  ShieldCheck, ShoppingBag, Sparkles, Workflow, X, Zap
} from "lucide-react";

const DISCORD = "https://discord.gg/v4xuaSJyRj";

const services = [
  { n: "01", icon: MonitorSmartphone, title: "Websites de alto padrão", text: "Uma presença digital que traduz o valor da sua marca. Arquitetura de conteúdo, identidade visual e experiência responsiva pensadas para gerar confiança." },
  { n: "02", icon: ShoppingBag, title: "Lojas virtuais", text: "Vitrines digitais organizadas para vender. Catálogo, páginas de produto, jornada de compra e estrutura preparada para evoluir com o negócio." },
  { n: "03", icon: Zap, title: "Landing pages", text: "Páginas focadas em uma ação. Mensagem clara, hierarquia visual e fluxo de conversão construído para campanhas e lançamentos." },
  { n: "04", icon: Layers3, title: "Sistemas personalizados", text: "Ferramentas web desenhadas ao redor da sua operação: regras de negócio, fluxos específicos e interfaces que simplificam tarefas." },
  { n: "05", icon: PanelsTopLeft, title: "Painéis administrativos", text: "Controle em um só lugar. Dashboards, gestão de conteúdo, indicadores e áreas administrativas com organização e permissões." },
  { n: "06", icon: Workflow, title: "Catálogos e experiências", text: "Cardápios, catálogos e apresentações interativas que deixam seus produtos fáceis de descobrir, consultar e compartilhar." },
];

const projects = [
  { type: "E-COMMERCE · CONCEITO", name: "NØRTH / Commerce", desc: "Uma experiência de compra editorial, com foco em produto, descoberta e clareza.", tone: "blue", label: "Loja virtual" },
  { type: "INSTITUCIONAL · CONCEITO", name: "ATELIER / Digital", desc: "Uma presença minimalista para uma marca que precisa comunicar personalidade.", tone: "silver", label: "Website" },
  { type: "DASHBOARD · CONCEITO", name: "PULSE / Control", desc: "Um painel de operação com informação hierarquizada e leitura rápida.", tone: "violet", label: "Sistema web" },
];

function SpectralIntro({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const canvas = document.getElementById("spectral-field") as HTMLCanvasElement | null;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: reduced ? 35 : 150 }, (_, i) => ({
      x: Math.random(), y: Math.random(), z: Math.random(),
      size: Math.random() * 1.8 + .3, phase: Math.random() * 7,
      target: i / (reduced ? 35 : 150),
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);
      const t = frame * (reduced ? 0 : .009);
      for (const p of particles) {
        const x = p.x * width + Math.sin(t + p.phase) * 15;
        const y = ((p.y * height - frame * (p.z + .12) * .22) % height + height) % height;
        const alpha = .16 + (Math.sin(t * 1.7 + p.phase) + 1) * .2;
        ctx.beginPath(); ctx.fillStyle = `rgba(77,151,255,${alpha})`;
        ctx.shadowBlur = 12; ctx.shadowColor = "#287bff";
        ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="intro" role="dialog" aria-label="Apresentação GRECIA DEVs">
      <canvas id="spectral-field" className="intro-canvas" />
      <div className="intro-vignette" />
      <div className="intro-creature" aria-hidden="true">
        <svg viewBox="0 0 620 310" className="specter" fill="none">
          <defs>
            <linearGradient id="spirit" x1="60" y1="35" x2="540" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#d4edff"/><stop offset=".38" stopColor="#4d9dff"/><stop offset="1" stopColor="#1550d6"/></linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <g filter="url(#glow)" stroke="url(#spirit)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M91 151 Q126 91 211 103 L279 77 Q336 65 385 98 L442 91 L488 54 L496 111 Q535 130 548 166 L514 187 Q478 190 451 169 L399 185 Q365 204 331 193 L285 219 L270 277 L245 282 L250 218 L205 209 L170 267 L145 265 L163 193 Q116 183 91 151Z" fill="#1c6de8" fillOpacity=".13"/>
            <path d="M119 145 Q175 117 227 131 Q292 100 365 125 Q420 146 455 135" strokeWidth="3"/>
            <path d="M271 210 Q292 235 278 279 M365 191 Q391 223 383 276" strokeWidth="8"/>
            <path d="M250 278 L235 287 M383 276 L402 286 M145 263 L129 274" strokeWidth="6"/>
            <path d="M468 125 L494 113 L520 139" strokeWidth="4"/>
            <path d="M481 144 L498 148" stroke="#d9f3ff" strokeWidth="7"/>
            <path d="M90 151 Q52 143 28 111 Q55 171 94 181" strokeWidth="6"/>
          </g>
          <path d="M490 145 L506 149" stroke="#dff7ff" strokeWidth="5" filter="url(#glow)"/>
        </svg>
      </div>
      <div className="intro-brand">
        <div className="intro-mark"><Code2 size={23}/></div>
        <div className="intro-word">GRECIA <span>DEVs</span></div>
        <p>TRANSFORMAMOS IDEIAS EM EXPERIÊNCIAS DIGITAIS.</p>
      </div>
      <div className="intro-bottom"><span>ENGINEERING · DESIGN · EXPERIENCE</span><button onClick={onFinish}>PULAR INTRO <ArrowUpRight size={13}/></button></div>
    </div>
  );
}

function GreciaDevs() {
  const [intro, setIntro] = useState(false);
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", kind: "Website profissional", details: "", budget: "" });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: number | undefined;
    try {
      if (!sessionStorage.getItem("grecia-intro-seen") && !reduced) {
        setIntro(true);
        timer = window.setTimeout(() => {
          setIntro(false);
          sessionStorage.setItem("grecia-intro-seen", "1");
        }, 6200);
      }
    } catch { /* A página continua utilizável sem armazenamento. */ }
    return () => { if (timer) window.clearTimeout(timer); };
  }, []);

  const finishIntro = () => {
    setIntro(false);
    try { sessionStorage.setItem("grecia-intro-seen", "1"); } catch { /* armazenamento opcional */ }
  };

  const submitBrief = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const brief = [
      "NOVO PROJETO — GRECIA DEVs",
      `Nome: ${form.name}`, `E-mail: ${form.email}`,
      `WhatsApp: ${form.whatsapp || "Não informado"}`,
      `Projeto: ${form.kind}`, `Investimento: ${form.budget || "A combinar"}`,
      `Descrição: ${form.details}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(brief);
      setSent(true);
      window.open(DISCORD, "_blank", "noopener,noreferrer");
    } catch {
      setSent(false);
      window.alert("Não foi possível copiar automaticamente. Tente novamente ou fale diretamente pelo Discord.");
    }
  };

  return (
    <main className="gd">
      {intro && <SpectralIntro onFinish={finishIntro}/>}
      <header className="topbar">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="GRECIA DEVs início"><span className="brand-icon"><Code2 size={21}/></span><span className="brand-name">GRECIA <b>DEVs</b><small>DIGITAL ENGINEERING STUDIO</small></span></a>
          <button className="mobile-menu" onClick={() => setMenu(!menu)} aria-label={menu ? "Fechar menu" : "Abrir menu"}>{menu ? <X/> : <Menu/>}</button>
          <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
            <a href="#expertise" onClick={() => setMenu(false)}>Expertise</a><a href="#work" onClick={() => setMenu(false)}>Projetos</a><a href="#method" onClick={() => setMenu(false)}>Método</a><a href="#contact" onClick={() => setMenu(false)}>Contato</a>
            <a className="button button-small" href={DISCORD} target="_blank" rel="noreferrer">Iniciar projeto <ArrowUpRight size={15}/></a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid"/>
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><i/> INDEPENDENT DIGITAL STUDIO <span>·</span> BRASIL</div>
            <h1>Não apenas criamos sites.<br/><em>Construímos experiências digitais.</em></h1>
            <p className="hero-lead">Estratégia, design e engenharia trabalhando juntos para transformar ideias em produtos digitais com presença, propósito e precisão.</p>
            <div className="hero-actions"><a className="button" href="#contact">Começar um projeto <ArrowUpRight size={17}/></a><a className="text-link" href="#work">Explorar projetos <ArrowDown size={15}/></a></div>
            <div className="hero-meta"><span><ShieldCheck size={15}/> Arquitetura pensada para evoluir</span><span><MousePointer2 size={15}/> Design centrado na experiência</span></div>
          </div>
          <div className="hero-art" aria-label="Composição abstrata de engenharia digital">
            <div className="art-orbit orbit-a"/><div className="art-orbit orbit-b"/><div className="art-core"><div className="core-symbol"><Code2 size={54}/></div><span>GD / 001</span></div>
            <div className="art-chip chip-a"><span className="chip-pulse"/> DIGITAL CRAFT <b>01</b></div>
            <div className="art-chip chip-b">SYSTEMS <b>↗</b></div>
            <div className="art-caption">IDEAS IN MOTION <span>— 2026</span></div>
          </div>
        </div>
        <div className="container hero-bottom"><span>SCROLL TO EXPLORE</span><div/><span>DESIGN THAT WORKS. TECHNOLOGY THAT LASTS.</span></div>
      </section>

      <section className="intro-statement section-pad">
        <div className="container statement-grid"><span className="section-index">01 / PERSPECTIVE</span><div><p className="statement">O digital não precisa ser apenas funcional. Precisa ser <span>memorável, intuitivo e construído para fazer sentido.</span></p><p className="muted statement-note">Cada projeto começa com uma pergunta: como a tecnologia pode tornar essa ideia melhor? A resposta orienta cada decisão — da primeira linha de código ao último detalhe da interface.</p></div></div>
      </section>

      <section className="section-pad expertise" id="expertise">
        <div className="container">
          <div className="section-heading"><div><span className="section-index">02 / WHAT WE BUILD</span><h2>Engenharia para<br/><em>ideias ambiciosas.</em></h2></div><p className="muted">Soluções digitais desenhadas de acordo com o objetivo, a operação e o momento de cada negócio. Sem fórmulas prontas.</p></div>
          <div className="service-grid">{services.map(s => { const Icon = s.icon; return <article className="service" key={s.n}><div className="service-top"><span className="service-icon"><Icon size={20}/></span><span>{s.n}</span></div><h3>{s.title}</h3><p>{s.text}</p><a href="#contact" aria-label={`Solicitar orçamento para ${s.title}`}>Conversar sobre este serviço <ArrowUpRight size={14}/></a></article>; })}</div>
        </div>
      </section>

      <section className="section-pad work" id="work">
        <div className="container">
          <div className="section-heading"><div><span className="section-index">03 / SELECTED DIRECTIONS</span><h2>Projetos com<br/><em>intenção em cada pixel.</em></h2></div><p className="muted">Estudos demonstrativos de direção visual e possibilidades de produto. São conceitos autorais, não trabalhos atribuídos a clientes reais.</p></div>
          <div className="project-grid">{projects.map((p, i) => <article className={`project ${p.tone}`} key={p.name}><div className="project-visual"><div className="browser"><div className="browser-bar"><i/><i/><i/><span>preview / ${p.name.toLowerCase().replaceAll(" ", "-")}</span></div><div className="browser-content"><div className="mock-nav"><b>{i === 0 ? "NØRTH" : i === 1 ? "ATELIER" : "PULSE"}</b><span>MENU　 ABOUT　 ↗</span></div><div className="mock-hero"><small>{p.type}</small><strong>{i === 0 ? "Objects for a better everyday." : i === 1 ? "A different point of view." : "Clarity for every decision."}</strong><div className="mock-cta"/></div><div className="mock-blocks"><i/><i/><i/></div></div></div><span className="project-number">0{i + 1}</span></div><div className="project-info"><div><span>{p.type}</span><h3>{p.name}</h3><p>{p.desc}</p></div><span className="project-tag">{p.label}</span></div></article>)}</div>
        </div>
      </section>

      <section className="section-pad method" id="method">
        <div className="container">
          <div className="section-heading"><div><span className="section-index">04 / THE METHOD</span><h2>Clareza no processo.<br/><em>Precisão na entrega.</em></h2></div><p className="muted">Um caminho transparente, com decisões justificadas e validações ao longo de todo o desenvolvimento.</p></div>
          <div className="method-list"><article><span>01</span><div><h3>Imersão e estratégia</h3><p>Entendemos o contexto, o público, as necessidades e o resultado esperado antes de definir a solução.</p></div><b>DISCOVER</b></article><article><span>02</span><div><h3>Arquitetura e direção visual</h3><p>Organizamos conteúdo, fluxos, estrutura técnica e linguagem visual para criar uma experiência coerente.</p></div><b>DEFINE</b></article><article><span>03</span><div><h3>Engenharia e construção</h3><p>Desenvolvemos interfaces e funcionalidades com componentes organizados, responsividade e atenção aos detalhes.</p></div><b>BUILD</b></article><article><span>04</span><div><h3>Validação e publicação</h3><p>Revisamos os principais fluxos, corrigimos inconsistências e preparamos a entrega conforme o escopo aprovado.</p></div><b>DELIVER</b></article></div>
        </div>
      </section>

      <section className="principles section-pad"><div className="container principles-layout"><div><span className="section-index">05 / OUR PRINCIPLES</span><h2>Feito para funcionar.<br/><em>Desenhado para durar.</em></h2></div><div className="principle-grid"><div><ShieldCheck/><h3>Confiabilidade</h3><p>Estrutura organizada, validação e atenção aos pontos críticos da experiência.</p></div><div><Zap/><h3>Performance</h3><p>Interfaces eficientes, recursos otimizados e carregamento consciente.</p></div><div><MonitorSmartphone/><h3>Adaptação real</h3><p>Uma experiência consistente em celular, tablet e computador.</p></div><div><Workflow/><h3>Evolução</h3><p>Decisões técnicas que facilitam manutenção e novas funcionalidades.</p></div></div></div></section>

      <section className="contact section-pad" id="contact"><div className="container contact-layout"><div className="contact-copy"><span className="section-index">06 / START A PROJECT</span><h2>Tem uma ideia?<br/><em>Vamos dar forma a ela.</em></h2><p className="muted">Conte o que você está imaginando. Vamos entender o desafio e conversar sobre o melhor caminho para transformar sua ideia em um produto digital.</p><a className="contact-discord" href={DISCORD} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Atendimento pelo Discord <ArrowUpRight size={15}/></a><span className="contact-note">Resposta e escopo são alinhados diretamente no atendimento.</span></div>
          <form className="brief-form" onSubmit={submitBrief}><div className="form-heading"><span>PROJECT BRIEF / 001</span><span>Vamos começar</span></div><label>Seu nome<input required minLength={2} value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Como podemos chamar você?"/></label><div className="form-row"><label>E-mail<input required type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="voce@email.com"/></label><label>WhatsApp <small>opcional</small><input value={form.whatsapp} onChange={e => setForm({...form, whatsapp:e.target.value})} placeholder="(00) 00000-0000"/></label></div><label>Tipo de projeto<select value={form.kind} onChange={e => setForm({...form,kind:e.target.value})}><option>Website profissional</option><option>Loja virtual</option><option>Landing page</option><option>Sistema personalizado</option><option>Painel administrativo</option><option>Catálogo digital</option><option>Outro projeto</option></select></label><label>Conte um pouco sobre sua ideia<textarea required minLength={12} rows={4} value={form.details} onChange={e => setForm({...form,details:e.target.value})} placeholder="Qual problema precisamos resolver? O que você gostaria de construir?"/></label><label>Faixa de investimento <small>opcional</small><select value={form.budget} onChange={e => setForm({...form,budget:e.target.value})}><option value="">Prefiro conversar</option><option>Até R$ 500</option><option>R$ 500 – R$ 1.500</option><option>R$ 1.500 – R$ 3.000</option><option>Acima de R$ 3.000</option></select></label><button className="button form-submit" type="submit">Preparar solicitação <ArrowUpRight size={16}/></button>{sent && <p className="form-success"><Check size={16}/> Brief copiado. O Discord foi aberto; cole a mensagem no atendimento para enviar sua solicitação.</p>}<p className="form-privacy">Ao continuar, seus dados serão usados apenas para preparar esta solicitação de contato.</p></form>
        </div></div></section>

      <footer className="footer"><div className="container"><div className="footer-main"><a className="brand" href="#top"><span className="brand-icon"><Code2 size={21}/></span><span className="brand-name">GRECIA <b>DEVs</b><small>DIGITAL ENGINEERING STUDIO</small></span></a><p>Transformamos ideias em experiências digitais.</p><a href={DISCORD} target="_blank" rel="noreferrer">Discord <ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} GRECIA DEVs. Todos os direitos reservados.</span><a href="#top">VOLTAR AO TOPO ↑</a><span>DESIGNED WITH INTENTION.</span></div></div></footer>
    </main>
  );
}

export default GreciaDevs;

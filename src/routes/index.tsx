import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Code2, Globe2, Layers3, Menu, MonitorSmartphone, ShoppingBag, Sparkles, Workflow, X, Zap, ShieldCheck, MessageCircle, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/")({ component: GreciaDevs });

const discord = "https://discord.gg/v4xuaSJyRj";

const services = [
  { icon: MonitorSmartphone, number: "01", title: "Sites profissionais", description: "Sites institucionais modernos, responsivos e preparados para apresentar sua marca com credibilidade." },
  { icon: ShoppingBag, number: "02", title: "Lojas virtuais", description: "Vitrines digitais para apresentar produtos, organizar categorias e transformar visitas em pedidos." },
  { icon: Globe2, number: "03", title: "Landing pages", description: "Páginas objetivas para divulgar serviços, campanhas, lançamentos e captar novos clientes." },
  { icon: Layers3, number: "04", title: "Catálogos digitais", description: "Cardápios, catálogos de produtos e portfólios fáceis de navegar e compartilhar." },
  { icon: Workflow, number: "05", title: "Sistemas sob medida", description: "Painéis, dashboards e ferramentas web pensadas para simplificar processos do seu negócio." },
  { icon: Code2, number: "06", title: "Manutenção e melhorias", description: "Ajustes, novas funcionalidades, otimização visual e evolução do seu projeto existente." },
];

const projects = [
  { type: "E-COMMERCE", title: "Vitrine que vende", description: "Uma experiência de loja digital com categorias, produtos e navegação intuitiva.", tag: "Loja virtual" },
  { type: "SITE INSTITUCIONAL", title: "Presença de marca", description: "Uma apresentação elegante para destacar serviços, diferenciais e canais de contato.", tag: "Site profissional" },
  { type: "CATÁLOGO DIGITAL", title: "Produtos em destaque", description: "Um catálogo organizado para o cliente encontrar o que procura em poucos cliques.", tag: "Catálogo" },
];

function GreciaDevs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="gd-site">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .gd-site{--bg:#07090e;--panel:#0e121c;--panel2:#121a29;--blue:#3978ff;--cyan:#70b7ff;--white:#f4f7ff;--muted:#9aa7bd;--line:#ffffff16;background:var(--bg);color:var(--white);font-family:'DM Sans',sans-serif;min-height:100vh;overflow:hidden}
        .gd-site *{box-sizing:border-box}.gd-site a{color:inherit;text-decoration:none}.gd-wrap{width:min(1160px,calc(100% - 48px));margin:auto}
        .gd-nav{height:82px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:50;background:#07090ee8;backdrop-filter:blur(18px)}
        .gd-brand{display:flex;align-items:center;gap:12px}.gd-logo{width:39px;height:39px;border-radius:12px;background:linear-gradient(145deg,#4d8cff,#1744c5);display:grid;place-items:center;box-shadow:0 8px 30px #2868ff45}.gd-logo svg{width:21px}.gd-brand strong{font:700 18px 'Space Grotesk';letter-spacing:-.7px}.gd-brand strong span{color:#72a9ff}.gd-brand small{display:block;color:#8290a8;font-size:9px;letter-spacing:2.8px;margin-top:1px}
        .gd-links{display:flex;gap:31px;align-items:center;color:#b6c1d4;font-size:12px}.gd-links a:hover{color:#fff}.gd-cta{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 18px;border-radius:9px;background:linear-gradient(110deg,#3475ff,#2456d9);color:white!important;font-size:12px;font-weight:800;box-shadow:0 8px 28px #2464ef35;transition:.2s}.gd-cta:hover{transform:translateY(-2px);box-shadow:0 12px 35px #2464ef55}.gd-ghost{display:inline-flex;align-items:center;gap:8px;padding:13px 17px;border:1px solid #ffffff25;border-radius:9px;color:#e5edff;font-size:12px;font-weight:700}.gd-menu{display:none;background:none;border:1px solid var(--line);color:white;border-radius:8px;padding:9px}
        .gd-hero{position:relative;padding:112px 0 100px;background:radial-gradient(ellipse at 75% 30%,#1b4ba83d,transparent 38%),radial-gradient(ellipse at 10% 90%,#14377b24,transparent 36%)}.gd-gridbg{position:absolute;inset:0;opacity:.18;background-image:linear-gradient(#6c91d51a 1px,transparent 1px),linear-gradient(90deg,#6c91d51a 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(to bottom,black,transparent 95%);pointer-events:none}
        .gd-hero-inner{position:relative;display:grid;grid-template-columns:1.12fr .88fr;gap:55px;align-items:center}.gd-kicker{display:inline-flex;align-items:center;gap:8px;border:1px solid #3978ff55;background:#1b3c7b35;color:#9ec3ff;padding:8px 12px;border-radius:99px;font-size:10px;font-weight:800;letter-spacing:1.6px}.gd-dot{width:6px;height:6px;border-radius:50%;background:#64a0ff;box-shadow:0 0 12px #64a0ff}
        .gd-hero h1{font:700 clamp(44px,6vw,76px)/1.02 'Space Grotesk';letter-spacing:-4px;margin:24px 0 20px;max-width:700px}.gd-hero h1 span{background:linear-gradient(100deg,#fff 10%,#8bb8ff 75%,#4e83ff);-webkit-background-clip:text;background-clip:text;color:transparent}.gd-hero p{color:#aab7cb;font-size:15px;line-height:1.85;max-width:560px}.gd-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.gd-proof{display:flex;gap:22px;flex-wrap:wrap;margin-top:42px;color:#aab7cb;font-size:10px}.gd-proof span{display:flex;align-items:center;gap:7px}.gd-proof svg{color:#6fa5ff}
        .gd-showcase{position:relative;min-height:390px;display:grid;place-items:center}.gd-orbit{position:absolute;width:320px;height:320px;border:1px solid #4785ff40;border-radius:50%;box-shadow:0 0 0 34px #4785ff09,0 0 0 68px #4785ff06}.gd-window{position:relative;width:min(420px,100%);border:1px solid #ffffff25;border-radius:15px;background:linear-gradient(145deg,#18243a,#0b101b);padding:13px;box-shadow:0 30px 100px #000a,0 0 65px #2868ff24;transform:rotate(-3deg)}.gd-windowbar{display:flex;align-items:center;gap:5px;padding:4px 4px 13px;border-bottom:1px solid #ffffff15}.gd-windowbar i{width:7px;height:7px;border-radius:50%;background:#50617d}.gd-address{height:17px;border-radius:5px;background:#ffffff0b;flex:1;margin-left:9px}.gd-preview{padding:23px 17px 16px;min-height:250px;background:radial-gradient(circle at 80% 20%,#3a76e333,transparent 35%),#0d1524;border-radius:8px;margin-top:12px}.gd-preview-label{font-size:8px;letter-spacing:2px;color:#79aaff}.gd-preview h3{font:700 27px/1.12 'Space Grotesk';max-width:230px;margin:13px 0}.gd-preview p{font-size:9px;color:#98a9c4;line-height:1.6;max-width:220px}.gd-preview-button{display:inline-block;background:#3475ff;border-radius:5px;padding:8px 12px;font-size:8px;font-weight:800;margin-top:12px}.gd-preview-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:24px}.gd-preview-cards span{height:54px;border-radius:5px;background:linear-gradient(145deg,#233d67,#131d30);border:1px solid #ffffff12}.gd-float{position:absolute;border:1px solid #ffffff1e;background:#111a2aee;box-shadow:0 15px 45px #0008;border-radius:10px;padding:12px 14px;font-size:10px;color:#dce8ff}.gd-float strong{display:block;font-size:13px;margin-top:4px}.gd-float.one{top:27px;right:-5px}.gd-float.two{bottom:26px;left:-8px}.gd-float b{color:#77aaff}
        .gd-section{padding:94px 0}.gd-section-head{display:flex;justify-content:space-between;align-items:end;gap:25px;margin-bottom:35px}.gd-label{font-size:10px;color:#78aaff;font-weight:800;letter-spacing:2.3px}.gd-section h2{font:700 clamp(32px,4vw,47px)/1.12 'Space Grotesk';letter-spacing:-1.8px;margin:12px 0}.gd-section-head p{max-width:390px;color:var(--muted);font-size:12px;line-height:1.8;margin:0 0 4px}
        .gd-services{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.gd-service{position:relative;min-height:220px;padding:24px;border:1px solid var(--line);border-radius:13px;background:linear-gradient(145deg,#111a2a,#0b0f18);transition:.25s}.gd-service:hover{transform:translateY(-5px);border-color:#4384ff80;background:linear-gradient(145deg,#14213a,#0b101b)}.gd-service-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}.gd-service-icon{width:42px;height:42px;display:grid;place-items:center;border:1px solid #4b83e85e;border-radius:10px;background:#1b3a7138;color:#83b2ff}.gd-service-icon svg{width:19px}.gd-service-top small{color:#65738d;font:600 11px 'Space Grotesk'}.gd-service h3{font:600 18px 'Space Grotesk';margin:0 0 9px}.gd-service p{font-size:11px;color:#9aa8bd;line-height:1.8;margin:0}
        .gd-work{background:linear-gradient(180deg,#0b101a,#080b12);border-top:1px solid #ffffff0c;border-bottom:1px solid #ffffff0c}.gd-projects{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.gd-project{overflow:hidden;border:1px solid var(--line);border-radius:13px;background:#0d1421}.gd-project-art{height:190px;padding:17px;background:radial-gradient(circle at 70% 20%,#3978ff50,transparent 40%),linear-gradient(145deg,#172b4b,#0a101c);display:flex;align-items:center;justify-content:center}.gd-project:nth-child(2) .gd-project-art{background:radial-gradient(circle at 25% 35%,#1d9a9b40,transparent 45%),linear-gradient(145deg,#132c39,#0a101c)}.gd-project:nth-child(3) .gd-project-art{background:radial-gradient(circle at 75% 20%,#8b64dc44,transparent 45%),linear-gradient(145deg,#282044,#0a101c)}.gd-mock{width:85%;height:130px;border:1px solid #ffffff35;border-radius:8px;background:#0a1220;padding:10px;box-shadow:0 15px 35px #0008}.gd-mock-head{height:8px;width:100%;border-bottom:1px solid #ffffff20;margin-bottom:12px}.gd-mock-hero{height:48px;border-radius:4px;background:linear-gradient(100deg,#244c8e,#1a2c4c);margin-bottom:8px}.gd-mock-row{display:flex;gap:6px}.gd-mock-row i{height:30px;flex:1;border-radius:3px;background:#1a2b46}.gd-project-info{padding:20px}.gd-project-info small{font-size:8px;letter-spacing:1.7px;color:#7daeff;font-weight:800}.gd-project-info h3{font:600 18px 'Space Grotesk';margin:9px 0}.gd-project-info p{font-size:11px;color:#9aa8bd;line-height:1.7;min-height:56px}.gd-tag{display:inline-block;border:1px solid #ffffff1e;border-radius:99px;padding:6px 9px;color:#b7c8e6;font-size:9px}
        .gd-process{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.gd-step{padding:22px 18px;border-top:1px solid #4d80d65c;background:linear-gradient(180deg,#111a2a66,transparent)}.gd-step strong{font:700 30px 'Space Grotesk';color:#477fe0}.gd-step h3{font:600 15px 'Space Grotesk';margin:15px 0 7px}.gd-step p{font-size:10px;color:#9aa8bd;line-height:1.8;margin:0}
        .gd-banner{padding:48px;border-radius:17px;border:1px solid #4d83ec55;background:radial-gradient(ellipse at 80% 0%,#3475ff38,transparent 45%),linear-gradient(120deg,#101c32,#0c1320);display:flex;align-items:center;justify-content:space-between;gap:25px}.gd-banner h2{font:700 clamp(27px,4vw,42px)/1.12 'Space Grotesk';letter-spacing:-1.5px;margin:10px 0}.gd-banner p{font-size:12px;color:#a6b4ca;line-height:1.7;max-width:500px;margin:0}
        .gd-faq{max-width:800px;margin:auto}.gd-faq details{border-bottom:1px solid var(--line);padding:19px 0}.gd-faq summary{list-style:none;display:flex;justify-content:space-between;gap:15px;cursor:pointer;font:600 14px 'Space Grotesk'}.gd-faq summary::-webkit-details-marker{display:none}.gd-faq summary svg{width:16px;color:#7caaff}.gd-faq details p{font-size:11px;line-height:1.8;color:#9aa8bd;max-width:700px}
        .gd-footer{border-top:1px solid var(--line);padding:30px 0;color:#8390a6;font-size:10px}.gd-footer-inner{display:flex;justify-content:space-between;align-items:center;gap:20px}.gd-footer strong{color:#eaf1ff;font:700 15px 'Space Grotesk'}
        @media(max-width:850px){.gd-hero-inner{grid-template-columns:1fr;gap:20px}.gd-showcase{min-height:350px}.gd-hero{padding:80px 0 60px}.gd-services{grid-template-columns:repeat(2,1fr)}.gd-projects{grid-template-columns:1fr 1fr}.gd-project:last-child{display:none}.gd-process{grid-template-columns:repeat(2,1fr)}.gd-section-head{display:block}.gd-section-head p{margin-top:12px}.gd-links{gap:16px}}
        @media(max-width:620px){.gd-wrap{width:min(100% - 34px,1160px)}.gd-nav{height:70px}.gd-links{display:none;position:absolute;top:69px;left:0;right:0;padding:18px;background:#0b101a;border-bottom:1px solid var(--line);flex-direction:column;align-items:stretch}.gd-links.open{display:flex}.gd-links .gd-cta{width:100%}.gd-menu{display:block}.gd-nav>.gd-wrap{width:calc(100% - 34px)}.gd-hero h1{letter-spacing:-2.7px;font-size:47px}.gd-hero p{font-size:13px}.gd-showcase{min-height:300px}.gd-orbit{width:230px;height:230px}.gd-window{width:94%}.gd-float.one{right:-3px;top:4px}.gd-float.two{left:-3px;bottom:4px}.gd-section{padding:68px 0}.gd-services{grid-template-columns:1fr}.gd-service{min-height:185px}.gd-projects{grid-template-columns:1fr}.gd-project:last-child{display:block}.gd-process{grid-template-columns:1fr 1fr}.gd-banner{padding:27px;display:block}.gd-banner .gd-cta{margin-top:22px}.gd-footer-inner{align-items:flex-start;flex-direction:column}.gd-ghost{padding:13px 14px}}
      `}</style>

      <header className="gd-nav">
        <div className="gd-wrap" style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"min(1160px,calc(100% - 48px))"}}>
          <a href="#inicio" className="gd-brand" onClick={closeMenu}>
            <span className="gd-logo"><Code2 /></span>
            <span><strong>GRECIA <span>DEVs</span></strong><small>WEB & DIGITAL STUDIO</small></span>
          </a>
          <nav className={`gd-links ${menuOpen ? "open" : ""}`}>
            <a href="#servicos" onClick={closeMenu}>Serviços</a><a href="#projetos" onClick={closeMenu}>Projetos</a><a href="#processo" onClick={closeMenu}>Como funciona</a><a href="#faq" onClick={closeMenu}>Dúvidas</a>
            <a className="gd-cta" href={discord} target="_blank" rel="noreferrer">Solicitar orçamento <ArrowUpRight size={15}/></a>
          </nav>
          <button className="gd-menu" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <section className="gd-hero" id="inicio">
        <div className="gd-gridbg"/>
        <div className="gd-wrap gd-hero-inner">
          <div>
            <span className="gd-kicker"><span className="gd-dot"/> DESENVOLVIMENTO DIGITAL</span>
            <h1>Sua ideia merece uma <span>presença digital</span> de verdade.</h1>
            <p>Criamos sites, lojas virtuais e experiências digitais com visual profissional, navegação intuitiva e foco no que importa: apresentar seu negócio e conquistar clientes.</p>
            <div className="gd-actions"><a className="gd-cta" href={discord} target="_blank" rel="noreferrer">Começar meu projeto <ArrowUpRight size={16}/></a><a className="gd-ghost" href="#servicos">Conhecer serviços <ArrowUpRight size={15}/></a></div>
            <div className="gd-proof"><span><ShieldCheck size={14}/> Projeto pensado para sua marca</span><span><MonitorSmartphone size={14}/> Adaptado para celular e PC</span><span><Zap size={14}/> Comunicação direta</span></div>
          </div>
          <div className="gd-showcase" aria-label="Prévia ilustrativa de um site">
            <div className="gd-orbit"/>
            <div className="gd-window"><div className="gd-windowbar"><i/><i/><i/><div className="gd-address"/></div><div className="gd-preview"><div className="gd-preview-label">SUA MARCA • SEU PRÓXIMO NÍVEL</div><h3>Uma presença que impressiona.</h3><p>Design moderno. Experiência simples. Mais confiança para sua marca.</p><span className="gd-preview-button">CONHEÇA O PROJETO ↗</span><div className="gd-preview-cards"><span/><span/><span/></div></div></div>
            <div className="gd-float one">✦ DESIGN + TECNOLOGIA<strong>Feito para destacar</strong></div><div className="gd-float two"><b>100% RESPONSIVO</b><strong>Celular • Tablet • PC</strong></div>
          </div>
        </div>
      </section>

      <section className="gd-section" id="servicos"><div className="gd-wrap">
        <div className="gd-section-head"><div><span className="gd-label">O QUE FAZEMOS</span><h2>Soluções digitais para<br/>tirar sua ideia do papel.</h2></div><p>Do primeiro conceito até a publicação, desenvolvemos experiências digitais para diferentes tipos de negócio e objetivos.</p></div>
        <div className="gd-services">{services.map(item => { const Icon = item.icon; return <article className="gd-service" key={item.number}><div className="gd-service-top"><span className="gd-service-icon"><Icon/></span><small>/{item.number}</small></div><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div>
      </div></section>

      <section className="gd-section gd-work" id="projetos"><div className="gd-wrap">
        <div className="gd-section-head"><div><span className="gd-label">PORTFÓLIO CONCEITUAL</span><h2>Design que valoriza<br/>cada projeto.</h2></div><p>Alguns formatos de projeto que podemos desenvolver. O visual, conteúdo e funcionalidades são definidos conforme a necessidade de cada cliente.</p></div>
        <div className="gd-projects">{projects.map((project,index)=><article className="gd-project" key={project.title}><div className="gd-project-art"><div className="gd-mock"><div className="gd-mock-head"/><div className="gd-mock-hero"/><div className="gd-mock-row"><i/><i/><i/></div></div></div><div className="gd-project-info"><small>{project.type}</small><h3>{project.title}</h3><p>{project.description}</p><span className="gd-tag">{project.tag}</span></div></article>)}</div>
      </div></section>

      <section className="gd-section" id="processo"><div className="gd-wrap">
        <div className="gd-section-head"><div><span className="gd-label">SIMPLES E TRANSPARENTE</span><h2>Do briefing à entrega.</h2></div><p>Um processo direto para você acompanhar a evolução do seu projeto sem complicação.</p></div>
        <div className="gd-process"><article className="gd-step"><strong>01</strong><h3>Você conta sua ideia</h3><p>Entendemos seu negócio, objetivo, referências e o que precisa ser criado.</p></article><article className="gd-step"><strong>02</strong><h3>Planejamos a solução</h3><p>Definimos estrutura, recursos, estilo visual, prazo e orçamento.</p></article><article className="gd-step"><strong>03</strong><h3>Desenvolvemos</h3><p>Construímos o projeto e alinhamos os detalhes durante o processo.</p></article><article className="gd-step"><strong>04</strong><h3>Revisão e entrega</h3><p>Após os ajustes combinados, entregamos o projeto conforme o escopo aprovado.</p></article></div>
      </div></section>

      <section className="gd-section"><div className="gd-wrap"><div className="gd-banner"><div><span className="gd-label">VAMOS CONSTRUIR ALGO INCRÍVEL?</span><h2>Seu próximo projeto começa aqui.</h2><p>Fale com a GRECIA DEVs, explique o que você precisa e solicite um orçamento. Vamos encontrar a solução ideal para sua ideia.</p></div><a className="gd-cta" href={discord} target="_blank" rel="noreferrer">Falar com a equipe <MessageCircle size={16}/></a></div></div></section>

      <section className="gd-section" id="faq"><div className="gd-wrap"><div className="gd-section-head"><div><span className="gd-label">PERGUNTAS FREQUENTES</span><h2>Tire suas dúvidas.</h2></div></div><div className="gd-faq">
        <details><summary>Quanto custa criar um site? <ChevronDown/></summary><p>O valor depende do tipo de projeto, quantidade de páginas, funcionalidades e conteúdo. Entre em contato para receber um orçamento de acordo com sua necessidade.</p></details>
        <details><summary>O site funciona em celular e computador? <ChevronDown/></summary><p>Sim. Os projetos são planejados para se adaptar a diferentes tamanhos de tela, incluindo celulares, tablets e computadores.</p></details>
        <details><summary>Vocês fazem lojas virtuais e catálogos? <ChevronDown/></summary><p>Sim. Desenvolvemos lojas virtuais, catálogos digitais, cardápios, landing pages e sites institucionais.</p></details>
        <details><summary>Como faço para solicitar um projeto? <ChevronDown/></summary><p>Clique em qualquer botão de orçamento e fale com a equipe pelo Discord. Conte sua ideia para iniciarmos o atendimento.</p></details>
        <details><summary>Vocês fazem manutenção em sites existentes? <ChevronDown/></summary><p>Sim. Podemos avaliar melhorias, correções, atualizações visuais e novas funcionalidades para projetos existentes.</p></details>
      </div></div></section>

      <footer className="gd-footer"><div className="gd-wrap gd-footer-inner"><div><strong>GRECIA DEVs</strong><div style={{marginTop:5}}>WEB & DIGITAL STUDIO</div></div><span>© {new Date().getFullYear()} GRECIA DEVs. Todos os direitos reservados.</span><a href={discord} target="_blank" rel="noreferrer">Discord ↗</a></div></footer>
    </main>
  );
}

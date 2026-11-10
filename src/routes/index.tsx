import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, LockKeyhole, ShieldCheck, Sparkles, Instagram, Menu, X, Play, Crown } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Valentina Noir | Experiência exclusiva — Demonstração" },
    { name: "description", content: "Projeto demonstrativo de uma página premium para uma criadora fictícia de conteúdo adulto. Personagem e conteúdo inteiramente fictícios." },
    { name: "robots", content: "noindex,nofollow" }
  ] }),
  component: DemoCreator
});

function DemoCreator() {
  const [age, setAge] = useState<"pending" | "yes" | "no">("pending");
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState(false);
  const enter = () => { setAge("yes"); setNotice(true); };
  if (age !== "yes") return <main className="vn-gate">
    <div className="vn-gate-photo" />
    <div className="vn-gate-shade" />
    <div className="vn-gate-card">
      <div className="vn-monogram">V<span>.</span>N</div>
      <p className="vn-kicker">PROJETO DEMONSTRATIVO · PERSONAGEM FICTÍCIA</p>
      <h1>Valentina <i>Noir</i></h1>
      <div className="vn-line"/>
      <LockKeyhole size={22}/>
      <h2>Conteúdo destinado<br/>exclusivamente a maiores.</h2>
      <p>Esta é uma demonstração fictícia de um site para criadora adulta. Não representa uma pessoa real e não oferece conteúdo ou assinaturas reais.</p>
      <button className="vn-primary" onClick={enter}>TENHO 18 ANOS OU MAIS <ArrowRight size={16}/></button>
      <button className="vn-secondary" onClick={() => setAge("no")}>SOU MENOR DE 18 ANOS</button>
      {age === "no" && <small className="vn-denied">Acesso não permitido. Feche esta demonstração.</small>}
      <small className="vn-gate-foot"><ShieldCheck size={13}/> AMBIENTE FICTÍCIO · SEM PAGAMENTOS</small>
    </div>
  </main>;

  return <main className="valentina-demo">
    <div className="vn-demo-ribbon">DEMONSTRAÇÃO DE PORTFÓLIO · PERSONAGEM 100% FICTÍCIA</div>
    <header className="vn-header">
      <a href="#inicio" className="vn-logo">V<span>.</span>N <small>VALENTINA NOIR</small></a>
      <nav className={menu ? "vn-nav vn-nav-open" : "vn-nav"}>
        <a href="#sobre" onClick={() => setMenu(false)}>Sobre</a><a href="#conteudo" onClick={() => setMenu(false)}>Conteúdo</a><a href="#exclusivo" onClick={() => setMenu(false)}>Área exclusiva</a><a href="#contato" onClick={() => setMenu(false)}>Contato</a>
      </nav>
      <a className="vn-head-cta" href="#exclusivo">CONHECER PROJETO <ArrowUpRight size={14}/></a>
      <button className="vn-menu" onClick={() => setMenu(!menu)} aria-label="Abrir menu">{menu ? <X/> : <Menu/>}</button>
    </header>
    {notice && <div className="vn-notice">Demonstração fictícia: nenhum conteúdo, perfil ou pagamento é real. <button onClick={() => setNotice(false)} aria-label="Fechar aviso"><X size={14}/></button></div>}
    <section className="vn-hero" id="inicio">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=90" alt="Retrato editorial de mulher adulta em ensaio de moda" />
      <div className="vn-hero-shade"/>
      <div className="vn-hero-copy">
        <p className="vn-kicker"><span/> ELEGÂNCIA · ATITUDE · PERSONALIDADE</p>
        <h1>Um lado seu<br/>que merece <i>brilhar.</i></h1>
        <p>Uma experiência mais íntima e provocante, com ensaios sensuais, lingerie elegante, transparências sutis e uma dose de mistério — sempre com bom gosto.</p>
        <a href="#conteudo" className="vn-primary">EXPLORE A EXPERIÊNCIA <ArrowRight size={16}/></a>
      </div>
      <div className="vn-hero-bottom"><span>VALENTINA NOIR — CONCEITO CRIATIVO</span><span>01 / 04</span></div>
    </section>
    <section className="vn-intro" id="sobre">
      <div className="vn-intro-mark">V<span>.</span>N</div>
      <div><p className="vn-kicker">UMA PERSONAGEM. UMA IDENTIDADE.</p><h2>Presença que não precisa<br/>pedir <i>atenção.</i></h2></div>
      <p className="vn-intro-text">Valentina Noir é uma personagem inteiramente fictícia, criada para demonstrar como uma marca pessoal pode ganhar uma presença digital sofisticada, segura e memorável.</p>
    </section>
    <section className="vn-content" id="conteudo">
      <div className="vn-section-top"><div><p className="vn-kicker">GALERIA CONCEITUAL</p><h2>Um universo <i>particular.</i></h2></div><p>Uma seleção de ensaios conceituais com clima sensual, poses sofisticadas e estética intimista. Imagens ilustrativas.</p></div>
      <div className="vn-gallery">
        <article className="vn-tile vn-tile-large"><img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85" alt="Retrato de moda editorial com iluminação suave"/><span>01 — SENSUAL EDITORIAL</span></article>
        <article className="vn-tile"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=850&q=85" alt="Ensaio de moda e estilo"/><span>02 — INTIMATE STYLE</span></article>
        <article className="vn-tile"><img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=850&q=85" alt="Retrato feminino em fotografia de moda"/><span>03 — AFTER DARK</span></article>
      </div>
      <p className="vn-gallery-caption"><LockKeyhole size={14}/> Prévia ilustrativa com sensualidade sugerida, sem nudez explícita. As fotografias não representam a personagem fictícia.</p>
    </section>
    <section className="vn-exclusive" id="exclusivo">
      <div className="vn-exclusive-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85" alt="Fotografia editorial de moda com look elegante"/></div>
      <div className="vn-exclusive-copy"><p className="vn-kicker">ÁREA EXCLUSIVA · CONCEITO</p><h2>Mais perto.<br/><i>Mais pessoal.</i></h2><p>Em um projeto real, esta área poderia reunir ensaios sensuais exclusivos, editoriais de lingerie e conteúdo intimista com acesso restrito — sempre com consentimento, privacidade e segurança.</p>
        <div className="vn-benefit"><ShieldCheck/><span><b>Privacidade em primeiro lugar</b><small>Informações claras e proteção de dados.</small></span></div>
        <div className="vn-benefit"><Crown/><span><b>Experiência premium</b><small>Identidade visual consistente em cada detalhe.</small></span></div>
        <button className="vn-primary" onClick={() => setNotice(true)}>VER COMO FUNCIONARIA <ArrowRight size={15}/></button>
      </div>
    </section>
    <section className="vn-quote"><Sparkles/><h2>A provocação está<br/>nos detalhes. <i>O resto é mistério.</i></h2><p>VALENTINA NOIR · PERSONAGEM FICTÍCIA</p></section>
    <footer className="vn-footer" id="contato"><a href="#inicio" className="vn-logo">V<span>.</span>N <small>VALENTINA NOIR</small></a><p>Demonstração de website para portfólio. Personagem e identidade fictícias; imagens editoriais ilustrativas.</p><div><a href="#inicio">VOLTAR AO TOPO <ArrowUpRight size={13}/></a></div><small>© 2026 · DEMONSTRAÇÃO NÃO COMERCIAL · +18</small></footer>
    <a className="vn-float" href="#contato" aria-label="Informações do projeto"><Instagram size={20}/></a>
  </main>;
}

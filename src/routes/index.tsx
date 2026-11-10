import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Instagram, MapPin, Menu, MessageCircle, Coffee, Wine, Cheese, X, Clock3, Sparkles, Leaf, Utensils, Camera, Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Montês | Um pedacinho de Minas em Monte Sião" },
      { name: "description", content: "Descubra a Casa Montês, restaurante e cafeteria mineira em Monte Sião. Cafés, queijos selecionados, cachaças, licores e sabores artesanais." },
      { property: "og:title", content: "Casa Montês — Sabores de Minas" },
      { property: "og:description", content: "Uma pausa para sentir Minas. Conheça a Casa Montês em Monte Sião." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CasaMontes,
});

const phone = "5535933003516";
const whats = "https://wa.me/" + phone;
const insta = "https://www.instagram.com/casamontesmg/";
const address = "Rua do Mercado, 757 - Centro, Monte Sião - MG, 37580-000";
const photos = [
  { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85", alt: "Café sendo preparado em uma cafeteria acolhedora", label: "O ritual do café" },
  { src: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1100&q=85", alt: "Seleção de queijos artesanais", label: "Sabores da fazenda" },
  { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1100&q=85", alt: "Bebida artesanal servida em taça", label: "Brinde à tradição" },
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=85", alt: "Café especial servido à mesa", label: "Pausa com afeto" },
  { src: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1100&q=85", alt: "Queijos variados para degustação", label: "Uma mesa generosa" },
  { src: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1100&q=85", alt: "Bebida refrescante artesanal", label: "Um sabor para lembrar" },
];
const items = [
  { name: "Café coado na hora", category: "Cafeteria", desc: "A simplicidade de um café quentinho, feito para acompanhar uma boa conversa.", img: photos[0].src, mark: "O CLÁSSICO" },
  { name: "Pão de queijo mineiro", category: "Cafeteria", desc: "Um dos grandes símbolos de Minas para deixar a pausa ainda melhor.", img: "https://images.unsplash.com/photo-1600628422019-6f6d6c2a6c8b?auto=format&fit=crop&w=900&q=85", mark: "JEITO MINEIRO" },
  { name: "Queijos selecionados", category: "Queijos", desc: "Uma seleção para descobrir diferentes texturas e sabores da tradição queijeira.", img: photos[1].src, mark: "SELEÇÃO DA CASA" },
  { name: "Queijo meia cura", category: "Queijos", desc: "Sabor marcante e versátil, perfeito para compor uma mesa de Minas.", img: photos[4].src },
  { name: "Cachaças artesanais", category: "Cachaças & licores", desc: "Rótulos para quem aprecia a personalidade e a tradição dos alambiques.", img: photos[2].src, mark: "TRADIÇÃO" },
  { name: "Licores especiais", category: "Cachaças & licores", desc: "Opções delicadas para degustar com calma ou escolher para presentear.", img: photos[5].src },
];
const filters = ["Todos", "Cafeteria", "Queijos", "Cachaças & licores"];

function CasaMontes() {
  const [intro, setIntro] = useState(true);
  const [filter, setFilter] = useState("Todos");
  const [mobile, setMobile] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    try { if (sessionStorage.getItem("casa-montes-welcomed") === "1") setIntro(false); } catch {}
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }), { threshold: 0.12 });
    document.querySelectorAll(".mt-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);
  const closeIntro = () => { setIntro(false); try { sessionStorage.setItem("casa-montes-welcomed", "1"); } catch {} };
  const visibleItems = useMemo(() => items.filter((item) => filter === "Todos" || item.category === filter), [filter]);
  const toggleItem = (name: string) => setSelected((old) => old.includes(name) ? old.filter((x) => x !== name) : [...old, name]);
  const askSelection = () => {
    const msg = "Olá, Casa Montês! Conheci o site e gostaria de consultar estes produtos:\n" + selected.map((x) => "• " + x).join("\n") + "\nPode me informar valores e disponibilidade?";
    window.open(whats + "?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
  };
  return <main className="montes-site">
    {intro && <div className="mt-opening" role="dialog" aria-modal="true" aria-label="Boas-vindas à Casa Montês">
      <img className="mt-opening-image" src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=2200&q=90" alt="" />
      <div className="mt-opening-veil" />
      <div className="mt-opening-grain" />
      <div className="mt-opening-center">
        <div className="mt-seal"><span>CM</span><i>MONTE SIÃO · MG</i></div>
        <p className="mt-opening-overline">UMA CASA DE SABORES E BOAS HISTÓRIAS</p>
        <h1>Casa <em>Montês</em></h1>
        <div className="mt-opening-rule"><span/>✦<span/></div>
        <p className="mt-opening-sub">O tempo desacelera.<br/>Minas chega à mesa.</p>
        <button onClick={closeIntro}>ENTRAR E DESCOBRIR <ArrowRight size={16}/></button>
      </div>
      <button className="mt-skip" onClick={closeIntro}>PULAR ABERTURA <ArrowUpRight size={13}/></button>
      <span className="mt-opening-side">CAFÉ · QUEIJOS · CACHAÇAS · LICORES</span>
    </div>}
    <div className="mt-topline"><span>MONTE SIÃO, MINAS GERAIS <i/> UM PEDACINHO DE MINAS EM CADA VISITA</span><a href={whats} target="_blank" rel="noreferrer"><MessageCircle size={13}/> FALE COM A CASA</a></div>
    <header className="mt-header">
      <a href="#topo" className="mt-brand"><span className="mt-brand-monogram">CM</span><span><b>CASA MONTÊS</b><small>RESTAURANTE & CAFETERIA MINEIRA</small></span></a>
      <nav className={mobile ? "mt-nav mt-nav-open" : "mt-nav"} aria-label="Navegação principal">
        <a href="#essencia" onClick={() => setMobile(false)}>A casa</a><a href="#sabores" onClick={() => setMobile(false)}>Sabores</a><a href="#experiencia" onClick={() => setMobile(false)}>Harmonizações</a><a href="#galeria" onClick={() => setMobile(false)}>Galeria</a><a href="#visite" onClick={() => setMobile(false)}>Visite-nos</a>
      </nav>
      <a className="mt-header-cta" href={whats} target="_blank" rel="noreferrer">CONVERSAR <ArrowUpRight size={15}/></a>
      <button className="mt-mobile" aria-label={mobile ? "Fechar menu" : "Abrir menu"} onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button>
    </header>
    <section className="mt-hero" id="topo">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=90" alt="Ambiente aconchegante de restaurante com mesas preparadas para receber" />
      <div className="mt-hero-overlay"/>
      <div className="mt-hero-content">
        <p className="mt-eyebrow"><span/> A ESSÊNCIA MINEIRA, EM MONTE SIÃO</p>
        <h2>Tem lugar que<br/>é feito de <em>sabores.</em></h2>
        <p className="mt-hero-description">E tem lugar que faz a gente se sentir em casa. Descubra uma seleção de cafés, queijos, cachaças, licores e delícias que celebram o melhor de Minas.</p>
        <div className="mt-hero-actions"><a className="mt-button-gold" href="#sabores">DESCOBRIR A SELEÇÃO <ArrowRight size={16}/></a><a className="mt-button-quiet" href={whats} target="_blank" rel="noreferrer"><MessageCircle size={16}/> FALAR PELO WHATSAPP</a></div>
      </div>
      <div className="mt-hero-index"><span>01</span><i/> MONTE SIÃO · MINAS GERAIS</div>
      <a className="mt-scroll" href="#essencia"><span>ROLE PARA DESCOBRIR</span><ArrowDown size={14}/></a>
    </section>
    <div className="mt-signature"><div><Coffee/><span><b>Café passado com carinho</b><small>Uma pausa que acolhe</small></span></div><i/><div><Cheese/><span><b>Queijos selecionados</b><small>Tradição à mesa</small></span></div><i/><div><Wine/><span><b>Cachaças & licores</b><small>Sabores para apreciar</small></span></div></div>
    <section className="mt-story" id="essencia">
      <div className="mt-story-photo mt-reveal"><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85" alt="Café servido em mesa de madeira, em clima acolhedor" /><span className="mt-photo-caption">UM CONVITE A DESACELERAR</span></div>
      <div className="mt-story-copy mt-reveal"><p className="mt-eyebrow mt-dark-eyebrow"><span/> A ESSÊNCIA DA CASA</p><h2>Minas não é só<br/>um lugar. É um jeito<br/>de <em>receber.</em></h2><p>A Casa Montês reúne o prazer de uma boa pausa com uma seleção de sabores que fazem parte da cultura mineira. Um espaço para apreciar um café, descobrir produtos artesanais e escolher algo especial para levar para casa.</p><p>Sem pressa. Com afeto. Do jeitinho que uma boa experiência deve ser.</p><a className="mt-text-link" href="#visite">VENHA CONHECER <ArrowRight size={15}/></a></div>
    </section>
    <section className="mt-products" id="sabores">
      <div className="mt-section-heading mt-reveal"><div><p className="mt-eyebrow"><span/> UMA SELEÇÃO COM IDENTIDADE</p><h2>Escolhas que contam<br/><em>histórias de Minas.</em></h2></div><p>Explore alguns dos sabores que fazem parte da experiência Casa Montês. Consulte nossa equipe sobre opções, marcas e disponibilidade.</p></div>
      <div className="mt-filterbar"><div>{filters.map((f) => <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>)}</div><span>{visibleItems.length.toString().padStart(2,"0")} SABORES EM DESTAQUE</span></div>
      <div className="mt-product-grid">{visibleItems.map((item, i) => <article className="mt-product-card mt-reveal" key={item.name}><div className="mt-product-image"><img src={item.img} alt={item.name} loading="lazy"/>{item.mark && <span className="mt-product-mark">{item.mark}</span>}<button onClick={() => toggleItem(item.name)} aria-label={(selected.includes(item.name) ? "Remover " : "Adicionar ") + item.name} className={selected.includes(item.name) ? "mt-add selected" : "mt-add"}>{selected.includes(item.name) ? <X size={17}/> : <Plus size={18}/>}</button></div><div className="mt-product-info"><small>{item.category}</small><h3>{item.name}</h3><p>{item.desc}</p><button onClick={() => toggleItem(item.name)}>{selected.includes(item.name) ? "ADICIONADO À MINHA LISTA" : "CONSULTAR DISPONIBILIDADE"} <ArrowUpRight size={13}/></button></div></article>)}</div>
      <div className="mt-product-bottom"><p>* Imagens ilustrativas. Produtos, marcas, valores e disponibilidade devem ser confirmados diretamente com a equipe.</p>{selected.length > 0 && <button onClick={askSelection}>CONSULTAR MINHA LISTA ({selected.length}) <ArrowRight size={15}/></button>}</div>
    </section>
    <section className="mt-feature">
      <div className="mt-feature-image"><img src="https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1400&q=90" alt="Queijos selecionados em uma composição gastronômica" /></div>
      <div className="mt-feature-copy mt-reveal"><p className="mt-eyebrow"><span/> CULTURA QUE SE SABOREIA</p><h2>Um brinde à tradição.<br/><em>Uma mesa cheia de Minas.</em></h2><p>Queijos, cachaças e licores têm algo em comum: carregam identidade, cuidado e histórias de quem transforma ingredientes em sabor. Na Casa Montês, você encontra uma seleção para descobrir, combinar e compartilhar.</p><a href={whats} target="_blank" rel="noreferrer" className="mt-feature-link">CONHEÇA A SELEÇÃO DA CASA <ArrowRight size={15}/></a></div>
    </section>
    <section className="mt-experience" id="experiencia">
      <div className="mt-section-heading mt-reveal"><div><p className="mt-eyebrow mt-dark-eyebrow"><span/> PEQUENOS RITUAIS, GRANDES MOMENTOS</p><h2>O prazer está<br/>na <em>combinação.</em></h2></div><p>Algumas sugestões para inspirar sua próxima visita. Consulte a equipe sobre os produtos disponíveis para cada experiência.</p></div>
      <div className="mt-experience-grid">
        <article className="mt-experience-card mt-reveal"><img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=85" alt="Xícara de café preparada para uma pausa" /><div><span>01 / PAUSA AFETIVA</span><h3>Café & quitanda</h3><p>Um café quentinho acompanhado de um clássico mineiro. Simples, acolhedor e sempre bem-vindo.</p></div></article>
        <article className="mt-experience-card mt-reveal"><img src="https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1000&q=85" alt="Seleção de queijos para harmonização" /><div><span>02 / MESA MINEIRA</span><h3>Queijos & sabores</h3><p>Descubra diferentes texturas e encontre combinações para montar uma mesa cheia de personalidade.</p></div></article>
        <article className="mt-experience-card mt-reveal"><img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1000&q=85" alt="Taça de bebida em ambiente intimista" /><div><span>03 / MOMENTO ESPECIAL</span><h3>Cachaças & licores</h3><p>Uma seleção para apreciar com calma, conhecer novos sabores ou escolher um presente especial.</p></div></article>
      </div>
    </section>
    <section className="mt-gallery" id="galeria">
      <div className="mt-gallery-heading mt-reveal"><p className="mt-eyebrow mt-dark-eyebrow"><span/> UM OLHAR SOBRE A EXPERIÊNCIA</p><h2>Um pouco da nossa<br/><em>atmosfera.</em></h2><p>Sabores, detalhes e aquele clima gostoso de quem sabe receber.</p></div>
      <div className="mt-gallery-grid">{photos.map((p, i) => <button key={p.src} className={"mt-gallery-photo mt-g" + i} onClick={() => setLightbox(i)} aria-label={"Ampliar foto: " + p.label}><img src={p.src} alt={p.alt} loading="lazy"/><span><Camera size={13}/>{p.label}</span></button>)}</div>
    </section>
    <section className="mt-visit" id="visite">
      <div className="mt-visit-photo"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85" alt="Interior acolhedor de restaurante para receber visitantes"/></div>
      <div className="mt-visit-panel"><p className="mt-eyebrow"><span/> SUA PRÓXIMA PAUSA TEM ENDEREÇO</p><h2>Vai ser um prazer<br/><em>receber você.</em></h2><p className="mt-visit-intro">Estamos em Monte Sião. Passe para conhecer a Casa Montês, apreciar um café e descobrir nossa seleção de sabores mineiros.</p>
        <div className="mt-contact-line"><MapPin/><span><small>ENDEREÇO</small>{address}</span></div>
        <div className="mt-contact-line"><MessageCircle/><span><small>WHATSAPP</small>(35) 93300-3516</span></div>
        <div className="mt-contact-line"><Instagram/><span><small>INSTAGRAM</small>@casamontesmg</span></div>
        <div className="mt-visit-actions"><a href="https://www.google.com/maps/search/?api=1&query=Rua+do+Mercado+757+Centro+Monte+Siao+MG" target="_blank" rel="noreferrer">COMO CHEGAR <ArrowUpRight size={15}/></a><a href={whats} target="_blank" rel="noreferrer">FALAR PELO WHATSAPP <ArrowRight size={15}/></a></div>
      </div>
    </section>
    <section className="mt-last-call"><Sparkles size={20}/><p>O melhor de Minas é quando a gente <em>compartilha.</em></p><a href={whats} target="_blank" rel="noreferrer">FALE COM A CASA MONTÊS <ArrowUpRight size={14}/></a></section>
    <footer className="mt-footer"><a href="#topo" className="mt-brand"><span className="mt-brand-monogram">CM</span><span><b>CASA MONTÊS</b><small>RESTAURANTE & CAFETERIA MINEIRA</small></span></a><p>Um pedacinho de Minas em cada visita.</p><div><a href={insta} target="_blank" rel="noreferrer" aria-label="Instagram Casa Montês"><Instagram size={18}/></a><a href={whats} target="_blank" rel="noreferrer" aria-label="WhatsApp Casa Montês"><MessageCircle size={18}/></a></div><small>© 2026 CASA MONTÊS · MONTE SIÃO, MG<br/>Beba com moderação. Venda proibida para menores de 18 anos.</small></footer>
    <a className="mt-whatsapp-float" href={whats} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={22}/></a>
    {lightbox !== null && <div className="mt-lightbox" role="dialog" aria-modal="true" aria-label="Visualização da galeria" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} aria-label="Fechar galeria"><X/></button><img src={photos[lightbox].src} alt={photos[lightbox].alt} onClick={(e) => e.stopPropagation()}/><p>{photos[lightbox].label}</p></div>}
  </main>;
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Heart, Menu, MessageCircle, Search, X, MapPin, ShieldCheck, KeyRound, Home as HomeIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Hilton Vieira | Imóveis em Monte Sião e região" },
    { name: "description", content: "Encontre casas, apartamentos e terrenos em Monte Sião e região com atendimento próximo e transparente." },
  ] }),
  component: Home,
});

const properties = [
  { id: 1, type: "Casa", price: 485000, place: "Monte Sião · Bairro residencial", title: "Casa contemporânea com área externa", details: "3 quartos · 2 vagas · Jardim", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85", tag: "DESTAQUE" },
  { id: 2, type: "Apartamento", price: 295000, place: "Monte Sião · Centro", title: "Praticidade perto de tudo", details: "2 quartos · 1 vaga · Varanda", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85", tag: "OPORTUNIDADE" },
  { id: 3, type: "Terreno", price: 185000, place: "Monte Sião · Região", title: "Espaço para tirar seu projeto do papel", details: "360 m² · Boa topografia · Residencial", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85", tag: "PARA CONSTRUIR" },
];

function Home() {
  const [type, setType] = useState("Todos");
  const [price, setPrice] = useState("Todos");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const visible = useMemo(() => properties.filter(p =>
    (type === "Todos" || p.type === type) &&
    (price === "Todos" || (price === "Até R$ 300 mil" && p.price <= 300000) || (price === "R$ 300–600 mil" && p.price > 300000 && p.price <= 600000) || (price === "Acima de R$ 600 mil" && p.price > 600000)) &&
    (p.title + p.place + p.type).toLowerCase().includes(query.toLowerCase())
  ), [type, price, query]);
  const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const contact = (subject = "Olá, Hilton! Vi seu site e gostaria de conversar sobre um imóvel em Monte Sião.") => {
    const url = "https://wa.me/?text=" + encodeURIComponent(subject);
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  return <main>
    <div className="topline"><span>ATENDIMENTO EM MONTE SIÃO E REGIÃO</span><span>IMÓVEIS · NEGÓCIOS · CONFIANÇA</span></div>
    <header className="header">
      <a className="brand" href="#inicio"><span className="brand-mark">HV</span><span><b>HILTON VIEIRA</b><small>IMÓVEIS & NEGÓCIOS</small></span></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Abrir menu">{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? "nav open" : "nav"}><a href="#imoveis" onClick={() => setMenu(false)}>Imóveis</a><a href="#sobre" onClick={() => setMenu(false)}>Sobre</a><a href="#diferenciais" onClick={() => setMenu(false)}>Diferenciais</a><a className="nav-cta" href="#contato" onClick={() => setMenu(false)}>Fale comigo <ArrowUpRight size={14}/></a></nav>
    </header>
    <section className="hero" id="inicio"><div className="hero-photo"/><div className="hero-shade"/><div className="hero-content"><div className="eyebrow"><i/> SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</div><h1>O lugar certo<br/>para <em>chamar de seu.</em></h1><p>Encontre seu próximo imóvel em Monte Sião e região com orientação próxima, informações claras e tranquilidade em cada etapa.</p><div className="hero-actions"><a className="button button-light" href="#imoveis">Explorar imóveis <ArrowRight size={16}/></a><a className="hero-link" href="#contato">Vamos conversar <ArrowUpRight size={15}/></a></div></div><div className="hero-note">IMÓVEIS SELECIONADOS<br/>COM ATENÇÃO A CADA DETALHE</div><div className="hero-bottom"><span>MONTE SIÃO · MINAS GERAIS</span><span>ROLE PARA DESCOBRIR ↓</span></div></section>
    <section className="search-strip"><div className="search-inner"><label>TIPO DE IMÓVEL<select value={type} onChange={e=>setType(e.target.value)}><option>Todos</option><option>Casa</option><option>Apartamento</option><option>Terreno</option></select></label><label>FAIXA DE VALOR<select value={price} onChange={e=>setPrice(e.target.value)}><option>Todos</option><option>Até R$ 300 mil</option><option>R$ 300–600 mil</option><option>Acima de R$ 600 mil</option></select></label><label className="search-label">BUSCAR<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Bairro, tipo ou imóvel..."/></label><a className="search-button" href="#imoveis"><Search size={16}/> Ver opções</a></div></section>
    <section className="section listings" id="imoveis"><div className="section-head"><div><div className="eyebrow dark"><i/> UMA SELEÇÃO PARA VOCÊ</div><h2>Encontre um imóvel<br/><em>com a sua cara.</em></h2></div><p>Boas escolhas começam com boas possibilidades. Explore as opções demonstrativas e imagine o que vem pela frente.</p></div><div className="listing-grid">{visible.map(p=><article className="property-card" key={p.id}><div className="property-image"><img src={p.image} alt={p.title}/><span className="tag">{p.tag}</span><button className={saved.includes(p.id)?"heart active":"heart"} aria-label="Salvar imóvel" onClick={()=>setSaved(s=>s.includes(p.id)?s.filter(x=>x!==p.id):[...s,p.id])}><Heart size={17} fill={saved.includes(p.id)?"currentColor":"none"}/></button></div><div className="property-info"><div className="property-meta"><span>{p.type.toUpperCase()}</span><span>{p.place.toUpperCase()}</span></div><h3>{p.title}</h3><p className="details">{p.details}</p><div className="property-bottom"><strong>{money(p.price)}</strong><button className="arrow-btn" onClick={()=>contact("Olá, Hilton! Tenho interesse no imóvel: "+p.title+". Pode me passar mais informações?")} aria-label="Consultar imóvel"><ArrowUpRight/></button></div></div></article>)}</div>{visible.length===0&&<p className="no-results">Nenhum imóvel corresponde à busca. Tente outros filtros.</p>}<p className="demo-disclaimer">Imóveis, imagens e valores ilustrativos, apenas para demonstração. Não representam ofertas reais.</p></section>
    <section className="about section" id="sobre"><div className="about-image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85" alt="Ambiente residencial contemporâneo"/><div className="image-caption">ESCOLHAS COM MAIS CONFIANÇA<strong>Seu imóvel.<br/>Seu momento.</strong></div></div><div className="about-copy"><div className="eyebrow dark"><i/> SOBRE O ATENDIMENTO</div><h2>Mais do que encontrar um imóvel. <em>É encontrar o seu lugar.</em></h2><p>Comprar, vender ou investir em um imóvel é uma decisão importante. A proposta de Hilton Vieira é acompanhar cada etapa com atenção, transparência e uma conversa sem complicação.</p><p>Com atendimento em Monte Sião e região, você tem apoio para entender as opções e avançar com mais segurança.</p><a className="button button-dark" href="#contato">Conheça meu atendimento <ArrowUpRight size={15}/></a></div></section>
    <section className="section values" id="diferenciais"><div className="eyebrow dark"><i/> UMA EXPERIÊNCIA MAIS TRANQUILA</div><h2>Do primeiro contato<br/><em>até a decisão certa.</em></h2><div className="value-grid"><article><span>01</span><ShieldCheck/><h3>Atendimento próximo</h3><p>Conversa direta para entender o que você procura e respeitar seu momento.</p></article><article><span>02</span><HomeIcon/><h3>Opções com propósito</h3><p>Busca orientada pelo seu perfil, prioridades e planos para o futuro.</p></article><article><span>03</span><KeyRound/><h3>Transparência</h3><p>Informações claras para avaliar cada possibilidade com calma.</p></article></div></section>
    <section className="contact" id="contato"><div className="contact-inner"><div className="eyebrow"><i/> VAMOS CONVERSAR?</div><h2>Seu próximo imóvel<br/>pode estar <em>mais perto.</em></h2><p>Conte um pouco do que você procura. Será um prazer ajudar você a encontrar boas possibilidades em Monte Sião e região.</p><button className="button button-light" onClick={()=>contact()}>Falar com Hilton pelo WhatsApp <MessageCircle size={16}/></button><small>Atendimento em Monte Sião – MG e região</small></div><div className="contact-decoration">HV</div></section>
    <footer className="footer"><a className="brand" href="#inicio"><span className="brand-mark">HV</span><span><b>HILTON VIEIRA</b><small>IMÓVEIS & NEGÓCIOS</small></span></a><span>Monte Sião · Minas Gerais</span><span>© {new Date().getFullYear()} Hilton Vieira · Site demonstrativo</span></footer><button className="floating-whatsapp" onClick={()=>contact()} aria-label="Falar pelo WhatsApp"><MessageCircle/></button>{toast&&<div className="toast">{toast}</div>}
  </main>;
}

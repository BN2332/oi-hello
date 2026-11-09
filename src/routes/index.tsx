import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BedDouble, Bath, CarFront, Check, ChevronDown, ChevronLeft, ChevronRight, Home, MapPin, Menu, MessageCircle, Ruler, Search, ShieldCheck, X } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "L. Ribeiro Imóveis | Encontre seu próximo imóvel em Monte Sião" },
    { name: "description", content: "Conheça a L. Ribeiro Imóveis em Monte Sião - MG. Explore opções demonstrativas e fale com um corretor pelo WhatsApp." },
    { name: "keywords", content: "imobiliária Monte Sião, imóveis em Monte Sião, L. Ribeiro Imóveis, casas, apartamentos, terrenos" },
  ] }),
  component: Home,
});

const phone = "5535991441538";
const listings = [
  { id: 1, title: "Casa contemporânea", type: "Casa", purpose: "Comprar", city: "Monte Sião", price: 780000, beds: 3, baths: 3, parking: 2, area: 186, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85", images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1500&q=85","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85"], description: "Uma referência visual de residência contemporânea, com ambientes amplos, integração e arquitetura marcante." },
  { id: 2, title: "Apartamento com varanda", type: "Apartamento", purpose: "Comprar", city: "Monte Sião", price: 425000, beds: 2, baths: 2, parking: 1, area: 92, image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=85","https://images.unsplash.com/photo-1600603087939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85"], description: "Exemplo de apresentação de apartamento, com foco em conforto, iluminação e aproveitamento dos espaços." },
  { id: 3, title: "Refúgio com área verde", type: "Casa", purpose: "Comprar", city: "Região de Monte Sião", price: 960000, beds: 4, baths: 3, parking: 3, area: 245, image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85", images: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1500&q=85","https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85"], description: "Conceito demonstrativo de imóvel residencial com integração entre arquitetura e paisagismo." },
  { id: 4, title: "Terreno para construir", type: "Terreno", purpose: "Comprar", city: "Monte Sião", price: 210000, beds: 0, baths: 0, parking: 0, area: 360, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85", images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1500&q=85"], description: "Exemplo de card para terreno, com espaço para inserir metragem, localização e condições reais." },
  { id: 5, title: "Apartamento elegante", type: "Apartamento", purpose: "Alugar", city: "Monte Sião", price: 2400, beds: 2, baths: 1, parking: 1, area: 78, image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85", images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1500&q=85"], description: "Exemplo de anúncio para demonstrar a categoria de locação e a apresentação de seus detalhes." },
  { id: 6, title: "Casa de linhas modernas", type: "Casa", purpose: "Alugar", city: "Monte Sião", price: 3900, beds: 3, baths: 2, parking: 2, area: 154, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85"], description: "Modelo de imóvel para locação. Os dados podem ser substituídos pelos anúncios oficiais da imobiliária." },
];
const money = (value: number, purpose: string) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }) + (purpose === "Alugar" ? " / mês" : "");
const messageLink = (message: string) => "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

function Home() {
  const [menu, setMenu] = useState(false);
  const [purpose, setPurpose] = useState("Comprar");
  const [type, setType] = useState("Todos");
  const [bedrooms, setBedrooms] = useState("Qualquer");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const [gallery, setGallery] = useState(0);
  const [name, setName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const filtered = useMemo(() => listings.filter(item =>
    item.purpose === purpose &&
    (type === "Todos" || item.type === type) &&
    (bedrooms === "Qualquer" || item.beds >= Number(bedrooms)) &&
    (item.city.toLowerCase().includes(query.toLowerCase()) || item.title.toLowerCase().includes(query.toLowerCase()))
  ), [purpose, type, bedrooms, query]);
  const selected = listings.find(item => item.id === active);
  const ask = (item?: typeof listings[number]) => window.open(messageLink(item ? "Olá! Vi o imóvel demonstrativo “" + item.title + "” no site da L. Ribeiro Imóveis e gostaria de mais informações." : "Olá! Acessei o site da L. Ribeiro Imóveis e gostaria de conversar sobre imóveis em Monte Sião."), "_blank", "noopener,noreferrer");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.open(messageLink("Olá! Meu nome é " + name + ". " + contactMessage), "_blank", "noopener,noreferrer");
  };
  return <main>
    <div className="topline"><span><i/> L. RIBEIRO IMÓVEIS</span><span>MONTE SIÃO · MINAS GERAIS <b>•</b> SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</span></div>
    <header className="site-header">
      <a className="logo" href="#inicio" aria-label="L. Ribeiro Imóveis início"><span className="logo-monogram">LR</span><span><b>L. RIBEIRO</b><small>IMÓVEIS <i/> MONTE SIÃO</small></span></a>
      <button className="mobile-toggle" onClick={() => setMenu(!menu)} aria-label="Abrir menu">{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? "main-nav open" : "main-nav"}><a href="#imoveis" onClick={() => setMenu(false)}>IMÓVEIS</a><a href="#sobre" onClick={() => setMenu(false)}>A IMOBILIÁRIA</a><a href="#contato" onClick={() => setMenu(false)}>CONTATO</a><button onClick={() => ask()}>FALAR COM CORRETOR <ArrowUpRight size={15}/></button></nav>
    </header>

    <section className="hero" id="inicio">
      <img className="hero-image" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90" alt="Sala elegante de uma residência contemporânea"/>
      <div className="hero-overlay"/>
      <div className="hero-content"><div className="eyebrow light"><span/> L. RIBEIRO IMÓVEIS <b>—</b> MONTE SIÃO, MG</div><h1>O imóvel certo<br/>para uma <em>nova história.</em></h1><p>Encontre possibilidades, descubra novos espaços e comece a imaginar o seu próximo capítulo.</p><div className="hero-actions"><a className="gold-button" href="#imoveis">ENCONTRAR MEU IMÓVEL <ArrowUpRight size={16}/></a><a className="text-button" href="#contato">FALE COM UM CORRETOR <ArrowRight size={16}/></a></div></div>
      <div className="hero-caption"><span>ESPAÇOS PARA VIVER NOVAS HISTÓRIAS</span><span>MONTE SIÃO — MG <b>01 / 03</b></span></div>
      <div className="hero-stamp"><span>LR</span><small>SEU NOVO<br/>ENDEREÇO</small></div>
    </section>

    <section className="search-wrap" aria-label="Busca de imóveis"><div className="search-intro"><span>ENCONTRE SEU LUGAR</span><b>Uma busca. Novas possibilidades.</b></div><div className="search-panel">
      <label>NEGÓCIO<select value={purpose} onChange={e=>setPurpose(e.target.value)}><option>Comprar</option><option>Alugar</option></select><ChevronDown size={14}/></label>
      <label>TIPO DE IMÓVEL<select value={type} onChange={e=>setType(e.target.value)}><option>Todos</option><option>Casa</option><option>Apartamento</option><option>Terreno</option></select><ChevronDown size={14}/></label>
      <label>LOCALIZAÇÃO<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Monte Sião ou nome do imóvel"/></label>
      <label>QUARTOS<select value={bedrooms} onChange={e=>setBedrooms(e.target.value)}><option>Qualquer</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select><ChevronDown size={14}/></label>
      <a href="#imoveis" className="search-button"><Search size={17}/> BUSCAR</a>
    </div></section>

    <section className="listings section" id="imoveis"><div className="section-heading"><div><div className="eyebrow dark"><span/> SELEÇÃO DE IMÓVEIS</div><h2>Encontre um lugar<br/>para <em>chamar de seu.</em></h2></div><p>Explore os imóveis em destaque e encontre o espaço que combina com o que você procura.</p></div>
      <div className="demo-notice"><ShieldCheck size={17}/><span>Esta é uma demonstração visual. Os imóveis, valores e características abaixo são exemplos fictícios, não anúncios disponíveis da imobiliária.</span></div>
      <div className="listing-meta"><span>{filtered.length} OPÇÕES DE DEMONSTRAÇÃO</span><span>IMAGENS ILUSTRATIVAS <i/></span></div>
      <div className="property-grid">{filtered.map(item=><article className="property-card" key={item.id}><button className="property-photo" onClick={()=>{setActive(item.id);setGallery(0);}} aria-label={"Ver detalhes de "+item.title}><img src={item.image} alt={item.title}/><span className="property-tag">{item.purpose === "Comprar" ? "À VENDA" : "PARA ALUGAR"}</span><span className="photo-arrow"><ArrowUpRight size={17}/></span></button><div className="property-info"><div className="property-type">{item.type} <span>DEMONSTRAÇÃO</span></div><h3>{item.title}</h3><p className="property-location"><MapPin size={13}/> {item.city} — MG</p><strong className="property-price">{money(item.price,item.purpose)}</strong><div className="property-features">{item.beds > 0 && <span><BedDouble size={15}/>{item.beds} quartos</span>}{item.baths > 0 && <span><Bath size={15}/>{item.baths} banheiros</span>}{item.parking > 0 && <span><CarFront size={15}/>{item.parking} vagas</span>}<span><Ruler size={15}/>{item.area} m²</span></div><div className="property-actions"><button onClick={()=>{setActive(item.id);setGallery(0);}}>VER DETALHES <ArrowUpRight size={15}/></button><button aria-label="Consultar pelo WhatsApp" onClick={()=>ask(item)}><MessageCircle size={17}/></button></div></div></article>)}</div>
      {filtered.length === 0 && <div className="empty-state"><Search size={25}/><h3>Nenhum imóvel encontrado</h3><p>Tente alterar os filtros para ver outras opções demonstrativas.</p><button onClick={()=>{setType("Todos");setBedrooms("Qualquer");setQuery("");setPurpose("Comprar");}}>LIMPAR FILTROS</button></div>}
    </section>

    {selected && <div className="detail-backdrop" role="presentation" onClick={()=>setActive(null)}><section className="detail-modal" role="dialog" aria-modal="true" aria-label={"Detalhes de "+selected.title} onClick={e=>e.stopPropagation()}><button className="detail-close" onClick={()=>setActive(null)} aria-label="Fechar detalhes"><X/></button><div className="detail-gallery"><img src={selected.images[gallery]} alt={selected.title}/>{selected.images.length>1 && <div className="gallery-controls"><button onClick={()=>setGallery((gallery+selected.images.length-1)%selected.images.length)} aria-label="Foto anterior"><ChevronLeft/></button><span>{gallery+1} / {selected.images.length}</span><button onClick={()=>setGallery((gallery+1)%selected.images.length)} aria-label="Próxima foto"><ChevronRight/></button></div>}</div><div className="detail-content"><span className="property-type">{selected.type} · {selected.purpose} · DEMONSTRAÇÃO</span><h2>{selected.title}</h2><p className="property-location"><MapPin size={14}/>{selected.city} — MG</p><strong className="property-price">{money(selected.price,selected.purpose)}</strong><div className="detail-stats"><span><BedDouble/>{selected.beds} quartos</span><span><Bath/>{selected.baths} banheiros</span><span><CarFront/>{selected.parking} vagas</span><span><Ruler/>{selected.area} m²</span></div><p>{selected.description}</p><button className="gold-button" onClick={()=>ask(selected)}>CONSULTAR ESTE IMÓVEL <ArrowUpRight size={16}/></button><small>Informações ilustrativas para apresentação do layout.</small></div></section></div>}

    <section className="about" id="sobre"><div className="about-image"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85" alt="Ambiente residencial contemporâneo"/><div className="about-image-note"><b>LR</b><span>UM NOVO LUGAR.<br/>NOVAS POSSIBILIDADES.</span></div></div><div className="about-copy"><div className="eyebrow light"><span/> SOBRE A L. RIBEIRO</div><h2>Encontrar um imóvel<br/>é encontrar um<br/><em>novo começo.</em></h2><p>A L. Ribeiro Imóveis está localizada no Centro de Monte Sião, Minas Gerais. Este espaço foi pensado para apresentar imóveis de forma clara e facilitar o contato de quem procura comprar ou alugar.</p><p>Um atendimento próximo começa com uma boa conversa. Conte o que você procura e dê o primeiro passo para encontrar seu próximo endereço.</p><a href="#contato" className="text-button">CONHEÇA NOSSOS CANAIS <ArrowRight size={16}/></a></div></section>

    <section className="contact-section section" id="contato"><div className="contact-copy"><div className="eyebrow dark"><span/> VAMOS CONVERSAR</div><h2>Seu próximo<br/>endereço pode<br/>começar <em>aqui.</em></h2><p>Fale com a L. Ribeiro Imóveis e conte o que você está procurando. Será um prazer receber sua mensagem.</p><div className="contact-detail"><MapPin/><span><b>VISITE NOSSA IMOBILIÁRIA</b><small>R. do Tanque, 70 - Lj A - Centro<br/>Monte Sião - MG, 37580-000</small></span></div><div className="contact-detail"><MessageCircle/><span><b>FALE PELO WHATSAPP</b><small>(35) 99144-1538</small></span></div><div className="contact-links"><a href="https://maps.google.com/?cid=4179794225959653962" target="_blank" rel="noreferrer">VER NO MAPA <ArrowUpRight size={14}/></a><a href="http://www.lribeiroimoveis.imb.br/" target="_blank" rel="noreferrer">SITE ATUAL <ArrowUpRight size={14}/></a></div></div>
      <form className="contact-form" onSubmit={submit}><span className="form-kicker">01 — CONTATO</span><h3>Vamos encontrar<br/>o que você procura<span>.</span></h3><p>Preencha seus dados e continue a conversa pelo WhatsApp.</p><label>SEU NOME<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/></label><label>O QUE VOCÊ PROCURA?<select value={contactMessage} onChange={e=>setContactMessage(e.target.value)}><option value="">Selecione uma opção</option><option>Estou procurando um imóvel para comprar.</option><option>Estou procurando um imóvel para alugar.</option><option>Quero anunciar meu imóvel.</option><option>Gostaria de tirar uma dúvida.</option></select></label><button className="gold-button" type="submit">ENVIAR PELO WHATSAPP <ArrowUpRight size={16}/></button><small>Você poderá revisar a mensagem antes de enviá-la.</small></form>
    </section>

    <footer className="footer"><a className="logo" href="#inicio"><span className="logo-monogram">LR</span><span><b>L. RIBEIRO</b><small>IMÓVEIS <i/> MONTE SIÃO</small></span></a><span>CONFIANÇA PARA ENCONTRAR SEU LUGAR.</span><small>© {new Date().getFullYear()} L. RIBEIRO IMÓVEIS · SITE DEMONSTRATIVO</small></footer>
    <button className="whatsapp-float" onClick={()=>ask()} aria-label="Falar com a L. Ribeiro Imóveis pelo WhatsApp"><MessageCircle size={22}/></button>
  </main>;
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Instagram, MapPin, Menu, MessageCircle, Minus, Plus, Search, ShoppingBag, X, Clock3, Wine, Coffee, ShoppingBasket } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Montês | Sabores de Minas em Monte Sião" },
      { name: "description", content: "Cafeteria mineira, queijos, cachaças, licores e produtos artesanais. Conheça a Casa Montês, em Monte Sião." },
    ],
  }),
  component: CasaMontes,
});

type Product = { id: number; name: string; category: string; description: string; image: string; tag?: string };
const products: Product[] = [
  { id: 1, name: "Queijo meia cura", category: "Queijos", description: "Sabor marcante e textura macia, uma tradição mineira à mesa.", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=85", tag: "TRADIÇÃO MINEIRA" },
  { id: 2, name: "Queijo artesanal", category: "Queijos", description: "Uma seleção especial para acompanhar bons momentos.", image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Cachaça artesanal", category: "Cachaças", description: "Um clássico de Minas para quem aprecia tradição e personalidade.", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=85", tag: "FEITO EM MINAS" },
  { id: 4, name: "Cachaça envelhecida", category: "Cachaças", description: "Opção especial para conhecer os sabores da produção artesanal.", image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Licor artesanal", category: "Licores", description: "A doçura e o aconchego de um bom licor para apreciar com calma.", image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=900&q=85", tag: "SABOR ESPECIAL" },
  { id: 6, name: "Licor de frutas", category: "Licores", description: "Uma experiência delicada para presentear ou compartilhar.", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Café coado na hora", category: "Cafeteria", description: "A pausa perfeita: café quentinho com aquele gostinho de casa.", image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85", tag: "PAUSA COM AFETO" },
  { id: 8, name: "Pão de queijo mineiro", category: "Cafeteria", description: "Casquinha dourada por fora, macio por dentro. Um carinho mineiro.", image: "https://images.unsplash.com/photo-1600628422019-6f6d6c2a6c8b?auto=format&fit=crop&w=900&q=85" },
];

const whatsapp = "5535933003516";
const instagram = "https://www.instagram.com/casamontesmg/";
const categories = ["Todos", "Queijos", "Cachaças", "Licores", "Cafeteria"];

function CasaMontes() {
  const [introOpen, setIntroOpen] = useState(true);
  useEffect(() => {
    try { if (sessionStorage.getItem("cm-intro-seen") === "yes") setIntroOpen(false); } catch {}
  }, []);
  const closeIntro = () => {
    setIntroOpen(false);
    try { sessionStorage.setItem("cm-intro-seen", "yes"); } catch {}
  };
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [note, setNote] = useState("");
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const filtered = useMemo(() => products.filter((p) => (category === "Todos" || p.category === category) && (p.name + " " + p.description).toLowerCase().includes(search.toLowerCase())), [category, search]);
  const add = (id: number) => setCart((old) => ({ ...old, [id]: (old[id] || 0) + 1 }));
  const change = (id: number, amount: number) => setCart((old) => { const next = { ...old, [id]: (old[id] || 0) + amount }; if (next[id] <= 0) delete next[id]; return next; });
  const sendOrder = () => {
    const lines = products.filter((p) => cart[p.id]).map((p) => "• " + p.name + " — quantidade: " + cart[p.id]).join("\n");
    const message = "Olá, Casa Montês! Vim pelo site e gostaria de consultar a disponibilidade destes produtos:\n" + lines + (note ? "\nObservações: " + note : "") + "\n\nPode me passar os valores e as informações, por favor?";
    window.open("https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  };

  return <main className="cm-menu">
    <div className="cm-menu-top"><span>MONTE SIÃO · MINAS GERAIS <i>•</i> SABORES, TRADIÇÃO E ACOLHIMENTO</span><a href={"https://wa.me/" + whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={13}/> FALE COM A GENTE</a></div>
    <header className="cm-menu-header">
      <a className="cm-menu-brand" href="#inicio"><span className="cm-brand-mark">CM</span><span><b>CASA MONTÊS</b><small>RESTAURANTE & CAFETERIA MINEIRA</small></span></a>
      <nav className={mobileOpen ? "cm-nav-open" : ""}><a href="#inicio" onClick={() => setMobileOpen(false)}>Início</a><a href="#historia" onClick={() => setMobileOpen(false)}>Nossa essência</a><a href="#sabores" onClick={() => setMobileOpen(false)}>Sabores de Minas</a><a href="#visite" onClick={() => setMobileOpen(false)}>Como chegar</a></nav>
      <div className="cm-header-actions"><button className="cm-cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={16}/> Minha seleção <b>{count}</b></button><button className="cm-mobile-toggle" aria-label="Abrir menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button></div>
    </header>

    <section className="cm-menu-hero" id="inicio">
      <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90" alt="Ambiente acolhedor de restaurante e cafeteria" />
      <div className="cm-hero-overlay"/>
      <div className="cm-hero-copy"><div className="cm-kicker"><i/> UM PEDACINHO DE MINAS EM MONTE SIÃO</div><h1>O sabor de Minas<br/><em>tem casa.</em></h1><p>Uma pausa para o café, uma mesa cheia de afeto e uma seleção de queijos, cachaças, licores e delícias mineiras para levar um pouco dessa tradição com você.</p><a className="cm-gold-link" href="#sabores">EXPLORE NOSSOS SABORES <ArrowRight size={15}/></a></div>
      <div className="cm-hero-side">TRADIÇÃO · SABOR · ACOLHIMENTO</div>
      <div className="cm-hero-caption"><span>CASA MONTÊS</span><b/> MONTE SIÃO, MG</div>
    </section>

    <section className="cm-menu-intro" id="historia"><div className="cm-intro-label">MAIS QUE UMA CAFETERIA <span>✦</span></div><h2>Minas se reconhece<br/><em>nos pequenos prazeres.</em></h2><p>Na Casa Montês, cada visita é um convite para desacelerar e aproveitar o que Minas tem de melhor. Do cafezinho passado na hora aos sabores artesanais que merecem um lugar especial na sua mesa.</p></section>

    <section className="cm-menu-products" id="sabores"><div className="cm-section-heading"><div><div className="cm-kicker dark"><i/> NOSSA SELEÇÃO</div><h2>Descubra os <em>sabores.</em></h2></div><p>Escolha seus favoritos e consulte<br/>a disponibilidade com nossa equipe.</p></div>
      <div className="cm-menu-tools"><div className="cm-category-tabs">{categories.map((c) => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="cm-search"><Search size={15}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar um sabor..."/></label></div>
      <div className="cm-food-grid">{filtered.map((p) => <article className="cm-food-card" key={p.id}><div className="cm-food-photo"><img src={p.image} alt={p.name} loading="lazy"/>{p.tag && <span>{p.tag}</span>}<button aria-label={"Adicionar " + p.name} onClick={() => add(p.id)}><Plus size={18}/></button></div><div className="cm-food-info"><small>{p.category}</small><h3>{p.name}</h3><p>{p.description}</p><div><b>CONSULTE O VALOR</b><button onClick={() => add(p.id)}>ADICIONAR <ArrowRight size={13}/></button></div></div></article>)}</div>
      {filtered.length === 0 && <p className="cm-no-results">Não encontramos esse sabor. Tente outra busca.</p>}
      <p className="cm-menu-note">Fotos ilustrativas. Produtos, marcas, tamanhos, valores e disponibilidade devem ser confirmados diretamente com a equipe da Casa Montês.</p>
    </section>

    <section className="cm-menu-quote"><span>✦</span><p>“Tem coisa que só Minas sabe fazer: transformar sabor em lembrança e receber a gente como se fosse de casa.”</p><small>UM CONVITE DA CASA MONTÊS</small></section>

    <section className="cm-menu-visit" id="visite"><div><div className="cm-kicker"><i/> VAI SER UM PRAZER RECEBER VOCÊ</div><h2>Venha viver<br/><em>essa experiência.</em></h2><p>Estamos no coração de Monte Sião. Passe para um café, conheça nossa seleção de produtos mineiros e leve seus sabores favoritos para casa.</p><a className="cm-gold-link" href="https://www.google.com/maps/search/?api=1&query=Rua+do+Mercado+757+Centro+Monte+Siao+MG" target="_blank" rel="noreferrer">COMO CHEGAR <ArrowRight size={15}/></a></div>
      <div className="cm-visit-card"><div><MapPin/><span><small>ENDEREÇO</small><b>Rua do Mercado, 757 — Centro</b></span></div><div><Clock3/><span><small>CIDADE</small><b>Monte Sião — MG · 37580-000</b></span></div><div><MessageCircle/><span><small>WHATSAPP</small><b>(35) 93300-3516</b></span></div><a href={"https://wa.me/" + whatsapp} target="_blank" rel="noreferrer">CONVERSAR PELO WHATSAPP <ArrowRight size={15}/></a></div>
    </section>

    <footer className="cm-menu-footer"><a className="cm-menu-brand" href="#inicio"><span className="cm-brand-mark">CM</span><span><b>CASA MONTÊS</b><small>RESTAURANTE & CAFETERIA MINEIRA</small></span></a><p>Um pedacinho de Minas em cada visita.</p><small>© 2026 CASA MONTÊS · MONTE SIÃO, MG</small><a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram Casa Montês"><Instagram size={19}/></a></footer>

    {cartOpen && <div className="cm-cart-backdrop" onClick={() => setCartOpen(false)}><aside className="cm-cart-panel" onClick={(e) => e.stopPropagation()}><div className="cm-cart-head"><div><small>SUA ESCOLHA MINEIRA</small><h2>Minha <em>seleção</em></h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar"><X/></button></div>{count === 0 ? <p className="cm-cart-empty">Sua seleção está vazia. Adicione os produtos que deseja consultar.</p> : <><div className="cm-cart-items">{products.filter((p) => cart[p.id]).map((p) => <div className="cm-cart-item" key={p.id}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><small>Consulte valor e disponibilidade</small><div className="cm-quantity"><button onClick={() => change(p.id, -1)} aria-label="Diminuir"><Minus size={12}/></button><span>{cart[p.id]}</span><button onClick={() => change(p.id, 1)} aria-label="Aumentar"><Plus size={12}/></button></div></div></div>)}</div><label className="cm-note-label">OBSERVAÇÃO (OPCIONAL)<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Conte à equipe o que você gostaria de saber..."/></label><button className="cm-send-order" onClick={sendOrder}>CONSULTAR PELO WHATSAPP <ArrowRight size={15}/></button><p className="cm-cart-footnote">Sua seleção será enviada pelo WhatsApp. Valores e disponibilidade são confirmados pela equipe.</p></>}</aside></div>}
    <a className="cm-whatsapp-float" href={"https://wa.me/" + whatsapp} target="_blank" rel="noreferrer" aria-label="Chamar no WhatsApp"><MessageCircle size={22}/></a>
  </main>;
}

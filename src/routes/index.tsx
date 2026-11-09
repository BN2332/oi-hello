import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Coffee, Heart,
  MapPin, Menu as MenuIcon, Minus, Plus, Search, ShoppingBag, Star, X,
  Clock3, Instagram, Phone, MessageCircle, Utensils, Leaf, Wheat,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Casa Montês | Restaurante & Cafeteria Mineira em Monte Sião" },
      { name: "description", content: "Uma pausa com sabor de Minas. Conheça a Casa Montês, restaurante e cafeteria no coração de Monte Sião." },
      { property: "og:title", content: "Casa Montês | O sabor de Minas em cada momento" },
      { property: "og:description", content: "Restaurante & Cafeteria Mineira em Monte Sião, MG." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const whatsapp = "5535933003516";
const address = "Rua do Mercado, 757 - Centro, Monte Sião - MG, 37580-000";
const categories = ["Todos", "Cafés", "Quitandas", "Salgados", "Doces"];
const products = [
  { id: 1, name: "Pão de queijo mineiro", category: "Quitandas", description: "Casquinha dourada, miolo macio e aquele queijo que abraça.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=85", tag: "Queridinho" },
  { id: 2, name: "Café coado na hora", category: "Cafés", description: "Aroma de café passado com calma, do jeitinho mineiro.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85", tag: "Da casa" },
  { id: 3, name: "Bolo caseiro", category: "Doces", description: "Fatia fofinha para acompanhar sua pausa.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=85", tag: "Feito com carinho" },
  { id: 4, name: "Café com leite", category: "Cafés", description: "Cremoso, quentinho e perfeito para começar o dia.", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=900&q=85" },
  { id: 5, name: "Salgado da vitrine", category: "Salgados", description: "Uma opção saborosa para matar a fome a qualquer hora.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&q=85" },
  { id: 6, name: "Doce de Minas", category: "Doces", description: "Um carinho doce para fechar sua experiência.", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=85" },
];
const gallery = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&q=85",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&q=85",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&q=85",
  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1000&q=85",
];

function Home() {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [notes, setNotes] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = useMemo(() => products.filter((p) =>
    (category === "Todos" || p.category === category) &&
    (p.name + " " + p.description).toLowerCase().includes(query.toLowerCase())
  ), [category, query]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const selected = products.filter((p) => cart[p.id]);
  const add = (id: number) => setCart((old) => ({ ...old, [id]: (old[id] || 0) + 1 }));
  const change = (id: number, amount: number) => setCart((old) => {
    const next = { ...old, [id]: Math.max(0, (old[id] || 0) + amount) };
    if (!next[id]) delete next[id];
    return next;
  });
  const order = () => {
    if (!selected.length) return;
    const lines = selected.map((p) => `• ${cart[p.id]}x ${p.name}`).join("%0A");
    const message = `Olá, Casa Montês! Gostaria de consultar disponibilidade e valores:%0A%0A${lines}%0A%0ANome: ${encodeURIComponent(customer || "Não informado")}%0AObservações: ${encodeURIComponent(notes || "Nenhuma")}%0A%0APodem confirmar os valores e as opções disponíveis?`;
    window.open(`https://wa.me/${whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <div className="announcement"><span>☼</span> Um pedacinho de Minas no coração de Monte Sião <span className="announcement-dot">✳</span> <a href="#contato">Venha nos visitar <ArrowUpRight size={12} /></a></div>
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="Casa Montês, início">
          <span className="brand-mark"><Coffee size={23} strokeWidth={1.5} /></span>
          <span className="brand-copy"><strong>casa montês</strong><small>RESTAURANTE & CAFETERIA</small></span>
        </a>
        <nav className={mobileOpen ? "main-nav nav-open" : "main-nav"}>
          <a href="#historia" onClick={() => setMobileOpen(false)}>Nossa casa</a>
          <a href="#cardapio" onClick={() => setMobileOpen(false)}>Cardápio</a>
          <a href="#ambiente" onClick={() => setMobileOpen(false)}>Ambiente</a>
          <a href="#contato" onClick={() => setMobileOpen(false)}>Contato</a>
        </nav>
        <div className="header-actions">
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label="Abrir pedido"><ShoppingBag size={17} /><span>Meu pedido</span>{count > 0 && <b>{count}</b>}</button>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">{mobileOpen ? <X /> : <MenuIcon />}</button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-photo" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow light"><span /> SABOR, AFETO E TRADIÇÃO MINEIRA</div>
          <h1>O sabor de Minas<br /><em>em cada momento.</em></h1>
          <p>Tem café passado na hora, conversa boa e aquele acolhimento que só Minas sabe oferecer.</p>
          <div className="hero-buttons"><a className="button button-cream" href="#cardapio">Conheça nosso cardápio <ArrowRight size={16} /></a><a className="text-link light-link" href="#historia">Descubra nossa casa <ArrowDown size={15} /></a></div>
          <div className="hero-note"><span className="note-line" /><span>FEITO COM CALMA. SERVIDO COM CARINHO.</span></div>
        </div>
        <div className="hero-stamp"><span>☼</span><small>O JEITO<br />MINEIRO DE<br />RECEBER</small></div>
        <div className="hero-bottom"><span>MONTE SIÃO · MINAS GERAIS</span><span>↓ ROLE PARA DESCOBRIR</span></div>
      </section>

      <section className="intro section-pad" id="historia">
        <div className="intro-image-wrap"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1100&q=85" alt="Ambiente acolhedor de cafeteria com mesas de madeira" /><div className="image-caption"><span>☼</span><div><b>Um lugar para ficar</b><small>e aproveitar o momento.</small></div></div></div>
        <div className="intro-copy">
          <div className="eyebrow"><span /> PRAZER, SOMOS A CASA MONTÊS</div>
          <h2>Mais que uma refeição.<br /><em>Um jeito de se sentir em casa.</em></h2>
          <p className="lead">A Casa Montês nasceu para celebrar o que Minas tem de melhor: a mesa farta, o café quentinho e a alegria de receber bem.</p>
          <p>Um espaço para começar o dia sem pressa, encontrar quem a gente gosta ou simplesmente fazer uma pausa gostosa no meio da rotina. Chegue como estiver. A casa é sua.</p>
          <a className="under-link" href="#contato">Venha conhecer <ArrowUpRight size={16} /></a>
          <div className="signature">Casa Montês <span>— com carinho, de Minas.</span></div>
        </div>
      </section>

      <section className="menu-section section-pad" id="cardapio">
        <div className="section-heading">
          <div><div className="eyebrow"><span /> UM CONVITE À MESA</div><h2>Coisas boas pedem<br /><em>um tempo a mais.</em></h2></div>
          <p>Escolhas preparadas para acompanhar seus melhores momentos. Consulte a equipe sobre disponibilidade e valores do dia.</p>
        </div>
        <div className="menu-toolbar">
          <div className="category-tabs">{categories.map((c) => <button key={c} className={category === c ? "category-tab active" : "category-tab"} onClick={() => setCategory(c)}>{c}</button>)}</div>
          <label className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar no cardápio" /><kbd>⌕</kbd></label>
        </div>
        <div className="product-grid">
          {filtered.map((p) => <article className="product-card" key={p.id}>
            <div className="product-image"><img src={p.image} alt={p.name} loading="lazy" />{p.tag && <span className="product-tag">{p.tag}</span>}<button className="add-product" onClick={() => add(p.id)} aria-label={`Adicionar ${p.name}`}><Plus size={19} /></button></div>
            <div className="product-info"><div className="product-meta">{p.category}<span>VALOR A CONSULTAR</span></div><h3>{p.name}</h3><p>{p.description}</p></div>
          </article>)}
          {filtered.length === 0 && <div className="empty-results">Não encontramos esse item. Tente outra busca.</div>}
        </div>
        <div className="menu-foot"><span>Os itens e a disponibilidade podem variar ao longo do dia.</span><button className="button button-dark" onClick={() => setCartOpen(true)}>Montar meu pedido <ShoppingBag size={16} /> {count > 0 && <b>{count}</b>}</button></div>
      </section>

      <section className="quote-band"><div className="quote-mark">“</div><p>Tem coisa que não se explica.<br /><em>A gente sente no primeiro café.</em></p><span>UM POUCO DE MINAS, UM TANTO DE ACONCHEGO.</span></section>

      <section className="experience section-pad" id="ambiente">
        <div className="section-heading experience-heading"><div><div className="eyebrow"><span /> UM ESPAÇO PARA DESACELERAR</div><h2>Entre, escolha seu canto<br /><em>e fique à vontade.</em></h2></div><p>Da primeira xícara ao último pedacinho, queremos que cada visita tenha gosto de quero mais.</p></div>
        <div className="gallery-grid">{gallery.map((src, i) => <button className={`gallery-item gallery-${i + 1}`} key={src} onClick={() => setLightbox(src)} aria-label="Ampliar fotografia do ambiente"><img src={src} alt={["Cafeteria acolhedora","Café sendo preparado","Pães artesanais","Quitandas fresquinhas"][i]} loading="lazy" /><span>0{i + 1} <ArrowUpRight size={15} /></span></button>)}</div>
      </section>

      <section className="values-strip"><div><Coffee /><b>Café com carinho</b><span>Uma pausa que faz bem.</span></div><div><Wheat /><b>Sabor de verdade</b><span>Tradição em cada detalhe.</span></div><div><Heart /><b>Acolhimento mineiro</b><span>Receber bem é nossa essência.</span></div><div><Leaf /><b>Momentos especiais</b><span>Para estar junto e aproveitar.</span></div></section>

      <section className="visit-section section-pad" id="contato">
        <div className="visit-copy"><div className="eyebrow light"><span /> VAI SER UM PRAZER RECEBER VOCÊ</div><h2>Seu lugar à mesa<br /><em>está esperando.</em></h2><p>Estamos no coração de Monte Sião. Passe para um café, uma boa conversa e um momento só seu.</p>
          <div className="visit-details"><div><MapPin /><span><b>Nosso endereço</b>{address}</span></div><div><Phone /><span><b>Telefone</b>(35) 93300-3516</span></div><div><Clock3 /><span><b>Funcionamento</b>Consulte os horários pelo WhatsApp.</span></div></div>
          <div className="visit-buttons"><a className="button button-cream" href="https://wa.me/5535933003516" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Fale pelo WhatsApp</a><a className="text-link light-link" href="https://maps.google.com/?cid=133884333489536509" target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="map-card"><iframe title="Localização da Casa Montês em Monte Sião" src="https://www.google.com/maps?q=Rua%20do%20Mercado%2C%20757%2C%20Monte%20Si%C3%A3o%20MG&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href="https://maps.google.com/?cid=133884333489536509" target="_blank" rel="noreferrer"><MapPin size={15} /> Abrir no Google Maps <ArrowUpRight size={14} /></a></div>
      </section>

      <footer className="footer"><a href="#inicio" className="brand footer-brand"><span className="brand-mark"><Coffee size={22} /></span><span className="brand-copy"><strong>casa montês</strong><small>RESTAURANTE & CAFETERIA</small></span></a><span className="footer-line">O sabor de Minas em cada momento.</span><div className="footer-right"><a href="https://wa.me/5535933003516" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a><span>© {new Date().getFullYear()} Casa Montês</span></div></footer>

      <a className="floating-whatsapp" href="https://wa.me/5535933003516" target="_blank" rel="noreferrer" aria-label="Falar com a Casa Montês pelo WhatsApp"><MessageCircle size={22} /></a>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow"><span /> SEU MOMENTO MINEIRO</span><h2>Meu pedido <small>({count})</small></h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar pedido"><X /></button></div>
        {selected.length === 0 ? <div className="cart-empty"><ShoppingBag size={34} /><h3>Sua sacola está vazia</h3><p>Escolha seus favoritos no cardápio e monte seu pedido.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explorar cardápio</button></div> : <><div className="cart-items">{selected.map((p) => <div className="cart-item" key={p.id}><img src={p.image} alt="" /><div className="cart-item-copy"><b>{p.name}</b><small>Valor a consultar</small><div className="quantity"><button onClick={() => change(p.id, -1)} aria-label="Diminuir"><Minus size={13} /></button><span>{cart[p.id]}</span><button onClick={() => change(p.id, 1)} aria-label="Aumentar"><Plus size={13} /></button></div></div></div>)}</div><div className="cart-form"><label>Seu nome<input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Como podemos chamar você?" /></label><label>Observações<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Alguma preferência ou detalhe?"></textarea></label><p>Os valores e a disponibilidade serão confirmados pela equipe no WhatsApp.</p><button className="button button-dark full-button" onClick={order}>Enviar pedido pelo WhatsApp <ArrowUpRight size={16} /></button></div></>}
      </aside></div>}
      {lightbox && <div className="lightbox" onClick={() => setLightbox(null)}><button aria-label="Fechar imagem"><X /></button><img src={lightbox} alt="Fotografia ampliada da Casa Montês" /></div>}
    </main>
  );
}

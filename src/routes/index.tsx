import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Gamepad2, Headphones, Menu, Search, ShieldCheck, ShoppingBag, Sparkles, Star, X, Zap } from "lucide-react";
import "./clownshop.css";

type Product = { id: number; name: string; category: string; price: number; oldPrice?: number; tag?: string; icon: string; description: string };
const products: Product[] = [
  { id: 1, name: "Conta Roblox", category: "Roblox", price: 19.90, oldPrice: 29.90, tag: "Oferta", icon: "🎮", description: "Contas digitais • detalhes e conteúdo informados no anúncio" },
  { id: 2, name: "Roblox Gift Card", category: "Roblox", price: 49.90, tag: "Popular", icon: "🟥", description: "Cartão-presente digital de origem autorizada" },
  { id: 3, name: "Steam Wallet", category: "Steam", price: 25.00, icon: "💳", description: "Crédito digital para sua carteira Steam" },
  { id: 4, name: "Game Key para Steam", category: "Steam", price: 39.90, oldPrice: 59.90, tag: "Oferta", icon: "🔑", description: "Chave de ativação • região e requisitos no anúncio" },
  { id: 5, name: "Discord Nitro", category: "Discord", price: 29.90, icon: "💜", description: "Produto digital • plano e duração especificados" },
  { id: 6, name: "Gift Card", category: "Gift Cards", price: 50.00, icon: "🎁", description: "Cartões-presente digitais de marcas selecionadas" },
];
const categories = ["Todos", "Roblox", "Steam", "Discord", "Gift Cards"];
const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function ClownShop() {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => products.filter(p => (category === "Todos" || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const selected = cart.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const total = selected.reduce((sum, p) => sum + p.price, 0);
  const add = (id: number) => setCart(old => [...old, id]);
  const checkout = () => {
    const lines = selected.map(p => `• ${p.name} — ${money(p.price)}`).join("%0A");
    const msg = encodeURIComponent(`Olá! Quero consultar a disponibilidade destes produtos na ClownShop:\n${selected.map(p => `- ${p.name} — ${money(p.price)}`).join("\n")}\nTotal estimado: ${money(total)}\nPodem confirmar os detalhes e as formas de pagamento?`);
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  };
  return <main className="cs">
    <div className="cs-topbar"><span><Zap size={13}/> OFERTAS DIGITAIS • NOVIDADES TODA SEMANA</span><span>ATENDIMENTO ONLINE</span></div>
    <header className="cs-header"><div className="cs-nav cs-wrap">
      <a className="cs-logo" href="#inicio"><span className="cs-logo-mark">C</span><span>CLOWN<span>SHOP</span><small>DIGITAL STORE</small></span></a>
      <button className="cs-mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "cs-links is-open" : "cs-links"}><a href="#inicio" onClick={() => setMenuOpen(false)}>Início</a><a href="#catalogo" onClick={() => setMenuOpen(false)}>Produtos</a><a href="#vantagens" onClick={() => setMenuOpen(false)}>Por que ClownShop</a><a href="#ajuda" onClick={() => setMenuOpen(false)}>Ajuda</a></nav>
      <button className="cs-cart-btn" onClick={() => setCartOpen(true)}><ShoppingBag size={17}/> Carrinho <b>{cart.length}</b></button>
    </div></header>
    <section className="cs-hero" id="inicio"><div className="cs-hero-glow"/><div className="cs-wrap cs-hero-grid"><div className="cs-hero-copy"><div className="cs-eyebrow"><span/> SUA LOJA DE PRODUTOS DIGITAIS</div><h1>O próximo nível<br/> começa <em>aqui.</em></h1><p>Encontre produtos digitais, keys e gift cards em um só lugar. Escolha, consulte os detalhes e compre com praticidade.</p><div className="cs-hero-actions"><a className="cs-primary" href="#catalogo">Explorar produtos <ArrowRight size={17}/></a><a className="cs-secondary" href="#vantagens">Conheça a loja <ArrowUpRight size={16}/></a></div><div className="cs-proof"><span><ShieldCheck size={16}/> Atendimento transparente</span><span><Zap size={16}/> Produtos digitais</span></div></div><div className="cs-hero-art"><div className="cs-orbit cs-orbit-one"/><div className="cs-orbit cs-orbit-two"/><div className="cs-controller">🎮</div><div className="cs-float cs-float-one">🔑 <span>GAME KEYS</span></div><div className="cs-float cs-float-two">🟥 <span>ROBLOX</span></div><div className="cs-float cs-float-three">💳 <span>GIFT CARDS</span></div><div className="cs-art-caption">PLAY DIFFERENT. SHOP SMART.</div></div></div><div className="cs-hero-bottom"><span>ROBLOX</span><i/> <span>STEAM</span><i/> <span>DISCORD</span><i/> <span>GIFT CARDS</span></div></section>
    <section className="cs-benefits" id="vantagens"><div className="cs-wrap cs-benefit-grid"><div><ShieldCheck/><span><b>Compra transparente</b><small>Informações claras em cada anúncio</small></span></div><div><Zap/><span><b>Praticidade digital</b><small>Atendimento sem complicação</small></span></div><div><Headphones/><span><b>Suporte ao cliente</b><small>Ajuda antes e depois da compra</small></span></div></div></section>
    <section className="cs-catalog cs-section" id="catalogo"><div className="cs-wrap"><div className="cs-section-head"><div><div className="cs-eyebrow"><span/> VITRINE CLOWNSHOP</div><h2>Escolha seu <em>próximo item.</em></h2><p>Explore as categorias e encontre o produto que procura.</p></div><div className="cs-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar produto..."/></div></div>
      <div className="cs-categories">{categories.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      <div className="cs-product-grid">{filtered.map(p=><article className="cs-product" key={p.id}><div className="cs-product-visual"><span className="cs-product-icon">{p.icon}</span>{p.tag && <b className="cs-tag">{p.tag}</b>}<button className="cs-quick-add" onClick={()=>add(p.id)} aria-label={`Adicionar ${p.name}`}>+</button></div><div className="cs-product-info"><small>{p.category}</small><h3>{p.name}</h3><p>{p.description}</p><div className="cs-product-bottom"><div>{p.oldPrice && <del>{money(p.oldPrice)}</del>}<strong>{money(p.price)}</strong></div><button onClick={()=>add(p.id)}>Adicionar <ArrowUpRight size={14}/></button></div></div></article>)}</div>
      {filtered.length===0 && <div className="cs-empty">Nenhum produto encontrado. Tente outra busca.</div>}
      <p className="cs-demo-note">Catálogo demonstrativo: preços, disponibilidade, descrições e condições precisam ser confirmados e atualizados pela administração antes da publicação.</p>
    </div></section>
    <section className="cs-cta"><div className="cs-wrap cs-cta-inner"><div><div className="cs-eyebrow"><span/> FICOU COM DÚVIDA?</div><h2>Estamos aqui para <em>ajudar.</em></h2><p>Fale com a equipe e tire suas dúvidas sobre produtos, regiões de ativação e entrega.</p></div><a className="cs-primary" href="https://wa.me/?text=Ol%C3%A1%2C%20ClownShop!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20produtos." target="_blank" rel="noreferrer">Falar com atendimento <ArrowUpRight size={17}/></a></div></section>
    <footer className="cs-footer" id="ajuda"><div className="cs-wrap cs-footer-main"><a className="cs-logo" href="#inicio"><span className="cs-logo-mark">C</span><span>CLOWN<span>SHOP</span><small>DIGITAL STORE</small></span></a><p>Seu universo digital, em um só lugar.</p><div className="cs-footer-links"><a href="#catalogo">Produtos</a><a href="#vantagens">Sobre a loja</a><a href="https://wa.me/?text=Ol%C3%A1%2C%20ClownShop!" target="_blank" rel="noreferrer">Contato</a></div></div><div className="cs-wrap cs-footer-bottom"><span>© {new Date().getFullYear()} ClownShop. Todos os direitos reservados.</span><span>Produtos digitais • Atendimento online</span></div></footer>
    {cartOpen && <div className="cs-overlay" onClick={()=>setCartOpen(false)}><aside className="cs-drawer" onClick={e=>e.stopPropagation()}><div className="cs-drawer-head"><div><small>SUA SELEÇÃO</small><h2>Carrinho <em>({cart.length})</em></h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar carrinho"><X/></button></div>{selected.length===0 ? <div className="cs-cart-empty"><ShoppingBag size={36}/><b>Seu carrinho está vazio</b><span>Adicione produtos para continuar.</span><button className="cs-primary" onClick={()=>setCartOpen(false)}>Ver produtos</button></div> : <><div className="cs-cart-items">{selected.map((p,i)=><div className="cs-cart-item" key={i}><span>{p.icon}</span><div><b>{p.name}</b><small>{p.category}</small></div><strong>{money(p.price)}</strong><button onClick={()=>setCart(old=>old.filter((_,idx)=>idx!==i))} aria-label="Remover item"><X size={15}/></button></div>)}</div><div className="cs-cart-total"><span>Total estimado</span><b>{money(total)}</b></div><button className="cs-primary cs-checkout" onClick={checkout}>Consultar e continuar <ArrowRight size={17}/></button><p className="cs-cart-disclaimer">O pedido será enviado para confirmação de disponibilidade, condições e pagamento. Nenhuma cobrança é realizada nesta etapa.</p></>}</aside></div>}
  </main>;
}
export const Route = createFileRoute("/")({ component: ClownShop });

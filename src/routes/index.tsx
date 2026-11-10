import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, ShoppingBag, MessageCircle, ChevronDown, X, Plus, Minus, ArrowUpRight, ShieldCheck, Sparkles, Menu } from "lucide-react";

type Item = { name: string; type: "faca" | "arma"; rarity: string; category: string; featured?: boolean };
const ITEMS: Item[] = [
  ...["Harvester","Icepiercer","Bat","Candy","Elderwood Blade","Heartblade","Chroma Seer","Chroma Gemstone","Chroma Heat","Chroma Fang","Chroma Slasher","Chroma Tides","Chroma Luger","Seer","Eternal","Eternal II","Eternal III","Eternal IV","Gingerblade","Nebula","Batwing","Ice Dragon","Corrupt","Blossom","Elderwood Scythe","Hallow's Blade","Virtual","Prismatic","Lightbringer","Darkbringer","Gemstone","Shark","Slasher","Fang","Tides","Luger","Laser","Heat","Saw"," bioblade".trim()].map((name, i) => ({
    name, type: "faca" as const,
    rarity: name.startsWith("Chroma") ? "Chroma" : ["Harvester","Icepiercer","Bat","Elderwood Scythe"].includes(name) ? "Ancient" : ["Seer","Eternal","Eternal II","Eternal III","Eternal IV","Heartblade","Candy","Gingerblade","Nebula","Ice Dragon","Gemstone","Shark","Slasher","Fang","Tides","Luger","Laser","Heat"].includes(name) ? "Godly" : "Especial",
    category: name.startsWith("Chroma") ? "Chroma" : ["Harvester","Icepiercer","Bat","Elderwood Scythe"].includes(name) ? "Ancient" : "Godly",
    featured: ["Harvester","Heartblade","Icepiercer"].includes(name)
  })),
  ...["Embergun","Luger","Chroma Luger","Chroma Heat","Chroma Gemstone","Laser","Shark","Blaster","Gemstone","Heat","Gingerbread","Iceblaster","Red Luger","Blue Seer","Flames","Pixel","Prismatic","Eternalcane","Amerilaser","Green Luger"].map((name, i) => ({
    name, type: "arma" as const, rarity: name.startsWith("Chroma") ? "Chroma" : ["Luger","Laser","Shark","Blaster","Gemstone","Heat","Flames","Pixel","Amerilaser"].includes(name) ? "Godly" : "Especial",
    category: name.startsWith("Chroma") ? "Chroma" : "Godly", featured: ["Luger","Chroma Luger","Embergun"].includes(name)
  }))
];
const COLORS: Record<string,string> = { Godly:"#e8b65d", Ancient:"#d77b4e", Chroma:"#c48bff", Especial:"#78a9d7" };
const WA_NUMBER = "";
function WeaponArt({ item, compact = false }: { item: Item; compact?: boolean }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const slug = item.name.toLowerCase()
    .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  // OP.GG first; MM2Valuess is a second real-item image source for entries
  // whose OP.GG asset is not available. Its filenames omit separators.
  const imageSources = [
    `https://s-stats-platform-cdn.op.gg/roblox/murder-mystery-2/images/weapons/${slug}.webp?image=q_auto%3Agood%2Cf_png%2Cw_640`,
    `https://mm2valuess.com/wp-content/uploads/mm2-item-images/${slug.replace(/-/g, "")}.png`
  ];
  if (sourceIndex >= imageSources.length) {
    return (
      <div className={compact ? "weapon-art compact weapon-missing" : "weapon-art weapon-missing"} role="img" aria-label={item.name}>
        <span>FOTO INDISPONÍVEL NA FONTE</span>
        <b>{item.name}</b>
      </div>
    );
  }
  return (
    <img
      className={compact ? "weapon-art compact weapon-photo" : "weapon-art weapon-photo"}
      src={imageSources[sourceIndex]}
      alt={`Imagem do item real ${item.name} de Murder Mystery 2`}
      loading="lazy"
      onError={() => setSourceIndex(current => current + 1)}
    />
  );
}
function whatsapp(message: string) {
  if (!WA_NUMBER) { window.alert("O WhatsApp da loja ainda não foi configurado. Adicione o número no site para ativar este botão."); return; }
  window.open("https://wa.me/55"+WA_NUMBER.replace(/\D/g,"")+"?text="+encodeURIComponent(message), "_blank", "noopener,noreferrer");
}
function Store() {
  const [type,setType] = useState<"faca"|"arma">("faca");
  const [query,setQuery] = useState("");
  const [rarity,setRarity] = useState("Todas");
  const [category,setCategory] = useState("Todas");
  const [cart,setCart] = useState<Record<string,number>>({});
  const [cartOpen,setCartOpen] = useState(false);
  const [menu,setMenu] = useState(false);
  const [toast,setToast] = useState("");
  const filtered = useMemo(()=>ITEMS.filter(x=>x.type===type && x.name.toLowerCase().includes(query.toLowerCase()) && (rarity==="Todas"||x.rarity===rarity) && (category==="Todas"||x.category===category)),[type,query,rarity,category]);
  const count = Object.values(cart).reduce((a,b)=>a+b,0);
  const cartItems = ITEMS.filter(x=>cart[x.name]);
  const add = (name:string)=>setCart(old=>({...old,[name]:(old[name]||0)+1}));
  const change = (name:string,n:number)=>setCart(old=>{const next={...old};if(n<=0)delete next[name];else next[name]=n;return next;});
  const contact = (name:string)=>whatsapp("Olá! Tenho interesse no item "+name+" da GRECIA MM2. Pode confirmar preço e disponibilidade?");
  return <main className="gm2">
    <div className="gm2-topline"><span><ShieldCheck size={13}/> LOJA DE ITENS VIRTUAIS MM2</span><span>ATENDIMENTO DIRETO · ENTREGA POR TRADE</span></div>
    <header className="gm2-header"><a className="gm2-brand" href="#top"><span className="gm2-mark">G</span><span>GRECIA <b>MM2</b><small>ITEMS MARKET</small></span></a>
      <nav className={menu?"gm2-nav open":"gm2-nav"}><a href="#catalogo" onClick={()=>setMenu(false)}>Catálogo</a><a href="#como-funciona" onClick={()=>setMenu(false)}>Como comprar</a><a href="#sobre" onClick={()=>setMenu(false)}>Sobre a loja</a></nav>
      <div className="gm2-head-actions"><button className="gm2-cart" onClick={()=>setCartOpen(true)} aria-label="Abrir carrinho"><ShoppingBag size={18}/><i>{count}</i></button><button className="gm2-cta" onClick={()=>whatsapp("Olá! Quero conhecer os itens da GRECIA MM2.")}>Falar com a loja <ArrowUpRight size={15}/></button><button className="gm2-menu" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button></div>
    </header>
    <section className="gm2-hero" id="top"><div className="gm2-hero-copy"><div className="gm2-eyebrow"><Sparkles size={14}/> SEU INVENTÁRIO, SUA IDENTIDADE</div><h1>ENCONTRE SEU<br/><em>PRÓXIMO</em> GODLY.</h1><p>Explore facas, armas e itens especiais de Murder Mystery 2 em um catálogo feito para quem leva seu inventário a sério.</p><div className="gm2-hero-actions"><a href="#catalogo" className="gm2-cta">Explorar catálogo <ArrowUpRight size={16}/></a><button className="gm2-outline" onClick={()=>whatsapp("Olá! Gostaria de consultar o catálogo da GRECIA MM2.")}>Tirar dúvidas</button></div><div className="gm2-trust"><span><ShieldCheck size={15}/> Atendimento direto</span><span>✦ Itens virtuais</span><span>⇄ Trade no jogo</span></div></div>
      <div className="gm2-hero-art"><div className="gm2-orbit orbit-one"/><div className="gm2-orbit orbit-two"/><div className="gm2-hero-label">DESTAQUES DA LOJA <span>● AO VIVO NO CATÁLOGO</span></div><div className="gm2-feature-grid">{ITEMS.filter(x=>x.featured).slice(0,3).map(x=><div className="gm2-feature" key={x.name}><WeaponArt item={x} compact/><b>{x.name}</b><small>{x.rarity}</small></div>)}</div><div className="gm2-hero-stamp">G<span>✦</span></div></div>
    </section>
    <section className="gm2-categories" aria-label="Categorias do catálogo">
      <div className="gm2-categories-head"><div><span className="gm2-kicker">EXPLORE A LOJA</span><h2>COMPLETE SUA <em>COLEÇÃO</em></h2></div><a href="#catalogo">Ver catálogo completo <ArrowUpRight size={15}/></a></div>
      <div className="gm2-category-grid">
        <a href="#catalogo" onClick={()=>{setType("faca");setQuery("");setRarity("Todas");setCategory("Todas");}} className="gm2-category-card gm2-cat-knives"><span className="gm2-category-art"><WeaponArt item={ITEMS.find(x=>x.name==="Harvester")!}/></span><b>Facas</b><ArrowUpRight size={17}/></a>
        <a href="#catalogo" onClick={()=>{setType("arma");setQuery("");setRarity("Todas");setCategory("Todas");}} className="gm2-category-card gm2-cat-guns"><span className="gm2-category-art"><WeaponArt item={ITEMS.find(x=>x.name==="Luger" && x.type==="arma")!}/></span><b>Armas</b><ArrowUpRight size={17}/></a>
        <a href="#catalogo" onClick={()=>{setQuery("Set");setRarity("Todas");}} className="gm2-category-card gm2-cat-sets"><span className="gm2-category-art category-symbol">✦</span><b>Pacotes</b><ArrowUpRight size={17}/></a>
        <a href="#catalogo" onClick={()=>{setQuery("Aleatória");setRarity("Todas");}} className="gm2-category-card gm2-cat-random"><span className="gm2-category-art category-symbol">◈</span><b>Itens aleatórios</b><ArrowUpRight size={17}/></a>
        <a href="#catalogo" onClick={()=>{setQuery("Pet");setRarity("Todas");}} className="gm2-category-card gm2-cat-pets"><span className="gm2-category-art category-symbol">♢</span><b>Pets</b><ArrowUpRight size={17}/></a>
      </div>
    </section>
    <section className="gm2-event">
      <div className="gm2-event-copy"><span className="gm2-kicker">EDIÇÃO ESPECIAL · 2026</span><h2>HALLOWEEN <em>2026!</em></h2><p>Descubra os itens temáticos e destaque seu inventário nesta temporada.</p><a href="#catalogo" onClick={()=>{setQuery("");setRarity("Todas");}}>Explorar novidades <ArrowUpRight size={16}/></a></div>
      <div className="gm2-event-art"><span>🎃</span><b>GRECIA<br/>MM2</b><i>LIMITED EVENT</i></div>
    </section>
    <section className="gm2-catalog" id="catalogo"><div className="gm2-section-heading"><div><div className="gm2-eyebrow">CATÁLOGO GRECIA</div><h2>ESCOLHA SEU <em>ITEM.</em></h2><p>Pesquise, filtre e encontre o item que combina com seu inventário.</p></div><div className="gm2-catalog-count"><b>{ITEMS.length.toString().padStart(2,"0")}</b><span>ITENS NO CATÁLOGO</span></div></div>
      <div className="gm2-controls"><div className="gm2-tabs"><button className={type==="faca"?"active":""} onClick={()=>setType("faca")}>✦ FACAS</button><button className={type==="arma"?"active":""} onClick={()=>setType("arma")}>◈ ARMAS</button></div><label className="gm2-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar item pelo nome..."/>{query&&<button onClick={()=>setQuery("")} aria-label="Limpar"><X size={14}/></button>}</label><label className="gm2-select"><span>RARIDADE</span><select value={rarity} onChange={e=>setRarity(e.target.value)}><option>Todas</option>{["Godly","Ancient","Chroma","Especial"].map(x=><option key={x}>{x}</option>)}</select><ChevronDown size={14}/></label><label className="gm2-select"><span>COLEÇÃO</span><select value={category} onChange={e=>setCategory(e.target.value)}><option>Todas</option>{["Godly","Ancient","Chroma"].map(x=><option key={x}>{x}</option>)}</select><ChevronDown size={14}/></label></div>
      <div className="gm2-results"><span>{filtered.length} {filtered.length===1?"item encontrado":"itens encontrados"}</span><span>PREÇOS E DISPONIBILIDADE SOB CONSULTA</span></div>
      <div className="gm2-grid">{filtered.map((item,i)=><article className="gm2-item" key={item.name}><div className="gm2-item-art"><span className="gm2-rarity" style={{"--rarity":COLORS[item.rarity]||"#aeb8c7"} as React.CSSProperties}>{item.rarity}</span><WeaponArt item={item}/><span className="gm2-item-index">GMM2 / {String(i+1).padStart(2,"0")}</span></div><div className="gm2-item-info"><small>{item.type==="faca"?"KNIFE COLLECTION":"GUN COLLECTION"}</small><h3>{item.name}</h3><div className="gm2-item-bottom"><span>Preço sob consulta</span><button onClick={()=>add(item.name)} aria-label={"Adicionar "+item.name}><Plus size={16}/></button></div><button className="gm2-buy" onClick={()=>contact(item.name)}>CONSULTAR ITEM <ArrowUpRight size={14}/></button></div></article>)}</div>
      {filtered.length===0&&<div className="gm2-empty">Nenhum item encontrado. Tente outro nome ou filtro.</div>}
    </section>
    <section className="gm2-how" id="como-funciona"><div className="gm2-section-heading"><div><div className="gm2-eyebrow">SIMPLES E DIRETO</div><h2>COMO <em>COMPRAR.</em></h2><p>Do catálogo até o seu inventário, com comunicação clara em cada etapa.</p></div></div><div className="gm2-steps">{[["01","Escolha seu item","Encontre a faca ou arma que deseja no catálogo."],["02","Consulte a loja","Confirme valor, disponibilidade e detalhes pelo atendimento."],["03","Combine o pagamento","Confira todas as condições antes de concluir."],["04","Receba por trade","A entrega do item virtual é combinada dentro do jogo."]].map(x=><article key={x[0]}><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></article>)}</div></section>
    <section className="gm2-about" id="sobre"><div className="gm2-about-symbol">G<span>✦</span></div><div><div className="gm2-eyebrow">GRECIA MM2 · ITEM MARKET</div><h2>SEU INVENTÁRIO<br/>MERECE <em>DESTAQUE.</em></h2><p>Um espaço dedicado a itens virtuais de Murder Mystery 2, com catálogo organizado e atendimento direto para você consultar cada negociação com tranquilidade.</p></div><div className="gm2-about-note"><ShieldCheck/><b>Negocie com atenção</b><span>Confira item, valor e condições antes de confirmar qualquer pagamento ou troca. Nunca compartilhe sua senha ou códigos de acesso.</span></div></section>
    <footer className="gm2-footer"><a className="gm2-brand" href="#top"><span className="gm2-mark">G</span><span>GRECIA <b>MM2</b><small>ITEMS MARKET</small></span></a><p>Loja independente de itens virtuais. Não afiliada, patrocinada ou endossada pelo Roblox ou pelos criadores de Murder Mystery 2.</p><span>© 2026 GRECIA MM2 · TODOS OS DIREITOS RESERVADOS</span></footer>
    {cartOpen&&<div className="gm2-dim" onClick={()=>setCartOpen(false)}><aside className="gm2-drawer" onClick={e=>e.stopPropagation()}><div className="gm2-drawer-head"><div><small>GRECIA MM2</small><h2>SEU CARRINHO</h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar"><X/></button></div>{cartItems.length===0?<div className="gm2-empty">Seu carrinho está vazio.<br/>Adicione itens do catálogo para montar sua consulta.</div>:<div className="gm2-cart-list">{cartItems.map(x=><div className="gm2-cart-row" key={x.name}><WeaponArt item={x} compact/><div><b>{x.name}</b><small>Preço sob consulta</small><div className="gm2-qty"><button onClick={()=>change(x.name,cart[x.name]-1)}><Minus size={13}/></button><span>{cart[x.name]}</span><button onClick={()=>change(x.name,cart[x.name]+1)}><Plus size={13}/></button></div></div><button className="gm2-remove" onClick={()=>change(x.name,0)}><X size={15}/></button></div>)}</div>}<button className="gm2-cta gm2-checkout" disabled={!cartItems.length} onClick={()=>whatsapp("Olá! Quero consultar estes itens da GRECIA MM2:\n"+cartItems.map(x=>x.name+" — quantidade: "+cart[x.name]).join("\n"))}>Consultar carrinho no WhatsApp <ArrowUpRight size={15}/></button></aside></div>}
    <a className="gm2-float" href="#catalogo" aria-label="Voltar ao catálogo"><ShoppingBag size={19}/></a>
    <div className="gm2-disclaimer">Murder Mystery 2 e Roblox são marcas de seus respectivos titulares. Todos os nomes e itens são apresentados apenas para identificação de itens virtuais do jogo.</div>
  </main>;
}
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GRECIA MM2 — Loja de Itens Murder Mystery 2" },
    { name: "description", content: "Explore facas, armas e itens especiais de Murder Mystery 2 na GRECIA MM2." },
    { property: "og:title", content: "GRECIA MM2" },
    { property: "og:description", content: "Seu inventário, sua identidade. Explore o catálogo GRECIA MM2." }
  ] }),
  component: Store
});

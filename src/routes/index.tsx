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
  const color = COLORS[item.rarity] || "#aeb8c7";
  const isGun = item.type === "arma";
  const hash = [...item.name].reduce((a,c)=>a+c.charCodeAt(0),0);
  const tilt = (hash % 9) - 4;
  const accent = item.rarity === "Chroma" ? "url(#rainbow)" : color;
  return <svg className={compact ? "weapon-art compact" : "weapon-art"} viewBox="0 0 220 260" role="img" aria-label={item.name}>
    <defs>
      <linearGradient id="blade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".32" stopColor={color}/><stop offset="1" stopColor="#24232d"/></linearGradient>
      <linearGradient id="rainbow"><stop stopColor="#ff668a"/><stop offset=".3" stopColor="#f6d16a"/><stop offset=".62" stopColor="#65d9c2"/><stop offset="1" stopColor="#9d79ff"/></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <circle cx="110" cy="130" r="79" fill={color} opacity=".08" filter="url(#glow)"/>
    <g transform={`rotate(${tilt} 110 130)`}>
    {isGun ? <>
      <path d="M30 75 Q30 67 39 67 H166 L192 82 V111 H151 L145 130 H106 L98 111 H30Z" fill="url(#blade)" stroke={accent} strokeWidth="3"/>
      <path d="M115 111 H157 L148 207 Q145 217 135 217 H112 L100 157Z" fill="#292833" stroke={accent} strokeWidth="4"/>
      <path d="M43 82 H145 V91 H43Z" fill="#fff" opacity=".35"/>
      <path d="M164 79 L190 87 V101 H164Z" fill="#17171e" stroke={accent} strokeWidth="2"/>
      <path d="M112 143 Q92 158 111 176" fill="none" stroke={accent} strokeWidth="5"/>
      <path d="M54 99 H88" stroke="#fff" opacity=".35" strokeWidth="3"/>
    </> : <>
      <path d="M110 13 Q96 68 76 111 L88 147 L110 160 L132 147 L144 111 Q124 68 110 13Z" fill="url(#blade)" stroke={accent} strokeWidth="3"/>
      <path d="M110 17 L110 157 L132 147 L144 111Z" fill="#fff" opacity=".16"/>
      <path d="M62 145 Q110 126 158 145 L146 161 H74Z" fill="#272630" stroke={accent} strokeWidth="4"/>
      <path d="M91 157 H129 L138 226 L110 250 L82 226Z" fill="#282630" stroke={accent} strokeWidth="4"/>
      <path d="M89 178 L131 218 M131 178 L89 218" stroke={accent} strokeWidth="7" opacity=".9"/>
      <path d="M110 250 L128 235 L110 219 L92 235Z" fill={accent}/>
      {item.name.toLowerCase().includes("scythe") && <path d="M112 18 Q180 8 175 75 Q160 110 128 93 Q166 78 148 49 Q133 35 112 40Z" fill="none" stroke={accent} strokeWidth="12"/>}
      {item.name.toLowerCase().includes("heart") && <path d="M110 64 C77 32 50 78 110 112 C170 78 143 32 110 64Z" fill={accent} stroke="#fff" strokeWidth="2"/>}
    </>}
    </g>
    <path d="M23 232 Q110 250 197 232" fill="none" stroke={color} strokeOpacity=".22" strokeWidth="2"/>
  </svg>;
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

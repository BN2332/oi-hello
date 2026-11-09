import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Menu, Search, ShoppingBag, X, Plus, Minus, Instagram, Sparkles, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "VÉRVE — Vista-se de presença" },
    { name: "description", content: "Moda autoral, peças marcantes e uma curadoria feita para quem não nasceu para passar despercebido." },
    { property: "og:title", content: "VÉRVE — Vista-se de presença" },
    { property: "og:description", content: "Uma nova expressão de estilo. Descubra a coleção." }
  ]}),
  component: FashionHome
});

type Product = { id:number; name:string; category:string; price:number; image:string; tag?:string; color:string };
const products:Product[] = [
 {id:1,name:"Blazer Nômade",category:"Feminino",price:389,image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=88",tag:"MAIS DESEJADO",color:"Areia"},
 {id:2,name:"Camisa Horizonte",category:"Feminino",price:229,image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=88",tag:"NOVO",color:"Off-white"},
 {id:3,name:"Jaqueta Distrito",category:"Masculino",price:459,image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=88",color:"Preto"},
 {id:4,name:"Vestido Aurora",category:"Feminino",price:319,image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=88",color:"Vinho"},
 {id:5,name:"Essencial 02",category:"Masculino",price:189,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=88",tag:"ESSENCIAL",color:"Branco"},
 {id:6,name:"Calça Movimento",category:"Masculino",price:279,image:"https://images.unsplash.com/photo-1517245232305-4b9b4a8b6f31?auto=format&fit=crop&w=900&q=88",color:"Grafite"}
];
const money=(v:number)=>v.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
function FashionHome(){
 const [category,setCategory]=useState("Todos"),[query,setQuery]=useState(""),[bag,setBag]=useState<number[]>([]),[favorites,setFavorites]=useState<number[]>([]),[bagOpen,setBagOpen]=useState(false),[menuOpen,setMenuOpen]=useState(false),[notice,setNotice]=useState("");
 const filtered=useMemo(()=>products.filter(p=>(category==="Todos"||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase())),[category,query]);
 const count=bag.length, total=bag.reduce((s,id)=>s+(products.find(p=>p.id===id)?.price||0),0);
 const add=(id:number)=>{setBag(v=>[...v,id]);setNotice("Adicionado à sua sacola");window.setTimeout(()=>setNotice(""),2200)};
 const wa="https://wa.me/?text="+encodeURIComponent("Olá! Quero conhecer as peças da VÉRVE.");
 return <main className="verve">
  <div className="verve-topline"><span>CURADORIA INDEPENDENTE · ESTILO SEM MANUAL</span><span>FRETE GRÁTIS A PARTIR DE R$ 399</span><a href={wa} target="_blank" rel="noreferrer">ATENDIMENTO EXCLUSIVO <ArrowUpRight size={12}/></a></div>
  <header className="verve-header">
   <button className="verve-mobile" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen?<X/>:<Menu/>}</button>
   <a className="verve-logo" href="#top">VÉRVE<span>®</span><small>ATELIER DE ESTILO</small></a>
   <nav className={menuOpen?"verve-nav is-open":"verve-nav"}>{[["Novidades","#colecao"],["Feminino","#colecao"],["Masculino","#colecao"],["Manifesto","#manifesto"]].map(([t,h])=><a key={t} href={h} onClick={()=>setMenuOpen(false)}>{t}</a>)}</nav>
   <div className="verve-actions"><label className="verve-search"><Search size={16}/><input value={query} onChange={e=>{setQuery(e.target.value);document.getElementById("colecao")?.scrollIntoView({behavior:"smooth"})}} placeholder="Buscar peça"/></label><button className="verve-bag" onClick={()=>setBagOpen(true)} aria-label="Abrir sacola"><ShoppingBag size={19}/><span>{count}</span></button></div>
  </header>
  <section className="verve-hero" id="top">
   <div className="verve-hero-image"><img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2000&q=92" alt="Editorial de moda contemporânea"/></div>
   <div className="verve-hero-shade"/>
   <div className="verve-hero-copy"><span className="verve-eyebrow"><i/> COLEÇÃO 01 — 2026</span><h1>Não siga<br/>o <em>padrão.</em></h1><p>Vista o que você é. Uma curadoria de peças que falam antes mesmo de você dizer uma palavra.</p><a href="#colecao" className="verve-hero-cta">EXPLORE A COLEÇÃO <ArrowUpRight size={17}/></a></div>
   <div className="verve-hero-index">01 <i/> 04</div><div className="verve-hero-note">PRESENÇA É A SUA MELHOR ASSINATURA.</div>
   <a className="verve-scroll" href="#manifesto"><ArrowDown size={15}/> DESCUBRA</a>
  </section>
  <section className="verve-marquee" aria-label="Manifesto da marca"><div>MENOS IGUAL <b>✳</b> MAIS VOCÊ <b>✳</b> SEM PERMISSÃO <b>✳</b> MAIS PRESENÇA <b>✳</b> MENOS IGUAL <b>✳</b> MAIS VOCÊ <b>✳</b></div></section>
  <section className="verve-manifesto" id="manifesto"><div className="verve-manifesto-stamp">V<br/>®<br/>26</div><div><span className="verve-eyebrow dark"><i/> NOSSO MANIFESTO</span><h2>Estilo não é sobre<br/>o que você veste.<br/><em>É sobre o que fica.</em></h2></div><div className="verve-manifesto-text"><p>A VÉRVE nasceu para quem entende que roupa é linguagem. Não criamos regras, escolhemos possibilidades. Cada peça entra aqui por um motivo: personalidade, caimento e aquela sensação impossível de explicar — mas fácil de reconhecer.</p><a href="#colecao">ENCONTRE A SUA VÉRVE <ArrowRight size={15}/></a></div></section>
  <section className="verve-collection" id="colecao"><div className="verve-collection-head"><div><span className="verve-eyebrow dark"><i/> SELEÇÃO ESPECIAL</span><h2>Peças com<br/><em>atitude própria.</em></h2></div><p>Escolhas certeiras. Texturas que surpreendem.<br/>Design que permanece.</p></div>
   <div className="verve-filter-row"><div className="verve-filters">{["Todos","Feminino","Masculino"].map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?"active":""}>{c}</button>)}</div><span>{filtered.length.toString().padStart(2,"0")} PEÇAS SELECIONADAS</span></div>
   <div className="verve-products">{filtered.map((p,i)=><article className="verve-product" key={p.id}><div className="verve-product-image"><img src={p.image} alt={p.name} loading="lazy"/>{p.tag&&<span className="verve-tag">{p.tag}</span>}<button className={favorites.includes(p.id)?"verve-heart saved":"verve-heart"} onClick={()=>setFavorites(v=>v.includes(p.id)?v.filter(x=>x!==p.id):[...v,p.id])} aria-label="Favoritar"><Heart size={17} fill={favorites.includes(p.id)?"currentColor":"none"}/></button><button className="verve-add" onClick={()=>add(p.id)}>ADICIONAR À SACOLA <Plus size={15}/></button></div><div className="verve-product-meta"><div><h3>{p.name}</h3><span>{p.category} · {p.color}</span></div><b>{money(p.price)}</b></div></article>)}</div>
   {filtered.length===0&&<p className="verve-empty">Não encontramos essa peça. Tente outra busca.</p>}
   <div className="verve-all"><span>UMA BOA ESCOLHA MUDA O DIA.</span><a href={wa} target="_blank" rel="noreferrer">FALE COM NOSSA EQUIPE <ArrowUpRight size={15}/></a></div>
  </section>
  <section className="verve-editorial"><div className="verve-editorial-image"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90" alt="Editorial de moda VÉRVE" loading="lazy"/></div><div className="verve-editorial-copy"><span className="verve-eyebrow"><i/> VÉRVE JOURNAL · 001</span><h2>O extraordinário<br/>mora no <em>detalhe.</em></h2><p>Uma combinação inesperada. Um corte preciso. A confiança de ocupar espaço. Inspire-se, experimente, invente seu próprio jeito.</p><a href="#colecao">DESCUBRA SEU PRÓXIMO LOOK <ArrowUpRight size={16}/></a><span className="verve-editorial-number">01 / 03</span></div></section>
  <section className="verve-values"><div><Sparkles size={20}/><h3>CURADORIA COM INTENÇÃO</h3><p>Peças escolhidas uma a uma, sem excesso.</p></div><div><Check size={20}/><h3>ESTILO QUE PERMANECE</h3><p>Menos impulso. Mais identidade.</p></div><div><Heart size={20}/><h3>ATENDIMENTO HUMANO</h3><p>Uma conversa real para encontrar seu estilo.</p></div></section>
  <section className="verve-newsletter"><span className="verve-eyebrow"><i/> ENTRE PARA O UNIVERSO VÉRVE</span><h2>Vista-se de <em>possibilidades.</em></h2><p>Novidades, inspirações e peças especiais. Sem ruído, só o que vale a pena.</p><a href={wa} target="_blank" rel="noreferrer">QUERO CONHECER <ArrowUpRight size={16}/></a></section>
  <footer className="verve-footer"><a className="verve-logo footer-logo" href="#top">VÉRVE<span>®</span><small>ATELIER DE ESTILO</small></a><p>ROUPA É LINGUAGEM. FALE A SUA.</p><div><a href="#colecao">COLEÇÃO</a><a href="#manifesto">MANIFESTO</a><a href={wa} target="_blank" rel="noreferrer">CONTATO <ArrowUpRight size={12}/></a><a href="https://instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM <Instagram size={13}/></a></div><small>© 2026 VÉRVE STUDIO. TODOS OS DIREITOS RESERVADOS.</small></footer>
  {bagOpen&&<div className="verve-drawer-backdrop" onClick={()=>setBagOpen(false)}><aside className="verve-drawer" onClick={e=>e.stopPropagation()}><div className="verve-drawer-head"><div><span>SUA SELEÇÃO</span><h2>Sacola <em>VÉRVE.</em></h2></div><button onClick={()=>setBagOpen(false)} aria-label="Fechar sacola"><X/></button></div>{bag.length===0?<p className="verve-empty">Sua sacola está esperando por uma boa escolha.</p>:<>{bag.map((id,i)=>{const p=products.find(x=>x.id===id)!;return <div className="verve-bag-item" key={i}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><span>{p.color}</span><strong>{money(p.price)}</strong></div><button onClick={()=>setBag(v=>v.filter((_,n)=>n!==i))} aria-label="Remover"><X size={15}/></button></div>})}<div className="verve-total"><span>Subtotal</span><b>{money(total)}</b></div><a className="verve-checkout" href={"https://wa.me/?text="+encodeURIComponent("Olá! Quero finalizar minha seleção VÉRVE: "+bag.map(id=>products.find(p=>p.id===id)?.name).join(", ")+". Total: "+money(total))} target="_blank" rel="noreferrer">FINALIZAR PELO WHATSAPP <ArrowUpRight size={16}/></a></>}</aside></div>}
  {notice&&<div className="verve-toast"><Check size={16}/>{notice}</div>}
 </main>
}

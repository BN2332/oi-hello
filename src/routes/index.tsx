import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Coffee, Search, ShoppingBag, Plus, Minus, X, MapPin, Clock3, Instagram, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Casa Montês | Cardápio Digital" },
    { name: "description", content: "Sabores mineiros, café passado e quitandas especiais. Confira o cardápio da Casa Montês." }
  ]}),
  component: DigitalMenu
});

type Item = { id:number; name:string; category:string; description:string; image:string; tag?:string };
const items:Item[] = [
  { id:1, name:"Pão de queijo mineiro", category:"Quitandas", description:"Um clássico mineiro para acompanhar seu momento de café.", image:"https://images.unsplash.com/photo-1600628422019-3a0b2c3a8f9d?auto=format&fit=crop&w=1000&q=88", tag:"QUERIDINHO" },
  { id:2, name:"Cafezinho", category:"Cafés", description:"A pausa perfeita: simples, acolhedora e cheia de sabor.", image:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=88" },
  { id:3, name:"Croquete", category:"Salgados", description:"Uma opção prática e saborosa para matar a fome.", image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=88", tag:"MAIS PEDIDO" },
  { id:4, name:"Bolo queijadinha", category:"Quitandas", description:"Doce caseiro com aquele gostinho especial de quitanda.", image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=88" }
];
const whatsapp = "5535933003516";

function DigitalMenu(){
 const [category,setCategory]=useState("Todos");
 const [search,setSearch]=useState("");
 const [cart,setCart]=useState<Record<number,number>>({});
 const [cartOpen,setCartOpen]=useState(false);
 const [note,setNote]=useState("");
 const categories=["Todos","Cafés","Salgados","Quitandas"];
 const visible=useMemo(()=>items.filter(item=>(category==="Todos"||item.category===category)&&item.name.toLowerCase().includes(search.toLowerCase())),[category,search]);
 const count=Object.values(cart).reduce((sum,n)=>sum+n,0);
 const add=(id:number)=>setCart(v=>({...v,[id]:(v[id]||0)+1}));
 const remove=(id:number)=>setCart(v=>{const next={...v};if((next[id]||0)<=1)delete next[id];else next[id]--;return next;});
 const order=()=>{const lines=items.filter(i=>cart[i.id]).map(i=>`• ${cart[i.id]}x ${i.name}`).join("\n");const message=`Olá, Casa Montês! Gostaria de fazer um pedido:\n\n${lines}\n\nObservações: ${note||"Nenhuma"}\n\nPode me informar os valores e a disponibilidade?`;window.open("https://wa.me/"+whatsapp+"?text="+encodeURIComponent(message),"_blank");};
 return <main className="cm-menu">
  <div className="cm-menu-top"><span>UM PEDACINHO DE MINAS À SUA MESA</span><a href="https://www.instagram.com/casamontesmg/" target="_blank" rel="noreferrer">SIGA A CASA <Instagram size={13}/></a></div>
  <header className="cm-menu-header">
   <a className="cm-menu-brand" href="#inicio"><span className="cm-brand-mark">CM</span><span><b>CASA MONTÊS</b><small>RESTAURANTE & CAFETERIA MINEIRA</small></span></a>
   <nav><a href="#cardapio">Cardápio</a><a href="#sobre">Nossa casa</a><a href="#visite">Como chegar</a></nav>
   <button className="cm-cart-trigger" onClick={()=>setCartOpen(true)}><ShoppingBag size={17}/> <span>Meu pedido</span><b>{count}</b></button>
  </header>
  <section className="cm-menu-hero" id="inicio">
   <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=90" alt="Mesa de café acolhedora"/>
   <div className="cm-hero-overlay"/>
   <div className="cm-hero-copy"><span className="cm-kicker"><i/> FEITO COM CARINHO, DO JEITO MINEIRO</span><h1>Tem sabor que<br/>abraça a <em>gente.</em></h1><p>Café, quitandas e aquele carinho de Minas que transforma uma pausa em um momento especial.</p><a href="#cardapio" className="cm-gold-link">EXPLORAR CARDÁPIO <ArrowRight size={16}/></a></div>
   <div className="cm-hero-side">CASA MONTÊS · MONTE SIÃO, MG</div>
  </section>
  <section className="cm-menu-intro" id="sobre"><div className="cm-intro-label">NOSSA ESSÊNCIA <span>✳</span></div><h2>Mais que uma pausa.<br/><em>Um momento para saborear.</em></h2><p>Na Casa Montês, cada visita é um convite para desacelerar e aproveitar os sabores que fazem parte da nossa memória afetiva.</p></section>
  <section className="cm-menu-products" id="cardapio">
   <div className="cm-section-heading"><div><span className="cm-kicker dark"><i/> ESCOLHA SEU FAVORITO</span><h2>Nosso <em>cardápio.</em></h2></div><p>Encontre seu próximo sabor<br/>e monte seu pedido.</p></div>
   <div className="cm-menu-tools"><div className="cm-category-tabs">{categories.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="cm-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar no cardápio"/></label></div>
   <div className="cm-food-grid">{visible.map((item,index)=><article className="cm-food-card" key={item.id}><div className="cm-food-photo"><img src={item.image} alt={item.name} loading="lazy"/>{item.tag&&<span>{item.tag}</span>}<button onClick={()=>add(item.id)} aria-label={"Adicionar "+item.name}><Plus size={18}/></button></div><div className="cm-food-info"><small>{item.category}</small><h3>{item.name}</h3><p>{item.description}</p><div><b>Consulte o valor</b><button onClick={()=>add(item.id)}>ADICIONAR <Plus size={13}/></button></div></div></article>)}</div>
   {visible.length===0&&<p className="cm-no-results">Não encontramos esse item. Tente outra busca.</p>}
   <p className="cm-menu-note">Os valores e a disponibilidade são confirmados diretamente com a equipe da Casa Montês pelo WhatsApp.</p>
  </section>
  <section className="cm-menu-quote"><span>✳</span><p>“A melhor parte de chegar é encontrar um sabor que faz a gente querer ficar.”</p><small>CASA MONTÊS · DO CAMPO PRA MESA</small></section>
  <section className="cm-menu-visit" id="visite"><div><span className="cm-kicker"><i/> VENHA NOS VISITAR</span><h2>Seu lugar à mesa<br/>está <em>esperando.</em></h2><p>Rua do Mercado, 757 · Centro<br/>Monte Sião — MG · 37580-000</p><a className="cm-gold-link" href="https://www.google.com/maps/search/?api=1&query=Rua+do+Mercado+757+Monte+Siao+MG" target="_blank" rel="noreferrer">VER NO MAPA <MapPin size={15}/></a></div><div className="cm-visit-card"><div><Clock3/><span><small>FUNCIONAMENTO</small><b>Consulte os horários</b></span></div><div><Coffee/><span><small>UM CAFÉ, UMA CONVERSA</small><b>Esperamos por você</b></span></div><a href="https://wa.me/5535933003516" target="_blank" rel="noreferrer">FALE COM A CASA <ArrowRight size={15}/></a></div></section>
  <footer className="cm-menu-footer"><a className="cm-menu-brand" href="#inicio"><span className="cm-brand-mark">CM</span><span><b>CASA MONTÊS</b><small>RESTAURANTE & CAFETERIA MINEIRA</small></span></a><p>O sabor de Minas mora aqui.</p><small>© 2026 CASA MONTÊS · MONTE SIÃO, MG</small></footer>
  {cartOpen&&<div className="cm-cart-backdrop" onClick={()=>setCartOpen(false)}><aside className="cm-cart-panel" onClick={e=>e.stopPropagation()}><div className="cm-cart-head"><div><small>CASA MONTÊS</small><h2>Seu <em>pedido.</em></h2></div><button onClick={()=>setCartOpen(false)} aria-label="Fechar"><X/></button></div>{count===0?<p className="cm-cart-empty">Seu pedido está vazio. Escolha algo gostoso no cardápio.</p>:<><div className="cm-cart-items">{items.filter(i=>cart[i.id]).map(i=><div className="cm-cart-item" key={i.id}><img src={i.image} alt={i.name}/><div><b>{i.name}</b><small>Valor a confirmar</small><div className="cm-quantity"><button onClick={()=>remove(i.id)}><Minus size={13}/></button><span>{cart[i.id]}</span><button onClick={()=>add(i.id)}><Plus size={13}/></button></div></div></div>)}</div><label className="cm-note-label">OBSERVAÇÕES<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Ex.: retirar no balcão, alguma observação..."/></label><button className="cm-send-order" onClick={order}>ENVIAR PEDIDO PELO WHATSAPP <ArrowRight size={16}/></button><small className="cm-cart-footnote">A equipe confirma valores e disponibilidade na conversa.</small></>}</aside></div>}
 </main>;
}

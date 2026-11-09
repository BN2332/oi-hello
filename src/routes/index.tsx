import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Heart, Instagram, Menu, Search, ShoppingBag, X, Plus, Minus, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Vivian Moda Feminina | Vista sua melhor versão" },
    { name: "description", content: "Descubra novidades, looks e tendências na Vivian Moda Feminina." }
  ]}),
  component: VivianStore
});

type Product = { id:number; name:string; category:string; price:string; image:string; tag?:string; description:string };
const products:Product[] = [
 {id:1,name:"Conjunto Elegance",category:"Conjuntos",price:"Consulte",image:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85",tag:"MAIS AMADO",description:"Um look elegante e versátil para várias ocasiões."},
 {id:2,name:"Vestido Midi",category:"Vestidos",price:"Consulte",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",tag:"NOVIDADE",description:"Caimento delicado com presença marcante."},
 {id:3,name:"Blusa Essencial",category:"Blusas",price:"Consulte",image:"https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=900&q=85",description:"A peça curinga que transforma qualquer produção."},
 {id:4,name:"Look Casual Chic",category:"Looks",price:"Consulte",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",tag:"ESCOLHA DA LOJA",description:"Conforto e estilo para acompanhar sua rotina."},
 {id:5,name:"Vestido Floral",category:"Vestidos",price:"Consulte",image:"https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=85",description:"Leveza e feminilidade em todos os detalhes."},
 {id:6,name:"Camisa Clássica",category:"Blusas",price:"Consulte",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85",description:"Um clássico para criar combinações incríveis."}
];
const wa="5521985487218";
function VivianStore(){
 const [category,setCategory]=useState("Todos");
 const [search,setSearch]=useState("");
 const [favorites,setFavorites]=useState<number[]>([]);
 const [bag,setBag]=useState<number[]>([]);
 const [bagOpen,setBagOpen]=useState(false);
 const [mobileOpen,setMobileOpen]=useState(false);
 const filtered=useMemo(()=>products.filter(p=>(category==="Todos"||p.category===category)&&(p.name+" "+p.description).toLowerCase().includes(search.toLowerCase())),[category,search]);
 const add=(id:number)=>setBag(old=>[...old,id]);
 const remove=(id:number)=>setBag(old=>{const i=old.indexOf(id);return i<0?old:old.filter((_,n)=>n!==i)});
 const order=()=>{const lines=products.filter(p=>bag.includes(p.id)).map(p=>"• "+p.name).join("%0A");window.open("https://wa.me/"+wa+"?text="+encodeURIComponent("Olá! Vim pelo catálogo da Vivian Moda Feminina e gostaria de saber mais sobre:%0A"+lines),"_blank");};
 return <main className="vivian">
  <div className="vivian-top">NOVA COLEÇÃO • PEÇAS ESCOLHIDAS COM CARINHO • CONSULTE DISPONIBILIDADE</div>
  <header className="vivian-header"><a className="vivian-logo" href="#home"><span>V</span><b>VIVIAN <i>MODA FEMININA</i></b></a><nav className={mobileOpen?"is-open":""}><a href="#home" onClick={()=>setMobileOpen(false)}>Início</a><a href="#colecao" onClick={()=>setMobileOpen(false)}>Coleção</a><a href="#sobre" onClick={()=>setMobileOpen(false)}>A loja</a><a href="#contato" onClick={()=>setMobileOpen(false)}>Contato</a></nav><div className="vivian-actions"><button aria-label="Abrir sacola" onClick={()=>setBagOpen(true)}><ShoppingBag size={19}/><span>{bag.length}</span></button><button className="vivian-mobile" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menu"><Menu/></button></div></header>
  <section className="vivian-hero" id="home"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90" alt="Mulheres usando looks de moda feminina"/><div className="vivian-hero-shade"/><div className="vivian-hero-copy"><small><Sparkles size={13}/> SEU ESTILO, SUA ESSÊNCIA</small><h1>Vista a sua<br/><em>melhor versão.</em></h1><p>Moda feminina para mulheres que gostam de se sentir lindas, confiantes e únicas.</p><a href="#colecao">DESCOBRIR COLEÇÃO <ArrowRight size={16}/></a></div><div className="vivian-hero-note">CURADORIA COM PERSONALIDADE <span>GUAPIMIRIM · RJ</span></div></section>
  <section className="vivian-intro" id="sobre"><span>VIVIAN MODA FEMININA</span><h2>Mais que roupa.<br/><em>É sobre como você se sente.</em></h2><p>Selecionamos peças para acompanhar seus momentos, valorizar seu estilo e deixar cada produção ainda mais especial.</p></section>
  <section className="vivian-collection" id="colecao"><div className="vivian-heading"><div><span>ESCOLHA SEU PRÓXIMO LOOK</span><h2>Novidades <em>da loja</em></h2></div><p>Encontre aquela peça que parece ter sido feita para você.</p></div>
   <div className="vivian-tools"><div className="vivian-tabs">{["Todos","Vestidos","Conjuntos","Blusas","Looks"].map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="vivian-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar peça..."/></label></div>
   <div className="vivian-grid">{filtered.map(p=><article className="vivian-product" key={p.id}><div className="vivian-photo"><img src={p.image} alt={p.name} loading="lazy"/>{p.tag&&<span className="vivian-tag">{p.tag}</span>}<button className={"vivian-fav "+(favorites.includes(p.id)?"chosen":"")} onClick={()=>setFavorites(old=>old.includes(p.id)?old.filter(x=>x!==p.id):[...old,p.id])} aria-label="Favoritar"><Heart size={17} fill={favorites.includes(p.id)?"currentColor":"none"}/></button><button className="vivian-add" onClick={()=>add(p.id)}>ADICIONAR À SACOLA <Plus size={15}/></button></div><div className="vivian-product-info"><span>{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><b>{p.price}</b></div></article>)}</div>
   {filtered.length===0&&<p className="vivian-empty">Não encontramos peças com esse nome. Tente outra busca.</p>}
  </section>
  <section className="vivian-banner"><div><span>UM TOQUE DE VOCÊ EM CADA DETALHE</span><h2>Seu próximo look<br/><em>está te esperando.</em></h2><a href="https://wa.me/5521985487218" target="_blank" rel="noreferrer">FALE COM A VIVIAN <ArrowRight size={16}/></a></div></section>
  <section className="vivian-contact" id="contato"><div><span>VEM CONHECER</span><h2>Vamos encontrar<br/><em>seu novo favorito?</em></h2></div><div className="vivian-contact-links"><a href="https://wa.me/5521985487218" target="_blank" rel="noreferrer"><MessageCircle/> Converse pelo WhatsApp <ArrowRight/></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram/> Acompanhe as novidades <ArrowRight/></a><small>Guapimirim · Rio de Janeiro</small></div></section>
  <footer className="vivian-footer"><a className="vivian-logo" href="#home"><span>V</span><b>VIVIAN <i>MODA FEMININA</i></b></a><p>Seu estilo merece esse carinho.</p><small>© 2026 VIVIAN MODA FEMININA</small></footer>
  {bagOpen&&<div className="vivian-backdrop" onClick={()=>setBagOpen(false)}><aside className="vivian-drawer" onClick={e=>e.stopPropagation()}><div className="vivian-drawer-head"><div><small>SUA SELEÇÃO</small><h2>Sacola <em>de desejos</em></h2></div><button onClick={()=>setBagOpen(false)}><X/></button></div>{bag.length===0?<p className="vivian-empty">Sua sacola está vazia. Adicione suas peças favoritas!</p>:<><div className="vivian-bag-list">{bag.map((id,i)=>{const p=products.find(x=>x.id===id)!;return <div className="vivian-bag-item" key={id+"-"+i}><img src={p.image} alt={p.name}/><div><b>{p.name}</b><small>Consulte disponibilidade e valor</small></div><button onClick={()=>remove(id)} aria-label="Remover"><X size={16}/></button></div>})}</div><button className="vivian-send" onClick={order}>CONSULTAR PEÇAS NO WHATSAPP <ArrowRight size={16}/></button></>}</aside></div>}
 </main>;
}

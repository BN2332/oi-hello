import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Wrench, Gauge, ShieldCheck, Settings, Clock3, MapPin, MessageCircle, CheckCircle2, CarFront, ChevronRight, CircleDot, Zap, Cog, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Muller Car Center | Oficina e Centro Automotivo" },
    { name: "description", content: "Muller Car Center. Mecânica, diagnóstico e manutenção automotiva. Solicite um atendimento." },
  ] }),
  component: Home,
});

const services = [
  { icon: Cog, n: "01", title: "Mecânica geral", desc: "Cuidados com os principais sistemas do veículo, da avaliação ao reparo." },
  { icon: Zap, n: "02", title: "Injeção eletrônica", desc: "Investigação de falhas e diagnóstico dos sistemas eletrônicos." },
  { icon: CircleDot, n: "03", title: "Freios e suspensão", desc: "Inspeção de componentes essenciais para estabilidade e segurança." },
  { icon: ClipboardCheck, n: "04", title: "Revisão preventiva", desc: "Acompanhamento dos itens de desgaste para evitar surpresas na estrada." },
];

function Home() {
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState("Mecânica geral");
  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");
  const whatsapp = (text: string) => window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    whatsapp("Olá, Muller Car Center! Meu nome é " + (name || "—") + ". Veículo: " + (vehicle || "—") + ". Serviço: " + service + ". " + message);
  };
  return <main>
    <div className="microbar"><span><i/> CENTRO AUTOMOTIVO</span><span>ATENÇÃO EM CADA DETALHE <b>·</b> CUIDADO EM CADA QUILÔMETRO</span></div>
    <header className="header">
      <a className="brand" href="#inicio"><span className="brand-mark"><Wrench size={23}/></span><span className="brand-type"><b>MULLER<span>CAR CENTER</span></b><small>OFICINA AUTOMOTIVA</small></span></a>
      <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Abrir menu">{menu?<X/>:<Menu/>}</button>
      <nav className={menu?"nav open":"nav"}><a href="#servicos" onClick={()=>setMenu(false)}>SERVIÇOS</a><a href="#oficina" onClick={()=>setMenu(false)}>A OFICINA</a><a href="#processo" onClick={()=>setMenu(false)}>NOSSO JEITO</a><a className="nav-cta" href="#contato" onClick={()=>setMenu(false)}>FALAR COM A OFICINA <ArrowUpRight size={16}/></a></nav>
    </header>

    <section className="hero" id="inicio">
      <img className="hero-photo" src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=90" alt="Detalhe de um veículo em manutenção automotiva"/>
      <div className="hero-shade"/>
      <div className="hero-grid">
        <div className="hero-copy"><div className="kicker"><span/> MULLER CAR CENTER <b>—</b> CENTRO AUTOMOTIVO</div><h1>SEU CARRO.<br/><em>NOSSO FOCO.</em></h1><p>Manutenção automotiva com atenção de verdade. Entenda o que seu veículo precisa e tenha mais tranquilidade para seguir caminho.</p><div className="hero-buttons"><a className="button button-lime" href="#contato">SOLICITAR ATENDIMENTO <ArrowUpRight size={17}/></a><a className="under-link" href="#servicos">EXPLORAR SERVIÇOS <ArrowRight size={16}/></a></div></div>
        <div className="hero-side"><span className="side-line"/><b>01 <small>/ 04</small></b><span>DIAGNÓSTICO<br/>MANUTENÇÃO<br/>CONFIANÇA</span></div>
      </div>
      <div className="hero-foot"><span>PRECISÃO NO CUIDADO. TRANQUILIDADE NA ESTRADA.</span><span>ROLE PARA DESCOBRIR <i>↓</i></span></div>
    </section>

    <div className="ticker"><div> MULLER CAR CENTER <b>✳</b> MECÂNICA GERAL <b>✳</b> DIAGNÓSTICO <b>✳</b> REVISÃO PREVENTIVA <b>✳</b> CUIDADO AUTOMOTIVO <b>✳</b> MULLER CAR CENTER <b>✳</b> MECÂNICA GERAL <b>✳</b> DIAGNÓSTICO <b>✳</b> REVISÃO PREVENTIVA <b>✳</b></div></div>

    <section className="services section" id="servicos">
      <div className="section-top"><div><div className="eyebrow"><span/> O QUE A GENTE FAZ</div><h2>MANUTENÇÃO<br/>SEM <em>ADIVINHAÇÃO.</em></h2></div><p>Seu carro dá sinais. Nosso trabalho é ajudar a entender o que está acontecendo e indicar o cuidado adequado.</p></div>
      <div className="service-grid">{services.map(s=><article className="service-card" key={s.n}><div className="service-meta"><span>{s.n} / SERVIÇO</span><s.icon size={25}/></div><h3>{s.title}</h3><p>{s.desc}</p><a href="#contato" onClick={()=>setService(s.title)}>QUERO SABER MAIS <ArrowUpRight size={15}/></a></article>)}</div>
      <div className="service-note"><ShieldCheck size={19}/><span>Não sabe exatamente o que seu carro precisa? <b>Converse com a oficina.</b> A gente começa entendendo o problema.</span></div>
    </section>

    <section className="feature" id="oficina"><div className="feature-image"><img src="https://images.unsplash.com/photo-1632823471565-1ecdf5c7c2e3?auto=format&fit=crop&w=1400&q=90" alt="Serviço de manutenção em automóvel"/><div className="image-tag">MULLER <b>CAR CENTER</b></div></div><div className="feature-copy"><div className="eyebrow"><span/> MAIS DO QUE CONSERTAR</div><h2>TRANSPARÊNCIA<br/>TAMBÉM FAZ<br/><em>PARTE DO SERVIÇO.</em></h2><p>Levar o carro à oficina não precisa ser uma experiência confusa. Acreditamos em explicar, orientar e conversar com clareza sobre cada necessidade do veículo.</p><p>O objetivo é simples: que você saiba o que está sendo avaliado e possa decidir com segurança os próximos passos.</p><a className="lime-link" href="#contato">CONVERSE COM A EQUIPE <ArrowUpRight size={16}/></a></div></section>

    <section className="process section" id="processo"><div className="eyebrow"><span/> NOSSO JEITO DE ATENDER</div><div className="process-head"><h2>CLAREZA DO<br/>COMEÇO AO <em>FIM.</em></h2><p>Um atendimento organizado começa ouvindo você. Veja como podemos dar o primeiro passo.</p></div><div className="steps"><div><b>01</b><span><strong>Você conta o que aconteceu</strong><small>Explique os sintomas, dúvidas ou o serviço que procura.</small></span></div><div><b>02</b><span><strong>Entendemos a necessidade</strong><small>A oficina conversa com você para orientar o próximo passo.</small></span></div><div><b>03</b><span><strong>Combinamos o atendimento</strong><small>Alinhe os detalhes diretamente com a equipe.</small></span></div></div></section>

    <section className="contact" id="contato"><div className="contact-left"><div className="eyebrow"><span/> VAMOS CONVERSAR?</div><h2>SEU PRÓXIMO<br/>PASSO COMEÇA<br/><em>POR AQUI.</em></h2><p>Conte um pouco sobre seu veículo. Sua mensagem será preparada para você enviar pelo WhatsApp.</p><div className="contact-info"><MessageCircle/><span><b>FALE COM A MULLER CAR CENTER</b><small>Atendimento pelo WhatsApp</small></span></div><div className="contact-info"><MapPin/><span><b>ENDEREÇO DA OFICINA</b><small>Informação a confirmar</small></span></div></div>
      <form className="contact-form" onSubmit={submit}><div className="form-heading"><span>01 — CONTATO</span><h3>Solicite um atendimento<span>.</span></h3><p>Preencha os campos abaixo para começar.</p></div><label>NOME<input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome"/></label><label>MODELO DO VEÍCULO<input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="Ex.: Onix 2020"/></label><label>O QUE VOCÊ PRECISA?<select value={service} onChange={e=>setService(e.target.value)}>{services.map(s=><option key={s.n}>{s.title}</option>)}<option>Outro / preciso de orientação</option></select></label><label>CONTE UM POUCO MAIS<textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Descreva o problema ou sua dúvida..." rows={3}/></label><button className="button button-lime" type="submit">CONTINUAR PELO WHATSAPP <ArrowUpRight size={17}/></button><small className="privacy-note">O WhatsApp será aberto com a mensagem preenchida para você revisar e enviar.</small></form>
    </section>
    <footer className="footer"><a className="brand" href="#inicio"><span className="brand-mark"><Wrench size={21}/></span><span className="brand-type"><b>MULLER<span>CAR CENTER</span></b><small>OFICINA AUTOMOTIVA</small></span></a><span>MANUTENÇÃO · DIAGNÓSTICO · CUIDADO</span><small>© {new Date().getFullYear()} MULLER CAR CENTER · SITE DEMONSTRATIVO</small></footer>
    <button className="whatsapp-float" onClick={()=>whatsapp("Olá, Muller Car Center! Gostaria de informações sobre os serviços da oficina.")} aria-label="Chamar no WhatsApp"><MessageCircle size={23}/></button>
  </main>;
}

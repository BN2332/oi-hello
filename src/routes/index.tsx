import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, Wrench, Gauge, ShieldCheck, Settings, Clock3, MapPin, Phone, MessageCircle, CheckCircle2, CarFront, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Muller Car Center | Centro Automotivo" },
    { name: "description", content: "Muller Car Center — manutenção, revisão e cuidado automotivo com atendimento de confiança." },
  ] }),
  component: Home,
});

const services = [
  { icon: Settings, n: "01", title: "Mecânica geral", desc: "Diagnóstico e manutenção dos principais sistemas do veículo, com atenção a cada detalhe." },
  { icon: Gauge, n: "02", title: "Injeção eletrônica", desc: "Análise de falhas, leitura de parâmetros e diagnóstico do sistema eletrônico." },
  { icon: ShieldCheck, n: "03", title: "Freios e suspensão", desc: "Inspeção e manutenção para preservar estabilidade, segurança e dirigibilidade." },
  { icon: Wrench, n: "04", title: "Revisão preventiva", desc: "Verificações periódicas para identificar desgastes e evitar problemas inesperados." },
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
    whatsapp("Olá, Muller Car Center! Meu nome é " + (name || "—") + ". Veículo: " + (vehicle || "—") + ". Serviço desejado: " + service + ". " + message);
  };
  return <main>
    <div className="topbar"><span><MapPin size={13}/> ATENDIMENTO AUTOMOTIVO</span><span>SEGURANÇA, CUIDADO E CONFIANÇA <i/></span></div>
    <header className="header">
      <a className="brand" href="#inicio"><span className="brand-symbol"><Wrench size={24}/></span><span><b>MULLER <em>CAR CENTER</em></b><small>CENTRO AUTOMOTIVO</small></span></a>
      <button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Abrir menu">{menu?<X/>:<Menu/>}</button>
      <nav className={menu?"nav open":"nav"}><a href="#servicos" onClick={()=>setMenu(false)}>Serviços</a><a href="#sobre" onClick={()=>setMenu(false)}>A oficina</a><a href="#estrutura" onClick={()=>setMenu(false)}>Estrutura</a><a className="nav-cta" href="#orcamento" onClick={()=>setMenu(false)}>Agendar atendimento <ArrowUpRight size={15}/></a></nav>
    </header>
    <section className="hero" id="inicio">
      <img className="hero-img" src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=90" alt="Mecânico trabalhando em um veículo na oficina"/>
      <div className="hero-overlay"/>
      <div className="hero-content"><div className="eyebrow"><i/> MULLER CAR CENTER · CENTRO AUTOMOTIVO</div><h1>Seu carro em boas mãos.<br/><em>Seu caminho tranquilo.</em></h1><p>Cuidado automotivo com atenção, transparência e compromisso em cada serviço. Conte com a Muller Car Center para cuidar do que leva você mais longe.</p><div className="hero-actions"><a className="btn btn-orange" href="#orcamento">Solicitar atendimento <ArrowUpRight size={17}/></a><a className="hero-more" href="#servicos">Conheça os serviços <ArrowRight size={16}/></a></div></div>
      <div className="hero-stamp"><CarFront size={25}/><span>CUIDADO COMPLETO<br/>PARA SEU VEÍCULO</span></div>
      <div className="hero-bottom"><span>MANUTENÇÃO · REVISÃO · DIAGNÓSTICO</span><span>QUALIDADE EM CADA DETALHE ↓</span></div>
    </section>
    <section className="trust-row"><div><ShieldCheck/><span><b>Segurança em primeiro lugar</b><small>Cuidado com o que importa</small></span></div><div><Wrench/><span><b>Serviços automotivos</b><small>Soluções para seu veículo</small></span></div><div><Clock3/><span><b>Atendimento próximo</b><small>Conversa clara e transparente</small></span></div></section>
    <section className="section services" id="servicos"><div className="section-heading"><div><div className="eyebrow dark"><i/> O QUE FAZEMOS</div><h2>Seu veículo merece<br/><em>o cuidado certo.</em></h2></div><p>Da manutenção preventiva ao diagnóstico, nossa proposta é ajudar você a manter seu carro seguro e pronto para rodar.</p></div>
      <div className="service-grid">{services.map(s=><article className="service-card" key={s.n}><div className="service-top"><span>{s.n}</span><s.icon size={27}/></div><h3>{s.title}</h3><p>{s.desc}</p><a href="#orcamento" onClick={()=>setService(s.title)}>Solicitar serviço <ChevronRight size={15}/></a></article>)}</div>
    </section>
    <section className="about" id="sobre"><div className="about-photo"><img src="https://images.unsplash.com/photo-1632823471565-1ecdf5c7c2e3?auto=format&fit=crop&w=1300&q=85" alt="Profissional realizando manutenção automotiva"/><div className="photo-label"><Wrench/><span>ATENÇÃO EM CADA DETALHE</span></div></div><div className="about-copy"><div className="eyebrow dark"><i/> MULLER CAR CENTER</div><h2>Mais confiança<br/>na hora de <em>cuidar do seu carro.</em></h2><p>Sabemos que seu veículo faz parte da sua rotina. Por isso, cada atendimento deve começar com escuta, explicação clara e atenção ao que realmente precisa ser feito.</p><p>Na Muller Car Center, você encontra uma oficina dedicada à manutenção e ao cuidado automotivo, com foco em um atendimento responsável do início ao fim.</p><a className="text-link" href="#orcamento">Converse com a equipe <ArrowUpRight size={16}/></a></div></section>
    <section className="section workshop" id="estrutura"><div className="eyebrow dark"><i/> NOSSO COMPROMISSO</div><h2>Uma oficina que coloca<br/><em>seu cuidado em primeiro lugar.</em></h2><div className="work-grid"><div className="work-image"><img src="https://images.unsplash.com/photo-1613214150384-2f2c7f6a1d1e?auto=format&fit=crop&w=1200&q=85" alt="Área de serviço automotivo"/></div><div className="work-points"><div><b>01</b><span><strong>Diagnóstico com clareza</strong><small>Entenda o que seu veículo precisa antes de decidir.</small></span></div><div><b>02</b><span><strong>Atenção ao seu veículo</strong><small>Serviços realizados com cuidado e responsabilidade.</small></span></div><div><b>03</b><span><strong>Relacionamento de confiança</strong><small>Atendimento próximo, respeitoso e transparente.</small></span></div></div></div>
    </section>
    <section className="quote-section"><div className="quote-mark">“</div><p>Seu carro não é apenas um veículo.<br/>É parte de todos os caminhos que você percorre.</p><span>MULLER CAR CENTER · CENTRO AUTOMOTIVO</span></section>
    <section className="booking" id="orcamento"><div className="booking-copy"><div className="eyebrow"><i/> FALE COM A MULLER CAR CENTER</div><h2>Vamos cuidar<br/>do seu <em>veículo?</em></h2><p>Preencha os dados e envie sua solicitação pelo WhatsApp. Nossa equipe poderá entender melhor o que você precisa.</p><div className="contact-detail"><MessageCircle/><span><b>Atendimento pelo WhatsApp</b><small>Envie sua solicitação diretamente</small></span></div><div className="contact-detail"><MapPin/><span><b>Localização da oficina</b><small>Endereço a confirmar</small></span></div></div>
      <form className="booking-form" onSubmit={submit}><h3>Solicite um atendimento</h3><p>Conte um pouco sobre seu veículo.</p><label>SEU NOME<input value={name} onChange={e=>setName(e.target.value)} placeholder="Como podemos chamar você?"/></label><label>VEÍCULO<input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="Ex.: Onix 2020, Honda Civic..."/></label><label>SERVIÇO DESEJADO<select value={service} onChange={e=>setService(e.target.value)}>{services.map(s=><option key={s.n}>{s.title}</option>)}<option>Outro / Não sei identificar</option></select></label><label>DESCREVA O QUE ACONTECEU<textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Conte brevemente o que seu carro precisa..." rows={3}/></label><button className="btn btn-orange" type="submit">Enviar pelo WhatsApp <ArrowUpRight size={17}/></button><small className="form-note">Ao enviar, uma conversa será aberta no WhatsApp para você revisar a mensagem.</small></form>
    </section>
    <footer className="footer"><a className="brand brand-footer" href="#inicio"><span className="brand-symbol"><Wrench size={22}/></span><span><b>MULLER <em>CAR CENTER</em></b><small>CENTRO AUTOMOTIVO</small></span></a><span>Manutenção e cuidado automotivo</span><span>© {new Date().getFullYear()} Muller Car Center · Site demonstrativo</span></footer>
    <button className="floating-whatsapp" onClick={()=>whatsapp("Olá, Muller Car Center! Gostaria de informações sobre os serviços da oficina.")} aria-label="Chamar no WhatsApp"><MessageCircle/></button>
  </main>;
}

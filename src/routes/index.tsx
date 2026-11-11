import { createFileRoute } from "@tanstack/react-router";
import "../vivi.css";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, Heart, MapPin, Menu, MessageCircle, Phone, Sparkles, Star, X } from "lucide-react";

const PHONE = "5535988656454";
const ADDRESS = "Rua Jarbas Guimarães, 220 - Avenida, Itajubá - MG, 37504-022";
const MAPS = "https://www.google.com/maps/place/Manicure+Vivi+Fortes+Nails/@-22.4316163,-45.4642246,17z/";
const wa = (message: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

const services = [
  { number: "01", title: "Manicure", desc: "Cuidado, delicadeza e acabamento impecável para deixar suas mãos ainda mais bonitas.", icon: "✳" },
  { number: "02", title: "Pedicure", desc: "Um momento de cuidado para seus pés, com atenção a cada detalhe.", icon: "♡" },
  { number: "03", title: "Unhas decoradas", desc: "Detalhes e nail art para expressar seu estilo e dar personalidade às unhas.", icon: "✧" },
  { number: "04", title: "Plástica dos pés", desc: "Um cuidado especial para renovar a aparência e a sensação de bem-estar dos pés.", icon: "❋" },
  { number: "05", title: "Spa para mãos e pés", desc: "Uma pausa na rotina para relaxar e cuidar de você com carinho.", icon: "☼" },
  { number: "06", title: "Sobrancelhas & depilação facial", desc: "Design de sobrancelhas, henna e depilação facial para complementar seu cuidado.", icon: "⌁" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85", alt: "Unhas com esmaltação delicada", label: "Delicadeza em cada detalhe" },
  { src: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=900&q=85", alt: "Unhas com nail art", label: "Um toque de personalidade" },
  { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=85", alt: "Cuidados profissionais com as unhas", label: "Beleza que começa no cuidado" },
];

function ViviFortesSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [service, setService] = useState("Manicure");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [extra, setExtra] = useState("");

  const book = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Olá, Vivi! Meu nome é ${name}. Gostaria de consultar um horário para ${service}.${date ? ` Data desejada: ${date}.` : ""}${time ? ` Período: ${time}.` : ""}${extra ? ` Observações: ${extra}` : ""} Pode me passar a disponibilidade e os valores? Obrigada!`;
    window.open(wa(message), "_blank", "noopener,noreferrer");
  };

  return (
    <main className="vivi-site">
      <div className="vivi-topline"><span>UM TEMPO PARA VOCÊ ✳</span><span>ITAJUBÁ · MINAS GERAIS</span></div>
      <header className="vivi-header">
        <div className="vivi-nav wrap">
          <a href="#inicio" className="vivi-brand" aria-label="Vivi Fortes Esmalteria - início">
            <span className="vivi-monogram">VF</span><span><strong>Vivi Fortes</strong><small>ESMALTERIA</small></span>
          </a>
          <button className="vivi-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X/> : <Menu/>}</button>
          <nav className={menuOpen ? "vivi-links is-open" : "vivi-links"}>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
            <a href="#galeria" onClick={() => setMenuOpen(false)}>Galeria</a>
            <a href="#localizacao" onClick={() => setMenuOpen(false)}>Localização</a>
            <a className="vivi-nav-cta" href="#agendar" onClick={() => setMenuOpen(false)}>Agendar horário <ArrowUpRight size={15}/></a>
          </nav>
        </div>
      </header>

      <section className="vivi-hero" id="inicio">
        <div className="vivi-hero-photo" />
        <div className="vivi-hero-shade" />
        <div className="wrap vivi-hero-content">
          <div className="vivi-kicker"><span/> SEU MOMENTO DE CUIDADO COMEÇA AQUI</div>
          <h1>Beleza nos detalhes.<br/><em>Carinho em cada cuidado.</em></h1>
          <p>Um espaço para desacelerar, cuidar de você e sair com aquela sensação gostosa de estar ainda mais bonita.</p>
          <div className="vivi-hero-actions">
            <a className="vivi-button" href="#agendar">Quero agendar <ArrowRight size={17}/></a>
            <a className="vivi-play-link" href="#servicos">Conheça os serviços <span>↓</span></a>
          </div>
          <div className="vivi-rating"><div className="vivi-stars"><Star/><Star/><Star/><Star/><Star/></div><strong>5,0</strong><span>· 63 avaliações no Google</span></div>
        </div>
        <div className="vivi-hero-caption">VIVI FORTES ESMALTERIA <span>—</span> ITAJUBÁ, MG</div>
        <div className="vivi-hero-side">BELEZA &nbsp; · &nbsp; BEM-ESTAR &nbsp; · &nbsp; AUTO CUIDADO</div>
      </section>

      <section className="vivi-intro section-vivi" id="sobre">
        <div className="wrap vivi-intro-grid">
          <div className="vivi-intro-image"><img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1000&q=85" alt="Ambiente acolhedor de beleza" /><span className="vivi-image-stamp">UM CARINHO<br/>QUE VOCÊ MERECE</span></div>
          <div className="vivi-intro-copy">
            <div className="vivi-eyebrow">OLÁ, SEJA BEM-VINDA <span>✳</span></div>
            <h2>Mais do que cuidar das unhas, <em>cuidar de você.</em></h2>
            <p>A Vivi Fortes Esmalteria é um espaço dedicado à beleza, ao cuidado e ao bem-estar. Cada atendimento é pensado com atenção aos detalhes, capricho e carinho para que você se sinta confortável e especial.</p>
            <p>Seja para manter suas unhas em dia, experimentar uma decoração nova ou reservar um momento só seu, será um prazer receber você.</p>
            <div className="vivi-signature">Com carinho, <strong>Vivi Fortes</strong></div>
            <a className="vivi-text-link" href={wa("Olá, Vivi! Gostaria de conhecer melhor os serviços da esmalteria.")} target="_blank" rel="noreferrer">Converse com a Vivi <ArrowUpRight size={15}/></a>
          </div>
        </div>
      </section>

      <section className="vivi-services section-vivi" id="servicos">
        <div className="wrap">
          <div className="vivi-section-head"><div><div className="vivi-eyebrow">UM CUIDADO PARA CADA MOMENTO <span>✳</span></div><h2>Pequenos detalhes.<br/><em>Uma grande diferença.</em></h2></div><p>Escolha seu momento de cuidado. Para consultar valores, duração e disponibilidade, é só chamar pelo WhatsApp.</p></div>
          <div className="vivi-service-grid">{services.map((s) => <article className="vivi-service-card" key={s.number}><div className="vivi-service-top"><span>{s.number}</span><b>{s.icon}</b></div><h3>{s.title}</h3><p>{s.desc}</p><a href={wa(`Olá, Vivi! Gostaria de saber mais sobre ${s.title}, valores e horários disponíveis.`)} target="_blank" rel="noreferrer">Consultar serviço <ArrowUpRight size={14}/></a></article>)}</div>
          <div className="vivi-service-foot"><Sparkles size={17}/><span>Um atendimento pensado com cuidado, capricho e atenção aos detalhes.</span></div>
        </div>
      </section>

      <section className="vivi-gallery section-vivi" id="galeria">
        <div className="wrap">
          <div className="vivi-gallery-head"><div className="vivi-eyebrow">INSPIRAÇÃO PARA VOCÊ <span>✳</span></div><h2>Seu estilo, <em>suas unhas.</em></h2><p>Referências de beleza para inspirar seu próximo momento de cuidado.</p></div>
          <div className="vivi-gallery-grid">{gallery.map((item, i) => <figure className={i === 1 ? "vivi-gallery-item tall" : "vivi-gallery-item"} key={item.src}><img src={item.src} alt={item.alt}/><figcaption><span>0{i+1}</span>{item.label}</figcaption></figure>)}</div>
          <p className="vivi-gallery-note">Imagens de referência para esta apresentação — não são fotos de trabalhos da Vivi. A galeria poderá receber fotos próprias quando estiverem disponíveis.</p>
        </div>
      </section>

      <section className="vivi-quote"><div className="wrap"><span>✳</span><p>“Você merece um momento para se olhar com carinho e lembrar da beleza que existe em você.”</p><small>VIVI FORTES ESMALTERIA</small></div></section>

      <section className="vivi-booking section-vivi" id="agendar">
        <div className="wrap vivi-booking-grid">
          <div className="vivi-booking-copy"><div className="vivi-eyebrow">VAMOS RESERVAR SEU MOMENTO? <span>✳</span></div><h2>Seu próximo cuidado<br/>começa com um <em>oi.</em></h2><p>Preencha os detalhes ao lado e continue pelo WhatsApp. A Vivi confirma a disponibilidade e passa todas as informações para você.</p><div className="vivi-booking-benefit"><span><Heart size={18}/></span><div><strong>Atendimento com carinho</strong><small>Uma experiência acolhedora, do primeiro contato ao resultado final.</small></div></div><div className="vivi-booking-benefit"><span><CalendarDays size={18}/></span><div><strong>Agendamento fácil</strong><small>Combine o melhor dia e horário diretamente pelo WhatsApp.</small></div></div></div>
          <form className="vivi-form" onSubmit={book}>
            <div className="vivi-form-title"><span>SEU AGENDAMENTO</span><small>01 — 04</small></div>
            <label>Como podemos chamar você?<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome"/></label>
            <label>Qual cuidado você deseja?<span className="vivi-select-wrap"><select value={service} onChange={e=>setService(e.target.value)}>{services.map(s=><option key={s.title}>{s.title}</option>)}</select><ChevronDown size={16}/></span></label>
            <div className="vivi-form-row"><label>Melhor data<input type="date" value={date} onChange={e=>setDate(e.target.value)} min={new Date().toISOString().slice(0,10)}/></label><label>Período preferido<select value={time} onChange={e=>setTime(e.target.value)}><option value="">A combinar</option><option>Manhã</option><option>Tarde</option><option>Noite</option></select></label></div>
            <label>Alguma observação? <small>opcional</small><textarea rows={2} value={extra} onChange={e=>setExtra(e.target.value)} placeholder="Conte se tem alguma preferência..."/></label>
            <button className="vivi-button vivi-submit" type="submit">Continuar pelo WhatsApp <MessageCircle size={17}/></button>
            <p className="vivi-form-disclaimer">O envio abre uma conversa no WhatsApp. O horário só fica confirmado após o retorno da profissional.</p>
          </form>
        </div>
      </section>

      <section className="vivi-location section-vivi" id="localizacao">
        <div className="wrap">
          <div className="vivi-location-head"><div className="vivi-eyebrow">SERÁ UM PRAZER RECEBER VOCÊ <span>✳</span></div><h2>Estamos pertinho <em>de você.</em></h2></div>
          <div className="vivi-location-grid">
            <div className="vivi-map"><iframe title="Localização da Vivi Fortes Esmalteria em Itajubá" src="https://www.google.com/maps?q=R.%20Jarbas%20Guimar%C3%A3es%2C%20220%2C%20Itajub%C3%A1%20MG&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
            <div className="vivi-location-info">
              <div className="vivi-info-line"><span><MapPin/></span><div><small>ENDEREÇO</small><p>{ADDRESS}</p><a href={MAPS} target="_blank" rel="noreferrer">Ver rota no Google Maps <ArrowUpRight size={13}/></a></div></div>
              <div className="vivi-info-line"><span><Phone/></span><div><small>TELEFONE / WHATSAPP</small><p>(35) 98865-6454</p><a href={wa("Olá, Vivi! Encontrei seu site e gostaria de tirar uma dúvida.")} target="_blank" rel="noreferrer">Chamar no WhatsApp <ArrowUpRight size={13}/></a></div></div>
              <div className="vivi-info-line"><span><Clock3/></span><div><small>AGENDAMENTO</small><p>Consulte os horários disponíveis diretamente pelo WhatsApp.</p><small className="vivi-hours-note">A confirmação do dia e horário é feita pela profissional.</small></div></div>
              <a className="vivi-button vivi-directions" href={MAPS} target="_blank" rel="noreferrer">Como chegar <ArrowUpRight size={16}/></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="vivi-footer"><div className="wrap"><div className="vivi-footer-main"><a href="#inicio" className="vivi-brand"><span className="vivi-monogram">VF</span><span><strong>Vivi Fortes</strong><small>ESMALTERIA</small></span></a><p>Beleza nos detalhes. Carinho em cada cuidado.</p><a className="vivi-footer-wa" href={wa("Olá, Vivi! Gostaria de agendar um horário.")} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Fale pelo WhatsApp</a></div><div className="vivi-footer-bottom"><span>© {new Date().getFullYear()} Vivi Fortes Esmalteria</span><span>FEITO COM CARINHO EM ITAJUBÁ · MG</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div></div></footer>
      <a className="vivi-float-wa" href={wa("Olá, Vivi! Encontrei seu site e gostaria de agendar um horário.")} target="_blank" rel="noreferrer" aria-label="Fale com a Vivi pelo WhatsApp"><MessageCircle size={23}/></a>
    </main>
  );
}

export const Route = createFileRoute("/")({ component: ViviFortesSite });

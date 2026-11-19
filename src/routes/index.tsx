import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight, Check, ChevronRight,
  CircleHelp, CreditCard, LayoutDashboard, LockKeyhole, Menu,
  QrCode, ShieldCheck, Sparkles, Wallet, X,
} from "lucide-react";
import "./clown-gate.css";

const demoTransactions = [
  { name: "Marina Costa", id: "CG-20481", amount: "R$ 189,90", status: "Aprovado" },
  { name: "Lucas Almeida", id: "CG-20480", amount: "R$ 79,00", status: "Pendente" },
  { name: "Ana Ribeiro", id: "CG-20479", amount: "R$ 249,90", status: "Aprovado" },
];

function ClownGate() {
  const [activeTab, setActiveTab] = useState("Visão geral");
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = [
    { label: "Visão geral", icon: <LayoutDashboard /> },
    { label: "Transações", icon: <CreditCard /> },
    { label: "Cobranças PIX", icon: <QrCode /> },
    { label: "Financeiro", icon: <Wallet /> },
  ];

  return <main className="cg cg-clean">
    <header className="cg-clean-header">
      <a className="cg-clean-brand" href="#inicio" aria-label="Clown Gate início">
        <img src="/clown-gate.svg" alt="" />
        <span>CLOWN<span>GATE</span><small>PAYMENT PLATFORM</small></span>
      </a>
      <button className="cg-clean-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? "cg-clean-nav is-open" : "cg-clean-nav"}>
        <a href="#vantagens" onClick={() => setMenuOpen(false)}>A plataforma</a>
        <a href="#seguranca" onClick={() => setMenuOpen(false)}>Segurança</a>
        <a href="#ajuda" onClick={() => setMenuOpen(false)}>Ajuda</a>
      </nav>
      <a className="cg-clean-login" href="#gate">Acessar <ArrowUpRight size={15} /></a>
    </header>

    <section className="cg-clean-hero" id="inicio">
      <div className="cg-clean-glow" />
      <div className="cg-clean-copy">
        <div className="cg-clean-overline"><i /> SUA NOVA CENTRAL DE PAGAMENTOS</div>
        <h1>Pagamentos no<br /><em>seu controle.</em></h1>
        <p>Uma forma mais simples de receber, acompanhar e organizar suas cobranças PIX.</p>
        <div className="cg-clean-actions">
          <a className="cg-clean-primary" href="#gate">Entrar na Gate <ArrowRight size={17} /></a>
          <a className="cg-clean-secondary" href="#vantagens">Conhecer a plataforma <ChevronRight size={16} /></a>
        </div>
        <div className="cg-clean-proof"><span><ShieldCheck /> Ambiente protegido</span><span><QrCode /> Foco em PIX</span></div>
      </div>
      <div className="cg-clean-art" aria-label="Símbolo da Clown Gate">
        <div className="cg-clean-orbit orbit-one" /><div className="cg-clean-orbit orbit-two" />
        <div className="cg-clean-emblem"><img src="/clown-gate.svg" alt="Clown Gate" /></div>
        <span className="cg-art-tag tag-top"><i /> PIX PAYMENT</span>
        <span className="cg-art-tag tag-bottom">CLOWN GATE <b> / 01</b></span>
        <div className="cg-art-spark spark-one">✳</div><div className="cg-art-spark spark-two">✦</div>
      </div>
      <div className="cg-clean-bottom"><span>CLAREZA EM CADA COBRANÇA</span><i /><span>CONTROLE EM UM SÓ LUGAR</span><i /><span>FEITO PARA CRESCER</span></div>
    </section>

    <section className="cg-clean-benefits" id="vantagens">
      <article><span>01</span><QrCode /><h3>Cobranças PIX</h3><p>Crie cobranças com QR Code e código copia e cola.</p></article>
      <article><span>02</span><LayoutDashboard /><h3>Visão organizada</h3><p>Acompanhe a atividade da sua operação em um só lugar.</p></article>
      <article><span>03</span><LockKeyhole /><h3>Integração segura</h3><p>Conexões protegidas e eventos validados pelo provedor.</p></article>
    </section>

    <section className="cg-gate-access" id="gate">
      <div className="cg-gate-intro">
        <div className="cg-clean-overline"><i /> ÁREA DE ACESSO</div>
        <h2>Bem-vindo à<br /><em>Clown Gate.</em></h2>
        <p>Entre na experiência da plataforma e conheça o painel.</p>
        <div className="cg-demo-label"><Sparkles size={14} /> PRÉVIA INTERATIVA</div>
      </div>
      <div className="cg-clean-dashboard">
        <aside className="cg-clean-sidebar">
          <div className="cg-sidebar-brand"><img src="/clown-gate.svg" alt="" /><b>CLOWN GATE</b></div>
          {tabs.map(tab => <button key={tab.label} className={activeTab === tab.label ? "active" : ""} onClick={() => setActiveTab(tab.label)}>{tab.icon}{tab.label}</button>)}
          <div className="cg-sidebar-status"><i /> AMBIENTE DEMO</div>
        </aside>
        <div className="cg-clean-dash-content">
          <div className="cg-clean-dash-head"><div><small>PAINEL / {activeTab.toUpperCase()}</small><h3>{activeTab}</h3></div><span className="cg-demo-badge">DEMONSTRAÇÃO</span></div>
          {activeTab === "Visão geral" ? <>
            <div className="cg-clean-stats">
              <article><small>VOLUME ILUSTRATIVO</small><b>R$ 8.420,00</b><span>Dados fictícios</span></article>
              <article><small>COBRANÇAS</small><b>128</b><span>Dados fictícios</span></article>
              <article><small>STATUS</small><b className="cg-status-ready">Em prévia</b><span>Ambiente demonstrativo</span></article>
            </div>
            <div className="cg-clean-activity"><div className="cg-activity-title"><b>Atividade recente</b><small>EXEMPLOS FICTÍCIOS</small></div>
              {demoTransactions.map(tx => <div className="cg-clean-tx" key={tx.id}><span className="cg-tx-symbol"><ArrowDownLeft /></span><div><b>{tx.name}</b><small>{tx.id}</small></div><strong>{tx.amount}</strong><em className={tx.status === "Aprovado" ? "ok" : "wait"}>{tx.status}</em></div>)}
            </div>
          </> : <div className="cg-clean-empty"><CircleHelp /><b>{activeTab}</b><p>Esta área é uma prévia visual. A operação real será liberada após a configuração de acesso e do provedor de pagamentos.</p></div>}
          <div className="cg-clean-notice"><LockKeyhole size={13} /> Esta é uma demonstração. Nenhum pagamento real é processado nesta tela.</div>
        </div>
      </div>
    </section>

    <section className="cg-clean-security" id="seguranca"><ShieldCheck /><div><b>Segurança desde a primeira etapa.</b><span>Credenciais protegidas e confirmação de pagamentos pelo provedor.</span></div><Check /></section>
    <footer className="cg-clean-footer" id="ajuda"><a className="cg-clean-brand" href="#inicio"><img src="/clown-gate.svg" alt="" /><span>CLOWN<span>GATE</span><small>PAYMENT PLATFORM</small></span></a><span>© 2026 CLOWN GATE</span><a href="#seguranca">Sobre a plataforma <ArrowUpRight size={13} /></a></footer>
  </main>;
}

export const Route = createFileRoute("/")({ component: ClownGate });

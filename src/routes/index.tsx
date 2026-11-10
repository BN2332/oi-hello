import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowDownLeft, ArrowUpRight, Bell, ChevronRight, Clock3, Eye, EyeOff, LayoutDashboard, LockKeyhole, LogOut, Menu, ShieldCheck, UserRound, X, Landmark, FileText, AlertCircle } from "lucide-react";

type User = { id?: string; email: string };
type AuthMode = "login" | "register";
type Tab = "overview" | "activity" | "profile";

function GreciaPay() {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authOpen, setAuthOpen] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [notice, setNotice] = useState("");
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { credentials: "same-origin" })
      .then(async response => response.ok ? response.json() : null)
      .then(data => { if (active && data?.authenticated && data.user?.email) { setUser(data.user); setEmail(data.user.email); } })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  async function submitAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthBusy(true); setAuthError(""); setAuthMessage("");
    try {
      const response = await fetch("/api/auth/" + authMode, {
        method: "POST", credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password })
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const raw = await response.text().catch(() => "");
        console.error("Auth endpoint returned non-JSON:", response.status, raw.slice(0, 300));
        throw new Error(response.status === 404
          ? "A rota de cadastro ainda não está disponível nesta publicação. Publique a versão mais recente do projeto e tente novamente."
          : "O servidor de autenticação retornou uma página inesperada. Verifique a publicação e os logs do servidor.");
      }
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || data.error || "Não foi possível concluir o acesso.");
      if (authMode === "register" && data.needsEmailConfirmation) {
        setAuthMessage(data.message || "Confira seu e-mail para confirmar o cadastro.");
        return;
      }
      setUser(data.user || { email }); setAuthOpen(false); setPassword(""); setProfileName(fullName);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Erro inesperado. Tente novamente.");
    } finally { setAuthBusy(false); }
  }

  async function logout() {
    try { await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }); } catch { /* sessão local será encerrada na interface */ }
    setUser(null); setTab("overview"); setNotice("Você saiu da sua conta.");
  }

  function unavailable(action: string) {
    setNotice(action + " indisponível nesta versão. A GRECIA PAY ainda não está conectada a uma instituição financeira parceira; nenhum dinheiro pode ser depositado, guardado ou sacado.");
  }

  const displayName = profileName || user?.email?.split("@")[0] || "Cliente";
  const initials = displayName.slice(0, 1).toUpperCase();

  return <main className="gp-app">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');
      .gp-app{--bg:#080b09;--panel:#101712;--panel2:#151f18;--line:#26352b;--text:#f3f7f3;--muted:#94a398;--green:#a4f36c;min-height:100vh;background:radial-gradient(ellipse at 80% 0,#a4f36c0d,transparent 30%),var(--bg);color:var(--text);font:14px 'DM Sans',sans-serif}
      .gp-app *{box-sizing:border-box}.gp-app button,.gp-app input{font:inherit}.gp-app button{cursor:pointer}.gp-shell{max-width:1440px;margin:auto;min-height:100vh;display:grid;grid-template-columns:250px minmax(0,1fr)}
      .gp-side{border-right:1px solid #ffffff10;padding:25px 17px;display:flex;flex-direction:column;gap:35px;background:#0a0e0b}.gp-brand{display:flex;align-items:center;gap:10px;padding:0 9px;font:800 18px Manrope;letter-spacing:-1px}.gp-mark{width:36px;height:36px;border-radius:11px;background:var(--green);color:#091009;display:grid;place-items:center;font-weight:900}.gp-brand b{color:var(--green)}.gp-caption{font-size:10px;color:#708075;letter-spacing:1.5px;font-weight:800;padding:0 12px;margin-bottom:8px}.gp-nav{display:grid;gap:5px}.gp-nav button{border:0;background:transparent;color:#91a095;border-radius:10px;padding:12px;display:flex;align-items:center;gap:12px;text-align:left;font-weight:600;font-size:13px}.gp-nav button.active,.gp-nav button:hover{background:#a4f36c13;color:var(--green)}.gp-side-bottom{margin-top:auto}.gp-help{border:1px solid #ffffff12;background:#101712;padding:14px;border-radius:13px}.gp-help b{font-size:12px}.gp-help p{font-size:11px;color:var(--muted);line-height:1.6}.gp-help button{background:none;border:0;color:var(--green);padding:0;font-size:11px;font-weight:800}
      .gp-main{min-width:0}.gp-top{height:76px;border-bottom:1px solid #ffffff10;display:flex;align-items:center;justify-content:space-between;padding:0 38px;gap:20px}.gp-top-left,.gp-top-right{display:flex;align-items:center;gap:15px}.gp-overline{font-size:11px;color:var(--muted)}.gp-top strong{font:700 13px Manrope}.gp-iconbtn{width:37px;height:37px;border-radius:10px;border:1px solid #ffffff15;background:#ffffff05;color:#c3cec5;display:grid;place-items:center}.gp-avatar{width:36px;height:36px;border-radius:50%;background:#a4f36c20;color:var(--green);display:grid;place-items:center;font-weight:800}.gp-content{padding:36px 38px 60px;max-width:1200px;margin:auto}.gp-welcome{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:27px}.gp-kicker{font-size:10px;color:var(--green);font-weight:800;letter-spacing:1.7px}.gp-welcome h1{font:800 clamp(25px,3vw,34px)/1.1 Manrope;letter-spacing:-1.5px;margin:9px 0}.gp-welcome p{color:var(--muted);margin:0;font-size:13px}.gp-demo{border:1px solid #d4a64b4d;background:#d4a64b12;color:#e5c27b;border-radius:99px;padding:7px 11px;font-size:10px;font-weight:800;white-space:nowrap}
      .gp-balance{border:1px solid #a4f36c36;border-radius:19px;padding:25px 27px;background:radial-gradient(ellipse at 85% 0,#a4f36c18,transparent 48%),linear-gradient(130deg,#17251a,#101712 75%);position:relative;overflow:hidden}.gp-balance:after{content:'G';position:absolute;right:30px;top:-52px;font:800 220px Manrope;color:#a4f36c08;pointer-events:none}.gp-balance-top{display:flex;align-items:center;justify-content:space-between;gap:15px;color:#b2c0b5;font-size:12px;position:relative;z-index:1}.gp-balance-amount{font:800 clamp(32px,5vw,46px) Manrope;letter-spacing:-2px;margin:13px 0 19px;position:relative;z-index:1}.gp-balance-foot{display:flex;align-items:center;justify-content:space-between;gap:15px;position:relative;z-index:1}.gp-balance-foot small{color:#9aaa9e;font-size:10px}.gp-actions{display:flex;gap:9px;flex-wrap:wrap}.gp-action{border:1px solid #ffffff24;border-radius:9px;background:#ffffff0a;color:#eaf1eb;padding:10px 13px;display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700}.gp-action:disabled{opacity:.48;cursor:not-allowed}.gp-action.primary{background:var(--green);color:#0b120b;border-color:var(--green)}
      .gp-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.8fr);gap:17px;margin-top:17px}.gp-card{border:1px solid #ffffff12;border-radius:15px;background:linear-gradient(145deg,#111913,#0d120e);padding:20px;min-width:0}.gp-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:19px}.gp-card-head h2{font:700 14px Manrope;margin:0}.gp-card-head span{font-size:10px;color:var(--muted)}.gp-empty{border:1px dashed #ffffff20;border-radius:12px;padding:28px 16px;text-align:center}.gp-empty-icon{width:42px;height:42px;border-radius:13px;background:#a4f36c12;color:var(--green);display:grid;place-items:center;margin:0 auto 12px}.gp-empty b{font-size:12px}.gp-empty p{color:var(--muted);font-size:11px;line-height:1.6;max-width:330px;margin:7px auto 0}.gp-list{display:grid;gap:0}.gp-list-row{display:flex;align-items:center;gap:11px;padding:12px 0;border-top:1px solid #ffffff0c}.gp-list-row:first-child{border-top:0}.gp-list-icon{width:34px;height:34px;border-radius:10px;background:#a4f36c12;color:var(--green);display:grid;place-items:center}.gp-list-row b{font-size:11px;display:block}.gp-list-row small{color:var(--muted);font-size:10px}.gp-list-row em{margin-left:auto;color:#9ca99f;font-size:10px;font-style:normal}
      .gp-notice{position:fixed;bottom:22px;left:50%;transform:translate(-50%,20px);opacity:0;pointer-events:none;z-index:80;background:#1a281d;border:1px solid #a4f36c55;border-radius:12px;padding:13px 17px;color:#e9f4e9;font-size:12px;max-width:min(540px,calc(100% - 30px));box-shadow:0 15px 50px #0009;transition:.2s}.gp-notice.show{opacity:1;transform:translate(-50%,0)}
      .gp-locked{display:flex;gap:12px;align-items:flex-start;border:1px solid #d4a64b3d;background:#d4a64b0b;padding:14px;border-radius:12px;color:#d9c28e}.gp-locked p{font-size:10px;line-height:1.6;margin:4px 0 0;color:#a99c7c}.gp-locked b{font-size:11px}
      .gp-page-title{font:800 25px Manrope;letter-spacing:-1px;margin:4px 0 8px}.gp-page-sub{font-size:12px;color:var(--muted);margin:0 0 22px}.gp-profile{display:grid;grid-template-columns:1fr 1fr;gap:13px}.gp-profile-item{border:1px solid #ffffff12;border-radius:12px;padding:15px}.gp-profile-item small{color:var(--muted);font-size:10px;display:block;margin-bottom:6px}.gp-profile-item b{font-size:12px;word-break:break-word}
      .gp-auth-backdrop{position:fixed;inset:0;z-index:60;background:#000c;display:grid;place-items:center;padding:16px}.gp-auth{width:min(100%,430px);padding:26px;border:1px solid #ffffff20;border-radius:18px;background:#111a13;box-shadow:0 30px 100px #000b;position:relative}.gp-auth-close{position:absolute;right:16px;top:16px;background:none;border:0;color:#aab7ad}.gp-auth h2{font:800 24px Manrope;margin:19px 0 6px}.gp-auth p{color:var(--muted);font-size:12px}.gp-field{display:grid;gap:7px;margin:14px 0}.gp-field label{font-size:11px;color:#c0cbc2;font-weight:700}.gp-field input{width:100%;padding:12px;border-radius:9px;background:#080e0a;border:1px solid #2a3b2e;color:white;outline:none}.gp-field input:focus{border-color:var(--green)}.gp-submit{width:100%;border:0;border-radius:9px;background:var(--green);color:#091109;padding:13px;font-weight:800;margin-top:7px}.gp-submit:disabled{opacity:.6}.gp-auth-switch{background:none;border:0;color:var(--green);font-weight:800}.gp-error{color:#ff9a9a!important}.gp-success{color:#b6f68f!important}
      .gp-mobile-menu{display:none}.gp-mobile-brand{display:none}
      @media(max-width:850px){.gp-shell{grid-template-columns:1fr}.gp-side{position:fixed;z-index:40;inset:0 auto 0 0;width:260px;transform:translateX(-105%);transition:.2s;box-shadow:20px 0 60px #0009}.gp-side.open{transform:translateX(0)}.gp-mobile-menu{display:grid}.gp-mobile-brand{display:block}.gp-top{padding:0 20px}.gp-content{padding:27px 20px 50px}.gp-grid{grid-template-columns:1fr}}
      @media(max-width:560px){.gp-top{height:66px}.gp-overline{display:none}.gp-welcome{align-items:flex-start;flex-direction:column}.gp-balance{padding:20px}.gp-balance-foot{align-items:flex-start;flex-direction:column}.gp-profile{grid-template-columns:1fr}.gp-content{padding:23px 14px 40px}.gp-top-right{gap:8px}}
    `}</style>

    <div className="gp-shell">
      <aside className={sidebarOpen ? "gp-side open" : "gp-side"}>
        <div className="gp-brand"><span className="gp-mark">G</span><span>GRECIA <b>PAY</b></span></div>
        <div><div className="gp-caption">PLATAFORMA</div><nav className="gp-nav">
          <button className={tab === "overview" ? "active" : ""} onClick={() => {setTab("overview");setSidebarOpen(false);}}><LayoutDashboard size={17}/> Visão geral</button>
          <button className={tab === "activity" ? "active" : ""} onClick={() => {setTab("activity");setSidebarOpen(false);}}><Clock3 size={17}/> Movimentações</button>
          <button className={tab === "profile" ? "active" : ""} onClick={() => {setTab("profile");setSidebarOpen(false);}}><UserRound size={17}/> Minha conta</button>
        </nav></div>
        <div className="gp-side-bottom"><div className="gp-help"><b>Precisa de ajuda?</b><p>Consulte as informações sobre o ambiente demonstrativo da GRECIA PAY.</p><button onClick={() => setNotice("Este ambiente é demonstrativo e ainda não movimenta dinheiro real.")}>Central de ajuda ↗</button></div>{user && <button className="gp-nav" style={{width:"100%",marginTop:12}} onClick={logout}><span style={{display:"flex",alignItems:"center",gap:10,padding:10,color:"#94a398"}}><LogOut size={16}/> Sair da conta</span></button>}</div>
      </aside>
      <section className="gp-main">
        <header className="gp-top">
          <div className="gp-top-left"><button className="gp-iconbtn gp-mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Abrir menu"><Menu size={17}/></button><div><div className="gp-overline">ÁREA SEGURA · GRECIA PAY</div><strong className="gp-mobile-brand">GRECIA PAY</strong></div></div>
          <div className="gp-top-right"><span className="gp-overline">{user ? user.email : "Acesso de demonstração"}</span><button className="gp-iconbtn" onClick={() => setNotice("Você não tem notificações novas.")} aria-label="Notificações"><Bell size={16}/></button><div className="gp-avatar">{user ? initials : "G"}</div></div>
        </header>
        <div className="gp-content">
          {tab === "overview" && <>
            <div className="gp-welcome"><div><div className="gp-kicker">PAINEL DO CLIENTE</div><h1>Olá, {user ? displayName : "seja bem-vindo"}.</h1><p>Acompanhe sua conta e consulte os recursos disponíveis.</p></div><span className="gp-demo">● AMBIENTE DEMONSTRATIVO</span></div>
            <section className="gp-balance">
              <div className="gp-balance-top"><span>Saldo disponível</span><button className="gp-iconbtn" onClick={() => setBalanceVisible(!balanceVisible)} aria-label="Mostrar ou ocultar saldo">{balanceVisible ? <Eye size={16}/> : <EyeOff size={16}/>}</button></div>
              <div className="gp-balance-amount">{balanceVisible ? "R$ 0,00" : "••••••"}</div>
              <div className="gp-balance-foot"><small>Saldo real não disponível · nenhuma custódia de recursos</small><div className="gp-actions"><button className="gp-action" disabled onClick={() => unavailable("Depósitos")}><ArrowDownLeft size={15}/> Depositar</button><button className="gp-action primary" disabled onClick={() => unavailable("Saques")}><ArrowUpRight size={15}/> Sacar</button></div></div>
            </section>
            <div className="gp-grid">
              <section className="gp-card"><div className="gp-card-head"><h2>Atividade recente</h2><span>ÚLTIMOS REGISTROS</span></div><div className="gp-empty"><div className="gp-empty-icon"><FileText size={19}/></div><b>Nenhuma movimentação por enquanto</b><p>Quando houver recursos habilitados e operações autorizadas, o histórico será exibido aqui.</p></div></section>
              <section className="gp-card"><div className="gp-card-head"><h2>Conta e segurança</h2><span>STATUS</span></div><div className="gp-list"><div className="gp-list-row"><div className="gp-list-icon"><ShieldCheck size={16}/></div><div><b>Conta de acesso</b><small>{user ? "Sessão autenticada" : "Não conectado"}</small></div><em>{user ? "ATIVA" : "VISITANTE"}</em></div><div className="gp-list-row"><div className="gp-list-icon"><LockKeyhole size={16}/></div><div><b>Movimentação financeira</b><small>Não habilitada</small></div><em>BLOQUEADA</em></div><div className="gp-list-row"><div className="gp-list-icon"><Landmark size={16}/></div><div><b>Instituição parceira</b><small>Ainda não configurada</small></div><em>PENDENTE</em></div></div></section>
            </div>
            <section className="gp-card" style={{marginTop:17}}><div className="gp-locked"><AlertCircle size={19}/><div><b>Depósitos e saques estão desativados</b><p>Esta versão permite conhecer a interface e acessar sua conta, mas não recebe, guarda, transfere nem saca dinheiro. O saldo exibido é zero e não representa fundos reais. Esses recursos só poderão ser habilitados após contratação e integração com instituição financeira ou de pagamento autorizada.</p></div></div></section>
          </>}
          {tab === "activity" && <><div className="gp-kicker">HISTÓRICO DA CONTA</div><h1 className="gp-page-title">Movimentações</h1><p className="gp-page-sub">Consulte o histórico de atividades associadas à sua conta.</p><section className="gp-card"><div className="gp-empty"><div className="gp-empty-icon"><Clock3 size={19}/></div><b>Seu histórico está vazio</b><p>Nenhuma transação foi registrada. A plataforma não está conectada a serviços de depósito ou saque.</p></div></section></>}
          {tab === "profile" && <><div className="gp-kicker">DADOS PESSOAIS</div><h1 className="gp-page-title">Minha conta</h1><p className="gp-page-sub">Informações do seu acesso à GRECIA PAY.</p>{user ? <section className="gp-card"><div className="gp-card-head"><h2>Informações de acesso</h2><span>CONTA</span></div><div className="gp-profile"><div className="gp-profile-item"><small>E-MAIL</small><b>{user.email}</b></div><div className="gp-profile-item"><small>IDENTIFICADOR</small><b>{user.id || "Disponível após autenticação"}</b></div><div className="gp-profile-item"><small>STATUS DA SESSÃO</small><b style={{color:"#a4f36c"}}>Autenticada</b></div><div className="gp-profile-item"><small>CARTEIRA FINANCEIRA</small><b>Não habilitada</b></div></div><button className="gp-action" style={{marginTop:18}} onClick={logout}><LogOut size={15}/> Encerrar sessão</button></section> : <section className="gp-card"><div className="gp-empty"><div className="gp-empty-icon"><UserRound size={19}/></div><b>Entre para acessar sua conta</b><p>Faça login ou crie uma conta para acessar sua área pessoal.</p><button className="gp-submit" style={{maxWidth:190}} onClick={() => {setAuthMode("login");setAuthOpen(true);}}>Entrar na conta</button></div></section>}</>}
          {!user && tab === "overview" && <section className="gp-card" style={{marginTop:17}}><div className="gp-card-head"><h2>Acesse sua conta</h2><span>LOGIN SEGURO</span></div><p className="gp-page-sub">Entre ou crie uma conta para visualizar sua área de cliente.</p><button className="gp-action primary" onClick={() => {setAuthMode("login");setAuthOpen(true);}}>Entrar / Criar conta <ChevronRight size={15}/></button></section>}
        </div>
      </section>
    </div>

    {authOpen && <div className="gp-auth-backdrop" onMouseDown={e => {if(e.target === e.currentTarget)setAuthOpen(false);}}><section className="gp-auth"><button className="gp-auth-close" onClick={() => setAuthOpen(false)} aria-label="Fechar"><X size={19}/></button><div className="gp-brand"><span className="gp-mark">G</span><span>GRECIA <b>PAY</b></span></div><h2>{authMode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}</h2><p>{authMode === "login" ? "Entre para acessar seu painel pessoal." : "Cadastre seus dados para criar seu acesso."}</p><form onSubmit={submitAuth}>
      {authMode === "register" && <div className="gp-field"><label>Nome completo</label><input value={fullName} onChange={e => setFullName(e.target.value)} required autoComplete="name" placeholder="Seu nome"/></div>}
      <div className="gp-field"><label>E-mail</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" placeholder="voce@email.com"/></div>
      <div className="gp-field"><label>Senha</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={authMode === "register" ? 10 : 8} autoComplete={authMode === "login" ? "current-password" : "new-password"} placeholder="Sua senha"/></div>
      {authError && <p className="gp-error">{authError}</p>}{authMessage && <p className="gp-success">{authMessage}</p>}
      <button className="gp-submit" disabled={authBusy}>{authBusy ? "Aguarde..." : authMode === "login" ? "Entrar na GRECIA PAY" : "Criar minha conta"}</button>
    </form><p style={{textAlign:"center",marginTop:18}}> {authMode === "login" ? "Ainda não tem conta?" : "Já possui uma conta?"} <button className="gp-auth-switch" onClick={() => {setAuthMode(authMode === "login" ? "register" : "login");setAuthError("");setAuthMessage("");}}>{authMode === "login" ? "Criar conta" : "Fazer login"}</button></p><p style={{fontSize:10,textAlign:"center"}}>Cadastro de acesso não cria uma conta bancária nem habilita movimentações financeiras.</p></section></div>}
    <div className="gp-notice" role="status" aria-live="polite" style={{opacity: notice ? 1 : undefined}}>{notice}</div>
  </main>;
}

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GRECIA PAY — Carteira digital demonstrativa" },
    { name: "description", content: "Área de cliente GRECIA PAY: painel, acesso seguro e visão demonstrativa de conta. Depósitos e saques desativados." },
    { name: "theme-color", content: "#080b09" }
  ] }),
  component: GreciaPay
});

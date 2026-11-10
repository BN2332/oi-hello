#!/usr/bin/env node
const base = (process.env.API_URL || "http://localhost:3000").replace(/\/$/, "");
const checks = [
  { name: "health", path: "/api/health", method: "GET", valid: (r, d) => r.ok && d.ok === true },
  { name: "sessão", path: "/api/auth/me", method: "GET", valid: (r, d) => r.status === 200 && typeof d.authenticated === "boolean" || r.status === 503 && d.error === "LOGIN_NAO_CONFIGURADO" },
  { name: "login", path: "/api/auth/login", method: "POST", body: {}, valid: (r, d) => r.status === 400 && d.error === "CREDENCIAIS_INVALIDAS" || r.status === 503 && d.error === "LOGIN_NAO_CONFIGURADO" },
  { name: "cadastro", path: "/api/auth/register", method: "POST", body: {}, valid: (r, d) => r.status === 400 && d.error === "DADOS_INVALIDOS" || r.status === 503 && d.error === "LOGIN_NAO_CONFIGURADO" },
  { name: "logout", path: "/api/auth/logout", method: "POST", body: {}, valid: (r, d) => r.ok && d.ok === true },
];
let failed = 0;
for (const check of checks) {
  try {
    const response = await fetch(base + check.path, {
      method: check.method,
      headers: check.body ? { "content-type": "application/json" } : {},
      body: check.body ? JSON.stringify(check.body) : undefined,
      signal: AbortSignal.timeout(15000),
    });
    const type = response.headers.get("content-type") || "(sem content-type)";
    const raw = await response.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = null; }
    const ok = type.toLowerCase().includes("application/json") && data !== null && check.valid(response, data);
    console.log(`${ok ? "OK" : "FALHOU"}  ${check.name.padEnd(26)} HTTP ${response.status}  ${type}`);
    if (!ok) { failed++; if (raw) console.log("       " + raw.replace(/\s+/g, " ").slice(0, 180)); }
  } catch (error) {
    failed++;
    console.log(`FALHOU  ${check.name.padEnd(26)} REDE  ${error.message}`);
  }
}
console.log(`\nResultado: ${checks.length - failed}/${checks.length} verificações passaram. Base: ${base}`);
process.exitCode = failed ? 1 : 0;

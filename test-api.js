#!/usr/bin/env node
const base = (process.env.API_URL || "http://localhost:3000").replace(/\/$/, "");
const checks = [
  { name: "health", path: "/api/health", method: "GET" },
  { name: "sessão", path: "/api/auth/me", method: "GET" },
  { name: "login (validação JSON)", path: "/api/auth/login", method: "POST", body: {} },
  { name: "cadastro (validação JSON)", path: "/api/auth/register", method: "POST", body: {} },
  { name: "logout", path: "/api/auth/logout", method: "POST", body: {} },
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
    const text = await response.text();
    const isJson = type.toLowerCase().includes("application/json");
    let validJson = false;
    if (isJson) { try { JSON.parse(text); validJson = true; } catch {} }
    const ok = isJson && validJson && (check.name === "health" ? response.ok : response.status < 500);
    console.log(`${ok ? "OK" : "FALHOU"}  ${check.name.padEnd(26)} HTTP ${response.status}  ${type}`);
    if (!ok) { failed++; if (text) console.log("       " + text.replace(/\s+/g, " ").slice(0, 180)); }
  } catch (error) {
    failed++;
    console.log(`FALHOU  ${check.name.padEnd(26)} REDE  ${error.message}`);
  }
}
console.log(`\nResultado: ${checks.length - failed}/${checks.length} verificações passaram. Base: ${base}`);
process.exitCode = failed ? 1 : 0;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GreciaDevs from "./routes/index";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemento #root não encontrado no documento.");
}

createRoot(container).render(
  <StrictMode>
    <GreciaDevs />
  </StrictMode>,
);

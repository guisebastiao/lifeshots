import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "@/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Hello World!</h1>
  </StrictMode>,
);

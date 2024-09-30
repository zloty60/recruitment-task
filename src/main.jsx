import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShareArticle from "./ShareArticle.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShareArticle />
  </StrictMode>
);

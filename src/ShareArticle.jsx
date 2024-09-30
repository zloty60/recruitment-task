import { useState } from "react";
import "./App.css";

import useFetchArticle from "./hooks/useFetchArticle";
import useCopyToClipboard from "./hooks/useCopyToClipboard";
import SocialShareLink from "./components/SocialShareLinks";

function ShareArticle() {
  const { link, loading, error } = useFetchArticle();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Share article</h1>
      <div>
        <div className="link-wrapper">
          <span className="link">{link}</span>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => copyToClipboard(link)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="btn"
              disabled={isCopied}
            >
              {isCopied ? "Copied!" : "Copy"}
              {showTooltip && <span className="tooltip">Click to copy</span>}
            </button>
          </div>
        </div>
        <SocialShareLink link={link} />
      </div>
    </div>
  );
}

export default ShareArticle;

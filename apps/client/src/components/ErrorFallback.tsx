import { FallbackProps } from "react-error-boundary";
import React, { CSSProperties } from "react";

export const ErrorFallback: React.ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const sectionStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    margin: 32,
    color: "#333",
  };
  const headerStyle: CSSProperties = {
    fontSize: 24,
    lineHeight: 1,
  };
  const buttonStyle: CSSProperties = {
    margin: "16px 0px",
    maxWidth: 240,
    fontSize: 18,
    padding: "8px 16px",
    backgroundColor: "royalblue",
    border: "1px solid royalblue",
    borderRadius: 8,
    color: "white",
    cursor: "pointer",
    outline: "none",
  };
  const errorMsgStyle: CSSProperties = {
    margin: "8px 0px",
    backgroundColor: "whitesmoke",
    padding: 8,
    fontSize: 14,
  };
  return (
    <section style={sectionStyle}>
      <header style={headerStyle}>An unexpected error occurred</header>
      <button style={buttonStyle} onClick={resetErrorBoundary}>
        Back to homepage
      </button>
      <div style={{ fontSize: 16 }}>Details</div>
      {error.stack ? (
        <pre style={errorMsgStyle}>{error.stack}</pre>
      ) : (
        <pre style={errorMsgStyle}>
          {error.name}: {error.message}
        </pre>
      )}
    </section>
  );
};

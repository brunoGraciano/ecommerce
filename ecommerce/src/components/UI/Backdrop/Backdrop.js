import React from "react";
import "./Backdrop.css";

export default function Backdrop(props) {
  return (
    <div
      className="Backdrop"
      onClick={() => props.closeFullscreen(props.currentImgIndex)}
      style={props.isTransparent ? { opacity: "0" } : null}
    >
      <i className="fas fa-times close-btn" />
    </div>
  );
}

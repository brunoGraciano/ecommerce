import React from "react";
import "./Logo.css";
import smallLogo from "../../../assets/logo-amazon-small.png";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"} className="Logo">
      <img src={smallLogo} alt="Small Amazon Logo" />
    </Link>
  );
}

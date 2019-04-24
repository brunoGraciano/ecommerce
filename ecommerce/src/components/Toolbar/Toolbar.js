import React from "react";
import "./Toolbar.css";
import Logo from "./Logo/Logo";
import Search from "./../../containers/Search/Search";
import Items from "./Items/Items";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

export default function Toolbar() {
  return (
    <div className="Toolbar">
      <div className="Toolbar-main">
        <Logo />
        <Search />
        <Items />
      </div>
      <DropdownMenu />
    </div>
  );
}

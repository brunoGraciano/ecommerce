import React from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

export default function Modal(props) {
  let inputValue = "";
  return (
    <React.Fragment>
      <div className="Modal">
        <h2>Change Image</h2>
        <input
          onChange={e => {
            inputValue = e.target.value;
          }}
          type="text"
          placeholder="Image URL"
        />
        <div className="buttons-wrapper">
          <button id="update" onClick={() => props.closeFullscreen(inputValue)}>
            Update
          </button>
          <button id="cancel" onClick={() => props.closeFullscreen("")}>
            Cancel
          </button>
        </div>
      </div>
      <Backdrop {...props} currentImgIndex="" />
    </React.Fragment>
  );
}

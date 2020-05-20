import React from 'react';
import ReactDOM from "react-dom";

import cssModule from "./index.css";

const Modal = props => {
  const { width = 600, visible } = props;

  if (!visible) {
    return null
  }

  const body = document.getElementsByTagName('body')[0]

  return ReactDOM.createPortal(
    <div className={cssModule.modal}>
      <div className={cssModule.modal_content}>
        {props.children}
      </div>
    </div>,
    body
  )
}

export default Modal;

import React from 'react';
import ReactDOM from "react-dom";

import cssModule from "./index.css";

const Modal = props => {
  const { width = 600, visible, title, onCancel } = props;
  if (!visible) {
    return null
  }

  const body = document.getElementsByTagName('body')[0]

  const modalClick = e => {
    e.stopPropagation();
    if (e.target.className == cssModule.modal){
      onCancel();
    }
  }

  return ReactDOM.createPortal(
    <div className={cssModule.modal} onClick={modalClick}>
      <div className={cssModule.modal_content}>
        <div className={cssModule.modal_content_title} dangerouslySetInnerHTML={{ __html: title }} />
        <div className={cssModule.modal_content_info}>{props.children}</div>
      </div>
    </div>,
    body
  )
}

export default Modal;

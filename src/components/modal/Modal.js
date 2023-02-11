import ModalSass from "./Modal.module.sass";
import React, { useState } from "react";
const Modal = ({ children }) => {

  return (
    <div className={ModalSass.modal}>
        
      <div className={ModalSass.modalChild}>{children}</div>
    </div>
  );
};

export default Modal;

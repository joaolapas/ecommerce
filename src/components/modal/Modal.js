import ModalSass from './Modal.module.sass'
const Modal = ({children}) => {
  

  return (
    
        <div className={ModalSass.modal}>
          <div className={ModalSass.modalEditForm}>
            {children}
          </div>
        </div>
    
  );
};

export default Modal;

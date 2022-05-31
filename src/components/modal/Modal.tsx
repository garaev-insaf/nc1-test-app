import * as React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./ModalContext/ModalContext";


// вызов hanldeModal без аргументов инциирует вызов данной функции со значением по умолчанию
// Данный финт используется для закрытия модального окна

const Modal = () => {
    const modalRoot = document.querySelector('#modal-root');
    let { modalContent, handleModal, modal } = React.useContext(ModalContext); // пользуемся деструктуризацией
    // проверка на активность модального окна
    if (modal && modalRoot !== null) {
        return ReactDOM.createPortal(
            <div
                className="main-modal">
                <div className="modal-content">
                    <button
                        className="exit-button"
                        onClick={() => handleModal()}
                    >
                        закрыть
                    </button>
                    {/* содержимое модального окна */}
                    {modalContent}
                </div>
            </div>,
            // обращаемся к корневому блоку, делая модальное окно глобальным
            // В index.html так же не забываем указать блок с указанным идентификатором
            modalRoot
        );
    } else return null;
};


export default Modal;
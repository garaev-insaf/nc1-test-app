import React from "react";
import { createContext } from "react";
import useModal from "../../customHooks/useModal";
import Modal from "../Modal";

interface IModalProviderProps {
    children: any,
}
// объявляем наш контекст
let ModalContext: any | null;
let { Provider } = (ModalContext = createContext<any | null>(null));

let ModalProvider: React.FC<IModalProviderProps> = ({ children }) => {
    let { modal, handleModal, modalContent } = useModal(); // используем деструктиразию
    return (
        // оборачиваем в provider, чтобы все вложенные компоненты имели доступ к к контектсу
        // можно и без контекста, работать с redux / любой другой state manager, храня значения в нём
        <Provider value={{ modal, handleModal, modalContent }}>
            <Modal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };
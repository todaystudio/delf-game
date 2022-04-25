import React, {createContext, useContext, useState} from "react";

const ModalContext = createContext();
export const useModal = () => {
    return useContext(ModalContext)
}

export const ModalProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    const slideHandler = (direction) => {
        if (direction) setCurrentSlide(prevState => prevState + 1)
        if (!direction) setCurrentSlide(prevState => prevState - 1)
    }

    return (
        <ModalContext.Provider value={{
            showModal,
            currentSlide,
            slideHandler
        }}>
            {children}
        </ModalContext.Provider>
    )
}

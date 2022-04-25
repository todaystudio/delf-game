import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import {db, setModalState, setRegionIncrement, setShowModals} from "../../Api/api";

const AppContext = createContext();
export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppProvider = ({children}) => {
    const [showModal, setShowModal] = useState('')
    const [currentSlide, setCurrentSlide] = useState('')
    const [respondedRegion, setRespondedRegion] = useState(false)
    const [loading, setLoading] = useState(false)

    const checkReasponded = () => {
        if (localStorage.getItem("region") == "true") {
            setRespondedRegion(true)
        }
    }

    useEffect(() => {
        setLoading(true)
        Promise.all([
            checkReasponded(),
            onSnapshot(doc(db, "modal", "state"), (doc) => {
            const data = doc.data()
            setCurrentSlide(data.current)
            setShowModal(data.show)
            }),
        ])
            .then(() => setLoading(false))
    }, [])

    const showSlideHandler = (option, id) => {
        setLoading(true)
        setShowModals(option, id)
            .then(res => setLoading(false))
    }

    const setRegion = (value) => {
        setLoading(true)
        setRegionIncrement(value)
            .then(res => setRespondedRegion(true))
            .then(res => localStorage.setItem("region", "true"))
            .then(res => setLoading(false))
    }

    return (
        <AppContext.Provider value={{
            showModal,
            currentSlide,
            respondedRegion,
            showSlideHandler,
            setRegion,
            loading
        }}>
            {children}
        </AppContext.Provider>
    )
}

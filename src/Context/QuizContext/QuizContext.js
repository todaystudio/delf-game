import React, {createContext, useContext, useEffect, useState} from "react";
import {setQuizAnsw, setRegion} from "../../Api/api";

const QuizContext = createContext();
export const useQuiz = () => {
    return useContext(QuizContext)
}

export const QuizProvider = ({children}) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [answers, setAnswers] = useState({
        role: 'viewer',
        reaction: 2,
        review: '',
    })
    const [showFinal, setShowFinal] = useState(false)
    const [animation, setAnimation] = useState(true)
    const [completedQuiz, setComletedQuiz] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const completeCheck = () => {
        if (localStorage.getItem('quizCompleted') == 'true') {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        Promise.all([completeCheck()])
            .then(res => {
                if (res == 'true') {
                    setComletedQuiz(true)
                    setCurrentStep(4)
                }
            })
    }, [])

    const roleHandler = (answ) => {
        setAnswers({
            ...answers,
            role: answ
        })
    }
    const emojiHandler = (answ) => {
        setAnswers({
            ...answers,
            reaction: answ
        })
    }
    const reviewHandler = (answ) => {
        setAnswers({
            ...answers,
            review: answ
        })
    }


    const completedHandler = async () => {
        if (!completedQuiz) {
            setLoading(true)
            localStorage.setItem('quizCompleted', 'true')
            console.log(answers)
            setQuizAnsw(answers)
                .then(res => localStorage.setItem('docID', res))
                .then(() => {
                    setComletedQuiz(true)
                    setLoading(false)
                    nextStep()
                })
                .catch(e => {
                    setLoading(false)
                    setError(true)
                    console.log(e)
                })
        }
    }

    const nextStep = () => {
        setAnimation(false)
        setTimeout(() => {
            setAnimation(true)
            if (currentStep < 3) {
                setCurrentStep(prevState => prevState + 1)
            } else if (currentStep < 3 + 1) {
                setShowFinal(true)
                setCurrentStep(prevState => prevState + 1)
            }
        }, 500)
    }

    return (
        <QuizContext.Provider value={{
            currentStep: currentStep,
            answers: answers,
            showFinal: showFinal,
            animation, setAnimation,
            completedQuiz,
            loading,
            error,
            roleHandler,
            emojiHandler,
            reviewHandler,
            completedHandler,
            nextStep,
            completeCheck
        }}>
            {children}
        </QuizContext.Provider>
    )
}

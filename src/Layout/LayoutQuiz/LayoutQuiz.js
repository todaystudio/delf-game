import React from 'react'
import './LayoutQuiz.scss'

export const LayoutQuiz = ({ children }) => {
    return (
        <div className="layout-quiz">
            <div className="round round_left"></div>
            <div className="round round_right"></div>
            { children }
        </div>
    )
}
import React from 'react'
import './Layout.scss'

export const Layout = ({ children }) => {
    return (
        <div className="layout">
            { children }
        </div>
    )
}
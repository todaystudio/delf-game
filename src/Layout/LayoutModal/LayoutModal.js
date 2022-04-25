import React from 'react'
import './LayoutModal.scss'

export const LayoutModal = ({children}) => {
    return (
        <div className="layout-modal">
            {children}
        </div>
    )
}
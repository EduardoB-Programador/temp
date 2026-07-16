import { ReactNode } from 'react'
import '../styles/Modal.css'

type props = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: props) {
    if (!isOpen)
        return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} type="button">×</button>
                {children}
            </div>
        </div>
    )
}
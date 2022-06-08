import { useContext, useEffect } from "react"
import ModalContext from "../context/ModalContext"

export function ModalManager() {
    const [{ closeModal, stack }, setContext] = useContext(ModalContext),
        modals = []
    let trapped = false, resume = document.activeElement;

    // close modal
    function close() {
        const newStack = stack
        newStack.pop()
        setContext({ closeModal, stack: newStack })
        
        trapped = false
        resume.focus()
    }

    // traps focus within most recent active modal
    function trapFocus(e) {
        const modalManager = document.getElementsByClassName("modal-manager")[0]
        if (!modalManager.childElementCount) return // if modalmanager is empty, do not trap focus

        const modal = modalManager.firstElementChild,
            focusable = [
                ...modal.querySelectorAll(
                    `a[href]:not([disabled]), 
                button:not([disabled]), 
                textarea:not([disabled]), 
                input:not([disabled]), 
                select:not([disabled]),
                *[tabindex="0"]`
                )
            ],
            focusEnd = focusable.length - 1,
            focusCur = focusable.indexOf(document.activeElement);

        if (!trapped) {
            resume = document.activeElement
            focusable[0].focus()
            trapped = true
        }

        if (e.key === `End` || (e.key === `Tab` && e.shiftKey && !focusCur)) {
            e.preventDefault();
            focusable[focusEnd].focus();
        } else if (
            e.key === `Home` ||
            (e.key === `Tab` && !e.shiftKey && focusCur === focusEnd)
        ) {
            e.preventDefault();
            focusable[0].focus();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            close();
        }
    }

    for (let i = 0; i < stack.length; i++)
        modals.push(<div className="modal-container" style={{ zIndex: i }} key={`modal-level-${i}`}>
            {stack[i]}
            <div className="modal-backdrop" onClick={close} aria-label="close" />
        </div>)


    useEffect(() => {
        window.addEventListener("keydown", trapFocus)
        setContext({ closeModal: close, stack })
        return () => window.removeEventListener("keydown", trapFocus)
    }, [])

    return <div className="modal-manager" aria-hidden={!stack.length}>
        {modals}
    </div>
}

function Modal(props) {
    const [{ closeModal, stack }, setContext] = useContext(ModalContext)

    // activate modal
    function open() {
        const newStack = [...stack, <>{props.children}</>]
        setContext({ closeModal, stack: newStack })
    }

    return <div className="modal-activator" onClick={open}>
        {props.open || props.toggle}
    </div>
}

export default Modal
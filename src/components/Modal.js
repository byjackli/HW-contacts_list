import { useContext, useEffect } from "react"
import ModalContext from "../context/ModalContext"

export function ModalManager() {
    const [context, setContext] = useContext(ModalContext),
        modals = []

    // close modal
    function close() {
        const newStack = context
        newStack.pop()
        setContext(newStack)
    }

    // traps focus within most recent active modal
    function trapFocus(event) {
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
        console.info({ modal, focusable })
        if (event.key === `End` || (event.key === `Tab` && event.shiftKey && !focusCur)) {
            event.preventDefault();
            focusable[focusEnd].focus();
        } else if (
            event.key === `Home` ||
            (event.key === `Tab` && !event.shiftKey && focusCur === focusEnd)
        ) {
            event.preventDefault();
            focusable[0].focus();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            close();
        }
    }

    for (let i = 0; i < context.length; i++)
        modals.push(<div className="modal-container" style={{ zIndex: i }} key={`modal-level-${i}`}>
            {context[i]}
            <div className="modal-backdrop" onClick={close} />
        </div>)


    useEffect(() => {
        window.addEventListener("keydown", trapFocus)
        return () => window.removeEventListener("keydown", trapFocus)
    }, [])

    return <div className="modal-manager" aria-hidden={!context.length}>
        {modals}
    </div>
}

function Modal(props) {
    const [context, setContext] = useContext(ModalContext)

    // activate modal
    function open() {
        const newStack = [...context, <>{props.children}</>]
        setContext(newStack)
    }

    return <div className="modal-activator" onClick={open}>
        {props.open || props.toggle}
    </div>
}

export default Modal
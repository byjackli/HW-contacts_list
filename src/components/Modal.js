import { useContext, useEffect } from 'react';
import ModalContext from '../context/ModalContext';

// 🔨 There are multiple flaws with this component (what is known)
// 1. stack is incorrectly implemented
// 2. closeModal function closes everything
// 3. when modal is opened, first element is not autofocused

export function ModalManager() {
  const [{ stack }, setContext] = useContext(ModalContext);
  const modals = [];
  let trapped = false; let resume = document.activeElement; let
    safe = resume?.closest('.card')?.previousElementSibling;

  // close modal
  function close() {
    const newStack = stack;
    newStack.pop();
    setContext({ closeModal: close, stack: newStack });

    trapped = false;
    if (resume) { resume.focus(); }
    else { safe.focus(); }
  }

  // traps focus within most recent active modal
  function trapFocus(e) {
    const modalManager = document.getElementsByClassName('modal-manager')[0];
    if (!modalManager.childElementCount) { return; } // if modalmanager is empty, do not trap focus

    const modal = modalManager.firstElementChild;
    const focusable = [
      ...modal.querySelectorAll(
        `a[href]:not([disabled]), 
                button:not([disabled]), 
                textarea:not([disabled]), 
                input:not([disabled]), 
                select:not([disabled]),
                *[tabindex="0"]`,
      ),
    ];
    const focusEnd = focusable.length - 1;
    const focusCur = focusable.indexOf(document.activeElement);

    if (!trapped) {
      resume = document.activeElement;
      safe = resume?.closest('.card')?.previousElementSibling;
      focusable[0].focus();
      trapped = true;
    }

    if (e.key === 'End' || (e.key === 'Tab' && e.shiftKey && !focusCur)) {
      e.preventDefault();
      focusable[focusEnd].focus();
    } else if (
      e.key === 'Home'
      || (e.key === 'Tab' && !e.shiftKey && focusCur === focusEnd)
    ) {
      e.preventDefault();
      focusable[0].focus();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  const modalCount = stack.length;
  for (let i = modalCount - 1; i > -1; i--) {
    modals.push(<div className="modal-container" role="dialog" style={{ zIndex: i }} key={`modal-level-${i}`}>
      {stack[i]}
      <div className="modal-backdrop" onClick={close} aria-label="close" />
    </div>);
  }


  useEffect(() => {
    setContext({ closeModal: close, stack });
    window.addEventListener('keydown', trapFocus);
    return () => window.removeEventListener('keydown', trapFocus);
  }, []);

  return (
    <div className="modal-manager" aria-hidden={!stack.length}>
      {modals}
    </div>
  );
}

function Modal(props) {
  const [{ closeModal, stack }, setContext] = useContext(ModalContext);
  useEffect(() => { props.openModal.current = open; }, []);

  // activate modal
  function open() {
    const newStack = [...stack, props.children];
    setContext({ closeModal, stack: newStack });
  }

  return (
    <div className="modal-activator" onClick={open}>
      {props.open || props.toggle}
    </div>
  );
}

export default Modal;

import { useState, useContext, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ModalContext from "../context/ModalContext"
import { del } from "../static/data.ts"

import Icon from "./Icon"
import Modal from "./Modal"

function Card(props) {
    const openModal = useRef(null)

    const navigate = useNavigate(),
        [expanded, updateExpanded] = useState(false),
        [dragOrigin, updateDragOrigin] = useState(undefined),
        [{ closeModal }] = useContext(ModalContext);

    function handleDelete() {
        del(props.id, props?.fixed)
        console.info(closeModal)
        closeModal()
    }
    function handleSwipeRight() {
        openModal.current()
    }
    function handleUpdateExpanded(e, state) {
        if (!e.target.closest(".preventDefault"))
            updateExpanded(state)
    }
    function handleKeyDown(e) {
        if (["Enter", " "].includes(e.key)) updateExpanded(!expanded)
        else if (["Delete", "Backspace"].includes(e.key)) handleSwipeRight()
    }
    function handleDrag(e) {
        const diff = e.clientX - dragOrigin

        if (100 < Math.abs(diff)) {
            if (0 < diff)
                handleSwipeRight()
            else
                navigate(`/edit/${props.id}`)
        }
        updateDragOrigin(undefined)
    }
    useEffect(() => {
        props.expanded && updateExpanded(true)
    }, [])

    const fullname = `${props.firstName}${props.lastName ? ` ${props.lastName}` : ""}`;

    return <div className={`card ${expanded}`} id={props.id} onClick={e => handleUpdateExpanded(e, !expanded)} tabIndex="0" onKeyDown={e => handleKeyDown(e)}
        draggable onDragStart={e => updateDragOrigin(e.clientX)} onDragEnd={e => handleDrag(e)}>
        <div className={`actions ${expanded ? "" : "hidden"}`} aria-hidden={!expanded}>
            <div className="lhs">
                <button onClick={e => handleUpdateExpanded(e, false)}><Icon art="reply" title="collapse" /></button>
            </div>
            <div className="rhs">
                <Modal openModal={openModal} open={<button className="preventDefault"><Icon art="delete_forever" title="delete forever" /></button>
                } >
                    <div className="guard">
                        <div>are you sure you want to delete <strong>{fullname}</strong>?</div>
                        <div className="button-container">
                            <button onClick={closeModal}>nevermind</button>
                            <button onClick={handleDelete}>delete forever</button>
                        </div>
                    </div>
                </Modal>
                <Link to={`/edit/${props.id}`}>
                    <Icon art="edit" title="edit contact" />
                </Link>
            </div>
        </div>
        <div className="content">
            <div className="name">
                <p>{fullname}</p>
                {props.icon ? <Icon {...props.icon} /> : null}
            </div>
            <p>{props.phoneNumber}</p>

            {expanded || props.editing ? <p>{props.emailAddress}</p> : null}
        </div>
    </div>
}

export default Card
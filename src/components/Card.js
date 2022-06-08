import { useState, useContext, useRef } from "react"
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
        del(props.id)
        console.info(closeModal)
        closeModal()
    }
    function handleSwipeRight() {
        openModal.current()
    }
    function handleUpdateExpanded(e, state) {
        if (!e.target.closest(".preventDefault"))
            if (e.type === "keydown" && !["Enter", "Spacebar"].includes(e.key)) return
            else updateExpanded(state)
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

    const fullname = `${props.firstName}${props.lastName ? ` ${props.lastName}` : ""}`;

    return <div className="card" id={props.id} onClick={e => handleUpdateExpanded(e, !expanded)} tabIndex="0" onKeyDown={e => handleUpdateExpanded(e, !expanded)}
        draggable onDragStart={e => updateDragOrigin(e.clientX)} onDragEnd={e => handleDrag(e)}>
        <div className={expanded ? "" : "hidden"} aria-hidden={!expanded}>
            <div className="lhs">
                <button onClick={e => handleUpdateExpanded(e, false)}><Icon art="reply" title="collapse" /></button>
            </div>
            <div className="rhs">
                <Modal openModal={openModal} open={<button className="preventDefault"><Icon art="delete_forever" title="delete forever" /></button>
                } >
                    <div>Are you sure you want to delete <strong>{fullname}</strong> from your contacts?</div>
                    <div>
                        <button onClick={closeModal}>nevermind</button>
                        <button onClick={handleDelete}>delete forever</button>
                    </div>
                </Modal>
                <Link to={`/edit/${props.id}`}>
                    <Icon art="pen" title="edit contact" />
                </Link>
            </div>
        </div>

        <div>
            <p>{fullname}</p>
            {props.icon ? <Icon {...props.icon} /> : null}
        </div>
        <p>{props.phoneNumber}</p>

        {expanded || props.editing ? <p>{props.emailAddress}</p> : null}
    </div>

}

export default Card
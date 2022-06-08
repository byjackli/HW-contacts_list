import { useState } from "react"
import Icon from "./Icon"
import { Link, useNavigate } from "react-router-dom"

function Card(props) {

    const navigate = useNavigate(),
        [expanded, updateExpanded] = useState(false),
        [dragOrigin, updateDragOrigin] = useState(undefined);

    function handleDelete() { }
    function handleUpdateExpanded(e, state) {
        if (!e.target.closest(".preventDefault"))
            updateExpanded(state)
    }
    function handleDrag(e) {
        const diff = e.clientX - dragOrigin

        if (100 < Math.abs(diff)) {
            if (0 < diff)
                handleDelete()
            else
                navigate(`/edit/${props.id}`)
        }
        updateDragOrigin(undefined)
    }

    return <div className="card" id={props.id} onClick={e => handleUpdateExpanded(e, !expanded)}
        draggable onDragStart={e => updateDragOrigin(e.clientX)} onDragEnd={e => handleDrag(e)}>
        {expanded ? <div>
            <div className="lhs">
                <button onClick={e => handleUpdateExpanded(e, false)}><Icon art="reply" title="collapse" /></button>
            </div>
            <div className="rhs">
                <button className="preventDefault"><Icon art="delete_forever" title="delete forever" /></button>
                <Link to={`/edit/${props.id}`}>
                    <Icon art="pen" title="edit contact" />
                </Link>
            </div>
        </div> : null}

        <div>
            <p>{props.firstName}{props.lastName ? ` ${props.lastName}` : null}</p>
            {props.icon ? <Icon {...props.icon} /> : null}
        </div>
        <p>{props.phoneNumber}</p>

        {expanded || props.editing ? <p>{props.emailAddress}</p> : null}
    </div>

}

export default Card
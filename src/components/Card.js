import { useState } from "react"
import Icon from "./Icon"
import { Link } from "react-router-dom"

function Card(props) {

    const [expanded, updateExpanded] = useState(false);
    console.info({ props })

    return <div className="card" id={props.id} onClick={e => updateExpanded(!expanded)}>
        {expanded ? <div>
            <div className="lhs">
                <button onClick={e => updateExpanded(false)}><Icon art="reply" title="collapse" /></button>
            </div>
            <div className="rhs">
                <button><Icon art="delete_forever" title="delete forever" /></button>
                <Link to={`/edit:${props.id}`}>
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
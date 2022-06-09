import { useState } from "react"
import db, { edit } from "../static/data.ts"

import Card from "./Card"

function Editor(props) {

    const
        contact = db[props.id],
        [formData, updateForm] = useState(contact)


    function handleUpdateField(e) {
        const { name, value } = e.target, changes = {}
        changes[name] = value

        const updated = { ...formData, ...changes }
        edit(props.id, updated)
        updateForm(updated)
    }

    return <div className="editor" >
        <form onSubmit={e => e.preventDefault()}>
            <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleUpdateField} />
            <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleUpdateField} />
            <input name="phoneNumber" type="text" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleUpdateField} />
            <input name="emailAddress" type="text" placeholder="Email Address" value={formData.emailAddress} onChange={handleUpdateField} />
        </form >
        <div className="preview">
            <Card id={props.id} expanded {...formData} />
        </div>
    </div>
}

export default Editor
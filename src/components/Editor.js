import { useState } from "react"
import db, { edit } from "../static/data.ts"

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

    return <><form className="editor" onSubmit={e => e.preventDefault()}>
        <input name="firstName" type="text" placeholder="firstName" value={formData.firstName} onChange={handleUpdateField} />
        <input name="lastName" type="text" placeholder="lastName" value={formData.lastName} onChange={handleUpdateField} />
        <input name="phoneNumber" type="text" placeholder="phoneNumber" value={formData.phoneNumber} onChange={handleUpdateField} />
        <input name="emailAddress" type="text" placeholder="emailAddress" value={formData.emailAddress} onChange={handleUpdateField} />
    </form >
        {formData.firstName}
    </>
}

export default Editor
// import { useState } from "react"
// import db, { edit } from "../static/data.ts"

// function Editor(props) {

//     const
//         [firstName, updateFirstName] = useState(db[props.id].firstName),
//         [lastName, updateLastName] = useState(db[props.id].lastName),
//         [phoneNumber, updatePhoneNumber] = useState(db[props.id].phoneNumber),
//         [emailAddress, updateEmailAddress] = useState(db[props.id].emailAddress)

//     return <><form className="editor" onSubmit={e => e.preventDefault()}>
//         <input name="firstName" type="text" placeholder="firstName" value={firstName} onChange={e => updateFirstName(e.target.value)} />
//         <input name="lastName" type="text" placeholder="lastName" value={lastName} onChange={e => updateLastName(e.target.value)} />
//         <input name="phoneNumber" type="text" placeholder="phoneNumber" value={phoneNumber} onChange={e => updatePhoneNumber(e.target.value)} />
//         <input name="emailAddress" type="text" placeholder="emailAddress" value={emailAddress} onChange={e => updateEmailAddress(e.target.value)} />
//     </form >
//         {firstName}
//     </>
// }

// export default Editor

import { useState } from "react"
import db, { edit } from "../static/data.ts"

function Editor(props) {

    const
        contact = db[props.id],
        [formData, updateForm] = useState(contact)


    function handleUpdateField(e) {
        const { name, value } = e.target, updated = {}

        updated[name] = value
        updateForm(formData => ({ ...formData, ...updated }))
        edit(props.id, formData)
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
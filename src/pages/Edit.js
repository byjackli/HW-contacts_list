import React from "react"
import { useParams } from "react-router-dom"
import Editor from "../components/Editor"

function Edit() {
    const { id } = useParams()

    return <main>
        <h1>Editing Contact</h1>
        <Editor id={id} />
    </main>
}

export default Edit
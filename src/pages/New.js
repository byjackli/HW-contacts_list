import React from "react"
import Editor from "../components/Editor"
import { add } from "../static/data.ts"

function New() {

    const id = add()

    return <main>
        <h1>Creating New Contact</h1>
        <Editor id={id} />
    </main>
}

export default New
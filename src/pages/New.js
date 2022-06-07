import React from "react"
import Editor from "../components/Editor"
import { add } from "../static/data.ts"

function New() {

    const id = add()

    return <main>
        <Editor id={id} />
    </main>
}

export default New
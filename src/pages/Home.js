import React from "react"
import db from "../static/data.ts"

import Card from "../components/Card"

function Home() {

    function renderList() {
        const db_arr = Object.entries(db), list = []

        db_arr.forEach(([id, rest]) => list.push(<Card key={id} id={id} {...rest} />))

        return <div className="list-container">{list}</div>
    }

    console.info({ db })

    return <main>
        {renderList()}
    </main>
}

export default Home
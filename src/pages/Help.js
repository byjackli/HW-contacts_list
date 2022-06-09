import React from "react"
import Icon from "../components/Icon"
import Card from "../components/Card"
import { fixed } from "../static/data.ts"


function Help() {
    function reset() {
        window.location.reload()
    }

    function renderDemo() {
        const data = fixed.demo
        return <div className="demo-container">{data
            ? <Card id="demo" expanded fixed {...data} />
            : <div className="card true empty"><p>?</p></div>}
            <button className="reset" onClick={reset}>reset</button>
        </div>
    }

    return <main>
        <h1>help</h1>
        <div className="help">
            <div className="section-container">
                <section>
                    <h2>What do the icons on the top of the contact card mean?</h2>
                    <ul>
                        <li>
                            <Icon art="edit" title="" />
                            <span>edit contact</span>
                        </li>
                        <li>
                            <Icon art="delete_forever" title="" />
                            <span>delete contact</span>
                        </li>
                        <li>
                            <Icon art="reply" title="" />
                            <span>collapse card</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>What does the icon at the end of a person's name mean?</h2>
                    <ul>
                        <li>
                            <Icon art="eco" title="" />
                            <span>new contact (3days)</span>
                        </li>
                        <li>
                            <Icon art="emergency" title="" />
                            <span>emergency contact</span>
                        </li>
                        <li>
                            <Icon art="star" title="" />
                            <span>starred contact</span>
                        </li>
                        <li>
                            <Icon art="store" title="" />
                            <span>verified business</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>Contact card shortcuts</h2>
                    <ul>
                        <li>
                            <Icon art="swipe_left" title="" />
                            <span>swipe left to edit</span>
                        </li>
                        <li>
                            <Icon art="swipe_right" title="" />
                            <span>swipe right to delete</span>
                        </li>
                        <li>
                            <Icon art="swipe_down" title="" />
                            <span>drag down to refresh</span>
                        </li>
                        <li>
                            <Icon art="touch_app" title="" />
                            <span>tap to expand/collapse</span>
                        </li>
                    </ul>
                </section>
            </div>
            {renderDemo()}
        </div>
    </main>
}

export default Help
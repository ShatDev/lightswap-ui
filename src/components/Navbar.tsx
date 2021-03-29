import React from "react"
import {Link} from "react-router-dom"
import ConnectButton from "./ConnectButton"

export default function Navbar(): JSX.Element {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    ezswap
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">Swap</Link>
                        </li>
                    </ul>
                    <ul className={"navbar-nav ml-auto"}>
                        <li className="nav-item">
                            <ConnectButton />
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
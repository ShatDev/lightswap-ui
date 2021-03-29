import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import Switch from "react-bootstrap/Switch"
import Swap from "./pages/Swap"
import Navbar from "./components/Navbar"
import "./assets/sass/styles.scss"
import {useWeb3React} from "@web3-react/core"
import Guest from "./pages/Guest"

export default function App(): JSX.Element {
    const web3React = useWeb3React()

    return (
        <>
            {!web3React.active ? (
                <Guest />
            ) : (
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path={"/"}>
                            <Swap />
                        </Route>
                    </Switch>
                </BrowserRouter>
            )}
        </>
    )
}
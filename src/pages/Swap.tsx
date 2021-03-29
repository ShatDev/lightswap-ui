import {Percent, Token} from "@uniswap/sdk"
import React, {useEffect, useState} from "react"
import {BigNumber, Contract} from "ethers"
import Config from "../config"
import erc20Interface from "../abis/ERC20.json"
import {useWeb3React} from "@web3-react/core"

export default function Swap(): JSX.Element {
    const web3React = useWeb3React()

    const signer = web3React.library ? web3React.library.getSigner(web3React.account).connectUnchecked() : null
    console.log("web3React.account")
    console.log(web3React.account)

    // Input token state
    const [inputToken, setInputToken] = useState<Token | null>(null)
    const [inputTokenAddress, setInputTokenAddress] = useState("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")
    const [inputTokenAmount, setInputTokenAmount] = useState<BigNumber>(BigNumber.from("0"))

    // Output token state
    const [outputToken, setOutputToken] = useState<Token | null>(null)
    const [outputTokenAddress, setOutputTokenAddress] = useState("0xdac17f958d2ee523a2206206994597c13d831ec7")
    const [outputTokenAmount, setOutputTokenAmount] = useState<BigNumber>(BigNumber.from("0"))

    // Transaction settings
    const [slippageTolerance, setSlippageTolerance] = useState<Percent | null>(null)
    const [deadlineInMinutes, setDeadlineInMinutes] = useState<number>(20)

    // Set input token
    useEffect(() => {
        (async () => {
            if (inputTokenAddress.length > 0) {
                const token = new Contract(inputTokenAddress, erc20Interface.abi, signer)

                setInputToken(new Token(Config.chainId, inputTokenAddress, await token.decimals(), await token.symbol(), await token.name()))
            }
        })()
    }, [inputTokenAddress])

    // Set output token
    useEffect(() => {
        (async () => {
            if (outputTokenAddress.length > 0) {
                const token = new Contract(outputTokenAddress, erc20Interface.abi, signer)

                setOutputToken(new Token(Config.chainId, outputTokenAddress, await token.decimals(), await token.symbol(), await token.name()))
            }
        })()
    }, [outputTokenAddress])

    useEffect(() => {
        // TODO: Calculate min. output token amount
    }, [inputTokenAmount])

    // Methods
    const swap = async () => {
        // TODO: Implement swap functionality
    }

    return (
        <>
            <div className="py-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                            <div className="card">
                                <div className="card-header">
                                    Swap
                                </div>
                                <div className="list-group list-group-flush">
                                    <div className="list-group-item bg-light">
                                        <p><strong>Method</strong></p>
                                        <select name="" id="" className="form-control">
                                            <option value="swapExactTokensForTokens">swapExactTokensForTokens</option>
                                        </select>
                                    </div>
                                    <div className="list-group-item bg-light">
                                        <p><strong>From</strong></p>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="inputTokenAmount">Amount</label>
                                                    <div className="controls">
                                                        <input type="text" id={"inputTokenAmount"} onChange={(e) => setInputTokenAmount(BigNumber.from(e.target.value))} value={inputTokenAmount.toString()} placeholder={"0.0"} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="inputTokenAddress">Address</label>
                                                    <div className="controls">
                                                        <div className="input-group">
                                                            <input type="text"
                                                                onChange={(e) => setInputTokenAddress(e.target.value)}
                                                                value={inputTokenAddress}
                                                                id={"inputTokenAddress"}
                                                                placeholder="Token address"
                                                                aria-label="Token address"
                                                                aria-describedby="inputTokenAddon"
                                                                className="form-control" />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text" id="inputTokenAddon">{inputToken?.symbol ? inputToken?.symbol : "..."}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item bg-light">
                                        <p><strong>To</strong></p>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="to">Amount</label>
                                                    <div className="controls">
                                                        <input type="text" onChange={(e) => setOutputTokenAmount(BigNumber.from(e.target.value))} value={outputTokenAmount.toString()} placeholder={"0.0"} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="form-group">
                                                    <label htmlFor="outputTokenAddress">Address</label>
                                                    <div className="controls">
                                                        <div className="input-group">
                                                            <input type="text"
                                                                onChange={(e) => setOutputTokenAddress(e.target.value)}
                                                                value={outputTokenAddress}
                                                                id={"outputTokenAddress"}
                                                                placeholder="Token address"
                                                                aria-label="Token address"
                                                                aria-describedby="outputTokenAddon"
                                                                className="form-control" />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text" id="outputTokenAddon">{outputToken?.symbol ? outputToken?.symbol : "..."}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item bg-light">
                                        <p><strong>Transaction Settings</strong></p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="slippage">Slippage Tolerance</label>
                                                    <div className="controls">
                                                        <div className="input-group mb-3">
                                                            <input type="text"
                                                                onChange={(e) => setSlippageTolerance(new Percent(e.target.value, "100"))}
                                                                value={slippageTolerance ? slippageTolerance.toFixed(4) : "0.5"}
                                                                placeholder="0.5"
                                                                aria-label="0.5"
                                                                aria-describedby="slippageToleranceAddon"
                                                                className="form-control" />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text" id="slippageToleranceAddon">%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="slippage">Deadline</label>
                                                    <div className="controls">
                                                        <div className="input-group mb-3">
                                                            <input type="text"
                                                                onChange={(e) => setDeadlineInMinutes(Number(e.target.value))}
                                                                value={deadlineInMinutes}
                                                                placeholder="20"
                                                                aria-label="20"
                                                                aria-describedby="deadlineAddon"
                                                                className="form-control" />
                                                            <div className="input-group-append">
                                                                <span className="input-group-text" id="deadlineAddon">minutes</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group-item">
                                        <button type={"button"} onClick={swap} className="btn btn-success btn-block btn-lg">
                                            Swap
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
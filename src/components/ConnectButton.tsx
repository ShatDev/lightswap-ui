import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useWeb3React } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"
import MetaMaskOnboarding from "@metamask/onboarding"
import { UserRejectedRequestError } from "@web3-react/injected-connector"
import { injected } from "../connectors"

export default function ConnectButton(): JSX.Element {
    const { active, error, activate, library, chainId, account, setError } = useWeb3React<Web3Provider>()

    const onboarding = useRef<MetaMaskOnboarding>()
    useLayoutEffect(() => {
        onboarding.current = new MetaMaskOnboarding()
    }, [])

    // States
    const [ensName, setEnsName] = useState<string>("")
    const [isConnecting, setIsConnecting] = useState(false)
    const [connectButtonLabel, setConnectButtonLabel] = useState("Connect")

    // Functions
    const connect = (): void => {
        setIsConnecting(true)

        activate(injected, undefined, true).catch((activationError: any) => {
            // ignore the error if it's a user rejected request
            if (activationError instanceof UserRejectedRequestError) {
                setIsConnecting(false)
            } else {
                setError(activationError)
            }
        })
    }

    // Effect
    useEffect(() => {
        if (active || error) {
            setIsConnecting(false)
            onboarding.current?.stopOnboarding()
        }
    }, [active, error])

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (library && account) {
            let stale = false

            library
                .lookupAddress(account)
                .then((name: string) => {
                    if (!stale) {
                        setEnsName(name)
                    }
                })
                .catch(() => {}) // eslint-disable-line @typescript-eslint/no-empty-function

            return (): void => {
                stale = true
                setEnsName("")
            }
        }
    }, [library, account, chainId])

    useEffect(() => {
        if (isConnecting) {
            setConnectButtonLabel("Connecting...")
        } else if (ensName) {
            setConnectButtonLabel(ensName)
        } else if (account) {
            setConnectButtonLabel(`${account.slice(0, 6)}...${account.slice(-4)}`)
        } else {
            setConnectButtonLabel("Connect")
        }
    }, [ensName, account, isConnecting])

    if (MetaMaskOnboarding.isMetaMaskInstalled() || (window as any)?.ethereum || (window as any)?.web3) {
        return (
            <button
                type={"button"}
                onClick={() => {
                    if (!active) {
                        connect()
                    }
                }}
                className={"btn btn-dark"}
            >
                {connectButtonLabel}
            </button>
        )
    }

    return <button onClick={() => onboarding.current?.startOnboarding()}>Install Metamask</button>
}

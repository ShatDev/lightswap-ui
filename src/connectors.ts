import { InjectedConnector } from "@web3-react/injected-connector"
import { NetworkConnector } from "@web3-react/network-connector"
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"
import Config from "./config"

export function getNetwork(defaultChainId = 1): NetworkConnector {
    return new NetworkConnector({
        urls: Config.supportedChainIds.reduce(
            (urls, chainId: number) =>
                Object.assign(urls, {
                    [chainId]: `https://${Config.infura.getPrefix(chainId)}.infura.io/v3/${
                        process.env.INFURA_PROJECT_ID
                    }`,
                }),
            {}
        ),
        defaultChainId,
    })
}

// Injected / Metamask
export const injected = new InjectedConnector({ supportedChainIds: Config.supportedChainIds })

// WalletConnect
export const walletConnect = new WalletConnectConnector({
    rpc: {
        1: `https://${Config.infura.prefix}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    },
    bridge: "https://bridge.walletconnect.org",
})

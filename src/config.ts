const Config = {
    chainId: 1,
    supportedChainIds: [1, 3, 4, 5, 42],
    infura: {
        prefix: "kovan",
        getPrefix: (networkId: number): string => {
            switch (networkId) {
            case 1:
                return "mainnet"

            case 3:
                return "ropsten"

            case 4:
                return "rinkeby"

            case 5:
                return "goerli"

            case 42:
                return "kovan"

            default:
                return "kovan"
            }
        },
    },
}

export default Config

import {utils} from "ethers"

export default class Helpers {
	static checksumAddress = (ethereumAddress: string): string => utils.getAddress(ethereumAddress)
}
import { useWeb3Contract } from "react-moralis"

// Have a function to enter the lottery.
const { runContractFunction: enterLottery } = useWeb3Contract()

export default function LotteryEntrance() {
    return <div>Inside LotteryEntrance</div>
}

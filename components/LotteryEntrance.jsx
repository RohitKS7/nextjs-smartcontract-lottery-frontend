import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "@web3uikit/core"

export default function LotteryEntrance() {
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis() // with moralis we get chainId in Hex version which we can change into normal reading number by "parseInt(chainIdHex)"
    const chainId = parseInt(chainIdHex)

    // IF chainId exists then return it with the 0th index address else null
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // useNotification is a hook to handle notifications. It gives us thing known as "dispatch" which is popup on screen
    const dispatch = useNotification()

    // NOTE Have a function to enter the lottery.
    //  runContractFunction = can do both send transactions and read state
    const {
        runContractFunction: enterLottery,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentwinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentwinner",
        params: {},
    })

    async function updateUIValues() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentwinner()).toString()
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Entered Lottery Successfully",
            title: "Transaction Notification",
            position: "topR",
            // icon: Bell,
        })
    }

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUIValues()
    }

    return (
        <div className="p-5">
            <h1 className="py-4 font-bold text-3xl">Lottery</h1>
            {lotteryAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterLottery({
                                // params:
                                // throwOnError:
                                // onComplete:
                                onSuccess: handleSuccess,
                                onError: (error) => {
                                    console.log(error)
                                },
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Lottery</div>
                        )}
                    </button>
                    <div className="my-4 border-b-2 border-solid border-orange-500">
                        EntranceFee is: {ethers.utils.formatUnits(entranceFee, "ether")} ETH.
                    </div>

                    <div className="my-4 border-b-2 border-solid border-orange-500">
                        {" "}
                        Number of Players: {numPlayers}
                    </div>
                    <div className="my-4 border-b-2 border-solid border-orange-500 ">
                        {" "}
                        RecentWinner: {recentWinner}
                    </div>
                </div>
            ) : (
                <div>Change To Localhost To Play Lottery!</div>
            )}
        </div>
    )
}

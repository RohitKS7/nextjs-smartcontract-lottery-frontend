// NOTE :=> The Techinque shown in this page is Lengthly but Must know one and Great way to understand the internal function. Also there's a Fast method we've discussed in Header.jsx page

import { useMoralis } from "react-moralis"
import { useEffect } from "react"

// NOTES //
// 1. enableWeb3() = (from moralis) Trigger the metamask connect.
// 2. account = Wallet Address.
// 3. isWeb3Enabled() = (from moralis) Checking if any account is live or not
// 4. Moralis = (from moralis) To check if account has changed or disconnected
// 5 deactivateWeb3 = (from moralis) This will make "isWeb3Enabled()" false.
// 6. isWeb3EnableLoading = (from moralis) If "isWeb3Enabled()" is loading then we'll disable the connect btn

export default function ManualHeader() {
    // useMoralis == useState
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()

    // SECTION this useEffect is used to see if we are already connected to this site or not on every load/refresh
    useEffect(() => {
        if (isWeb3Enabled) return
        //  to see with which account we are connected. The thing is if we don't check these then whenever we're gonna change the account it will trigger metamask to popup for connecting. So, we this check it knows why which account we are connected in previous session.
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("Connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])

    // SECTION this useEffect is used to see if we are already disconnected to this site or not on every load/refresh
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account Changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("injected")
                deactivateWeb3()
                console.log("NO accounts found")
            }
        })
    }, [])

    return (
        <div>
            {/* and with just that we can click connect button and connect to our Metamask Wallet */}
            {/* NOTE If there's a account show "connected" and if not then show "Connect Wallet"  */}
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()

                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("Connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect Wallet
                </button>
            )}
        </div>
    )
}

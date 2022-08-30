// USing "web3uikit" components to make connect wallet method Fast and EAsily
import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <>
            <h1>Decentralized Lottery</h1>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </>
    )
}

// USing "web3uikit" components to make connect wallet method Fast and EAsily
import { ConnectButton } from "@web3uikit/web3"

export default function Header() {
    return (
        <div className="p-5 border-b-2 flex lg:flex-row sm:flex-col ">
            <h1 className=" py-4 px-4 font-blog text-orange-600 text-3xl">
                Decentralized Lottery
            </h1>
            <div className="ml-auto py-2 px-2">
                <ConnectButton moralisAuth={false} />
            </div>
        </div>
    )
}

import { useMoralis } from "react-moralis"

export default function ManualHeader() {
    // useMoralis == useState
    const { enableWeb3 } = useMoralis()
    return <div>HI, From Header</div>
}

import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"

function MyApp({ Component, pageProps }) {
    // NOTE // In order to use moralis we're gonna wrap MoralisProvider around our entire app.
    return (
        // "initializeOnMount" let us hook into the moralis server for extra functionality
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    )
}

export default MyApp

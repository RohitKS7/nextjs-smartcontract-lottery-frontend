import styles from "../styles/Home.module.css"
import Head from "next/head"
// import ManualHeader from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Decentralized Lottery App</title>
                <meta
                    name="description"
                    content="A Decentralized App to get Crypto by playing Lottery Games"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <ManualHeader /> */}
            <Header />
            <LotteryEntrance />
        </div>
    )
}

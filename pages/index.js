import Head from "next/head";
import Header from "../components/Header";
import Mint from "../components/Mint";
import "animate.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Creator Multiverse Design Hackathon</title>
        <meta name="description" content="Creator Multiverse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Mint />
      </div>
    </div>
  );
}

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite , useSigner, useNetwork } from "wagmi";
const mintAbi = require("../contract/abi.json");
import Connect from "./Connect";

export default function Mint() {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const { chain } = useNetwork();
  const contractAddr = "0x461d078AdcA44bE56c67A27aE3A7AB9F500fb4C8";

  const { config } = usePrepareContractWrite({
    address: contractAddr,
    abi: mintAbi,
    functionName: 'safeMint',
    args: [address],
  })
  
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  return (
    <div className=" bg-[#1A0E35]  ">
      <div className="m-auto">
        <h1 className="text-center text-2xl my-8  uppercase tracking-wider text-[#7758F2] animate__animated animate__bounce">
          Creator Multiverse Design Hackathon
        </h1>
        <h2 className="text-center text-2xl my-8">Sign into the app with your wallet, and mint a copy of the competition NFT to join the discord</h2>
        <div className="flex justify-center">
          <div>
            <div className="animate__animated animate__rubberBand">
              {" "}
              <Image
                src="/invite-one.jpg"
                alt="art"
                width={300}
                height={300}
                className="rounded-xl"
              />
            </div>
            <div className="flex justify-center mt-8 mb-16">
              {isConnected ? (
                <div>
                <button 
                disabled={!write} onClick={() => write?.()}>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-full py-4 mt-4 text-white bg-gray-400 border border-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
                  >
                    <span className="mx-4 text-xl tracking-widest uppercase">
                      {" "}
                      Mint
                    </span>
                  </motion.button> 
                </button>
                {isLoading && <div
                className="flex justify-center mt-8 mb-16">Check Wallet</div>}
                {isSuccess && <div>Please take this trasaction hash to Etherscan: {JSON.stringify(data)}</div>}
              </div>
              ) : (
                <Connect />
              )}
            </div>
            <div className="-mt-6">
              <h1 className="text-sm font-light text-center">
                {chain && "On " + chain.name + " Network"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

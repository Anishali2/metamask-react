import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Button, Form } from "react-bootstrap";
function Home() {
  const contractAddress = "0xd0256B93a14633eB4479661DB7366f4039DABB50";
  const ownerAddress = "0xC398Bc9182bF56fB709d5983bbF8303BdcfE058C";

  const [transferAmount, setTransferAmount] = useState("");
  const [transferAddress, setTransferAddress] = useState("");

  const [mintAddress, setMintAddress] = useState("");
  const [mintAmount, setMintAmount] = useState("");

  const [tokenAmount, setTokenAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");

  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [signer, setSigner] = useState({});

  const abi = require("../SolTokenAbi.json");
  const [hash, setHash] = useState({});
  const [change, setChange] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const sign = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    abi,
    provider ? sign : provider
  );

  // const factory = ethers.Contract({});
  const connectWallet = async () => {
    setLoading(true);
    await provider
      .send("eth_requestAccounts", [])
      .then((res) => {
        setLoading(false);
        alert("Connected");
      })
      .catch((err) => {
        setLoading(false);
        alert("Please connect to Metamask");
      });
    const signer = provider.getSigner();
    setSigner(signer);
    const loginUserAddress = await signer.getAddress();
    setUserAddress(loginUserAddress);
    setLoading(false);
    setChange(!change);
  };

  const [isLoading, setLoading] = useState(false);

  const getBalance = async () => {
    const balance = await contract.balanceOf(userAddress);
    const remainingBalance = ethers.utils.formatEther(balance);
    setUserBalance(remainingBalance);
  };

  useEffect(() => {
    getBalance();
  }, [change]);

  const transfer = async () => {
    await contract.transfer(
      transferAddress,
      ethers.utils.parseEther(transferAmount)
    );
    setChange(!change);
  };

  const burn = async () => {
    if (ownerAddress == userAddress) {
      await contract.burn(ethers.utils.parseEther(burnAmount));
      setChange(!change);
    } else {
      alert("User is not an owner");
    }
  };
  const mint = async () => {
    if (ownerAddress == userAddress) {
      await contract.mint(mintAddress, ethers.utils.parseEther(mintAmount));
      setChange(!change);
    } else {
      alert("User is not an owner");
    }
  };
  const buyToken = async () => {
    console.log(
      "Checking Console.",
      (100000000000000 * Number(tokenAmount)).toString()
    );
    await contract.buyToken(tokenAmount, {
      value: (100000000000000 * Number(tokenAmount)).toString(),
    });
    setChange(!change);
  };
  const ownerOnly = async () => {
    if (ownerAddress == userAddress) {
      await contract.withdraw();
      setChange(!change);
    } else {
      alert("User is not an owner");
    }
  };
  // console.log("Check if Usconnected", ethereum.isConnected());
  return (
    <>
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? connectWallet : null}
      >
        {isLoading ? "Loading…" : "Connect Wallet"}
      </Button>
      <div className="text-center w-2/4 mx-auto border  shadow  transition  border-slate-800 rounded-lg h-26 justify-center self-center pt-3">
        {userAddress ? (
          <p className="flex ml-5">
            User Address :{" "}
            <span className=" bg-[#0d6efd] text-white border rounded-md p-1">
              {userAddress}
            </span>
            <p
              className="border border-slate-800 bg-slate-600 rounded-md m-1 p-1 text-white cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(userAddress);
                alert("Text Copied");
              }}
            >
              Copy
            </p>
          </p>
        ) : null}
        {userBalance ? (
          <p className="mb-4">
            User Balance : {userBalance} KPOP{" "}
            {userAddress == ownerAddress ? "(Owner)" : null}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-center w-4/5">
        <Form.Group className="mb-3 flex" controlId="formBasicEmail">
          <Form.Label>Transfer Address</Form.Label>
          <Form.Control
            onChange={(e) => setTransferAddress(e.target.value)}
            type="text"
            style={{ width: "100%" }}
            placeholder="to"
          />
        </Form.Group>

        <Form.Group className="mb-3 flex" controlId="formBasicPassword">
          <Form.Label>Transfer Amount</Form.Label>
          <Form.Control
            onChange={(e) => setTransferAmount(e.target.value)}
            type="text"
            placeholder="Amount"
          />
        </Form.Group>

        <Button variant="primary" className=" h-12" onClick={() => transfer()}>
          Transfer
        </Button>
      </div>

      <div className="mt-5 flex items-center justify-center w-4/5">
        <Form.Group className="mb-3 flex" controlId="formBasicEmail">
          <Form.Label>Mint Address</Form.Label>
          <Form.Control
            onChange={(e) => setMintAddress(e.target.value)}
            type="text"
            style={{ width: "100%" }}
            placeholder="to"
          />
        </Form.Group>

        <Form.Group className="mb-3 flex" controlId="formBasicPassword">
          <Form.Label>Mint Amount</Form.Label>
          <Form.Control
            onChange={(e) => setMintAmount(e.target.value)}
            type="text"
            placeholder="Amount"
          />
        </Form.Group>

        <Button variant="primary" className=" h-12" onClick={() => mint()}>
          Mint
        </Button>
      </div>
      <div className="mt-5 flex items-center justify-center w-4/5">
        <Form.Group className="mb-3 flex" controlId="formBasicPassword">
          <Form.Label>Burn Amount</Form.Label>
          <Form.Control
            onChange={(e) => setBurnAmount(e.target.value)}
            type="text"
            placeholder="Amount"
          />
        </Form.Group>

        <Button variant="primary" className=" h-12" onClick={() => burn()}>
          Burn
        </Button>
      </div>

      <div className="mt-5 flex items-center justify-center w-4/5">
        <Form.Group className="mb-3 flex" controlId="formBasicPassword">
          <Form.Label>Buy Token </Form.Label>
          <Form.Control
            onChange={(e) => setTokenAmount(e.target.value)}
            type="text"
            placeholder="Amount"
          />
        </Form.Group>

        <Button variant="primary" className=" h-12" onClick={() => buyToken()}>
          Buy Token
        </Button>
      </div>

      <Button variant="primary" className=" h-12" onClick={() => ownerOnly()}>
        Withdraw
      </Button>

      <div class="grid md:grid-cols-2">
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-900 rounded-md">
          <label
            for="street-address"
            class="block text-sm font-medium text-gray-700"
          >
            Street address
          </label>
          <input
            type="text"
            name="street-address"
            id="street-address"
            autocomplete="street-address"
            className="mt-1 block w-full rounded-md border  active:border-blue-600 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-1"
          />
        </div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
        <div className=" h-44 w-4/5 my-3 mx-auto border border-gray-700 rounded-md"></div>
      </div>
    </>
  );
}

export default Home;

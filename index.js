const axios = require("axios");
require("dotenv").config();
// copy-paste your URL provided in your Alchemy.com dashboard
const { ALCHEMY_URL_TEST } = process.env;
const ALCHEMY_URL = ALCHEMY_URL_TEST;

const getBlockByNumber = async () => {
  try {
    const response = await axios.post(ALCHEMY_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: [
        "latest",
        false, // retrieve the full transaction object in transactions array
      ],
    });
    console.log(response.data.result);
  } catch (e) {
    console.log(e);
  }
};

const getBlockByHash = async () => {
  try {
    const response = await axios.post(ALCHEMY_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByHash",
      params: [
        "0x8069af43792ebc22df35463f9254b08ee6e400559ca3a68e45de3eaaaf1d9cc9",
        false,
      ],
    });
    console.log(response.data.result);
  } catch (e) {
    console.log(e);
  }
};

// this addresses I took from foundry Anvil local node
const addressesTest = [
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
  "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
  "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
  "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
  "0x976ea74026e726554db657fa54763abd0c3a0aa9",
  "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
  "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
  "0xa0ee7a142d267c1f36714e4a8f75612f20a79720",
];

// return the total balance of all the addresses.This is the challenge from AU week 3
const getTotalBalance = async (addresses) => {
  const querys = [];

  addresses.map((address, index) => {
    querys.push({
      jsonrpc: "2.0",
      id: index,
      method: "eth_getBalance",
      params: [address, "latest"],
    });
  });

  // doing many request to the node and save the response
  const responses = await axios.post(ALCHEMY_URL, querys);

  let totalBalance = 0;

  responses.data.map((res) => {
    const hexToInteger = parseInt(res.result);
    totalBalance = totalBalance + hexToInteger;
  });
  console.log(totalBalance);
  return totalBalance;
};

// getTotalBalance(addressesTest);

// getBlockByHash();
// getBlockByNumber();

const axios = require("axios");

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL =
  "https://eth-goerli.g.alchemy.com/v2/2H449vdDoKdwLJxsEGpmgY9f3GO-Ks6I";

const getBlockByNumber = async () => {
  try {
    const response = await axios.post(ALCHEMY_URL, {
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBlockByNumber",
      params: [
        "pending",
        false, // retrieve the full transaction object in transactions array
      ],
    });
    console.log(response.data.result);
  } catch (e) {
    console.log(e);
  }
};

getBlockByNumber();

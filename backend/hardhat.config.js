require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log("🔎 SEPOLIA_RPC_URL:", SEPOLIA_RPC_URL);
console.log("🔑 PRIVATE_KEY starts with:", PRIVATE_KEY?.slice(0, 6));

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Hardhat local blockchain
    },
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache local blockchain
      accounts: [
        "0x5fac048819bec52753b8343cae4343f7c0a3071790a19dbf8a3def4501f5a70c" // paste key from Ganache GUI here
      ]
    }
  }
};
    /* Optional: Sepolia Testnet (if you want to deploy live later)
    sepolia: {
      url: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
      accounts: [
        "0xYOUR_METAMASK_PRIVATE_KEY" // ⚠️ testnet key only, never mainnet
      ]
    }
  }
};*/

//"0x5fac048819bec52753b8343cae4343f7c0a3071790a19dbf8a3def4501f5a70c"
//CitizenData deployed to: 0xB030b518D91A1eB8Bad4b06126A1415e152cE641
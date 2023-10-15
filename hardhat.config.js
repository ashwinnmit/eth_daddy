require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork : "hardhat",
  chainId : 31337,
  networks : {
    ganache : {
      url : "http://127.0.0.1:7545",
      accounts : [
        "0xd088edb5bc5621309f300fb87e38405d5134bcb938a3b29c1cf219084b3065a6",
        "0x4988e332a914f905327948ab1fddc1ddba29232268c1d642eef2b6c5dbf18c67"
      ],
      chainId : 1337
    }
  },
  solidity: "0.8.17",
};

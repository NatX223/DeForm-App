require("@nomicfoundation/hardhat-toolbox");
import { PRIVATE_KEY } from "./credentials.mjs";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/x66ngpknfweaoFrjMzdrIio3F3-YqUDV",
      accounts: [PRIVATE_KEY]
    }
  }
};

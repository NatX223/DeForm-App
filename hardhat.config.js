require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/x66ngpknfweaoFrjMzdrIio3F3-YqUDV",
      accounts: ["7ca7fd3c98f142fa812dc74fd29ccf3535d158265c8642bedaec61ab266d2062"]
    }
  }
};

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    const JARV = await ethers.getContractFactory('jarv');
    const jarv = await JARV.deploy();
    await jarv.deployed();

    await jarv.connect(deployer).setData("Ashwin", 9945670164,"Male", "ashwinrb74@gmail.com", "O+", "hash");

    console.log(`Deployed contract at : ${jarv.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Jarv", () => {
    it('setting and getting data', async ()=>{
      var n = "Ashwin";
      var p = 9945670164;
      var g = "Male";
      var e = "ashwinrb74@gmail.com";
      var b = "o+";
      var i = "ajhdajshjas";
      var owner;
      var user1;
      [owner, user1] = await ethers.getSigners();
      const JARV = await ethers.getContractFactory('jarv');
      const jarv = await JARV.deploy();
      
      await jarv.connect(user1).setData(n, p, g, e, b, i);

      const [d1, d2, d3, d4, d5, d6] = await jarv.getData(0);

      expect(d1).to.equal(n);
      expect(d2).to.equal(p);
      expect(d3).to.equal(g);
      expect(d4).to.equal(e);
      expect(d5).to.equal(b);
      expect(d6).to.equal(i);
    })
})

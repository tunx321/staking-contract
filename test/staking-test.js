const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("Staking contract", function(){
  let MyContract, myContractDeployed, owner, addr1, addr2, addr3, addrs
  
  beforeEach(async function(){
    MyContract = await ethers.getContractFactory("Staking");
    myContractDeployed = await MyContract.deploy("86400");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
    
  });

  describe("Deployment", function() {
    it("should return correct minimum value and staking period(1 day)", async function(){
      expect(await myContractDeployed.minValue()).to.equal("5000000000000000"); //0.005 ethers
      expect(await myContractDeployed.stakingPeriod()).to.equal("86400")         // 1 day
    });
  


    it("should implement stake function", async function() {
      const stakeTx = await myContractDeployed.connect(addr1).stake({value: "50000000000000000"})  //stake 0.05 ethers
      await stakeTx.wait()
      expect(await myContractDeployed.getBalance()).to.not.equal("10000000000000000000000")        //10000 ethers - 0.05 ethers != 10000 ethers                                                                                              
    })

    it("should check length of staked balance map after calling staking function", async function() {
      const stakeTx = await myContractDeployed.connect(addr1).stake({value: "50000000000000000"})  //stake 0.05 ethers
      await stakeTx.wait()
      const stake2Tx = await myContractDeployed.connect(addr2).stake({value: "50000000000000000"})  //stake 0.05 ethers
      await stake2Tx.wait()
      expect(await myContractDeployed.totalStakers()).to.equal(2)        //after staking total stakers amount must be incremented to 2                                                                                            
    })

    it("should revert because address dont have a stake balance to withdraw", async function() {
      await expect(myContractDeployed.connect(addr1).withdraw()).to.be.revertedWith("You dont have a stake balance")                                                                                                
    })
})

  
});
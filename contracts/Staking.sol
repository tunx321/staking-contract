// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract Staking {
    address public owner;
    uint public stakingPeriod = 86400;
    uint public totalRewards;
    uint minVlaue = 0.05 ether;

    mapping(address => uint) public userBalances;
    mapping(address => uint) public stakedBalances;
    mapping(address => uint) public stakingStartTimes;



    constructor() payable  {
        owner = msg.sender;
        totalRewards = msg.value;
    }

    function stake() public payable {
        require(msg.value >= minVlaue, "Must be greater than 0.05 ether");
        require(msg.sender.balance >= msg.value, "Insufficient balance");
        userBalances[msg.sender] = msg.sender.balance;
        uint _amount = msg.value;
        userBalances[msg.sender] -= _amount;
        stakedBalances[msg.sender] += _amount;
        stakingStartTimes[msg.sender] = block.timestamp;
    }

    function calculateRewards() public view returns (uint) {
        uint timeStaked = block.timestamp - stakingStartTimes[msg.sender];
        uint rewards = (stakedBalances[msg.sender] * timeStaked) / stakingPeriod;
        return rewards;
    }

    function distributeRewards() public {
        require(block.timestamp >= stakingStartTimes[msg.sender] + 24 hours, "Deadline is not over");
        withdraw();
    }

    function withdraw() public {
        require(stakedBalances[msg.sender] >= minVlaue, "You dont have a stake balance");
        uint rewards = calculateRewards();
        uint totalAmount = stakedBalances[msg.sender] + rewards;        
        userBalances[msg.sender] += totalAmount;
        stakedBalances[msg.sender] = 0;
        stakingStartTimes[msg.sender] = 0;
        totalRewards -= rewards;
        payable(msg.sender).transfer(totalAmount);
    
    }

    function getBalance() public view returns(uint){
        return msg.sender.balance;
    }

    function getStakedBalance() public view returns(uint){
        return stakedBalances[msg.sender];
    }

    function timeLeft() public view returns(uint){
        if (block.timestamp > stakingStartTimes[msg.sender] + 24 hours){
                return 0;
        } else{
            return (stakingStartTimes[msg.sender] + 24 hours) - block.timestamp;
        }
    }
}
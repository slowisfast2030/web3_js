/**
 *Submitted for verification at BscScan.com on 2021-12-04
*/

// SPDX-License-Identifier: SimPL-2.0
pragma solidity >=0.5.0 <0.7.0;

contract Coin {
  uint public x;
  uint public y;
  address public minter;
  mapping (address => uint) private balances;

  event Sent(address from, address to, uint amount);

  constructor() public {
    minter = msg.sender;
  }

  function mint(address receiver, uint amount) public {
    require(msg.sender == minter);
    require(amount < 1e60);
    balances[receiver] += amount;
  }

  function send(address receiver, uint amount) public {
    require(amount <= balances[msg.sender], "Insufficient balance.");
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    emit Sent(msg.sender, receiver, amount);
  }
  
  function balanceOf(address tokenOwner) public view returns(uint balance){
    return balances[tokenOwner];
  }

  fallback() external payable { x = 1; y = msg.value; }
}
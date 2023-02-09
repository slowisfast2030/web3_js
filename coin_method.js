
const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/9faf676500e24b3693d74249d8c8412c"));

async function run() {

    const contractAbi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Sent","type":"event"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"send","outputs":[],"stateMutability":"nonpayable","type":"function"}]')
    // 自己部署的合约地址
    const contractAddress = '0x2fce577d1f765b2f380a6d26473a7719aa2154be'
    const myContract = new web3.eth.Contract(contractAbi, contractAddress)

    // 调用合约，读取数据。这个地址可以是任意一个地址。
    myContract.methods.balanceOf("0x7b313259EB14DBBA9AdDdeF2F651Acd506B953Ce").call().then(console.log)

    // 调用合约，写入数据
    let txn = await web3.eth.accounts.signTransaction({
        gas: "71000",
        from: "0x7529a3FA1934AdF47258937443196567AaB43Ac5", // 调用合约的地址
        to: contractAddress,
        data: myContract.methods.send("0xCA8415E9C49C69CAC55d640AA752cfe95Aeca071", "1").encodeABI()
    }, "0x3762493fc83d95ce849a7003b06a7161843219aaf68e3651f99b6bc521a6abbd")

    console.log('=====');
    console.log(myContract.methods.send("0xCA8415E9C49C69CAC55d640AA752cfe95Aeca071", "1").encodeABI());
    // 发送
    web3.eth.sendSignedTransaction(txn.rawTransaction).on('transactionHash', function(hash){
        console.log("发送成功，获取交易hash：",hash)
    }).on('receipt', function(receipt){
        console.log("链上结果返回，返回数据：",receipt)
    }).on('confirmation', function(confirmationNumber, receipt){
        console.log("链上confirmation结果返回，确认数：",confirmationNumber)
        console.log("链上confirmation结果返回，返回数据：",receipt)
    }).on('error', console.error);

}
run()

/**
 *Submitted for verification at BscScan.com on 2021-12-04
*/

// SPDX-License-Identifier: SimPL-2.0

/* 
pragma solidity >=0.5.0 <0.7.0;

contract Coin {
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
}
*/
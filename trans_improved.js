var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/9faf676500e24b3693d74249d8c8412c"));


// linus
_from = '0xCA8415E9C49C69CAC55d640AA752cfe95Aeca071';
web3.eth.getBalance(_from).then(res=>console.log('linus balance: ' + web3.utils.fromWei(res)));
_from_private_key = '0xd299d63aafd12e0b69829f08ecad93c9af448b7ee0148e03a4ac5faf285e8e7c';

// lmz
_to = '0x7529a3FA1934AdF47258937443196567AaB43Ac5';
web3.eth.getBalance(_to).then(res=>console.log('lmz balance: ' + web3.utils.fromWei(res)));

_value = web3.utils.toWei('0.01', 'ether');
console.log('value: ' + _value);


async function run() {

    // 签名交易
    let txn = await web3.eth.accounts.signTransaction({
        gas: "21000",
        to: _to,
        value: _value,
    }, _from_private_key)

    // 发送交易
    web3.eth.sendSignedTransaction(txn.rawTransaction).on('transactionHash', function(hash){
        console.log("发送成功，获取交易hash：",hash)
    }).on('receipt', function(receipt){
        console.log("链上结果返回，返回数据：",receipt)
    }).on('confirmation', function(confirmationNumber, receipt){
        console.log("链上confirmation结果返回，确认数：",confirmationNumber)
        console.log("链上confirmation结果返回，返回数据：",receipt)
    }).on('error', console.error);

}

// test
run()


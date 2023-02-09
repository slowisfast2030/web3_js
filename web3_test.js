var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/9faf676500e24b3693d74249d8c8412c"));

web3.eth.getBlockNumber().then(res=>console.log("block num: " + res));

// linus
_from = '0xCA8415E9C49C69CAC55d640AA752cfe95Aeca071';
web3.eth.getBalance(_from).then(res=>console.log('linus balance: ' + web3.utils.fromWei(res)));

// lmz
_to = '0x7529a3FA1934AdF47258937443196567AaB43Ac5';
web3.eth.getBalance(_to).then(res=>console.log('lmz balance: ' + web3.utils.fromWei(res)));

_value = web3.utils.toWei('1', 'ether');
console.log('value: ' + _value);

// linus向lmz发起转账交易
// web3.eth.sendTransaction({
//     from: _from,
//     to: _to,
//     value: _value
// });


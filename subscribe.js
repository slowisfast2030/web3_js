var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://goerli.infura.io/ws/v3/dac653adbb6447738af747a7437c262a"));

web3.eth.getBlockNumber().then(console.log);

web3.eth.subscribe("logs", {
    address: "0x2fce577d1f765b2f380a6d26473a7719aa2154be",
    topics: ['0x3990db2d31862302a685e8086b5755072a6e2b5b780af1ee81ece35ee3cd3345']
}, (error, result)=>{
    if (error){
        console.error(error);
    } else {
        console.log(result);
    }
}).on("connected", function (subscriptionId) {
    console.log(subscriptionId);
})
.on("data", function (log) {
    console.log(log);
});
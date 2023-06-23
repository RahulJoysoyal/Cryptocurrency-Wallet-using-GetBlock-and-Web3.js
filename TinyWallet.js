require('dotenv').config();

const {Web3} = require('web3');
const { signTransaction } = require('web3-eth');

const apiKey = process.env['apiKey']

const network = 'sepolia';

const node = `https://eth.getblock.io/${apiKey}/${network}/`;

const web3 = new Web3(node)

//console.log(web3);

const ToAccount = web3.eth.accounts.create();
console.log(ToAccount)

const privateKey = process.env['privateKey'];

const FromAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log(FromAccount)

const CreateSignedTx = async (rawTx) => {
  rawTx.from = FromAccount.address; // Add the 'from' address
  rawTx.gasPrice = await web3.eth.getGasPrice();
  rawTx.gas = await web3.eth.estimateGas(rawTx);
  return await FromAccount.signTransaction(rawTx);
};

const SendSignedTx = async (signedTx) => {
  web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
};

const ToAmount = "0.01";
const rawTx = {
  from: FromAccount.address, // Add the 'from' address
  to: ToAccount.address,
  value: web3.utils.toWei(ToAmount, "ether"),
};

CreateSignedTx(rawTx).then(SendSignedTx);




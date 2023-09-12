import request from '../plugins/axios/index';
import store from "../store";
import Web3 from 'web3';
import {getChainInfo} from '../wallet/chain'

const { ethereum } = window;

let chainConfig = getChainInfo(process.env.NODE_ENV)
let gasPrice = chainConfig.gasPrice

let chainInfos = {
    "ustd":{
        assetName:"USDT",
        
        assetAddress:"0xdac17f958d2ee523a2206206994597c13d831ec7",
        chainId:"0x1",
        chainName:"Ethereum",
        coefficient:6,
        
        chainAddress:"https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    "busd":{
        assetName:"BUST",
        assetAddress:"0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        chainId:"0x38",
        chainName:"BSC",
        coefficient:18,
        chainAddress:"https://bsc-dataseed.binance.org/",
    },
    "TEST_BSC":{
        assetName:"BSC",
        assetAddress:"0x0Cc7128E61c91F818Eef8952Afd5Cd7630264255",
        // assetAddress:"0xbd01e36ec58e8307c867efcf9049b6ac0e586f5e",
        chainId:"0x61",
        chainName:"TEST_BSC",
        // coefficient:18,
        coefficient:6,
        chainAddress:"https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    "TEST_Polygon":{
        assetName:"MATIC",
        // assetAddress:"0xeb5c39cfed38ed2e08b0868549f438de99080088", 
        assetAddress:"0xd2a42eb9d18b1b88cfd0d19e9ab115bf182eb3f2", //179
        chainId:"0x13881",
        chainName:"TEST_Polygon",
        coefficient:6,
        chainAddress:"https://matic-mumbai.chainstacklabs.com",
    },
    "Polygon":{
        assetName:"MATIC",
        assetAddress:"0xf057b67c3e3e58aedc312a2a2b83fb97afb8404b", 
        chainId:"0x89",
        chainName:"Polygon",
        coefficient:6,
        chainAddress:"https://speedy-nodes-nyc.moralis.io/76c2c7d8f6d0e4ccd08263bd/polygon/mainnet",
    }
}


let chainIdTochainName = {
    "0x1":"ustd",
    "0x38":"busd",
    "0x61":"TEST_BSC",
    '0x13881':'TEST_Polygon',
    '0x89':'Polygon'
}

export async function addChain() {
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x61" }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x61',
                            chainName: 'BSC Testnet',
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                        },
                    ],
                });
            } catch (addError) {
                console.log("addError", addError);
            }
        }
        console.log("switchError", switchError);
    }
}

export async function selectAsset() {
    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        let walletAsset = chainInfos["busd"]
        
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: walletAsset.assetAddress, // The address that the token is at.
                    symbol: walletAsset.assetName, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: 18, // The number of decimals in the token
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}

export function GetAngleRewards(Address, chainId, cost, callback) {
    let chainName = chainIdTochainName[chainId]
    let configData = chainInfos[chainName]
    let value = cost * Math.pow(10, configData.coefficient)
    const web3 = new Web3(ethereum);
    // const web3 = new Web3(Web3.givenProvider || configData.chainAddress);
    const account = store.state.currentWalletAddress;
    // console.log("gasPrice",web3.utils.toWei(gasPrice,'gwei'));
    sendEtherFrom(account, function(err, transaction) {
        if (err) {
            // Message.error("I'm sorry you can't contribute!",transaction);
            console.log(err,transaction);
        }
    })

    function sendEtherFrom(account) {
        const method = 'eth_sendTransaction'
        
        let data = web3.eth.abi.encodeFunctionCall({
            name: "transfer",
            type: "function",
            inputs: [{
                type: 'address',
                name: '_to'
            },{
                type: 'uint256',
                name: '_value'
            }],
        }, [Address, value]);
        
        const parameters = [{
            from: account,
            to: configData.assetAddress,
            data: data,
            gasPrice:web3.utils.toWei(gasPrice,'gwei'),
        }]
        const from = account;
        const payload = {
            method: method,
            params: parameters,
            from: from,
        }
        callback(null);
        let number_takeGain = 0
        ethereum.sendAsync(payload, function(err, response) {
            console.log(err);
            const rejected = 'User denied transaction signature.'
            if (response.error && response.error.message.includes(rejected)) {
                callback("refuse");
            }
            if (response.code == "-32603") {
                callback("fail");
            }
            if (response.error && response.error.code == "-32603") {
                callback("fail");
            }
            if (response.result) {
                let timer_takeGain = setInterval(() => {
                    number_takeGain++
                    web3.eth.getTransactionReceipt(response.result).then(function(res) {
                        if (res == null) {
                            callback(res)
                        } else if (res.status) {
                            callback(res.status)
                            clearInterval(timer_takeGain);
                        } else {
                            clearInterval(timer_takeGain);
                        }
                    });
                    if (number_takeGain > 10) {
                        clearInterval(timer_takeGain);
                        callback("timeout")
                        number_takeGain = 1;
                    }
                }, 2000);
            }
        })
    }
}

export async function changeChain() {
    let chainInfo = getChainInfo(process.env.NODE_ENV)
    
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainInfo.chainId }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: chainInfo.chainId,
                            chainName: chainInfo.chainName,
                            rpcUrls: [chainInfo.rpcUrl],
                            nativeCurrency: {
                                name: chainInfo.tokenName,
                                symbol: chainInfo.tokenName,
                                decimals:chainInfo.coefficient
                              },
                              blockExplorerUrls:[chainInfo.blockExplorerUrl]
                        },
                    ],
                });
            } catch (addError) {
                console.log("addError", addError);
            }
        }
        console.log("switchError", switchError);
    }
}

export function sendGetUserAssets() {
    return request({
        url: '/assets/api/as/query/currency/' + store.state.appID + '/' + chainConfig.chainName + '/' + store.state.currentWalletAddress,
        method: 'get',
    })
}

export async function GetUserBalance(chainId, callback) {
    let chainName = chainIdTochainName[chainId]
    let configData = chainInfos[chainName]
    const web3 = new Web3(Web3.givenProvider || configData.chainAddress);
    const account = store.state.currentWalletAddress;
    
    sendEtherFrom(account, function(err, transaction) {
        if (err) {
            // Message.error("I'm sorry you can't contribute!",transaction);
            console.log(err,transaction);
        }
    })
    
    function sendEtherFrom(account) {
        const method = 'eth_call'
        let data = web3.eth.abi.encodeFunctionCall({
            name: "balanceOf",
            type: "function",
            inputs: [{
                type: 'address',
                name: 'who'
            }],
        }, [account]);   //wallet address
        
        const parameters = [{
            from: account,
            to: configData.assetAddress,
            data: data
        }]
        const from = account;
        const payload = {
            method: method,
            params: parameters,
            from: from,
        }
        
        ethereum.sendAsync(payload, function(err, response) {
            const rejected = 'User denied transaction signature.'
            if (response.error && response.error.message.includes(rejected)) {
                callback("refuse");
            }
            if (response.code == "-32603") {
                callback("fail");
            }
            if (response.error && response.error.code == "-32603") {
                callback("fail");
            }
            if (response.result) {
                callback(response.result/Math.pow(10,configData.coefficient))
            }
        })
    }
}

export async function getUserBalance(chainId) {
    const web3 = new Web3(ethereum);
    let chainName = chainIdTochainName[chainId]
    let configData = chainInfos[chainName]

    web3.eth.getBalance(store.state.currentWalletAddress)
    .then((res)=>{
        console.log("balance",configData.coefficient,res/Math.pow(10,configData.coefficient))
    });
}

export function sendOpenBox(Address, chainId, boxId,callback) {
    let chainName = chainIdTochainName[chainId]
    let configData = chainInfos[chainName]
    let value = 1
    const web3 = new Web3(Web3.givenProvider || configData.chainAddress);
    const account = store.state.currentWalletAddress;
    // console.log("gasPrice",web3.utils.toWei(gasPrice,'gwei'));
    sendEtherFrom(account, function(err, transaction) {
        if (err) {
            // Message.error("I'm sorry you can't contribute!",transaction);
            console.log(err,transaction);
        }
    })

    function sendEtherFrom(account) {
        const method = 'eth_sendTransaction'
        
        let data = web3.eth.abi.encodeFunctionCall({
            name: "openBox",
            type: "function",
            inputs: [{
                type: 'address',
                name: '_to'
            },{
                type: 'uint256',
                name: 'id'
            },{
                type: 'uint256',
                name: 'value'
            }],
        }, [account,boxId,value]);
        
        const parameters = [{
            from: account,
            to: Address,
            data: data,
            gasPrice:web3.utils.toWei(gasPrice,'gwei'),
        }]
        const from = account;
        const payload = {
            method: method,
            params: parameters,
            from: from,
        }
        // callback(null);
        let number_takeGain = 0
        ethereum.sendAsync(payload, function(err, response) {
            console.log(err);
            const rejected = 'User denied transaction signature.'
            if (response.error && response.error.message.includes(rejected)) {
                callback("refuse");
            }
            if (response.code == "-32603") {
                callback("fail");
            }
            if (response.error && response.error.code == "-32603") {
                callback("fail");
            }
            if (response.result) {
                let timer_takeGain = setInterval(() => {
                    number_takeGain++
                    web3.eth.getTransactionReceipt(response.result).then(function(res) {
                        if (res == null) {
                            callback(res)
                        } else if (res.status) {
                            callback(res.status)
                            clearInterval(timer_takeGain);
                        } else {
                            clearInterval(timer_takeGain);
                        }
                    });
                    if (number_takeGain > 10) {
                        clearInterval(timer_takeGain);
                        callback("timeout")
                        number_takeGain = 1;
                    }
                }, 2000);
            }
        })
    }
}
// 
export async function getCurrentGasPrice() {
    const web3 = new Web3(ethereum);
    await web3.eth.getGasPrice().then((res)=>{
        if (res > 0) {
            // console.log("currentGasPrice",res);
            let currentGasPrice  = (res * 1.5).toFixed(0)
            // console.log("gasPrice",currentGasPrice);
            currentGasPrice  = web3.utils.fromWei(currentGasPrice, 'Gwei')
            if (store.state.chainId === chainConfig.chainId) {
                if (currentGasPrice<=40){
                    gasPrice = '45'
                }else if (currentGasPrice<=80){
                    gasPrice = '65'
                }else if (currentGasPrice<=120){
                    gasPrice = '100'
                }else if (currentGasPrice<=500){
                    gasPrice = gasPrice * 1.1
                }else if (currentGasPrice>500){
                    gasPrice = gasPrice * 1.2
                }
            }
        }
    }).catch((err)=>{
        console.log(err);
    })
}

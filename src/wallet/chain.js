import store from "../store"

const martic = {
  development: {
    tokenName: 'MATIC',
    symbol: 'MATIC',
    ETHNETWORK: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    netName: 'Matic Mumbai',
    chainId:'0x13881',
    chainName:'TEST_Polygon',
    coefficient:18,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
    env:"179"
  },
  production: {
    tokenName: 'MATIC',
    symbol: 'MATIC',
    ETHNETWORK: 80001,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    netName: 'Matic Mumbai',
    chainId:'0x13881',
    chainName:'TEST_Polygon',
    coefficient:18,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
    // ETHNETWORK: 137,
    // rpcUrl: 'https://speedy-nodes-nyc.moralis.io/76c2c7d8f6d0e4ccd08263bd/polygon/mainnet',
    // blockExplorerUrl: 'https://polygonscan.com/',
    // netName: 'Matic Mainnet',
    // chainId:'0x89',
    // chainName:'Polygon',
    // coefficient:18,
    // gasPrice:'45',
    // boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    // buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    // openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    // nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    // usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
  }
}

const bscscan = {
  tokenName: 'BNB',
  symbol: 'BNB',
  development: {
    NETWORK: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    netName: 'BSC Testnet',
    chainId:'0x61',
    chainName:'TEST_BSC',
    coefficient:6,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x48F559F883D9Acd50196A67A817Fc0D8a91C554f",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
  },
  production: {
    NETWORK: 97,
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    netName: 'BSC Testnet',
    chainId:'0x61',
    chainName:'TEST_BSC',
    coefficient:6,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x48F559F883D9Acd50196A67A817Fc0D8a91C554f",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
  },
  // prod: {
  //   NETWORK: 56,
  //   rpcUrl: 'https://bsc-dataseed.binance.org/',
  //   blockExplorerUrl: 'https://bscscan.com',
  //   netName: 'BSC',
  //   chainId:'',
  //   coefficient:18,
  //   gasPrice:'10',
  //   paymentAddress: '0x0Cc7128E61c91F818Eef8952Afd5Cd7630264255'
  // }
}
const opbnb ={
  development: {
    tokenName: 'tBNB',
    symbol: 'tBNB',
    ETHNETWORK: 5611,
    rpcUrl: 'https://opbnb-testnet-rpc.bnbchain.org',
    blockExplorerUrl: 'https://opbnb-testnet.bscscan.com',
    netName: 'opBNB Testnet',
    chainId:'0x15eb',
    chainName:'opBNB Testnet',
    coefficient:18,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
    env:"179"
  },
  production: {
    tokenName: 'tBNB',
    symbol: 'tBNB',
    ETHNETWORK: 5611,
    rpcUrl: 'https://opbnb-testnet-rpc.bnbchain.org',
    blockExplorerUrl: 'https://opbnb-testnet.bscscan.com',
    netName: 'opBNB Testnet',
    chainId:'0x15eb',
    chainName:'opBNB Testnet',
    coefficient:18,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
    env:"179"
  }
}
const arbotrum ={
  development: {
    tokenName: 'ETH',
    symbol: 'ETH',
    ETHNETWORK: 5611,
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    blockExplorerUrl: 'https://goerli.arbiscan.io/',
    netName: 'Arbitrum Goerli Testnet',
    chainId:'0x66eed',
    chainName:'Arbitrum Goerli Testnet',
    coefficient:18,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
    env:"179"
  },
  production: {
    tokenName: 'ETH',
    symbol: 'ETH',
    ETHNETWORK: 5611,
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    blockExplorerUrl: 'https://goerli.arbiscan.io/',
    netName: 'Arbitrum Goerli Testnet',
    chainId:'0x66eed',
    chainName:'Arbitrum Goerli Testnet',
    coefficient:18,
    gasPrice:'10',
    boxAddress: "0x5533e2fE0AF1167F7b0efB2A6A7d51587788D0ae",
    buyBoxAddress: "0x3a7FA98EF23fbeEf9F6818e7D90df20a764515E8",
    openBoxAddress: "0xA8d8425e5a7141820C17BdB943281Ba6f8d67Acf",
    nftAddress: "0x3ed71Cd47F15882FC4F20fDa17F03989f7534d9E",
    usdtAddress: "0xD41ca4D983Dceb6156F4686017DD1fe0EDdbB0cF",
    env:"179"
  }
}
export function getChainInfo(env) {
  let chain = null
  if (store.getters.chainId === "0x13881") {
    chain = martic[env]
  } else if (store.getters.chainId === "0x89") {
    chain = martic[env]
  } else if (store.getters.chainId === "0x61") {
    chain = bscscan[env]
  }
  else if(store.getters.chainId === "0x15eb"){
    chain = opbnb[env]
  }
  else if(store.getters.chainId === "0x66eed"){
    chain = arbotrum[env]
  }
  
  return chain
}
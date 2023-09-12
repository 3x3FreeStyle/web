import axios from 'axios'
const jsonPath = process.env.BASE_URL
const abis = {
  namespaced:true,
  state: {
    boxAbi: null,
    buyBoxAbi: null,
    openBoxAbi: null,
    nftAbi: null,
    usdtAbi: null,
  },
  mutations: {
    setBoxAbi(state, boxAbi) {
      state.boxAbi = boxAbi
    },
    setBuyBoxAbi(state, buyBoxAbi) {
      state.buyBoxAbi = buyBoxAbi
    },
    setOpenBoxAbi(state, openBoxAbi) {
      state.openBoxAbi = openBoxAbi
    },
    setNftAbi(state, nftAbi) {
      state.nftAbi = nftAbi
    },
    setUsdtAbi(state, usdtAbi) {
      state.usdtAbi = usdtAbi
    },
  },
  actions: {
    async getBoxAbi({ commit, state }) {
      const { boxAbi } = state
      if (boxAbi) {
        return boxAbi
      } else {
        const { data } = await axios.get(`${jsonPath}contracts/BoxContract.json`)
        commit('setBoxAbi', data)
        return data
      }
    },
    async getBuyBoxAbi({ commit, state }) {
      const { buyBoxAbi } = state
      if (buyBoxAbi) {
        return buyBoxAbi
      } else {
          const { data } = await axios.get(`${jsonPath}contracts/BuyBoxContract.json`)
          commit('setBuyBoxAbi', data)
          return data
      }
    },
    async getOpenBoxAbi({ commit, state }) {
      const { openBoxAbi } = state
      if (openBoxAbi) {
        return openBoxAbi
      } else {
        const { data } = await axios.get(`${jsonPath}contracts/OpenBoxContract.json`)
        commit('setOpenBoxAbi', data)
        return data
      }
    },
    async getNftAbi({ commit, state }) {
      const { nftAbi } = state
      if (nftAbi) {
        return nftAbi
      } else {
        const { data } = await axios.get(`${jsonPath}contracts/NFTContract.json`)
        commit('setNftAbi', data)
        return data
      }
    },
    async getUsdtAbi({ commit, state }) {
      const { usdtAbi } = state
      if (usdtAbi) {
        return usdtAbi
      } else {
        const { data } = await axios.get(`${jsonPath}contracts/USDTContract.json`)
        commit('setUsdtAbi', data)
        return data
      }
    },
  }
}

export default abis

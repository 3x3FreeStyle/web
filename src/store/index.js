import Vue from 'vue'
import Vuex from 'vuex'
import abis from './abi'
import createPersistedState from "vuex-persistedstate";
// import { heros } from '../apis/home'

// import { removeAllToken, hasToken } from '@/utils/cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
      appID: "7fd75915c689e37973811536d98eae52",
      currentChain: "",
      userToken: "",
      currentWalletAddress: "",
      inviteCode: "",
      channelCode: "",
      isConnectWallet: false,
      selfInviteCode: "",
      isMobile:false,
      chainId:"0x15eb",
    }
  },
  mutations: {
    setMobile(state) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|mi/i.test(navigator.userAgent)) {
        state.isMobile=true
      }else state.isMobile=false
    },
    setCurrentChian: (state, chain) => {
      state.currentChain = chain;
    },
    setUserToken: (state, token) => {
      state.userToken = token;
    },
    setCurrentWalletAddress: (state, address) => {
        state.currentWalletAddress = address;
    },
    setInviteCode: (state, code) => {
        state.inviteCode = code;
    },
    setChannelCode: (state, code) => {
        state.channelCode = code;
    },
    setIsConnectWallet: (state, connect) => {
        state.isConnectWallet = connect;
    },
    setSelfInviteCode: (state, code) => {
      state.selfInviteCode = code;
    },
    setInstallWalletState: (state, install) => {
      state.isInstallWallet = install;
    },
    setChinaId:(state, chainId) => {
      state.chainId = chainId;
    }
  },
  actions: {
  },
  modules: {
    abis,
  },
  getters: {
    appID: state => state.appID,
    chainId: state => state.chainId,
    currentChain: state => state.currentChain,
    userToken: state => state.userToken,
    currentWalletAddress: state => state.currentWalletAddress,
    inviteCode: state => state.inviteCode,
    channelCode: state => state.channelCode,
    isConnectWallet: state => state.isConnectWallet,
    selfInviteCode: state => state.selfInviteCode,
    isInstallWallet: state => state.isInstallWallet,
  },
  plugins: [createPersistedState({
    key: "chain",
    paths: [
      "appID",
      // "chainId",
      "currentChain",
      "userToken",
      "currentWalletAddress",
      "inviteCode",
      "channelCode",
      "isConnectWallet",
      "selfInviteCode",
      "isInstallWallet",
    ]
  })]
})
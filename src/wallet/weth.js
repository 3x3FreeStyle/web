import {
  Message
} from 'element-ui'
import {
  martic
} from './chain'
import {
  createWeb3,
  setChain,
  addNetwork,
  web3Process
} from './web3Init'

const weth = {
  data() {
    return {
      wethContract: null,
      wethBalance: '',
      allowWeth: 0,
      keyMarketContract: null,
      ketContract: null,
      netId: '',
      loading: false,
      KeyPrice: 0
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    sendStatus(hash, load, errorFun) {
      web3Process.web3.eth.getTransactionReceipt(hash, (err, tx) => {
        if (!tx) {
          this.sendStatus(hash, load, errorFun)
        } else {
          if (tx.status) {
            load()
          } else {
            Message({
              message: 'Contract interaction failed, please check status on the official website for your wallet.',
              type: 'error'
            })
            errorFun()
          }
        }
      })
    },
    async toSetChain(id) {
      await setChain(id, this.$store)
      const res = await web3Process.web3.eth.net.getId()
      if (res !== web3Process.network) {
        const bscId = Number(martic[web3Process.type].ETHNETWORK)
        this.$store.commit('wallet/setNetType', 0)
        if (id === bscId) {
          this.$store.commit('wallet/setNetType', 1)
        }
        this.$store.commit('wallet/setChangeNetShow', true)
      } else {
        this.$store.commit('wallet/setChangeNetShow', false)
      }
      return web3Process.network
    },
    async getWethAbi() {
      await createWeb3()
      const res2 = await web3Process.web3.eth.net.getId()
      await setChain(res2, this.$store)
      const res = await this.$store.dispatch('abis/changeWethAbi')
      const marketKeyAbi = await this.$store.dispatch('abis/changeMarketKeyAbi')
      const keyAbi = await this.$store.dispatch('abis/changeKeyAbi')
      this.netId = res2
      if (res2 === web3Process.network) {
        this.$store.commit('wallet/setChangeNetShow', false)
        this.wethContract = new web3Process.web3.eth.Contract(res.abi, web3Process.wethAddress)
        this.keyMarketContract = new web3Process.web3.eth.Contract(marketKeyAbi.abi, web3Process.keyMarketAddress)
        this.keyContract = new web3Process.web3.eth.Contract(keyAbi.abi, web3Process.keyAddress)
        await this.getwethBalance()
      } else {
        // addNetwork(this.$store)
        // const bscId = Number(martic[web3Process.type].ETHNETWORK)
        // this.$store.commit('wallet/setNetType', 0)
        // if (web3Process.network === bscId) {
        //   this.$store.commit('wallet/setNetType', 1)
        // }
        // this.$store.commit('wallet/setChangeNetShow', true)
      }
    },
    async getAccount() {
      await createWeb3()
      const accounts = await web3Process.web3.eth.getAccounts()
      return accounts
    },
    async getwethBalance() {
      if (!this.userInfo.eth || !this.userInfo.eth.address) {
        return
      }
      const accounts = await web3Process.web3.eth.getAccounts()
      if (accounts.length == 0) {
        return
      }

      if (accounts.length == 0 || (accounts[0] ? accounts[0].toLowerCase(): accounts[0]) !== (this.userInfo.eth.address ? this.userInfo.eth.address.toLowerCase(): this.userInfo.eth.address)) {
        Message({
          message: 'Please use the bound account:' + this.userInfo.eth.address,
          type: 'error'
        })
        return
      }
      const res = await this.wethContract.methods.balanceOf(accounts[0]).call({
        from: accounts[0]
      })
      this.wethBalance = res
      await this.getKeyPrice()
    },
    async getNFTKeyPrice() {
      if (!this.userInfo.eth) {
        this.priceLoading = false
        return
      }
      const accounts = await web3Process.web3.eth.getAccounts()
      if ((accounts[0] ? accounts[0].toLowerCase(): accounts[0]) !== (this.userInfo.eth.address ? this.userInfo.eth.address.toLowerCase(): this.userInfo.eth.address)) {
        Message({
          message: 'Please use the bound account:' + this.userInfo.eth.address,
          type: 'error'
        })
        this.priceLoading = false
        return
      }
      const res = await this.keyMarketContract.methods._boxPrice().call({
        from: accounts[0]
      })
      this.KeyPrice = res / 1000000000000000000
      this.priceLoading = false
    },
    async allowPrice(price, number) {
      if (this.netId !== web3Process.network) {
        Message({
          message: "Please use the Matic or BSC Mainnet network",
          type: 'error'
        })
        return
      }
      if (number > 10) {
        Message({
          message: 'You could buy at most 10 keys each time. If you buy more than 10 keys at one time, the transaction may fail.',
          type: 'error'
        })
        return
      }
      const weiPrice = price * 1000000000000000000
      if (weiPrice > this.wethBalance) {
        Message({
          message: 'Not enough balance. Please top-up your account.',
          type: 'error'
        })
        return
      }
      this.success = false
      this.loading = true
      const accounts = await web3Process.web3.eth.getAccounts()
      if ((accounts[0] ? accounts[0].toLowerCase(): accounts[0]) !== (this.userInfo.eth.address ? this.userInfo.eth.address.toLowerCase(): this.userInfo.eth.address)) {
        Message({
          message: 'Please use the bound account:' + this.userInfo.eth.address,
          type: 'error'
        })
        return
      }
      const soldOut = await this.keyContract.methods.isSoldOut().call({
        from: accounts[0]
      })
      if (soldOut) {
        this.isOver = true
        return
      }
      const res = await this.wethContract.methods.allowance(accounts[0], web3Process.keyMarketAddress).call({
        from: accounts[0]
      })
      this.allowWeth = Number(res)
      if (weiPrice > this.allowWeth) {
        try {
          this.setAllowPrice(accounts[0], number)
        } catch {
          this.loading = false
        }
      } else {
        this.toPay(accounts[0], number)
      }
    },
    setAllowPrice(account, number) {
      return this.wethContract.methods.approve(web3Process.keyMarketAddress, web3Process.approve_amount).send({
        from: account,
        gasPrice: web3Process.web3.utils.toWei(web3Process.gasPrice, 'gwei'),
        gas: web3Process.gas
      }).on('transactionHash', (hash) => {
        this.sendStatus(hash, () => {
          this.toPay(account, number)
        }, () => {
          this.loading = false
        })
      })
    },
    async toPay(account, number) {
      try {
        await this.keyMarketContract.methods.buyBoxs(number).send({
          from: account,
          gasPrice: web3Process.web3.utils.toWei(web3Process.gasPrice, 'gwei'),
          gas: web3Process.gas
        }).on('transactionHash', (hash) => {
          this.sendStatus(hash, () => {
            this.success = true
          }, () => {
            this.loading = false
          })
        })
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    },
    async sendToken(price, address, presale, count) {
      if (!this.userInfo.eth) {
        Message({
          message: 'Please bind your wallet first!',
          type: 'error'
        })
        this.getLoading = false
        return
      }

      const keyPrice = web3Process.web3.utils.toWei(String(price))
      const accounts = await web3Process.web3.eth.getAccounts()
      if ((accounts[0] ? accounts[0].toLowerCase(): accounts[0]) !== (this.userInfo.eth.address ? this.userInfo.eth.address.toLowerCase(): this.userInfo.eth.address)) {
        Message({
          message: 'Please user the bound account:' + this.userInfo.eth.address,
          type: 'error'
        })
        this.getLoading = false
        return
      }
      const res = await this.wethContract.methods.balanceOf(accounts[0]).call({
        from: accounts[0]
      })
      this.wethBalance = res
      if (Number(keyPrice) > Number(this.wethBalance)) {
        Message({
          message: 'Not enough balance. Please top-up your account.',
          type: 'error'
        })
        this.getLoading = false
        return
      }
      if (presale) {
        try {
          const res = await this.wethContract.methods.approve(web3Process.keyMarketAddress, keyPrice).send({
            from: accounts[0],
            gasPrice: web3Process.web3.utils.toWei(web3Process.gasPrice, 'gwei'),
            gas: web3Process.gas
          }).on('transactionHash', (hash) => {
            this.sendStatus(hash, () => {
              this.success = true
              this.buyBox(accounts[0],count)
            }, () => {
              this.loading = false
              this.getLoading = false
            })
          })
        } catch (e) {
          console.log("sendToken__call",e)
          this.loading = false
          this.getLoading = false
        }
      } else {
        this.loading = true
        try {
          await this.wethContract.methods.transfer(address, keyPrice).send({
            from: accounts[0],
            gasPrice: web3Process.web3.utils.toWei(web3Process.gasPrice, 'gwei'),
            gas: web3Process.gas
          }).on('transactionHash', (hash) => {
            this.sendStatus(hash, () => {
              this.buyShow = true
            }, () => {
              this.loading = false
              this.getLoading = false
            })
            if (!presale) {
              this.sendBuy(hash)
            }
          })
        } catch (e) {
          this.loading = false
          this.getLoading = false
          this.cancelBuy()
        }
      }
    },
    async buyBox(account,count) {
      try {
        await this.keyMarketContract.methods.buyBoxs(count).send({
          from: account,
          gasPrice: web3Process.web3.utils.toWei(web3Process.gasPrice, 'gwei'),
          gas: web3Process.gas
        }).on('transactionHash', (hash) => {
          this.sendStatus(hash, () => {
            this.success = true
            this.getLoading = false
          }, () => {
            this.getLoading = false
          })
        })

      } catch (e) {
        console.log("buyBox__call",e);
        this.getLoading = false
      }
    }
  }
}
export default weth

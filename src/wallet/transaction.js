import {
  Message, Transfer
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

import { sendPresaleInfo, sendGetShopSignature } from '@/apis/login'
import store from '@/store'
import { loadMaps, analysis } from "@/utils/analysisDNA"
import { BoxContract } from "@wallet/BoxContract"
import { BuyBoxContract } from "@wallet/BuyBoxContract"
import { NFTContract } from "@wallet/NFTContract"
import { OpenBoxContract } from "@wallet/OpenBoxContract"
import { USDTContract } from "@wallet/USDTContract"

const transaction = {
  data() {
    return {
      boxContract: null,
      buyBoxContract: null,
      openBoxContract: null,
      nftContract: null,
      usdtContract: null,
      planId: "",
      price: "",
      currency: "",
      chainId: "",
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
      }).then((res) => {
        console.log("res",res);
        if (res) {
          this.getDNAFromWeb3Hash(res.blockNumber)
        }
      })
    },
    async getAbis() {
      await createWeb3()
      
      let currentChain = null

      currentChain = await web3Process.web3.eth.getChainId()

      this.netId = currentChain
      
      // await setChain(currentChain, this.$store)

      const boxAbi = BoxContract//await this.$store.dispatch('abis/getBoxAbi')
      const buyBoxAbi = BuyBoxContract//await this.$store.dispatch('abis/getBuyBoxAbi')
      const openBoxAbi = OpenBoxContract//await this.$store.dispatch('abis/getOpenBoxAbi')
      const nftAbi = NFTContract//await this.$store.dispatch('abis/getNftAbi')
      const usdtAbi = USDTContract//await this.$store.dispatch('abis/getUsdtAbi')
      
      // console.log("netId",this.netId,currentChain,web3Process.network);

      // if (currentChain === web3Process.network) {
        this.boxContract = new web3Process.web3.eth.Contract(boxAbi, web3Process.boxAddress)
        this.buyBoxContract = new web3Process.web3.eth.Contract(buyBoxAbi, web3Process.buyBoxAddress)
        this.openBoxContract = new web3Process.web3.eth.Contract(openBoxAbi, web3Process.openBoxAddress)
        this.nftContract = new web3Process.web3.eth.Contract(nftAbi, web3Process.nftAddress)
        this.usdtContract = new web3Process.web3.eth.Contract(usdtAbi, web3Process.usdtAddress)
      // } else {
        // console.log("addNetwork 3");
        // addNetwork(this.$store)
        // const bscId = Number(martic[web3Process.type].ETHNETWORK)
        // this.$store.commit('wallet/setNetType', 0)
        // if (web3Process.network === bscId) {
        //   this.$store.commit('wallet/setNetType', 1)
        // }
        // this.$store.commit('wallet/setChangeNetShow', true)
      // }
    },
    async getPreSalePlans() {
      await sendPresaleInfo().then((res) => {
        console.log("sentPresaleInfo", res);
        let data = res.data
        if (data && data.plans.length > 0) {
          let plan = data.plans[0]

          this.planId = plan.planId
          this.price = plan.price

          if (plan.payments && plan.payments.length > 0) {
            let payment = plan.payments[0]
            this.chainId = payment.chainId
            this.currency = payment.currency
            localStorage.setItem("isclickbtn", true)
          }
        }
      })
    },
    getShopSignature(amount) {

      if (this.planId == "" || this.price == "" || this.chainId == "" || this.currency == "") {
        console.log("getShopSignature params error");
        //TODO
        this.islodaing = false
        return
      }

      let params = {
        "amount": amount,
        "chainId": this.chainId,
        "currency": this.currency,
        "planId": this.planId,
        "price": this.price
      }

      sendGetShopSignature(params).then((res) => {
        console.log("sendGetShopSignature", res);

        let data = res.data

        let buyBoxParams = {
          "currency": "",
          "price": "",
          "time": "",
          "chainId": "",
          "nonce": "",
          "signature": "",
        }

        if (data && data.params && data.params.length > 0) {
          buyBoxParams.signature = data.sign
          let resParams = data.params
          for (let index = 0; index < resParams.length; index++) {
            const element = resParams[index];
            buyBoxParams[element.key] = element.value
          }

          console.log("buyBoxParams", buyBoxParams);
          this.approveUSDT(buyBoxParams)
        }
      }).catch((e) => {
        // TODO
        this.islodaing = false
      })
    },
    async approveUSDT(data) {
      try {
        await this.usdtContract.methods.approve(web3Process.buyBoxAddress, data.price).send({
          from: store.getters.currentWalletAddress,
          gas:2000000,
          maxFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
          maxPriorityFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
          // gasPrice: web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
        }).on('transactionHash', (hash) => {
          console.log("approveUSDT transactionHash");
          this.sendStatus(hash, async () => {
            console.log("success");
            this.buyBox(data)
            // TODO
          }, () => {
            console.log("failed");
            // TODO
          })
        })
      } catch (e) {
        console.log("approveUSDT catch", e);
        // TODO
        this.islodaing = false
      }
    },
    async buyBox(data) {
      try {
        console.log("data11", data);
        await this.buyBoxContract.methods.buyBox(data.currency,
          data.price,
          data.time,
          data.chainId,
          data.nonce,
          data.signature).send({
            from: store.getters.currentWalletAddress,
            gas:2000000,
            maxFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
            maxPriorityFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
            // gasPrice: web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
          }).on('transactionHash', (hash) => {
            this.sendStatus(hash, async () => {
              console.log("success");
              // TODO
              this.islodaing = false
              this.isShowWalletPop = false
              this.isShowBugBox = true;
            }, () => {
              console.log("failed");
              // TODO
              this.islodaing = false
            })
          })
      } catch (e) {
        console.log("approveUSDT catch", e);
        // TODO
        this.islodaing = false
      }
    },
    async openOneBox() {
      const tokenIdList = await this.boxContract.methods.tokenIdListByOwner(store.getters.currentWalletAddress).call({
        from: store.getters.currentWalletAddress
      })
      console.log("getBoxList", tokenIdList);
      if (tokenIdList.length > 0) {
        let tokenId = tokenIdList[0]

        let address = await this.getBoxApproved()

        if (address) {
          this.openBox(tokenId)
        } else {
          this.approveBox(tokenId)
        }
      }
    },
    async approveBox(tokenId) {
      try {
        await this.boxContract.methods.approve(web3Process.openBoxAddress,
          tokenId).send({
            from: store.getters.currentWalletAddress,
            gas:2000000,
            maxFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
            maxPriorityFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
            // gasPrice: web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
          }).on('transactionHash', (hash) => {
            this.sendStatus(hash, async () => {
              console.log("success");
              this.openBox(tokenId)
            }, () => {
              console.log("failed");
              this.islodaing = false;
            })
          })
      } catch (e) {
        console.log("approveBox catch", e);
        this.islodaing = false;
      }
    },
    async openBox(tokenId) {
      try {
        await this.openBoxContract.methods.OpenBox(tokenId).send({
          from: store.getters.currentWalletAddress,
          gas:2000000,
          maxFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
          maxPriorityFeePerGas:web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
          // gasPrice: web3Process.web3.utils.toHex(web3Process.web3.utils.toWei('50', 'Gwei')),
        }).on('transactionHash', (hash) => {
          this.sendStatus(hash, async () => {
            console.log("success");
          }, () => {
            console.log("failed");
            this.islodaing = false;
          })
        })
      } catch (e) {
        console.log("openBox catch", e);
        this.islodaing = false;
      }
    },
    async transferNFT(data) {
      try {
        await this.nftContract.methods.noGasTransfer(data.from,
          data.to,
          data.tokenIdList,
          data.chainId,
          data.timestamp,
          data.signature).send({
            from: store.getters.currentWalletAddress
          }).on('transactionHash', (hash) => {
            this.sendStatus(hash, async () => {
              console.log("success");
            }, () => {
              console.log("failed");
            })
          })
      } catch (e) {
        console.log("transferNFT catch", e);
      }
    },
    showDNA(dna, tokenId) {
      let heroData = analysis(dna);
      console.log("showDNA", dna, tokenId, heroData);
      if (this.isMobile) {
        this.openBoxData = this.openBoxListM[parseInt(heroData.heroID) - 1];
      } else {
        this.openBoxData = this.openBoxList[parseInt(heroData.heroID) - 1];
      }
      this.openBoxData.desc = heroData.heroTxt;
      this.islodaing = false;
      this.showBox = true;
      this.getBoxNum().then((res) => {
        this.boxNum = parseInt(res)
      })
    },
    async getDNAFromWeb3Hash(blockNum) {
      this.nftContract.events.NFTCreatedEvent({ filter: {}, fromBlock: blockNum }, function (error, event) { })
        .on('data', (event) => {
          console.log(event); // same results as the optional callback above
          if (event.event == "NFTCreatedEvent") {
            this.showDNA(event.returnValues.dna, event.returnValues.token_id)
          }
        })
        .on('changed', function (event) {
          // remove event from local database
        })
        .on('error', console.error);
    },
    async getBoxApproved() {
      const address = await this.boxContract.methods.isApprovedForAll(store.getters.currentWalletAddress, web3Process.openBoxAddress).call({
        from: store.getters.currentWalletAddress,
      })

      return address
    },
    async getAllNFTs() {
      try {
        let nftListNum = await this.nftContract.methods.balanceOf(store.getters.currentWalletAddress).call({
          from: store.getters.currentWalletAddress
        })

        let nftArray = []
        for (let index = 0; index < nftListNum; index++) {
          let nftId = await this.nftContract.methods.tokenOfOwnerByIndex(store.getters.currentWalletAddress, index).call({
            from: store.getters.currentWalletAddress
          })

          let datas = await this.nftContract.methods.NFTDetails(nftId).call({
            from: store.getters.currentWalletAddress
          })


          
          let heroData = analysis(datas[0].dna)
          if (heroData) {
            nftArray.push(heroData)
            console.log("heroData", heroData);
          }
        }
        console.log("nftArray", nftArray);
        // this.playerList = nftArray
        this.setData(nftArray)
      } catch (error) {
        this.isMask = false;
      }

    },
    loadExcels(callback) {
      loadMaps(callback)
    },
    async getBoxNum() {
      let currentWalletAddress = store.getters.currentWalletAddress
      if (!currentWalletAddress) return
      let boxNum = await this.boxContract.methods.balanceOf(currentWalletAddress).call({
        from: currentWalletAddress
      })
      return parseInt(boxNum)
    },
  }
}
export default transaction
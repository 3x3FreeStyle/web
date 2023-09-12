<template>
  <div class="assets">
    <div class="assets_frame">
      <div class="frame_munes">
        <button
          class="frame_munes_me"
          :class="isMe ? 'frame_munes_select' : ''"
          @click="isMe = true"
        >
          <p>ME</p>
        </button>
        <button
          class="frame_munes_asset"
          :class="!isMe ? 'frame_munes_select' : ''"
          @click="isMe = false"
        >
          <p>ASSET</p>
        </button>
        <button class="frame_munes_logout" @click="onClickLogout">
          <p>LOGOUT</p>
        </button>
      </div>
      <div v-if="isMe" class="frame_content_me">
        <div class="content_me_account">
          <div class="me_account_title">
            <h3>A</h3>
            <p>CCOUNT</p>
            <div id="title">
              <p>LOG</p>
            </div>
          </div>
          <div class="me_account_log">
            <p
              class="account_log_frame"
              v-for="(item, index) in logList"
              :key="index"
            >
              {{ item.time }}
              <span>
                {{ item.log }}
              </span>
            </p>
          </div>
        </div>
        <div class="content_me_address">
          <div class="me_address_wallet">
            <div class="address_wallet_title">
              <p>Wallet address</p>
            </div>
            <input readonly='readonly' type="text" v-model="walletAddress" />
            <div class="address_wallet_btn">
              <p
                v-clipboard="() => walletAddress"
                v-clipboard:success="onCopyWalletAddress"
              ></p>
            </div>
          </div>
          <div class="me_address_deposit">
            <div class="address_wallet_title">
              <p>Deposit address</p>
            </div>
            <input type="text" v-model="currencyAddress" />
            <div class="address_wallet_btn">
              <p
                v-clipboard="() => currencyAddress"
                v-clipboard:success="onCopyCurrencyAddress"
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="frame_content_asset">
        <div class="content_asset_btns">
          <button
            class="asset_btns_player"
            :class="assetIndex == 1 ? 'asset_btns_select' : ''"
            @click="onClickPlayer"
          >
            PLAYER
          </button>
          <button
            class="asset_btns_skill"
            :class="assetIndex == 2 ? 'asset_btns_select' : ''"
            @click="onClickSkill"
          >
            SKILL
          </button>
          <button
            class="asset_btns_pack"
            :class="assetIndex == 3 ? 'asset_btns_select' : ''"
            @click="onClickPack"
          >
            PACK
          </button>
        </div>
        <div class="content_asset_filter" id="box">
          <filterBox
            :pullDownList="pullDownList"
            :checkBoxList="checkBoxList"
          ></filterBox>
        </div>
        <div class="content_asset_content">
          <assetItem
            :itmeList="itemList"
            :selectContent="assetIndex"
          ></assetItem>
        </div>
      </div>
    </div>
    <loading v-show="isMask" />
  </div>
</template>

<script>
import assetItem from "@/components/assetItem";
import filterBox from "@/components/filterBox";
// import { setHeroData } from "@/utils/common";
import { transaction } from "@/wallet/web3";
import { sendlogout } from "@/apis/login.js";
import store from "@store/index";
export default {
  name: "assets",
  data() {
    return {
      isMe: true,
      assetIndex: 1,
      isMask: true,
      walletAddress: store.getters.currentWalletAddress,
      currencyAddress: "",
      itemList: [],
      logList: [
        // {
        //   time: "July 7 #15:",
        //   log: " 100 BPT transfer to 0xad...",
        // },
        // {
        //   time: "July 7 #16:",
        //   log: " 100 BPT transfer to 0xad...",
        // },
        // {
        //   time: "July 7 #17:",
        //   log: " 100 BPT transfer to 0xad...",
        // },
        // {
        //   time: "July 7 #18:",
        //   log: " 100 BPT transfer to 0xad...",
        // },
      ],
      playerList: [],
      skillList: [
        // {
        //   heroRarity: require("@/assets/web/assets/asset/skill/skill1.png"),
        // },
        // {
        //   heroRarity: require("@/assets/web/assets/asset/skill/skill2.png"),
        // },
        // {
        //   heroRarity: require("@/assets/web/assets/asset/skill/skill3.png"),
        // },
        // {
        //   heroRarity: require("@/assets/web/assets/asset/skill/skill4.png"),
        // },
      ],
      packList: [
        // {
        //   heroRarity: require("@/assets/web/assets/asset/pack/pack1.png"),
        //   num:999
        // },
        // {
        //   heroRarity: require("@/assets/web/assets/asset/pack/pack2.png"),
        //   num:999
        // },
        // {
        //   heroRarity: require("@/assets/web/assets/asset/pack/pack3.png"),
        //   num:999
        // },
        // {
        //   heroRarity: require("@/assets/web/assets/asset/pack/pack4.png"),
        //   num:99
        // },
      ],
      pullDownList: [
        {
          id: 1,
          name: "Recently Acquired",
        },
        {
          id: 2,
          name: "Rarity",
        },
      ],
      checkBoxList: [
        { name: "PG", select: false },
        { name: "SG", select: false },
        { name: "SF", select: false },
        { name: "PF", select: false },
        { name: "CF", select: false },
        { name: "C", select: false },
      ],
    };
  },
  mixins: [transaction],
  components: {
    assetItem,
    filterBox,
  },
  async mounted() {
    this.itemList = this.playerList;
    // alert(document.body.clientWidth)
    await this.loadExcels(() => {});

    if (store.getters.currentWalletAddress) {
      await this.getAbis();
      this.getBoxNum()
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
          this.isMask = false;
        });
      await this.getAllNFTs();
    } else {
      this.isMask = false;
    }
  },
  methods: {
    onClickPlayer() {
      this.assetIndex = 1;
      this.itemList = [];
      this.itemList = this.playerList;
    },
    onClickSkill() {
      this.assetIndex = 2;
      this.itemList = [];
      this.itemList = this.skillList;
    },
    onClickPack() {
      this.assetIndex = 3;
      this.itemList = [];
      this.itemList = this.packList;
    },
    onClickLogout() {
      sendlogout()
        .then((res) => {
          this.$emit("logOut", false);
        })
        .catch((err) => {
          console.log(err);
          this.$emit("logOut", false);
        });
    },
    setData(code) {
      for (let i = 0; i < code.length; i++) {
        let data = {
          name: code[i].heroName,
          heroRarity: require("@/assets/web/assets/asset/player/bg" +
            code[i].heroRarity +
            ".png"),
          heroId: require("@/assets/web/assets/asset/player/hero" +
            code[i].heroID +
            ".png"),
        };
        this.playerList.push(data);
      }
      this.isMask = false;
    },
    onCopyWalletAddress() {
      this.clipboardSuccessHandler();
    },
    onCopyCurrencyAddress() {
      this.clipboardSuccessHandler();
    },
    clipboardSuccessHandler() {
      this.$popup.show({ text: "Copy successfully" });
    },
  },
};
</script>

<style lang="scss" scoped>
.assets {
  width: 100%;
  height: 100%;
  background: url("../assets/web/assets/bg.webp") no-repeat center/cover;
  overflow: hidden;
  .assets_frame {
    position: relative;
    margin-top: 27px;
    margin-left: 110px;
    width: 2163px;
    height: 1293px;
    background: url("../assets/web/assets/frame.webp") no-repeat center/cover;
    .frame_munes {
      position: absolute;
      top: 161px;
      left: 24px;
      width: 250px;
      // height: 228px;
      height: 680px;
      // background-color: aquamarine;
      transform: rotate(-3deg);
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      .frame_munes_me,
      .frame_munes_asset,
      .frame_munes_logout {
        border-style: none;
        width: 206px;
        height: 71px;
        background: url("../assets/web/assets/left_btn.png") no-repeat
          center/cover;
        > P {
          margin-left: 25px;
          font-size: 30px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #000000;
        }
      }
      .frame_munes_logout {
        margin-top: 420px;
      }
      .frame_munes_select {
        width: 248px;
        height: 95px;
        background: url("../assets/web/assets/left_btn_select.png") no-repeat
          center/cover;
        > P {
          font-size: 40px;
          color: #ffffff;
        }
      }
    }
    .frame_content_me {
      position: relative;
      top: 182px;
      left: 277px;
      width: 1409px;
      height: 649px;
      //   background-color: rgba(222, 184, 135, 0.514);
      .content_me_account {
        position: absolute;
        left: -64px;
        top: 47px;
        width: 651px;
        height: 591px;
        background: url("../assets/web/assets/me/account.webp") no-repeat
          center/cover;
        // background-size: 100%;
        .me_account_title {
          width: 60%;
          height: 50px;
          margin: auto;
          margin-top: -20px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          > h3 {
            font-size: 40px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #000000;
          }
          > p {
            font-size: 30px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #000000;
            line-height: 60px;
          }
          #title {
            transform: rotate(5deg);
            margin-left: 10px;
            width: 90px;
            height: 50px;
            background-color: #ff0000;
            border-radius: 10%;
            > p {
              font-size: 30px;
              font-family: MStiffHei PRC;
              font-weight: 800;
              color: #ffffff;
              line-height: 50px;
            }
          }
        }
        .me_account_log {
          margin: auto;
          margin-top: 60px;
          padding-left: 25px;
          width: 52%;
          height: 380px;
          //   background-color: #ff000073;
          overflow-y: auto;
          .account_log_frame {
            margin: 5px 0;
            font-size: 17px;
            font-family: AkzidenzGrotesk;
            font-weight: 400;
            color: #ffffff;
            text-align: left;
            > span {
              font-size: 17px;
              font-family: AkzidenzGrotesk;
              font-weight: 400;
              color: #000000;
            }
          }
        }
        .me_account_log::-webkit-scrollbar {
          width: 5px;
          background: url("../assets/web/assets/scroll.png") no-repeat
            center/cover;
        }
        .me_account_log::-webkit-scrollbar-thumb {
          width: 5px;
          height: 41px;
          background: url("../assets/web/assets/scroll_index.png") no-repeat
            center/cover;
        }
      }
      .content_me_address {
        position: absolute;
        left: 483px;
        top: 70px;
        width: 707px;
        height: 429px;
        // background-color: rgba(95, 158, 160, 0.616);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .me_address_wallet,
        .me_address_deposit {
          width: 100%;
          height: 207px;
          //   background-color: rgba(137, 43, 226, 0.671);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .address_wallet_title {
            align-self: flex-start;
            width: 294px;
            height: 57px;
            background: url("../assets/web/assets/me/title.png") no-repeat
              center/cover;
            > p {
              padding-top: 28px;
              padding-left: 45px;
              font-size: 20px;
              font-family: AkzidenzGrotesk;
              font-weight: 400;
              color: #000000;
            }
          }
          > input {
            margin-left: 31px;
            padding-left: 20px;
            width: 676px;
            height: 40px;
            background-color: #000000;
            font-size: 16px;
            font-family: AkzidenzGrotesk;
            font-weight: 400;
            color: #ffffff;
          }
          .address_wallet_btn {
            align-self: flex-end;
            width: 219px;
            height: 95px;
            background: url("../assets/web/assets/me/copy.png") no-repeat
              center/cover;
            > p {
              margin: auto;
              margin-top: 25px;
              width: 90%;
              height: 45px;
            }
          }
        }
      }
    }
    .frame_content_asset {
      position: relative;
      top: 163px;
      left: 220px;
      width: 1522px;
      height: 749px;
      background: url("../assets/web/assets/asset/frame.png") no-repeat
        center/cover;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .content_asset_btns {
        margin-top: 44px;
        margin-left: -140px;
        width: 1200px;
        height: 73px;
        // background-color: rgba(255, 140, 0, 0.685);
        display: flex;
        justify-content: flex-start;
        .asset_btns_player,
        .asset_btns_skill,
        .asset_btns_pack {
          transform: rotate(0.3deg);
          border-style: none;
          width: 233px;
          height: 73px;
          background: url("../assets/web/assets/asset/btn.png") no-repeat
            center/cover;

          font-size: 30px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #000000;
        }
        .asset_btns_select {
          background: url("../assets/web/assets/asset/btn_select.png") no-repeat
            center/cover;
          color: #ffffff;
        }
      }
      .content_asset_filter {
        margin-top: 14px;
        margin-left: -120px;
        width: 1100px;
        height: 71px;
        // background-color: rgba(243, 240, 44, 0.671);
      }
      .content_asset_content {
        margin-top: 45px;
        margin-left: -20px;
        width: 1000px;
        height: 330px;
        // background-color: rgba(212, 69, 44, 0.61);
      }
    }
  }
}
@media all and (orientation: portrait) {
  .assets {
    overflow-y: auto;
    .assets_frame {
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      top: 200px;
      width: 750px;
      height: 1350px;
      background: url("../assets/h5/assets/frame.png") no-repeat center/cover;
      .frame_munes {
        width: 700px;
        height: 88px;
        top: 20px;
        left: 70px;
        transform: rotate(0deg);
        flex-direction: row;
        .frame_munes_me,
        .frame_munes_asset,
        .frame_munes_logout {
          width: 176px;
          height: 75px;
          background: url("../assets/h5/assets/left_btn.png") no-repeat
            center/cover;
          > p {
            font-size: 25px;
            margin-left: 0;
          }
        }
        .frame_munes_select {
          width: 210px;
          height: 87px;
          background: url("../assets/h5/assets/left_btn_select.png") no-repeat
            center/cover;
        }
      }
      .frame_content_me {
        top: 80px;
        left: 50%;
        width: 700px;
        height: 1050px;
        // zoom: 80%;
        transform: translateX(-50%) scale(0.8);
        // background-color: rgba(113, 51, 170, 0.507);
        .content_me_address {
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 707px;
          height: 429px;
        }
        .content_me_account {
          top: 580px;
          left: 50%;
          transform: translateX(-50%);
          width: 505px;
          height: 416px;
          background: url("../assets/h5/assets/frame2.png") no-repeat
            center/cover;
          .me_account_title {
            display: none;
          }
          .me_account_log {
            width: 400px;
            height: 350px;
            margin-top: 40px;
            padding-left: 0;
            .account_log_frame {
              color: #000000;
              font-size: 22px;
              > span {
                font-size: 22px;
              }
            }
          }
          .me_account_log::-webkit-scrollbar {
            background: url("../assets/web/assets/scroll_index.png") no-repeat
              center/cover;
          }
          .me_account_log::-webkit-scrollbar-thumb {
            background: url("../assets/h5/assets/scroll.png") no-repeat
              center/cover;
          }
        }
      }
      .frame_content_asset {
        background: none;
        // background-color: burlywood;
        top: 140px;
        left: 50%;
        transform: translateX(-50%);
        width: 600px;
        height: 1050px;
        .content_asset_btns {
          margin: 0;
          margin-top: 31px;
          width: 80%;
          height: 53px;
          justify-content: center;
          .asset_btns_player,
          .asset_btns_skill,
          .asset_btns_pack {
            width: 165px;
            height: 53px;
            background: url("../assets/h5/assets/menu_btn.png") no-repeat
              center/cover;
          }
          .asset_btns_select {
            background: url("../assets/h5/assets/menu_btn_select.png") no-repeat
              center/cover;
            color: #ffffff;
          }
        }
        .content_asset_filter {
          margin: 0;
          width: 524px;
          height: 172px;
          background: url("../assets/h5/assets/frame3.png") no-repeat
            center/cover;
        }
        .content_asset_content {
          width: 509px;
          height: 574px;
          background: url("../assets/h5/assets/frame4.png") no-repeat
            center/cover;
          background-size: 100%;
        }
      }
    }
  }
}
</style>

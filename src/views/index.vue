<template>
  <div class="layout" @click="picker_all">
    <div class="log_top">
      <div class="log_logo" @click="onClicklogo"></div>
      <div class="log_menu">
        <div
          v-for="(item, index) in menus"
          :key="index"
          @click="onClickMenu(item)"
        >
          <p class="top_menu_text1">{{ item.name }}</p>
          <p class="top_menu_text2" :class="{ top_menu_text3: item.select }">
            {{ item.name }}
          </p>
        </div>
      </div>
      <!-- <div class="log_topshot"></div> -->
      <div class="china_select">
        <p :style="chain=='0x66eed'?'color:#ffd207':''" @click="changeChin('0x66eed')">Arbitrum</p>
        <p :style="chain=='0x15eb'?'color:#ffd207':''" @click="changeChin('0x15eb')">opBNB</p>
      </div>
      <div v-if="!isConnect" class="log_login" @click="toLogin()">
        <p>LOGIN</p>
      </div>
      <div v-else class="top_login_account" @click="onClickIcon"></div>
    </div>

    <div class="mobile_top" id="box" @click.self="picker_show_menu = false">
      <div class="china_select" :style="chinaSelectShow?'height:250px':''" @click.self="chinaSelectShow = false">
        <div class="title" @click="chinaSelectShow=!chinaSelectShow">{{chain=='0x66eed'?'Arbitrum':'opBNB'}}</div>
        <div class="line">
          <p :style="chain=='0x66eed'?'color:#ffd207':''" @click="changeChin('0x66eed')">Arbitrum</p>
        <p :style="chain=='0x15eb'?'color:#ffd207':''" @click="changeChin('0x15eb')">opBNB</p>
        </div>
  
      </div>
      <img
        class="mobile_top_menu"
        src="../assets/h5/index/mobile_menus.png"
        alt=""
        @click="picker_show_menu = !picker_show_menu"
      />
      <img
        class="mobile_top_logo"
        src="../assets/h5/index/mobile_logo.png"
        alt=""
      />
      <!-- <div class="log_topshot_mobile" @click="showtips"></div> -->
      <img
        v-if="!isConnect"
        @click="toLogin()"
        class="mobile_top_wallet"
        src="../assets/h5/index/mobile_account.png"
        alt=""
      />
      <img
        v-else
        @click="toLogin()"
        class="mobile_top_assets"
        src="../assets/web/index/index_head.png"
        alt=""
      />
      <div v-if="picker_show_menu" class="mobile_top_menus">
        <div
          v-for="(item, index) in menus"
          :key="index"
          @click="onClickMenu(item)"
          class="menu_box"
        >
          <div class="mobile_top_menus_item" :class="item.select?'mobile_top_menus_select':''">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <router-view @logOut="logOut" />
  </div>
</template>

<script>
import {
  detect,
  // setLoginOutCallBack,
  cleanLoginState,
  initWalletEventListener,
  removeWalletEventListener,
  initCallBacks,
} from "@/wallet/detectProvider.js";
import Web3 from "web3";
import { sendlogout } from "@/apis/login.js";
import { changeChain } from "@/wallet/metamask";
import store from "@/store";
export default {
  data() {
    return {
      chinaSelectShow:false,
      menus: [
        { name: "HOME", select: true, path: "/home" },
        { name: "PRE SALE", select: false, path: "/presale" },
        { name: "PACK", select: false, path: "/pack" },
        { name: "WHITEPAPER", select: false, path: "/" },
      ],
      isConnect: false,
      isShowWallet: true,
      isShowAssetsMenu: false,
      picker_show_menu: false,
    };
  },
  computed:{
    chain:()=>{
      return store.getters.chainId
    }
  },
  watch: {
    $route(to) {
      if (to.path == "/assets" || to.path == "/wallet") {
        this.isShowAssetsMenu = true;
      } else {
        this.isShowAssetsMenu = false;
      }
      for (let index = 0; index < this.menus.length; index++) {
        const item = this.menus[index];
        if (to.path == item.path) {
          item.select = true;
        } else item.select = false;
      }
    },
  },
  mounted() {
    this.menus.map((val) => {
      if (val.name.toLowerCase().replace(/[ ]/g, "") === this.$route.name) {
        val.select = true;
      } else {
        val.select = false;
      }
    });
    if (this.$route.query.active) {
      this.isShowAssetsMenu = true;
      switch (this.$route.query.tab) {
        case "1":
          this.isShowWallet = true;
          break;
        case "2":
          this.isShowWallet = false;
          break;
      }
    }
    
    this.initWalletCallBack();
    this.checkInviteCode();
    this.checkWalletState();
    initWalletEventListener();
    this.$bus.$on("loginpass", () => {
      this.connectWallet();
    });
  },
  methods: {
    changeChin(e){
      this.$store.commit("setChinaId", e);
      changeChain()
      this.chinaSelectShow = false
    },
    showtips(){
        this.$popup.show({ title: "Tips", text: "Coming Soon" });
    },
    onClickMenu(item) {
      if (item.name != "WHITEPAPER") {
        this.menus.map((val) => {
          if (val.name === item.name) {
            val.select = true;
            this.$router.push(item.path);
            this.picker_show_menu = false
          } else {
            val.select = false;
          }
        });
      } else {
        // window.open("https://bil-bil.gitbook.io/basketball-is-life/");
        this.picker_show_menu = false
      }
    },
    toLogin() {
      if(this.isConnect){
        this.$router.push("/assets");
      }else{
        this.$router.push("/login");
      }
      
    },
    onClicklogo() {
      this.$router.push("/");
    },
    initWalletCallBack() {
      initCallBacks(this.connectWallet, this.showWalletTips, this.logOut);
    },
    checkInviteCode() {
      if (this.$route.query.inviteCode) {
        this.$store.commit("setInviteCode", this.$route.query.inviteCode);
      } else {
        this.$store.commit("setInviteCode", "");
      }
    },
    connectWallet() {
      this.isConnect = true;

      this.$bus.$emit("isConnected", false);
    },
    showWalletTips(message) {
      this.$popup.show({ title: "Tips", text: message });
    },
    logOut(val) {
      console.log("logOutOutOut",val);
      cleanLoginState();
      this.isConnect = val;
      this.$router.push("/");
    },
    async checkWalletState() {
      if (window.ethereum === undefined) {
        this.isConnect = false;
        cleanLoginState();
      } else {
        if (this.$store.getters.isConnectWallet === false) {
          this.isConnect = false;
        } else {
          this.isConnect = true;
          // let web = new Web3(window.ethereum);
          // const accounts = await web.eth.getAccounts();
          // console.log("getAccounts", accounts);
          // if (accounts.length === 0) {
          //   this.isConnect = false;
          //   cleanLoginState();
          // }
        }
      }
    },
    onClickLogin() {
      this.$router.push("/login");
    },
    // onClickDownload() {
    //   this.$bus.$emit('download')
    // },
    onClickLogoback() {
      this.$router.push("/");
    },
    onClickIcon() {
      this.$router.push("/assets");
    },
    onClickWallet() {
      this.$router.push("/wallet?active=" + 1 + "&tab=" + 1);
      this.isShowWallet = true;
    },
    onClickAssets() {
      this.$router.push("/assets?active=" + 1 + "&tab=" + 2);
      this.isShowWallet = false;
    },
    onClickLogout() {
      console.log("Logout");
      sendlogout()
        .then((res) => {
          console.log(res);
          // this.$router.push("/home");
          // this.$bus.$emit('logout')
          this.logOut(false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    picker_all(event) {
      var one = document.getElementById("box");
      if (one) {
        if (!one.contains(event.target)) {
          this.picker_show_menu = false;
          this.chinaSelectShow = false
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  .log_top {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 86px;
    background: url("../assets/web/index/index_nav_bg.png") no-repeat
      center/cover;
    z-index: 100;
    .china_select{
          width: 170px;
          height: 50px;
          position: absolute;
          right: 220px;
          top:30px;
          display: flex;
          justify-content: space-between;
          >p{
            color: white;
            font-size: 20px;
            font-weight: 700;
          }
        }
    .log_logo {
      width: 182px;
      height: 183px;
      background: url("../assets/web/index/index_nav_logo.png") no-repeat
        center/cover;
      margin-left: 41px;
    }
    .log_menu {
      height: 100%;
      display: flex;
      
      > div {
        margin: 0 80px;
        > p {
          font-size: 24px;
          font-family: MStiffHei PRC;
          font-weight: 400;
          color: #ffffff;
          line-height: 86px;
        }
        .top_menu_text2 {
          position: absolute;
          top: 0;
        }
        .top_menu_text3 {
          color: #ffd207;
          // text-shadow: 0px 4px 0px rgba(0, 0, 0, 0.8);
        }
    
      }

    }
    .log_login {
      height: 86px;
      margin-right: 109px;
      P {
        font-size: 24px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        color: #ffd207;
        line-height: 86px;
      }
    }
    .top_login_account {
      width: 86px;
      height: 86px;
      background: url("../assets/web/index/index_head.png") no-repeat
        center/cover;
      background-size: 70% 70%;
      margin-right: 109px;
    }
  }
  // .log_topshot {
  //   width: 157px;
  //   height: 86px;
  //   background: url("../assets/web/index/index_nav_topshot.png") no-repeat
  //     center/cover;
  //   &:hover {
  //     background: url("../assets/web/index/index_topshot.png") no-repeat
  //       center/cover;
  //   }
  // }
}
.layout {
  .mobile_top {
    display: none;
  }
}

@media all and (orientation: portrait) {
  .layout {
    width: 100%;
    width: 100%;
    .log_top {
      display: none;
    }
    .mobile_top {
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 127px;
      background: url("../assets/web/index/index_nav_bg.png") no-repeat
        center/cover;
      z-index: 100;
      .china_select{
        width: 200px;
        height: 85px;
        position: absolute;
        right: 100px;
        overflow: hidden;
        top:40px;
        .title{
          width: 200px;
          height: 85px;
          line-height: 70px;
          color: #ffd207;
          font-size: 30px;
        }
        .line{
          width: 200px;
          height: 150px;
          background-color: rgba(24, 27, 22,1);

        }
        p{
          height: 80px;
          line-height: 70px;
          color: white;
          font-size: 30px;
        }
      }
      .mobile_top_menu {
        margin-left: 26px;
        width: 58px;
        height: 46px;
      }
      .mobile_top_logo {
        width: 115px;
        height: 118px;
      }
      .mobile_top_wallet,
      .mobile_top_assets {
        margin-right: 29px;
        width: 62px;
        height: 62px;
      }
      .mobile_top_menus {
        position: absolute;
        left: 26px;
        top: 105px;
        width: 300px;
        height: 600px;
        background-color: rgba(24, 27, 22, 0.329);
        
        .mobile_top_menus_item {
          position: relative;
          width: 100%;
          height: 150px;
          background-color: #22180B;
          color: ghostwhite;
          font-weight: 700;
          line-height: 150px;
          font-size: 40px;
          &::after{
            position: absolute;
            content: '';
            width: 90%;
            height: 2px;
            background: url("../assets/h5/login/line.png") no-repeat center/cover;
            background-size: 100% 100%;
            left: 50%;
            bottom: -1px;
            transform: translateX(-50%);
          }
        }
        

        .mobile_top_menus_select {
          background-color: #FDCE1B;
        }
      }
      .menu_box:nth-child(4){
        .mobile_top_menus_item{
          &::after{
            position: absolute;
            content: '';
            display: none;
          }
        }
      }
    }
    // .log_topshot_mobile {
    //   width: 157px;
    //   height: 86px;
    //   background: url("../assets/web/index/index_nav_topshot.png") no-repeat
    //     center/cover;
    // }
  }
}
</style>
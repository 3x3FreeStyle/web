<template>
  <div class="login">
    <div class="login_view"></div>
    <div class="title" v-show="loginState == 0 || loginState == 1"></div>
    <div class="title1" v-show="loginState == 3"></div>
    <div class="title2" v-show="loginState == 2"></div>
    <div class="login_content">
      <!-- 选择登录界面 -->
      <div class="chooselogin" v-if="loginState == 0">
        <div class="choose">
          <p class="titletext">Login or Register using your wallet</p>
          <div class="wallet" @click="chooseWallet()">
            <p id="up">Connect wallet</p>
            <p id="down">Connect wallet</p>
          </div>
          <!-- <p class="or">or</p>
          <div class="email" @click="chooseEmail()">
            <p id="up">Login Via Email</p>
            <p id="down">Login Via Email</p>
          </div>
          <div class="btn_register" @click="onclickRegister">
            <p>Create Account</p>
          </div> -->
        </div>
      </div>
      <!-- 登录 -->
      <div v-if="loginState == 1" class="login_enter">
        <div
          class="login_back"
          @click="onClickGoBack"
          v-show="isShowBack"
        ></div>
        <div class="enter_info">
          <el-form
            :model="loginRuleForm"
            status-icon:false
            :rules="rules"
            ref="loginRuleForm"
            label-width="100px"
            class="demo-loginRuleForm"
          >
            <el-form-item label="" prop="email">
              <el-input
                v-model="loginRuleForm.email"
                placeholder="Email address"
              ></el-input>
            </el-form-item>
            <el-form-item label="" prop="pass">
              <el-input
                v-model="loginRuleForm.pass"
                placeholder="Password"
                id="input_code"
                type="password"
                oninput="if(value.length>16)value=value.slice(0,16)"
              ></el-input>
              <img :src="imgUrl" alt="" id="login_img" @click="hideShowPsw" />
              <p @click="onClickForgetPassword">Forget password</p>
            </el-form-item>
          </el-form>
        </div>
        <div class="enten_btn">
          <div class="btn_b" @click="onClickLogin('loginRuleForm')">
            <p>LOGIN</p>
          </div>
          <!-- <p class="or">or</p>
          <div class="btn_b2" @click="onClickChooseWallet">
            <p>CHOOSE WALLET</p>
          </div> -->
        </div>
      </div>

      <!-- 注册-找回密码 -->
      <div v-if="loginState == 2 || loginState == 3" class="login_mailbox">
        <div
          class="login_back"
          @click="onClickGoBack"
          v-show="isShowBack"
        ></div>
        <el-form
          :model="ruleForm"
          status-icon:false
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item> </el-form-item>
          <el-form-item label="" prop="email">
            <el-input v-model="ruleForm.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item label="" prop="code">
            <el-input
              class="code_input"
              v-model="ruleForm.code"
              placeholder="Verification code"
            ></el-input>
            <el-button
              v-if="!isClickCode"
              class="code_button"
              type="text"
              @click="onClickSendCode('ruleForm', loginState)"
            >
              <p id="up">Send</p>
              <p id="down">Send</p>
            </el-button>
            <el-button v-else class="code_button_click" type="text">
              <p>{{ codeTime }}</p>
            </el-button>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="Enter your password"
              oninput="if(value.length>16)value=value.slice(0,16)"
            >
              ></el-input
            >
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              placeholder="Confirm password"
              oninput="if(value.length>16)value=value.slice(0,16)"
            >
              ></el-input
            >
          </el-form-item>

          <el-form-item>
            <el-button
              class="submit_btn"
              type="text"
              @click="submitForm('ruleForm', loginState)"
              >Submit</el-button
            >
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="login_back" @click="onClickGoBack" v-show="isShowBack"></div> -->
    <sharePop
      :setClose="isShowWalletPop"
      :setWidth="58.75"
      :setHeight="34.125"
      @popup_close="popup_close"
    >
      <div class="wallet_pop">
        <div class="close" @click="isShowWalletPop = false"></div>
        <div class="wallet_pop_title">
          <p id="up">CHOOSE WALLET</p>
          <p id="down">CHOOSE WALLET</p>
        </div>
        <div class="wallet_pop_content">
          <div
            class="wallet_pop_content_index"
            v-for="(item, index) in walletList"
            :key="index"
            @click="onClickWalletSelectState(index)"
          >
            <img class="content_index_icon" :src="item.icon" alt="" />
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </sharePop>
  </div>
</template>

<script>
import {
  detect,
  getChainId,
  sendGetWeb3Token,
  userLogin,
} from "@/wallet/detectProvider.js";
import {utf8ToHex} from 'web3-utils';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { getChainInfo } from "../wallet/chain";
import { changeChain } from "@/wallet/metamask";
import {
  sendVerificationCode,
  sendRegisterAccount,
  sendLogin,
  sendFindPass,
  sendForgetCode,
} from "@/apis/login.js";
import sharePop from "@/components/sharePop";
import store from "@/store";
console.log(process.env.NODE_ENV)
let chainConfig = getChainInfo(process.env.NODE_ENV);
let martic = chainConfig;
let rpcUrl = martic.rpcUrl;
let network = martic.ETHNETWORK;

export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter the verification code"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter Your Password"));
      } else {
        var filter = /^(?=.*[a-z])(?=.*\d)[^]{8,16}$/;
        var judge = filter.test(value);
        if (!judge) {
          callback(
            new Error(
              "Password should be 8-16 digits and contain numbers and letters"
            )
          );
        } else if (this.ruleForm.checkPass !== "" && this.loginState != 0) {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter password again"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("The two passwords do not match"));
      } else {
        callback();
      }
    };
    return {
      imgUrl: require("@/assets/web/login/login_hide.png"),
      loginRuleForm: {
        email: "",
        pass: "",
      },
      ruleForm: {
        email: "",
        code: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please enter the email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Incorrect E-mail address format",
            trigger: "blur",
          },
        ],
        code: [{ validator: checkCode, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      walletList: [
        {
          icon: require("@/assets/web/login/wallet/wallet_metamask.png"),
          text: "Metamask",
        },
        {
          icon: require("@/assets/web/login/wallet/wallet_trust.png"),
          text: "WalletConnect",
        },
      ],
      loginState: 0,
      isShowWalletPop: false,
      isClickCode: false,
      codeTime: 60,
      codeTimer: null,
      isEmail: false,
      isSubmit: false,
      isRegister: false,
      isShowBack: false,
      // isMobile:false,
    };
  },
  components: {
    sharePop,
  },
  computed: {
    isMobile() {
      this.$store.commit("setMobile");
      return this.$store.state.isMobile;
    },
    from() {
      return this.$route.query.from || "/assets";
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.query.active == 0) {
          this.loginState = 0;
        }  else if (val.query.active == 1 && val.query.tab == 1) {
          this.loginState = 1;
          this.isRegister = false;
        } else if (val.query.active == 2 && val.query.tab == 2) {
          this.loginState = 2;
          this.isRegister = true;
        } else if (val.query.active == 3 && val.query.tab == 3) {
          this.loginState = 3;
          this.isRegister = false;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.$bus.$on("isConnected", (judge) => {
      this.isShowWalletPop = judge;
      this.$router.push("/");
    });

    if (this.$route.query.active) {
      this.isShowBack = true;
      this.loginState = this.$route.query.active;

      switch (this.$route.query.tab) {
        case "1":
          this.isRegister = false;
          break;
        case "2":
          this.isRegister = true;
          break;
      }
    }
  },
  methods: {
    hideShowPsw() {
      let input_code = document.getElementById("input_code");
      if (input_code.type == "password") {
        input_code.type = "text";
        this.imgUrl = require("@/assets/web/login/login_show.png");
      } else {
        input_code.type = "password";
        this.imgUrl = require("@/assets/web/login/login_hide.png");
      }
    },
    submitForm(formName, state) {
      this.checkAllInfo(formName);
      if (!this.isSubmit) {
        return;
      }
      if (state == 3) {
        let registerInfo = {
          channelCode: "",
          code: this.ruleForm.code,
          inviteCode: "",
          mail: this.ruleForm.email,
          password: this.ruleForm.pass,
        };
        sendRegisterAccount(registerInfo)
          .then((res) => {
            this.$popup.show({
              title: "Tips",
              text: "Account registration success!",
            });
            // this.$popup.show({
            //   title: "Congratulations",
            //   text: "registration success",
            //   btnFunLeft: this.backToLogin,
            // });
          })
          .catch((err) => {
            this.$popup.show({
              title: "Tips",
              text: "Failed to register the account!",
            });
          });
      } else if (state == 2) {
        let findPass = {
          account: this.ruleForm.email,
          code: this.ruleForm.code,
          mail: this.ruleForm.email,
          newPassword: Buffer.from(this.ruleForm.pass).toString("base64"),
        };
        sendFindPass(findPass)
          .then((res) => {
            console.log(res);
            this.$popup.show({
              title: "Congratulations",
              text: "Password reset complete",
              btnFunLeft: this.backToLogin,
            });
          })
          .catch((err) => {
            this.$popup.show({ title: "Tips", text: "Reset password failed!" });
            console.log(err);
          });
      }
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    onClickGoBack() {
      this.clearInterval();
      if (this.loginState == 2) {
        this.isShowBack = true;
        this.changeIndex(1);
        // this.loginState = 0;
        return;
      } else if (
        this.loginState == 3 ||
        this.loginState == 1
      ) {
        this.isShowBack = false;
        this.changeIndex(0);
        return;
      }
      this.$router.go(-1);
    },
    onClickLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loginInfo = {
            account: this.loginRuleForm.email,
            channelCode: "",
            credit: Buffer.from(this.loginRuleForm.pass).toString("base64"),
            inviteCode: "",
          };
          sendLogin(loginInfo)
            .then((res) => {
              console.log("res", res);
              // store.commit("setUserToken", res.data.token);
              console.log("setUserToken", store.state.userToken);
              this.$router.push("/home");
              this.$bus.$emit("loginpass");
              store.commit("setIsConnectWallet", true);
              store.commit("setUserToken", res.data.token);
              store.commit("setSelfInviteCode", res.data.inviteCode);
            })
            .catch((err) => {
              console.log(err);
              this.$popup.show({ title: "Tips", text: "Login failed!" });
            });
        }
      });
    },
    onClickChooseWallet() {
      this.isShowWalletPop = true;
    },
    onClickSendCode(formName, state) {
      this.checkEmail(formName);
      if (!this.isEmail) {
        return;
      }

      if (state == 3) {
        this.checkAllInfo("ruleForm");
        sendVerificationCode(this.ruleForm.email)
          .then((res) => {
            this.$popup.show({
              title: "Tips",
              text: "We have sent a code to your email address!",
            });
          })
          .catch((err) => {
            this.$popup.show({
              title: "Tips",
              text: "Failed to send the code!",
            });
          });
      } else if (state == 2) {
        sendForgetCode(this.ruleForm.email)
          .then((res) => {
            console.log(res);
            this.$popup.show({
              title: "Tips",
              text: "We have sent a code to your email address!",
            });
          })
          .catch((err) => {
            console.log(err);
            this.$popup.show({
              title: "Tips",
              text: "Failed to send the code!",
            });
          });
      }
      this.isClickCode = true;
      this.codeInterval();
    },
    onClickWalletSelectState(index) {
      switch (index) {
        case 0:
          localStorage.setItem("wallet", "Metamask");
          if (this.$store.getters.isConnectWallet === true && this.isConnect) {
            this.$router.push("/");
          } else {
            if (window.ethereum != undefined) {
              changeChain().then(()=>{
                detect();
              })
            } else {
              this.$store.commit("setInstallWalletState", 0);
              if (this.isMobile) {
                window.location.href =
                  "https://metamask.app.link/dapp/www.gamifylabs.io/";
              } else {
                this.$popup.show({
                  title: "Tips",
                  text: "Please install wallet!",
                });
              }
            }
          }
          break;
        case 1:
          localStorage.setItem("wallet", "Walletconnect");
          this.walletConnectLogin();
      }
    },
    async walletConnectLogin() {
      if (localStorage.getItem("walletconnect")) {
        localStorage.removeItem("walletconnect");
      }
      const obj = {};
      obj[network] = rpcUrl;
      const provider = new WalletConnectProvider({
        rpc: obj,
        bridge: "https://dcdnwallet.moontouch.io:37300/",
      });
      await provider.enable();
      const web3 = new Web3(provider);
      this.allWalletLogin(web3);
    },
    async allWalletLogin(web3) {
      console.log("web3", web3);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        store.commit("setCurrentWalletAddress", accounts[0]);
        getChainId();
        console.log("store--",store.getters.currentWalletAddress);
        sendGetWeb3Token(store.getters.currentWalletAddress)
          .then((res) => {
            console.log("res--",res);
            let web3Token = res.data.token;
            const hexString = utf8ToHex(web3Token);
            console.log("hexString--",hexString);
            web3.eth.personal
              .sign(hexString, store.getters.currentWalletAddress, "")
              .then((signature) => {
                console.log("签名成功signature--",signature);
                let loginInfo = {
                  account: store.getters.currentWalletAddress.toString(),
                  credit: Buffer.from(signature).toString("base64"),
                  inviteCode: store.getters.inviteCode,
                  channelCode: store.getters.channelCode,
                  platform: "META_MASK",
                };
                console.log("loginInfo--",loginInfo);
                userLogin(loginInfo);
              });
          })
          .catch((err) => {
            console.log("sendGetWeb3Token", err);
          });
      }
    },
    codeInterval() {
      this.codeTimer = setInterval(() => {
        this.codeTime = this.codeTime - 1;
        if (this.codeTime == 0) {
          this.clearInterval();
        }
      }, 1000);
    },
    clearInterval() {
      if (this.codeTimer) {
        console.log("clearData", this.codeTimer);
        clearInterval(this.codeTimer);
        this.isClickCode = false;
        this.codeTime = 60;
      }
    },
    checkEmail(formName) {
      console.log("qqqqqq");
      this.$refs[formName].validateField("email", (valid) => {
        if (!valid) {
          console.log("8888", valid);
          this.isEmail = true;
        } else {
          this.isEmail = false;
        }
      });
    },
    checkAllInfo(formName) {
      console.log("checkAllInfo1111", this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        console.log("checkAllInfo", valid);
        if (valid) {
          this.isSubmit = true;
          console.log("4444", valid);
        } else {
          this.isSubmit = false;
          console.log("error submit!!");
        }
      });
    },
    onclickRegister() {
      // let that = this;
      // this.$popup.show({
      //   title: "Tips",
      //   text: "Please select your registration method",
      //   isShowBtnRight: true,
      //   btnTextLeft: "email",
      //   btnTextRight: "wallet",
      //   btnFunLeft: that.emailRegister,
      //   btnFunRight: that.walletRegister,
      // });
      this.emailRegister();
      this.isShowBack = true;
    },
    emailRegister() {
      // this.loginState = 1;
      this.changeIndex(3);
    },
    walletRegister() {
      this.isShowWalletPop = true;
    },
    backToLogin() {
      // this.loginState = 0;
      this.changeIndex(0);
    },
    popup_close(val) {
      this.isShowWalletPop = val;
    },
    onClickForgetPassword() {
      // this.loginState = 2;
      this.changeIndex(2);
    },
    changeIndex(index) {
      this.loginState = index;
      if (index == 0) {
        this.$router.push("/login?active=" + index);
      } else {
        this.$router.push("/login?active=" + index + "&tab=" + index);
      }

    },
    chooseWallet() {
      // this.$popup.show({ title: "Tips", text: "Coming Soon" });
      this.isShowWalletPop = true;
    },
    chooseEmail() {
      this.changeIndex(1);
      this.isShowBack = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/web/login/login_bg.webp") no-repeat center/cover;
  padding-top: 86px;
  overflow: hidden;
  position: relative;
  .login_view {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1247px;
    height: 2345px;
    margin-left: -324px;
    margin-top: -620px;
    background: url("../assets/web/login/login_view.webp") no-repeat
      center/cover;
    z-index: 2;
    pointer-events: none;
  }
  .title {
    width: 541px;
    height: 410px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -796px;
    margin-top: -500px;
    background: url("../assets/web/login/login.png") no-repeat center/cover;
    z-index: 2;
  }
  .title1 {
    width: 541px;
    height: 410px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -796px;
    margin-top: -500px;
    background: url("../assets/web/login/register.png") no-repeat center/cover;
    z-index: 2;
  }
  .title2 {
    width: 830px;
    height: 410px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -796px;
    margin-top: -500px;
    background: url("../assets/web/login/forgetpassword.png") no-repeat
      center/cover;
    z-index: 2;
  }
  .login_content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .chooselogin {
      position: relative;
      top: 34px;
      left: -65px;
      width: 1616px;
      height: 781px;
      background: url("../assets/web/login/login_bg1.webp") no-repeat;
      background-size: 100% 100%;
      .choose {
        margin: auto;
        width: 50%;
        height: 60%;
        margin-left: 14%;
        margin-top: 11%;
        .titletext {
          font-size: 40px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #000000;
          line-height: 35px;
          margin-left: 58px;
          width: 100%;
        }
        .wallet {
          width: 358px;
          height: 162px;
          background: url("../assets/web/login/login_btn.png") no-repeat;
          background-size: 100% 100%;
          transform: translateX(65%) translateY(10%);
          z-index: 3;
          p {
            font-size: 23px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #ffffff;
            line-height: 162px;
          }
          #up {
            -webkit-text-stroke: 4px #000000;
          }
          #down {
            position: relative;
            top: -100%;
          }
        }
        .email {
          width: 358px;
          height: 162px;
          background: url("../assets/web/login/login_btn2.png") no-repeat;
          background-size: 100% 100%;
          transform: translateX(65%) translateY(-10%);

          z-index: 3;
          p {
            font-size: 23px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #ffffff;
            line-height: 162px;
          }
          #up {
            -webkit-text-stroke: 4px #000000;
          }
          #down {
            position: relative;
            top: -100%;
          }
        }
        .or {
          font-size: 40px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #000000;
          line-height: 35px;
        }
        .btn_register {
          position: relative;
          left: 0.5%;
          top: -6%;
          z-index: 6;
          > p {
            font-size: 28px;
            font-family: Microsoft YaHei UI;
            font-weight: bold;
            text-decoration: underline;
          }
        }
      }
    }
    .login_enter {
      // position: absolute;
      // left: 20%;
      // top: 11%;
      position: relative;
      top: 34px;
      left: -65px;
      width: 1616px;
      height: 781px;
      background: url("../assets/web/login/login_bg1.webp") no-repeat;
      background-size: 100% 100%;
      .enter_info {
        margin: auto;
        width: 537.2px;
        height: 50%;
        display: flex;
        flex-direction: column;
        margin-left: 392px;
        margin-top: 200px;
        .demo-loginRuleForm {
          width: 100%;
          height: 68%;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
          .el-form-item {
            width: 444px;
            height: 60px;
            margin-top: 23px;
            // outline: none;
            font-size: 28px;
            font-family: Microsoft YaHei UI;
            font-weight: bold;
            color: #f8f5e7;
            line-height: 33px;
            text-align: left;

            ::v-deep .el-form-item__content {
              margin-left: 0 !important;
              height: 100%;
              .el-input {
                height: 100%;
                .el-input__inner {
                  border: none;
                  width: 444px;
                  height: 60px;
                  background: url("../assets/web/login/text.png") no-repeat;
                  background-size: 100% 100%;
                  font-size: 28px;
                  font-family: Microsoft YaHei UI;
                  font-weight: bold;
                  color: #f8f5e7;
                  text-indent: 5px;
                }
              }
              // input::-webkit-input-placeholder {
              //   color: #282626;;
              // }
            }
            #login_img {
              position: absolute;
              right: 35px;
              top: 35%;
              width: 41px;
              height: 27px;
            }
            p {
              margin-top: 15px;
              text-align: right;
              font-size: 24px;
              font-family: Microsoft YaHei UI;
              font-weight: bold;
              color: #010101;
              line-height: 33px;
            }
          }
        }
      }
      .enten_btn {
        margin: auto;
        width: 537.2px;
        height: 50%;
        display: flex;
        flex-direction: column;
        margin-left: 392px;
        margin-top: -120px;
        z-index: 3;
        .btn_b {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          top: -10%;
          width: 356px;
          height: 158px;
          background: url("../assets/web/login/login_btn.png") no-repeat
            center/cover;
          margin-bottom: 20px;
          z-index: 3;
          > p {
            font-size: 28px;
            font-family: arial;
            font-weight: bold;
            color: #ffffff;
            line-height: 158px;
            text-shadow: 0px 5px 0px #6f3138;
          }
        }
        .btn_b2 {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          top: -30%;
          width: 356px;
          height: 158px;
          background: url("../assets/web/login/login_btn2.png") no-repeat
            center/cover;
          margin-bottom: 20px;
          z-index: 3;
          > p {
            font-size: 28px;
            font-family: arial;
            font-weight: bold;
            color: #ffffff;
            line-height: 158px;
            text-shadow: 0px 5px 0px #6f3138;
          }
        }
        .or {
          position: relative;
          top: -23%;
        }
        > p {
          font-size: 28px;
          font-family: Microsoft YaHei UI;
          font-weight: bold;
          color: #000000;
          line-height: 33px;
        }
      }
    }

    .login_mailbox {
      // position: absolute;
      // left: 20%;
      // top: 11%;
      position: relative;
      top: 74px;
      left: -65px;
      // background: #ffffff;
      // box-shadow: 0px 8px 2px 0px rgba(0, 0, 0, 0.64);
      // border-radius: 10px;
      width: 1616px;
      height: 781px;
      background: url("../assets/web/login/login_bg1.webp") no-repeat;
      background-size: 100% 100%;
      .demo-ruleForm {
        width: 1293px;
        height: 100%;
        position: relative;
        top: 5%;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        .el-form-item {
          width: 537.2px;
          height: 64px;
          // outline: none;
          font-size: 28px;
          font-family: Microsoft YaHei UI;
          font-weight: bold;
          color: #282626;
          line-height: 33px;
          text-align: left;
          margin-top: 22px;
          z-index: 5;
          ::v-deep .el-form-item__content {
            margin-left: 0 !important;
            height: 100%;
            .el-input {
              height: 100%;
              .el-input__inner {
                border: none;
                height: 59.6px;
                background: url("../assets/web/login/text.png") no-repeat;
                background-size: 100% 100%;
                border-radius: 10px;
                font-size: 28px;
                font-family: Microsoft YaHei UI;
                font-weight: bold;
                color: #f8f5e7;
                text-indent: 5px;
              }
            }
          }
        }
        .el-form-item:nth-child(1) {
          align-self: flex-start;
          margin-top: 18px;
          margin-left: 21px;
          width: 345px;
          height: 35px;
          // background-color: #6f3138;
          #img_title {
            font-size: 36px;
            font-family: HelveticaNeue;
            font-weight: bold;
            color: #000000;
            line-height: 35px;
            text-align: center;
          }
        }
        .code_input {
          width: 65%;
        }
        .code_button,
        .code_button_click {
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 256px;
          height: 118px;
          background: url("../assets/web/login/login_code_btn.png") no-repeat
            center/cover;
          padding: 5px;
          p {
            font-size: 23px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #ffffff;
            position: relative;
            text-align: center;
          }
          #up {
            -webkit-text-stroke: 4px #000000;
          }
          #down {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .code_button_click {
          p {
            font-size: 30px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #ffffff;
            position: relative;
            left: 5%;
            top: 0%;
          }
        }
        .submit_btn {
          position: relative;
          padding: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 348px;
          height: 59px;
          background: url("../assets/web/login/login_btn2.png") no-repeat
            center/cover;
          font-size: 38px;
          font-family: Arial;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0px 5px 0px rgba(92, 39, 48, 0.88);
          padding-bottom: 20px;
          line-height: 59px;
        }
      }
    }
  }
  .login_back {
    position: absolute;
    right: 27%;
    top: 38px;
    width: 183px;
    height: 87px;
    background: url("../assets/web/login/back.png") no-repeat center/cover;
    z-index: 3;
  }
  .wallet_pop {
    width: 807.8px;
    height: 468.5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url("../assets/web/login/wallet/bg.webp") no-repeat center/cover;
    .close {
      width: 31px;
      height: 24px;
      background: url("../assets/web/presale/close.png") no-repeat center/cover;
      position: absolute;
      right: 138px;
      top: 37px;
    }
    .wallet_pop_title {
      width: 100%;
      height: 14%;
      position: relative;
      top: 20%;
      // background-color: chartreuse;
      > p {
        font-size: 30px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        color: #ffffff;
      }
      #up {
        -webkit-text-stroke: 4px #000000;
      }
      #down {
        position: relative;
        top: -56%;
      }
    }
    .wallet_pop_content {
      width: 80%;
      height: 70%;
      margin: auto;
      // background-color: chocolate;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .wallet_pop_content_index {
        position: relative;
        top: 5%;
        width: 278px;
        height: 59px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 38px;
        background: url("../assets/web/login/wallet/wallet_bg.png") no-repeat
          center/cover;
        background-size: 100%;
        .content_index_icon {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 57px;
          height: 55px;
          margin-left: -30px;
          background: url("../assets/web/login/wallet/wallet_metamask.png")
            no-repeat center/cover;
        }
        > p {
          font-size: 26px;
          font-family: Microsoft YaHei UI;
          font-weight: bold;
          color: #313030;
          line-height: 60px;
          text-align: left;
          margin-left: 18%;
        }
      }
    }
  }
}
@media all and (orientation: portrait) {
  .login {
    width: 100%;
    height: auto;
    min-height: 100%;
    overflow-y: auto;
    background: url("../assets/h5/home/howWork/bg.png") no-repeat center/cover;
    .login_back {
      right: 20px;
      top: 33%;
      width: 216px;
      height: 101px;
      background: url("../assets/web/login/back.png") no-repeat center/cover;
      background-size: 100% 100%;
    }
    .login_view {
      display: none;
    }
    .title {
      // display: none;
      width: 480px;
      height: 414px;
      position: absolute;
      left: -100px;
      top: 350px;
      margin-left: 0px;
      margin-top: 0px;
      background: url("../assets/h5/login/login.png") no-repeat center/cover;
      transform: scale(1.2);
    }
    .title1 {
      width: 90%;
      height: 410px;
      position: absolute;
      top: 350px;
      left: 0;
      margin-left: 0px;
      margin-top: 0px;
      background: url("../assets/h5/login/register.png") no-repeat center/cover;
      background-size: 100%;
      transform: scale(1.2);
    }
    .title2 {
      display: none;
    }
    .login_content {
      position: relative;
      display: block;
      margin: 0 auto;
      padding-top: 52px;
      .login_enter,
      .login_mailbox,
      .chooselogin {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 1497px;
        background: url("../assets/h5/login/bg.png") no-repeat center/cover;
        background-size: 100% 100%;
        padding-top: 650px;
        margin: 0 auto;
        .enter_info {
          position: relative;
          width: 100%;
          height: unset;
          margin: 0 auto;
          .el-form {
            font-size: 32px;
            .el-form-item {
              ::v-deep .el-form-item__content {
                .el-form-item__error {
                  font-size: 16px;
                }
              }
            }
          }
        }
        .enten_btn {
          margin: 0 auto;
          width: 100%;
          height: unset;
        }
      }
      .login_mailbox {
        padding-top: 550px;
        .demo-ruleForm {
          position: relative;
          width: 100%;
          height: 422px;
          top: 0;
          margin: 0 auto;
          .el-form-item {
            width: 444px;
            height: 60px;
            ::v-deep .el-form-item__content {
              .el-form-item__error {
                font-size: 16px;
              }
            }
          }
        }
      }
      .chooselogin {
        .choose {
          width: 70%;
          height: unset;
          margin: 0 auto;
          .titletext {
            font-size: 35px;
            text-align: center;
            margin-left: 0;
            margin-bottom: 26px;
          }
          .wallet,
          .email {
            position: relative;
            margin: 0 auto;
            transform: translateX(0);
          }
        }
      }
    }
    .wallet_pop {
      position: relative;
      width: 654px;
      height: 370px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: url("../assets/web/login/wallet/bg.png") no-repeat
        center/cover;
      background-size: 100% 100%;
      padding-top: 68px;
      .close {
        position: absolute;
        right: 60px;
        top: 25px;
      }
      .wallet_pop_title {
        position: relative;
        width: 100%;
        height: unset;
        top: 0;
        p {
          font-size: 28px;
        }
      }
      .wallet_pop_content {
        position: relative;
        width: 100%;
        height: unset;
        margin-top: 0;
        .wallet_pop_content_index {
          position: relative;
          top: 0;
          margin: 0 auto;
          margin-bottom: 34px;
        }
      }
    }
  }
}
</style>

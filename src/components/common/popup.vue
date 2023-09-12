<template>
  <transition name="animation">
    <div class="popup" v-if="visable">
      <div class="mask" @click="onClickClose"></div>
      <div class="popup_box">
        <div class="close" @click="onClickClose"></div>
        <h3 class="popup_title">{{ title }}</h3>
        <p class="popup_content">{{ text }}</p>
        <div class="popup_btn1" @click="onClockBtnLeft">{{ btnTextLeft }} </div>
        <div v-if="isShowBtnRight" class="popup_btn2" @click="onClockBtnRight">{{ btnTextRight }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visable: false,
      title: "Tips",
      text: "",
      isShowBtnRight: false,
      btnTextLeft: "CONFIRM",
      btnTextRight: "CANCEL",
      btnFunLeft: null,
      btnFunRight: null,
    };
  },
  mounted() {
  },
  methods: {
    onClockBtnLeft() {
      if (this.btnFunLeft) {
        this.btnFunLeft();
      }
      this.onClickClose();
    },
    onClockBtnRight() {
      if (this.btnFunRight) {
        this.btnFunRight();
      }
      this.onClickClose();
    },
    onClickClose() {
      this.visable = false;
      this.title = "Tips";
      (this.text = ""), (this.isShowBtnRight = false);
      this.btnTextLeft = "CONFIRM";
      this.btnTextRight = "CANCEL";
      this.btnFunLeft = null;
      this.btnFunRight = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes pop {
  0% {
    opacity: 0;
    margin-top: -2%;
  }
  100% {
    opacity: 1;
    margin-top: 0%;
  }
}
.animation-enter,
.animation-leave-to {
  opacity: 0;
}

.animation-enter-active,
.animation-leave-active {
  transition: opacity 0.5s;
}

.popup {
  position: fixed;
  // inset: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .popup_box {
    position: absolute;
    width: 769px;
    height: 435px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    font-size: 20px;
    background: url("../../assets/web/popup/bg.png") no-repeat;
    background-size: 100% 100%;
    animation: pop 0.3s;
    padding-top: 85px;
    .popup_title {
      width: 100%;
      font-size: 32px;
      font-family: arial;
      font-weight: bold;
      color: #010101;
      margin: 0 auto;
      text-align: center;      
    }
    .popup_content {
      width: 86%;
      font-size: 30px;
      font-family: arial;
      font-weight: bold;
      color: #282828;
      margin: 0 auto;
      text-align: center;
      margin-top: 60px;
    }
    .popup_btn1 {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 40px;
      margin: 0 auto;
      width: 261px;
      height: 113px;
      background: url("../../assets/web/popup/popup_btn1.png") no-repeat center/cover;
      font-size: 26px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      color: #ffffff;
      line-height: 35px;
      text-shadow: 0px 4px 0px #6f3138;
      line-height: 113px;
      text-align: center;
    }
    .popup_btn2 {
      position: relative;
      width: 261px;
      height: 113px;
      background: url("../../assets/web/popup/popup_btn2.png") no-repeat center/cover;
      position: relative;
      font-size: 26px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      color: #ffffff;
      line-height: 35px;
      text-shadow: 0px 4px 0px #6f3138;
      line-height: 113px;
      margin: 0 auto;
      text-align: center;
    }
  }
  .close{
    width: 31px;
    height: 24px;
    background: url("../../assets/web/popup/close.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 10%;
    top: 8%;
    }
  .textAlign {
    text-align: left;
  }
}
@media all and (orientation: portrait) {
.popup {
  .popup_box {
    position: absolute;
    width: 686px;
    height: 398px;
    background: url("../../assets/web/popup/bg.png") no-repeat center/cover;
    background-size: 100% 100%;
    padding-top: 80px;
  }
}
}
</style>

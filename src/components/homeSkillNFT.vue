<template>
  <div class="skillNFT">
    <div class="skillNFT_introduction">
      <p>
        Based on major stars’ data and exaggerated style of derivative work as
        Star NFT assets.
      </p>
    </div>
    <div class="skillNFT_mobile_icon"></div>
    <div class="skillNFT_info">
      <div class="info_top">
        <div class="info_top_iconN"></div>
        <div class="info_top_text">
          <p>Logo Shot</p>
          <p><span>Quality</span></p>
          <p>Requirement</p>
          <p>Effect</p>
        </div>
        <div class="info_top_iconR"></div>
        <div class="info_top_text">
          <p>Logo Shot</p>
          <p><span>Quality</span></p>
          <p>Requirement</p>
          <p>Effect</p>
        </div>
      </div>
      <div class="info_bottom">
        <div class="info_bottom_iconSR"></div>
        <div class="info_bottom_text">
          <p>Logo Shot</p>
          <p><span>Quality</span></p>
          <p>Requirement</p>
          <p>Effect</p>
        </div>
        <div class="info_bottom_iconSSR"></div>
        <div class="info_bottom_text">
          <p>Logo Shot</p>
          <p><span>Quality</span></p>
          <p>Requirement</p>
          <p>Effect</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "skillNFT",
  data() {
    return {};
  },
  mounted() {
    this.getLong()
  },
  methods: {
    getLong() {
      if (window.screen.height / window.screen.width < 1.8) {
        document.documentElement.getElementsByClassName("skillNFT_mobile_icon")[0].classList.add("mobile_icon_short");
        document.documentElement.getElementsByClassName("skillNFT_info")[0].classList.add("info_short");
        document.documentElement.getElementsByClassName("skillNFT_introduction")[0].classList.add("introduction_short");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.skillNFT {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/web/home/skillNft/bg.png") no-repeat center/cover;
  .skillNFT_info {
    position: absolute;
    left: 0px;
    bottom: 1px;
    width: 827px;
    height: 407px;
    background: url("../assets/web/home/skillNft/info_frame.webp") no-repeat
      center/cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .info_top {
      margin: 10px 0;
      margin-left: 30px;
      width: 709px;
      height: 138px;
      // background-color: rgba(95, 158, 160, 0.349);
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      .info_top_iconN {
        width: 141px;
        height: 136px;
        background: url("../assets/web/home/skillNft/info_icon_n.png") no-repeat
          center/cover;
      }
      .info_top_iconR {
        margin-left: -20px;
        width: 140px;
        height: 138px;
        background: url("../assets/web/home/skillNft/info_icon_r.png") no-repeat
          center/cover;
      }
      .info_top_text {
        width: 145px;
        height: 95%;
        // background-color: rgba(199, 196, 46, 0.548);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        > p {
          font-size: 22px;
          font-family: Impact;
          font-weight: 400;
          color: #ffffff;
          text-align: left;
          > span {
            font-size: 22px;
            font-family: Impact;
            font-weight: 400;
            color: #e40006;
          }
        }
      }
    }
    .info_bottom {
      align-self: flex-end;
      margin-right: 55px;
      width: 709px;
      height: 142px;
      // background-color: rgba(222, 184, 135, 0.274);
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      .info_bottom_iconSR {
        margin-right: 25px;
        width: 153px;
        height: 138px;
        background: url("../assets/web/home/skillNft/info_icon_sr.png")
          no-repeat center/cover;
      }
      .info_bottom_iconSSR {
        margin-right: 25px;
        width: 160px;
        height: 142px;
        background: url("../assets/web/home/skillNft/info_icon_ssr.png")
          no-repeat center/cover;
      }
      .info_bottom_text {
        width: 145px;
        height: 95%;
        // background-color: rgba(199, 196, 46, 0.548);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        > p {
          font-size: 22px;
          font-family: Impact;
          font-weight: 400;
          color: #ffffff;
          text-align: left;
          > span {
            font-size: 22px;
            font-family: Impact;
            font-weight: 400;
            color: #e40006;
          }
        }
      }
    }
  }
  .skillNFT_mobile_icon {
    position: absolute;
    display: none;
  }
  .skillNFT_introduction {
    position: absolute;
    top: 14px;
    right: 39px;
    width: 1097px;
    height: 682px;
    background: url("../assets/web/home/skillNft/introduction_frame.webp")
      no-repeat center/cover;
    > p {
      margin: 312px 261px 111px 199px;
      width: 637px;
      height: 259px;
      font-size: 24px;
      font-family: Cooper Std;
      // font-weight: 800;
      color: #000000;
      line-height: 40px;
      text-align: left;
    }
  }
}

@media all and (orientation: portrait) {
  .skillNFT {
    background: url("../assets/h5/home/skillNft/bg.png") no-repeat center/cover;
    overflow: hidden;
    .skillNFT_info {
      // zoom: 88%;
      transform: scale(0.9);
      left: -45px;
      top: 820px;
    }
    .skillNFT_mobile_icon {
      display: block;
      top: 500px;
      left: -50px;
      width: 762px;
      height: 1095px;
      background: url("../assets/h5/home/skillNft/icon.png")
      no-repeat center/cover;
    }
    .skillNFT_introduction {
      // zoom: 91%;
      transform: scale(0.95);
      top: 20px;
      left: -146px;
    }
    .introduction_short {
      transform: scale(0.85);
      top: -40px;
    }
    .mobile_icon_short {
      transform: scale(0.85);
      top: 350px;
    }
    .info_short {
      transform: scale(0.85);
      top: 680px;
    }
  }
}
</style>>
<template>
  <div class="about">
    <div class="about_info_top">
      <p>AKRON, OH, USA</p>
      <p>MARCH 14, 1988</p>
      <p>2009-rd1-pick 7</p>
    </div>
    <div class="about_introduction">
      <div class="introduction_content">
        <p>
          FreeStyle3X3 is a multiplayer online social entertainment project
          based on basketball culture. Consider basketball star player NFT as
          the core of our project,to build a first-class mobile interactive
          social platform containing a basketball game that supports the
          realization of star player NFT value,NFT trading market and street
          basketball culture. We will gradually explore how to build a
          commereial virtual reality world like basketball in real life. Play
          and control a team of players in a 3v3 basketball game with up to 6
          players at a time. Finally,enjoy coach mode and take the seat from the
          sidelines,leading the team and players. Play as the team manager and
          run the team in a simulation game.
        </p>
      </div>
    </div>
    <div class="about_mobile_icon"></div>
    <div class="about_mobile_bottom_bg">
      <div class="mobile_bottom_bg_text"></div>
    </div>
    <div class="about_info_bottom">
      <p id="p1_text1">HEIGHT<span id="p1_text2">6' 2</span></p>
      <div class="info_bottom_p2">
        <p id="p2_text1">WEIGHT 185 LB</p>
        <p id="p2_text2">AGE 34</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {};
  },
  mounted() {
    this.getLong();
  },
  methods: {
    getLong() {
      if (window.screen.height / window.screen.width < 1.8) {
        document.documentElement
          .getElementsByClassName("about_introduction")[0]
          .classList.add("introduction_short");
        document.documentElement
          .getElementsByClassName("about_mobile_icon")[0]
          .classList.add("mobile_icon_short");
        document.documentElement
          .getElementsByClassName("about_mobile_bottom_bg")[0]
          .classList.add("mobile_bottom_bg_short");
        document.documentElement
          .getElementsByClassName("about_info_top")[0]
          .classList.add("about_info_top_short");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("../assets/web/home/about/bg.png") no-repeat center/cover;
  .about_info_top {
    position: absolute;
    top: 184px;
    width: 457px;
    height: 349px;
    background: url("../assets/web/home/about/info_top.webp") no-repeat
      center/cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    > p {
      font-size: 20px;
      font-family: MStiffHei PRC;
      font-weight: 800;
      font-style: italic;
      color: #000000;
      text-align: right;
      margin-top: 75px;
    }
    > p:nth-child(1) {
      margin-right: 114px;
    }
    > p:nth-child(2) {
      margin-top: 47px;
      margin-right: 62px;
    }
    > p:nth-child(3) {
      margin-top: 37px;
      margin-right: 161px;
    }
  }
  .about_info_bottom {
    position: absolute;
    bottom: 122px;
    left: 86px;
    width: 534px;
    height: 130px;
    display: block;
    // background-color: bisque;
    > p {
      // width: 300px;
      height: 90px;
      font-size: 72px;
      font-family: MStiffHei PRC;
      font-weight: 800;
      font-style: italic;
      color: #ffffff;
      text-align: left;
      -webkit-text-stroke: 10px #e10f31;
      text-stroke: 10px #e10f31;
      #p1_text2 {
        margin-left: 30px;
        font-size: 48px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        font-style: italic;
        color: #ffffff;
        -webkit-text-stroke: 10px #e10f31;
        text-stroke: 10px #e10f31;
      }
      #p1_text2::before {
        width: 110px;
        content: "6' 2";
        position: absolute;
        top: 25px;
        background-image: linear-gradient(#f3f1e9);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 0;
      }
    }
    #p1_text1::before {
      width: 320px;
      content: "HEIGHT";
      position: absolute;
      background-image: linear-gradient(#f3f1e9);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 0;
    }
    .info_bottom_p2 {
      height: 58px;
      //   background-color: #52e24d;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      > p {
        margin: 0 15px;
        font-size: 36px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        font-style: italic;
        color: #fdfffe;
        -webkit-text-stroke: 8px #000000;
        text-stroke: 8px #000000;
      }
      #p2_text1 {
        width: 310px;
      }
      #p2_text2 {
        width: 150px;
      }
      #p2_text1::before,
      #p2_text2::before {
        // content: attr(data-title);
        position: absolute;
        background-image: linear-gradient(#f3f1e9);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke: 0;
      }
      #p2_text1::before {
        margin-left: -8px;
        width: 310px;
        content: "WEIGHT 185 LB";
      }
      #p2_text2::before {
        margin-left: -5px;
        width: 150px;
        content: "AGE 34";
      }
    }
  }
  .about_info_bottom_isMobile {
    display: none;
  }
  .about_mobile_icon,
  .about_mobile_bottom_bg {
    position: absolute;
    display: none;
  }
  .about_introduction {
    position: absolute;
    right: 0;
    top: 0;
    width: 1234px;
    height: 848px;
    background: url("../assets/web/home/about/info_bottom.webp") no-repeat
      center/cover;
    .introduction_content {
      width: 789px;
      height: 380px;
      margin: 300px 232px 166px 202px;
      overflow-y: auto;

      > p {
        font-size: 24px;
        font-family: Cooper Std;
        // font-weight: 800;
        color: #000000;
        line-height: 35px;
        text-align: left;
        //   letter-spacing:2px;
      }
    }
    .introduction_content::-webkit-scrollbar {
      width: 4px;
      // height: 10px;
      // scrollbar-arrow-color: red;
      background: url("../assets/web/home/about/scroll.png") no-repeat
        center/cover;
    }
    .introduction_content::-webkit-scrollbar-thumb {
      width: 4px;
      height: 30px;
      background: url("../assets/web/home/about/scroll_index.png") no-repeat
        center/cover;
    }
  }
}

@media all and (orientation: portrait) {
  .about {
    background: url("../assets/h5/home/about/bg.png") no-repeat center/cover;
    .about_info_top {
      top: 665px;
      right: 0;
      background: url("../assets/h5/home/about/info_top.png") no-repeat
        center/cover;
      > p {
        text-align: left;
        margin-top: 80px;
        transform: rotate(10deg);
        display: none;
      }
      > p:nth-child(1) {
        margin-left: 90px;
      }
      > p:nth-child(2) {
        margin-top: 40px;
        margin-left: 45px;
      }
      > p:nth-child(3) {
        margin-top: 28px;
        margin-left: 100px;
      }
    }
    .about_introduction {
      // zoom: 80%;
      transform: scale(0.8);
      top: -60px;
      left: -230px;
    }
    .about_mobile_icon {
      display: block;
      width: 678px;
      height: 926px;
      top: 565px;
      left: -265px;
      background: url("../assets/h5/home/about/icon.png") no-repeat center/cover;
    }
    .about_mobile_bottom_bg {
      display: block;
      width: 1762px;
      height: 407px;
      left: -125px;
      top: 965px;
      background: url("../assets/h5/home/about/text_bg.png") no-repeat
        center/cover;
      .mobile_bottom_bg_text {
        position: relative;
        top: 122px;
        left: 150px;
        display: block;
        width: 581px;
        height: 186px;
        background: url("../assets/h5/home/about/text.png") no-repeat
          center/cover;
      }
    }
    .about_info_bottom {
      width: 590px;
      top: 1095px;
      left: 30px;
      display: none;
      > p {
        transform: rotate(-9deg);
      }
      .info_bottom_p2 {
        margin-top: 8px;
        transform: rotate(-9deg);
      }
    }

    .introduction_short {
      transform: scale(0.6);
      top: -120px;
    }
    .mobile_icon_short {
      transform: scale(0.65);
      top: 300px;
      left: -180px;
    }
    .mobile_bottom_bg_short {
      transform: scale(0.85);
      top: 670px;
      left: -240px;
    }
    .about_info_top_short {
      transform: scale(0.75);
      top: 500px;
      right: 20px;
    }
  }
}
</style>

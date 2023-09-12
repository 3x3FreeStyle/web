<template>
  <div class="homeHowWork">
    <div class="homeHowWork_mobile_content"></div>
  </div>
</template>

<script>
export default {
  name: "homeHowWork",
  data() {
    return {};
  },
  mounted() {
    this.getLong()
  },
  methods: {
    getLong() {
      if (window.screen.height / window.screen.width < 1.8) {
        document.documentElement.getElementsByClassName("homeHowWork_mobile_content")[0].classList.add("short");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.homeHowWork {
  width: 100%;
  height: 100%;
  background: url("../assets/web/home/howWork/bg.png") no-repeat center/cover;
  //   background-size: 100%;
}
@media all and (orientation: portrait) {
  .homeHowWork {
    background: url("../assets/h5/home/howWork/bg.png") no-repeat center/cover;
    .homeHowWork_mobile_content {
      position: relative;
      top: 160px;
      left: -355px;
      width: 1212px;
      height: 1403px;
      background: url("../assets/h5/home/howWork/content.png") no-repeat
        center/cover;
    }
    .short {
      transform: scale(0.8);
      top: 0;
    }
  }
}
</style>>

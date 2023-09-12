<template>
  <div class="token">
    <div class="token_content"></div>
  </div>
</template>

<script>
export default {
  name: "token",
  data() {
    return {};
  },
  mounted() {
    this.getLong()
  },
  methods: {
    getLong() {
      if (window.screen.height / window.screen.width < 1.8) {
        document.documentElement.getElementsByClassName("token_content")[0].classList.add("short");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.token {
  width: 100%;
  height: 100%;
  background: url("../assets/web/home/token/bg.webp") no-repeat center/cover;
  overflow: hidden;
  .token_content {
    margin-top: 0;
    width: 100%;
    height: 940px;
    background: url("../assets/web/home/token/content.png") no-repeat
      center/cover;
    background-size: 100%;
  }
}

@media all and (orientation: portrait) {
  .token {
    width: 100%;
    height: 100%;
    background: url("../assets/h5/home/token/bg.png") no-repeat center/cover;
    overflow: hidden;
    padding-top: 128px;
    .token_content {
      margin-top: -60px;
      width: 750px;
      height: 1292px;
      transform: scale(0.9);
      background: url("../assets/h5/home/token/content.png") no-repeat
        center/cover;
      background-size: 100%;
    }
    .short {
      transform: scale(0.75);
      margin-top: -180px;
    }
  }
}
</style>>

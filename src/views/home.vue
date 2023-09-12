<template>
  <div class="home">
    <div class="home_menu">
      <a
        class="home_menu_content"
        v-for="(item, index) in menus"
        :key="index"
        :class="item.select ? 'home_menu_content_select' : ''"
        @click="onClickMenuBtn(item, index)"
        :href="item.pageId"
      >
      </a>
    </div>
    <div ref="down" class="mobile_down" @click="onClickNext"></div>
    <full-page :options="options" id="fullpage" ref="fullpage">
      <home-howWork class="section" />
      <home-about class="section" />
      <home-skillNFT class="section" />
      <home-mission class="section" />
      <home-token class="section" />
    </full-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "howWork", select: true, pageId: "#page1" },
        { name: "about", select: false, pageId: "#page2" },
        { name: "skillNft", select: false, pageId: "#page3" },
        { name: "mission", select: false, pageId: "#page4" },
        { name: "token", select: false, pageId: "#page5" },
      ],
      options: {
        anchors: ["page1", "page2", "page3", "page4", "page5"],
        onLeave: (index, nextIndex) => {
          this.menus.map((val) => {
            if (val.pageId === "#" + nextIndex.anchor) {
              val.select = true;
            } else {
              val.select = false;
            }
          });
        },
        afterLoad: (anchorLink, index) => {
          if(index.anchor=='page5'){
              this.$refs.down.style.display='none';
          }
          else{
            this.$refs.down.style.display='block';
          }
        },
        normalScrollElements: ".introduction_content,.text_page4",
      },
    };
  },
  mounted() {},
  methods: {
    onClickMenuBtn(item, index) {
      // this.common_left_style = 'common_left_x' + index
      this.menus.map((val) => {
        if (val.name === item.name) {
          val.select = true;
        } else {
          val.select = false;
        }
      });
    },
    onClickNext() {
      this.$refs.fullpage.api.moveSectionDown()
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .home_menu {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 45px;
    width: 50px;
    height: 460px;
    // background-color: brown;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .home_menu_content {
      width: 25px;
      height: 25px;
      background: url("../assets/web/home/home_mune_btn.png") no-repeat
        center/cover;
    }
    .home_menu_content_select {
      width: 30px;
      height: 30px;
      background: url("../assets/web/home/home_mune_selectbtn.png") no-repeat
        center/cover;
    }
  }
}
.home {
  .mobile_down {
    display: none;
  }
}

@media all and (orientation: portrait) {
  .home {
    .home_menu {
      display: none;
    }
    .mobile_down {
      position: fixed;
      display: block;
      z-index: 1;
      bottom: 57px;
      left: 50%;
      transform: translateX(-50%);
      width: 84px;
      height: 84px;
      background: url("../assets/h5/home/token/down.png") no-repeat
        center/cover;
    }
  }
}
</style>
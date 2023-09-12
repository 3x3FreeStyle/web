<template>
  <div class="assetItem">
    <div class="assetItem_item" v-for="(item, index) in itmeList" :key="index">
      <img :src="item.heroRarity" alt="" />
      <img v-show="selectContent == 1" :src="item.heroId" alt="" />
      <div v-show="selectContent == 1" class="assetItem_item_name">
        <p>{{ item.name }}</p>
      </div>
      <div v-show="selectContent == 3" class="assetItem_item_pack_num">
        <p>{{ item.num }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "assetItem",
  data() {
    return {};
  },
  mounted() {
    console.log("7878",this.selectContent);
  },
  props: {
    itmeList: {
      type: [Array],
      default: null,
    },
    selectContent: {
      type: [Number],
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.assetItem {
  width: 100%;
  height: 100%;
  padding-left: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  // background-color: rgba(137, 43, 226, 0.562);
  overflow-y: auto;
  .assetItem_item {
    position: relative;
    width: 133px;
    height: 160px;
    // width: 100%;
    // height: 100%;
    margin: 10px 10px;
    margin-top: 0;
    > img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .assetItem_item_name {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
      width: 124px;
      height: 30px;
      border-radius: 10%;
      background-color: #fd583fb0;
      > p {
        font-size: 20px;
        font-family: AkzidenzGrotesk;
        font-weight: 400;
        color: #ffffff;
        -webkit-text-stroke: 1px #000000;
        text-stroke: 1px #000000;
        line-height: 30px;
      }
    }
    .assetItem_item_pack_num {
      position: absolute;
      right: -20px;
      width: 68px;
      height: 34px;
      background: url("../assets/web/assets/asset/pack_count.webp") no-repeat
        center/cover;
      > p {
        font-size: 20px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        color: #000000;
        line-height: 30px;
      }
    }
  }
}

.assetItem::-webkit-scrollbar {
  padding-top: 20px;
  width: 5px;
  background: url("../assets/web/assets/scroll_index.png") no-repeat
    center/cover;
}
.assetItem::-webkit-scrollbar-thumb {
  width: 5px;
  background: url("../assets/h5/assets/scroll.png") no-repeat center/cover;
}
@media all and (orientation: portrait) {
  .assetItem {
    padding-left: 10px;
    margin-top: 30px;
    width: 96%;
    height: 89%;
    // overflow: hidden;
  }
}
</style>
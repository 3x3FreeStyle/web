<template>
  <div class="filterBox">
    <div class="filterBox_pullDown">
      <div class="pullDown_btn" @click.stop="onClickPullDown">
        <img src="../assets/web/assets/asset/pullDown_btn.png" alt="" />
        <div>
          <p>{{ PullDownName }}</p>
        </div>
      </div>
      <ul class="pullDown_content" v-show="isPullDown">
        <li
          v-for="(item, index) in pullDownList"
          :key="index"
          @click="onClickPullDownItem(item)"
        >
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <button class="filterBox_clear" @click="onClickFilterBoxClear">
      <p>CLEAR</p>
    </button>
    <div class="filterBox_checkBox">
      <div
        class="checkBox_item"
        v-for="(item, index) in checkBoxList"
        :key="index"
        :class="item.select ? 'checkBox_select' : ''"
        @click="onClickCheckBox(item)"
      >
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "filterBox",
  data() {
    return {
      couponSelected: "1",
      isPullDown: false,
      PullDownName: "Recently Acquired",
    };
  },
  props: {
    pullDownList: {
      type: [Array],
      default: null,
    },
    checkBoxList: {
      type: [Array],
      default: null,
    },
  },
  mounted() {
    let body = document.getElementsByTagName("body")[0];
    body.onclick = (e) => {
      if (this.isPullDown) {
        this.isPullDown = false;
      }
    };
  },
  methods: {
    onClickCheckBox(item) {
      this.checkBoxList.map((val) => {
        if (val.name === item.name) {
          val.select = !val.select;
        }
      });
    },
    onClickPullDown() {
      console.log("onClickPullDown");
      this.isPullDown = !this.isPullDown;
    },
    onClickPullDownItem(item) {
      this.isPullDown = !this.isPullDown;
      this.PullDownName = item.name;
      console.log("onClickPullDownItem", item.id);
    },
    onClickFilterBoxClear() {
      this.checkBoxList.map((val) => {
        val.select = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filterBox {
  width: 100%;
  height: 100%;
  //   background-color: aquamarine;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .filterBox_pullDown {
    margin-left: 100px;
    width: 180px;
    height: 100%;
    // background-color: rgba(137, 43, 226, 0.61);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    .pullDown_btn {
      width: 100%;
      height: 31px;
      display: flex;
      flex-direction: row;
      > img {
        width: 25px;
        height: 31px;
      }
      > div {
        width: 155px;
        height: 31px;
        background-color: #fcc617;
        > p {
          font-size: 12px;
          font-family: AkzidenzGrotesk;
          font-weight: 400;
          color: #000000;
          line-height: 31px;
        }
      }
    }
    .pullDown_content {
      width: 155px;
      background-color: #ffffff;
      z-index: 1;
      > li {
        width: 100%;
        height: 31px;
        &:hover {
          background-color: #fcc617;
        }
        > p {
          font-size: 12px;
          font-family: AkzidenzGrotesk;
          font-weight: 400;
          color: #000000;
          line-height: 31px;
        }
      }
    }
  }
  .filterBox_clear {
    margin: 0 10px;
    border-style: none;
    width: 65px;
    height: 31px;
    background: url("../assets/web/assets/asset/filterBox_clear.png") no-repeat
      center/cover;
    > P {
      font-size: 12px;
      font-family: AkzidenzGrotesk;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .filterBox_checkBox {
    margin-left: 80px;
    width: 390px;
    height: 100%;
    // background-color: rgba(189, 192, 41, 0.801);
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    .checkBox_item {
      margin: 0 3px;
      width: 123px;
      height: 31px;
      background: url("../assets/web/assets/asset/checkBox.png") no-repeat
        center/cover;
      > p {
        padding-left: 25px;
        font-size: 15px;
        font-family: AkzidenzGrotesk;
        font-weight: 400;
        color: #000000;
        line-height: 35px;
      }
    }
    .checkBox_select {
      background: url("../assets/web/assets/asset/checkBox_select.png")
        no-repeat center/cover;
    }
  }
}
@media all and (orientation: portrait) {
  .filterBox {
    justify-content: space-around;
    .filterBox_pullDown {
      width: 150px;
      height: 70%;
      margin: 0;
      margin-left: 8px;
      margin-top: 30px;
      .pullDown_btn {
        > img {
          width: 25px;
          height: 31px;
        }
        > div {
          width: 125px;
        }
      }
      .pullDown_content {
        width: 125px;
      }
    }
    .filterBox_clear {
      margin-top: 30px;
    }
    .filterBox_checkBox {
      margin: 0;
      justify-content: center;
      align-content: center;
      width: 300px;
      .checkBox_item {
        transform: scale(0.95);
        margin: 3px 2px;
      }
    }
  }
}
</style>

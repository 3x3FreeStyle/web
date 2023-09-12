<template>
  <div class="presale">
    <div class="presale_bg">
        <div v-show="!this.isMobile" class="presale_box">
            <presalebox 
              v-for="(itme,index) in heroList" :key="index"
              :itemlist= itme
              :itemnum= index
              @showpop ="showpop"
            />  
        </div>
        <div  v-show="this.isMobile" class="presale_box_mobile">
            <presalebox 
              v-show ="isshow"
              v-for="(itme,index) in mobileList1" :key="index"
              :itemlist= itme
              :itemnum= index
              :isshow = isshow
              @showpop ="showpop"
            />  
            <presalebox 
              v-show ="!isshow"
              v-for="(itme,index) in mobileList2" :key="index + '-only'"
              :itemlist= itme
              :itemnum= index
              :isshow = !isshow
              @showpop ="showpop2"
            />  
            <div class="turnbox">
              <div class="left" @click="left()"></div>
              <div class="right" @click="left()"></div>
            </div>
        </div>
    </div>
    <sharePop
    :setClose="isShowWalletPop"
    :setWidth="58.75"
    :setHeight="34.125"
    >
      <div class="popbg">
        <div class="close" @click ="isShowWalletPop = false"></div>
        <div class="conts">
          <p>Confirm your purchase </p>
          <img class="icon"  :src= heroList[imgIndex].bg alt="">
          <p>X {{num}}</p>
        </div>
        <div class="down">
            <div class="cancel" @click="cancel()">
              <p id="up">CANCEL</p>
              <p id="down">CANCEL</p>
            </div>
            <div class="confrim" @click=" confrim()">
              <p id="up">CONFIRM</p>
              <p id="down">CONFIRM</p>
            </div>
        </div>
      </div>

     </sharePop> 
     <loading  v-show="islodaing" />
     <sharePop 
      :setClose="isShowBugBox"
      :setWidth="58.75"
      :setHeight="34.125"
     >
      <div class="bugbox_bg">
        <div class="close" @click ="isShowBugBox = false"></div>
        <div class="conts">
          <p>You received X {{buyboxnum}}  </p>
          <img class="icon"  :src= heroList[imgIndex].bg alt="">
          <p id="scend">You could open {{buyboxtext}} </p>
          <p id="last">in the pack page</p>
        </div>
        <div class="down">
            <div class="confrim" @click ="isShowBugBox = false">
              <p id="up">CONFIRM</p>
              <p id="down">CONFIRM</p>
            </div>
        </div>
      </div>
     </sharePop> 
  </div>
</template>

<script>
import { sendPresaleInfo, sendGetShopSignature } from '@/apis/login'
import { transaction } from "@/wallet/web3"
import sharePop from '@/components/sharePop.vue';
export default {
  components: { sharePop },
  data() {
    return {
      heroList: [{
        bg:require('../assets/web/presale/boxicon.png'),
        text1:0,
        text2:5,
        text3:123,
        datatime:"2022.12.25",
      },
      {
        bg:require('../assets/web/presale/boxicon2.png'),
        text1:0,
        text2:36,
        text3:777,
        datatime:"2022.12.25",
      }, 
      {
        bg:require('../assets/web/presale/boxicon3.png'),
        text1:0,
        text2:75,
        text3:456,
        datatime:"2022.12.25",
      }, 
      {
        bg:require('../assets/web/presale/boxicon4.png'),
        text1:0,
        text2:56,
        text3:788,
        datatime:"2022.12.25",
      }],
      mobileList1: [
        {
          bg:require('../assets/web/presale/boxicon.png'),
          text1:0,
          text2:5,
          text3:123,
          datatime:"2022.12.25",
        },
        {
          bg:require('../assets/web/presale/boxicon2.png'),
          text1:0,
          text2:36,
          text3:777,
          datatime:"2022.12.25",
        }, 
      ],
      mobileList2: [
        {
          bg:require('../assets/web/presale/boxicon3.png'),
          text1:0,
          text2:75,
          text3:456,
          datatime:"2022.12.25",
        }, 
        {
          bg:require('../assets/web/presale/boxicon4.png'),
          text1:0,
          text2:56,
          text3:788,
          datatime:"2022.12.25",
        }
      ],
      isMobile:null,
      isshow:true,
      isShowWalletPop:false,
      num:1,
      islodaing:false,
      imgIndex:0,
      isShowBugBox:false,
      buyboxnum:1,
      buyboxtext:"pack",
      timeChange:true,
    };
  },
  mixins:[transaction],
  methods:{
    checkIsMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    // right(){
    //   setTimeout(() => {
    //     this.isshow = !this.isshow
    //   }, 500);
    // },
    left(){
      if(!this.timeChange)return
      this.isshow = !this.isshow
      this.timeChange = false
      setTimeout(() => {
        this.timeChange = true
      }, 500);
    },
    showpop(value,index){
      console.log("???????????");
      this.isShowWalletPop = true
      // this.num = value
      this.imgIndex = index
    },
    showpop2(value,index){
      console.log("???????????");
      this.isShowWalletPop = true
      // this.num = value
      this.imgIndex = index + 2
    },
    cancel(){
      this.isShowWalletPop = false
    },
    async confrim(){
      this.islodaing = true
      await this.getAbis()
      this.getShopSignature(1)
    },
  },
  async mounted(){
    this.checkIsMobile()
    localStorage.setItem("isclickbtn",false)
    await this.getPreSalePlans()
    for (let index = 0; index < this.heroList.length; index++) {
      const element = this.heroList[index];
      element.text1= this.price
    }

    for (let index = 0; index < this.mobileList1.length; index++) {
      this.mobileList1[index].text1 = this.price
    }
    for (let index = 0; index < this.mobileList2.length; index++) {
      this.mobileList2[index].text1 = this.price
    }
  },
};
</script>

<style lang = "scss" scoped>
.presale {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../assets/web/presale/bg.webp") no-repeat center/cover;
  display: flex;
  align-items: center;
  .presale_bg {
    width: 2193px;
    height: 1371px;
    background: url("../assets/web/presale/icon.webp") no-repeat center/cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 21%;
    .presale_box{
      width: 1000px;
      height: 500px;
      position: relative;
      left: 5%;
      top: -12%;
      display: flex;
      flex-flow: wrap;
    }
  }
  .popbg{
    width: 940px;
    height: 546px;
    background: url("../assets/web/presale/pop.png") no-repeat center/cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .close{
      width: 60px;
      height: 46px;
      background: url("../assets/web/presale/close.png") no-repeat center/cover;
      position: absolute;
      top: 60px;
      right: 94px;
    }
    .conts{
      width: 65%;
      height: 207px;
      display: flex;
      margin-bottom: 10%;
      p{
        font-size: 30px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        color: #020202;
        text-align: left;
        line-height: 207px;
      }
      .icon{
        width: 141.6px;
        height: 166.4px;
        margin-top: 28px;
        margin-left: 3%;
      }
    }
    .down{
      width: 80%;
      height: 114px;
      position: absolute;
      top: 324px;
      display: flex;
      z-index: 20;
      .cancel{
        width: 259px;
        height: 114px;
        margin-left: 60px;
        background: url("../assets/web/presale/cancel.png") no-repeat center/cover;
        background-size: 100% 100%;
        p{
          font-size: 22px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 114px;
        }
        #up{
          -webkit-text-stroke: 4px #000000;
        }
        #down{
          position: relative;
          top: -100%;
        }
      }
      .confrim{
        width: 259px;
        height: 114px;
        background: url("../assets/web/presale/confrim.png") no-repeat center/cover;
        background-size: 100% 100%;
        margin-left: 112px;
        p{
          font-size: 22px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 114px;
        }
        #up{
          -webkit-text-stroke: 4px #000000;
        }
        #down{
          position: relative;
          top: -100%;
        }
      }
    }
  }
  .bugbox_bg{
    width: 940px;
    height: 546px;
    background: url("../assets/web/presale/pop.png") no-repeat center/cover;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .close{
      width: 60px;
      height: 46px;
      background: url("../assets/web/presale/close.png") no-repeat center/cover;
      position: absolute;
      top: 60px;
      right: 94px;
    }
    .conts{
      width: 100%;
      display: flex;
      margin-bottom: 10%;
      margin-left: 9%;
      p{
        font-size: 30px;
        font-family: MStiffHei PRC;
        font-weight: 800;
        color: #020202;
        text-align: left;
      }
      .icon{
        width: 113.28px;
        height: 133.12px;
        margin-top: -36px;
        margin-left: 3%;
      }
      #last{
        position: absolute;
        margin-top: 10%;
        margin-left: 2%;
      }
      #scend{
        margin-left: 2%;
      }
    }
    .down{
      width: 80%;
      height: 114px;
      position: absolute;
      top: 324px;
      display: flex;
      z-index: 20;
      .confrim{
        width: 259px;
        height: 114px;
        background: url("../assets/web/presale/confrim.png") no-repeat center/cover;
        margin-left: 240px;
        p{
          font-size: 22px;
          font-family: MStiffHei PRC;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 114px;
        }
        #up{
          -webkit-text-stroke: 4px #000000;
        }
        #down{
          position: relative;
          top: -100%;
        }
      }
    }
  }
}
@media all and (orientation: portrait){
  .presale{
    display: block;
    overflow-y: auto;
    .presale_bg{
      width: 750px;
      height: 1428px;
      background: url("../assets/h5/presale/presale_bg.png") no-repeat center/cover;
      /* padding-top: 127px; */
      .presale_box_mobile{
        width: 80%;
        height: unset;
        position: relative;
        /* left: 17%;
        top: -3%; */
        margin: 0 auto;
        margin-top: -80px;
        padding-left: 60px;
        /* display: flex;
        flex-flow: wrap; */
        .turnbox{
          position: absolute;
          width: 130%;
          height: 47px;
          left: 50%;
          top: 40%;
          transform: translate(-50%);
          /* left: -17%;
          top: 41%; */
          display: flex;
          /* justify-content: space-around; */
          z-index: 2;
          .right{
            width: 34px;
            height: 47px;
            background: url("../assets/h5/presale/right.png") no-repeat center/cover;
            position: relative;
            left: 75%;
          }
          .left{
            width: 34px;
            height: 47px;
            background: url("../assets/h5/presale/left.png") no-repeat center/cover;
            position: relative;
            left: 15%;
          }
        }
      }
    }
    .popbg {
      width: 716px;
      height: 414px;
      background: url("../assets/web/presale/pop.png") no-repeat center/cover;
      background-size: 100% 100%;
      .close {
        width: 45px;
        height: 34px;
        background: url("../assets/web/presale/close.png") no-repeat center/cover;
        top: 40px;
        right: 180px;
      }
      .conts {
        width: 100%;
        height: 100px;
        justify-content: center;
        align-items: center;
        .icon {
          width: auto;
          height: 100px;
        }
      }
      .down {
        width: 60%;
        top: unset;
        height: 85px;
        bottom: 200px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .cancel,
        .confrim {
          margin-left: 0;
          transform: scale(0.8);
        }
      }
    }
    
  }
  .popup_box {
      .bugbox_bg {
      width:716px;
      height: 414px;
      background: url("../assets/web/presale/pop.png") no-repeat center/cover;
      .close {
        width: 45px;
        height: 34px;
        background: url("../assets/web/presale/close.png") no-repeat center/cover;
        top: 40px;
        right: 180px;
      }
      .conts {
        margin-left: 6%;
        p{
          font-size: 22px;
        }
        .icon {
          width: 100px;
          height: auto;
          transform: scale(0.8);
          margin-left: 0;
        }
        #scend {
          margin-left: 0;
        }
      }
      .down {
        top: unset;
        bottom: 170px;
        transform: scale(0.8);
      }
    }
  }
  
}
</style>
<template>
  <div class="pack">
    <div class="pack_bg">
      <div class="wrapper_box">
        <div class="box_left" @click="isClick && onClicoLeft()"></div>
        <div
          class="box_bg"
          v-for="(item, index) in heroList"
          :key="index"
          v-show="item.seleft"
        >
          <div
            class="box_item"
            :class="[
              playAnimate ? 'playAnimate' : '',
              playAnimate2 ? 'playAnimate2' : '',
            ]"
            v-for="(item, index) in item.imgList"
            :key="index"
          >
            <img class="box_item_img" :src="item.imgUrl" alt="" />
          </div>
        </div>
        <div class="box_right" @click="isClick && onClicoRight()"></div>
      </div>
      <div class="openbox">
        <div class="box2">
          <img :src="this.heroBoxIcon[this.heroIndex]" alt="" />
          <p>{{ boxNum }}</p>
        </div>
        <div class="box_btn">
          <div @click="onClickOpen">
            <p>open</p>
          </div>
        </div>
      </div>
    </div>
    <div class="open_pop" v-show="showBox">
      <div class="close_pop" @click="showBox = false"></div>
      <div class="person_name">
        <img :src="openBoxData.nameImg" />
      </div>
      <div class="hoopman">
        <img :src="openBoxData.hoopmanImg" />
      </div>
      <div class="rarity">
        <img :src="openBoxData.rarityImg" />
      </div>
      <div class="info">
        <img src="@assets/web/pack/open_box/info_box.webp" />
        <p class="info_desc">{{ openBoxData.desc }}</p>
      </div>
    </div>
    <loading v-show="islodaing" />
  </div>
</template>
<script>
import { transaction } from "@/wallet/web3";
import store from '@store/index'
export default {
  name: "pack",
  data() {
    return {
      isMobile:false,
      islodaing: false,
      boxNum: 0,
      heroIndex: 0,
      playAnimate: false,
      playAnimate2: false,
      isClick: true,
      heroBoxIcon: [
        require("@/assets/web/pack/box_icon1.png"),
        require("@/assets/web/pack/box_icon2.png"),
        require("@/assets/web/pack/box_icon1.png"),
        require("@/assets/web/pack/box_icon2.png"),
      ],
      heroList: [
        {
          seleft: true,
          imgList: [
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/left1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/left2.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/middle.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/right1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/right2.png"),
            },
          ],
        },
        {
          seleft: false,
          imgList: [
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/left1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/left2.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/middle.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/right1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/right2.png"),
            },
          ],
        },
        {
          seleft: false,
          imgList: [
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/left1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/left2.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/middle.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/right1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack1/right2.png"),
            },
          ],
        },
        {
          seleft: false,
          imgList: [
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/left1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/left2.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/middle.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/right1.png"),
            },
            {
              imgUrl: require("@/assets/web/pack/hero_pack2/right2.png"),
            },
          ],
        },
      ],
      showBox: false,
      openBoxData: {},
      openBoxList: [
        {
          nameImg: require("@assets/web/pack/open_box/name001.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman001.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity001.webp"),
          // desc: "Allen is the most lethal boxer in the Ring,but he is unpredictable.He could give you the perfect assistance at any time.No one knows what he is going to do next.But opponents konw at least one thing:Never let him get the ball!"
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name002.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman002.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity002.webp"),
          // desc: "This rose from the cold winter has already conquered people all over the world with her voice.But this is not enough for her.She also wants to let people all over the world know her passion for basketball.Be careful of this rose blooming on the court,because she is thorny."
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name003.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman003.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity003.webp"),
          // desc: "Edmond is a professional street basketball player. He is so experienced after playing on the court for many years. You will benefit a lot from playing against him. But no one knows why Edmond devoted himself to the world of street basket. There are rumors that he had a sad past"
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name004.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman004.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity004.webp"),
          // desc: "Annie is a top student from the business college. She always is the center of the crowd. Annie is an X-sport enthusiast. She loves the feeling of gravity made by skateboarding. When skateboarding cannot bring her more thrill, challenge, and satisfaction, she chooses to put everything into street basketball."
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name005.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman005.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity005.webp"),
          // desc: "Jane, a foreign student from the United States, has the figure that makes every bodybuilder envy. Those abs make her more attractive. Rose dominates the basket, she loves this nickname."
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name006.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman006.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity006.webp"),
          // desc: "Lannister, who was born in a famous wine merchant family, was a troublemaker. After he almost burned down the wine cellar at home, he was kicked out of the house by his father. He began to play ball on the street for a living. His natural business mind and skillful basketball skills always win the bet for the team he leads. He shrugged at the praise of others and attributed it to luck."
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name007.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman007.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity007.webp"),
          // desc: "Rebetta, who loves exploration, always travels around the world to explore ancient relics. But she loves street basketball the most. She learned many unique skills from matches with different people around the world, but for her, this is not enough, because the adventure has no end!"
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name008.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman008.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity008.webp"),
          // desc: "The low-key and charming blue short hair, the water ripple tight cheongsam is full of charm.There is a cold heart beneath a beautiful exterior. When she turns into the frozen queen,her divine shooting always intoxicate the fans.  Her agile action and sharp steals will instantly make her  the center of the court. "
          desc: '',
        },
        {
          nameImg: require("@assets/web/pack/open_box/name009.png"),
          hoopmanImg: require("@assets/web/pack/open_box/hoopman009.webp"),
          rarityImg: require("@assets/web/pack/open_box/rarity009.webp"),
          // desc: "Charming figure, flexible movement, dazzling skills, good at both attack and defense, countless fans. She is the soul of the team, a trustworthy person who can take the last-second shot. Her motto for basketball is quite simple ���� Enjoy the game, enjoy happiness."
          desc: '',
        },
      ],
      openBoxListM: [
        // {
        //   nameImg: require("@assets/h5/pack/open_box/name001.png"),
        //   hoopmanImg: require("@assets/h5/pack/open_box/hoopman001.png"),
        //   rarityImg: require("@assets/h5/pack/open_box/rarity001.png"),
        //   // desc: "Allen is the most lethal boxer in the Ring,but he is unpredictable.He could give you the perfect assistance at any time.No one knows what he is going to do next.But opponents konw at least one thing:Never let him get the ball!"
        //   desc: '',
        // }
      ],
      arrImg:[],
      totalHeroNum:10
    };
  },
  mixins:[transaction],
  async mounted() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|mi/i.test(navigator.userAgent)) {
      this.isMobile=true
    }else this.isMobile=false
    if (localStorage.getItem("wallet")) {
      if (store.getters.currentWalletAddress) {
        await this.getAbis()
        this.getBoxNum().then((res)=>{
          if (res) {
            this.boxNum = parseInt(res)
          }
        })
        this.loadExcels(()=>{
          
        })
      }
    }
    this.getImg()
  },
  destroyed(){

  },
  methods: {
    getImg(){
      if(this.openBoxListM.length > 1)return
      let requireModule = require.context(
        "@assets/h5/pack/open_box",
        false,
        /\.png$/
      )
      let imgs = []

      for (let index = 0; index < this.totalHeroNum; index++) {
        let heroAttribute = {
          nameImg:null,
          hoopmanImg:null,
          rarityImg:null
        }
        this.openBoxListM.push(heroAttribute)
      }

      for (var i = 0; i < requireModule.keys().length; i++) {
        let name = requireModule.keys()[i].substr(2, requireModule.keys()[i].length)
        let imgUrl = require(`@assets/h5/pack/open_box/${name}`);
        imgs[i] = new Image();
        imgs[i].src = imgUrl;

        let nameType = (name.slice(0,-4)).slice(-3)//005
        let nameIndex = parseInt(nameType)
        
        if(nameIndex){
          let attribute = null
          let nameImg = 'name'+nameType+'.png'
          let hoopmanImg = 'hoopman'+nameType+'.png'
          let rarityImg = 'rarity'+nameType+'.png'
          if(name == nameImg){
            attribute = 'nameImg'
          }else if(name == hoopmanImg){
            attribute = 'hoopmanImg'
          }else if(name == rarityImg){
            attribute = 'rarityImg'
          }
          
          if(this.openBoxListM[nameIndex]){
            this.openBoxListM[nameIndex - 1][attribute] = imgs[i].src
          }
        }
      }
    },
    onClicoLeft() {
      this.setSelect(false);
    },
    onClicoRight() {
      this.setSelect(true);
    },
    setSelect(judge) {
      this.isClick = false;
      this.playAnimate = true;
      setTimeout(() => {
        this.setHeroIndex(judge);
        this.clearSelect();
        this.heroList[this.heroIndex].seleft = true;
        this.playAnimate = false;
        this.playAnimate2 = true;
        setTimeout(() => {
          this.playAnimate2 = false;
          this.isClick = true;
        }, 500);
      }, 500);
    },
    setHeroIndex(judge) {
      if (judge) {
        if (this.heroIndex < 3) {
          this.heroIndex += 1;
        } else {
          this.heroIndex = 0;
        }
      } else {
        if (this.heroIndex > 0) {
          this.heroIndex -= 1;
        } else {
          this.heroIndex = 3;
        }
      }
    },
    clearSelect() {
      this.heroList.map((val) => {
        val.seleft = false;
      });
    },
    onClickOpen() {
      if(!store.getters.isConnectWallet){
        this.$popup.show({
          title: "Tips",
          text: "Please login to your account first!",
        });
        return
      }
      if(this.boxNum > 0){
        // let dna = '?009211146065020681109288090821135208772072450908210320074300928811'
        // this.showDNA(dna,1)
        // this.openBoxData = this.openBoxList[8];
        // this.openBoxData = this.openBoxListM[5];
        // this.showBox = true;
        this.islodaing = true;
        this.openOneBox()
      }
    },
  },
};
</script>
<style lang = "scss" scoped>
@keyframes takeBack1 {
  0% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0.5) translateX(1000px);
  }
}
@keyframes takeBack1M {
  0% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0.5) translateX(350px);
  }
}
@keyframes takeBack12 {
  0% {
    transform: scale(0.5) translateX(1000px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
@keyframes takeBack12M {
  0% {
    transform: scale(0.5) translateX(350px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
@keyframes takeBack2 {
  0% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0.5) translateX(500px);
  }
}
@keyframes takeBack2M {
  0% {
    transform: scale(1) translate(0);
  }
  100% {
    transform: scale(0.5) translate(150px,-400px);
  }
}
@keyframes takeBack22 {
  0% {
    transform: scale(0.5) translateX(500px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
@keyframes takeBack22M {
  0% {
    transform: scale(0.5) translate(150px,-400px);
  }
  100% {
    transform: scale(1) translate(0);
  }
}
@keyframes takeBack3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.9);
  }
}
@keyframes takeBack32 {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes takeBack4 {
  0% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0.5) translateX(-500px);
  }
}
@keyframes takeBack4M {
  0% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0.5) translateX(-500px);
  }
}
@keyframes takeBack42 {
  0% {
    transform: scale(0.5) translateX(-350px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
@keyframes takeBack42M {
  0% {
    transform: scale(0.5) translateX(-350px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
@keyframes takeBack5 {
  0% {
    transform: scale(1) translateX(0);
  }
  100% {
    transform: scale(0.5) translateX(-1000px);
  }
}
@keyframes takeBack5M {
  0% {
    transform: scale(1) translate(0);
  }
  100% {
    transform: scale(0.5) translate(-180px,-400px);
  }
}
@keyframes takeBack52 {
  0% {
    transform: scale(0.5) translateX(-1000px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}
@keyframes takeBack52M {
  0% {
    transform: scale(0.5) translate(-180px,-400px);
  }
  100% {
    transform: scale(1) translate(0);
  }
}
@keyframes personName {
  0% {
    transform: translate(0,0);
    opacity: .33;
  }
  36% {
    transform: translate(-632px,-260px);
    opacity: .66;
  }
  100% {
    transform: translate(-780px,-320px);
    opacity: 1;
  }
}
@keyframes personNameM {
  0% {
    transform: translate(0,0);
    opacity: 0;
  }
  20% {
    transform: translate(-300px,-320px);
    opacity: .6;
  }
  100% {
    transform: translate(-440px,-460px);
    opacity: 1;
  }
}
@keyframes hoopman {
  0% {
    transform: scale(.6);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  83% {
    transform: scale(.98);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes rarity {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  40% {
    transform: translateX(1110px);
    opacity: 1;
  }
  80% {
    transform: translateX(1013px);
    opacity: 1;
  }
  100% {
    transform: translateX(1110px);
    opacity: 1;
  }
}
@keyframes rarityM {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  40% {
    transform: translateX(800px);
    opacity: 1;
  }
  80% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(800px);
    opacity: 1;
  }
}
@keyframes info {
  0% {
    transform: scale(.5);
    opacity: 0;
  }
  57% {
    transform: scale(1);
    opacity: 1;
  }
  85% {
    transform: scale(.98);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.open_pop{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("../assets/web/pack/open_box/bg.webp") no-repeat center/cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  .close_pop{
    width: 60px;
    height: 46px;
    background: url("../assets/web/pack/open_box/close.png") no-repeat center/cover;
    position: absolute;
    top: 24px;
    right: 17px;
    cursor: pointer;
    z-index: 5;
  }
  .person_name{
    width: 320px;
    height: 188px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -160px;
    opacity: .3;
    animation: personName 0.47s forwards linear;
    img{
      width: 100%;
      height: auto;
    }
  }
  .hoopman{
    width: 1406px;
    height: 2449px;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    margin-top: -950px;
    margin-left: -1050px;
    opacity: 0;
    animation: hoopman .2s forwards linear;
    animation-delay: .17s;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .rarity{
    width: 945px;
    height: 326px;
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    margin-top: 35px;
    margin-left: -2000px;
    opacity: 0;
    animation: rarity .2s forwards ease-out;
    animation-delay: .5s;
    img{
      width: 100%;
      height: auto;
    }
  }
  .info{
    width: 905px;
    height: 1132px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -690px;
    margin-left: -40px;
    opacity: 0;
    animation: info .2s forwards ease-out;
    animation-delay: .77s;
    img{
      width: 100%;
      height: 100%;
    }
    .info_desc{
      width: 500px;
      height: 500px;
      font-size: 24px;
      font-family: Cooper Std;
      font-weight: 800;
      color: #000000;
      line-height: 35px;
      text-align: left;
      position: absolute;
      top: 450px;
      left: 190px;
      overflow-y: auto;
      padding-right: 5px;
      /* word-break: break-all;
      text-align: justify; */
    }
    .info_desc::-webkit-scrollbar {
      width: 4px;
      background: url("../assets/web/home/about/scroll.png") no-repeat
        center/cover;
    }
    .info_desc::-webkit-scrollbar-thumb {
      width: 4px;
      height: 30px;
      background: url("../assets/web/home/about/scroll_index.png") no-repeat
        center/cover;
    }
  }
}
.pack {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("../assets/web/pack/bg.webp") no-repeat center/cover;
  display: flex;
  align-items: center;
  .pack_bg {
    margin-top: 86px;
    width: 100%;
    height: 756px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .wrapper_box {
      width: 90%;
      height: 432px;
      position: relative;
      margin: 0 auto;
      .box_left {
        z-index: 2;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 207px;
        height: 132px;
        background: url("../assets/web/pack/left.png") no-repeat center/cover;
      }
      .box_right {
        z-index: 2;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 207px;
        height: 137px;
        background: url("../assets/web/pack/right.png") no-repeat center/cover;
      }
      .box_bg {
        width: 1392px;
        height: 432px;
        /* display: flex; */
        margin: 0 auto;
        /* overflow: hidden; */

        position: relative;
        .box_item {
          position: absolute;
          width: 332px !important;
          height: 413px;
          display: flex;
          justify-content: center;
          align-items: center;
          /* margin-right: 50px; */
          .box_item_img {
            position: absolute;
            width: 332px;
            height: 413px;
          }
          .box_item_hero {
            position: absolute;
            width: 332px;
            height: 413px;
          }
          .box_item_text_bg {
            position: absolute;
            width: 332px;
            height: 413px;
          }
        }
        .box_item.playAnimate {
          &:nth-child(1) {
            animation: takeBack1 0.3s linear forwards;
          }
          &:nth-child(2) {
            animation: takeBack2 0.3s linear forwards;
          }
          &:nth-child(3) {
            animation: takeBack3 0.3s linear forwards;
          }
          &:nth-child(4) {
            animation: takeBack4 0.3s linear forwards;
          }
          &:nth-child(5) {
            animation: takeBack5 0.3s linear forwards;
          }
        }
        .box_item.playAnimate2 {
          &:nth-child(1) {
            animation: takeBack12 0.3s linear forwards;
          }
          &:nth-child(2) {
            animation: takeBack22 0.3s linear forwards;
          }
          &:nth-child(3) {
            animation: takeBack32 0.3s linear forwards;
          }
          &:nth-child(4) {
            animation: takeBack42 0.3s linear forwards;
          }
          &:nth-child(5) {
            animation: takeBack52 0.3s linear forwards;
          }
        }
        .box_item:nth-child(1) {
          left: 0;
        }
        .box_item:nth-child(2) {
          left: 240px;
        }
        .box_item:nth-child(3) {
          left: 535px;
          z-index: 2;
        }
        .box_item:nth-child(4) {
          right: 240px;
          z-index: 1;
        }
        .box_item:nth-child(5) {
          right: 0;
        }
      }
    }
    .openbox {
      width: 1442px;
      height: 321px;
      /* position: absolute;
      top: 45%;
      left: 8%; */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      .box2 {
        position: relative;
        width: 631px;
        height: 321px;
        background: url("../assets/web/pack/box.webp") no-repeat;
        background-size: 100%;
        > img {
          position: absolute;
          width: 161px;
          height: 175px;
          left: 207px;
          top: 99px;
        }
        > p {
          width: 80px;
          position: absolute;
          left: 40px;
          text-align: center;
          bottom: 15px;
          font-size: 37px;
          font-family: AkzidenzGrotesk;
          font-weight: 900;
          font-style: italic;
          color: #ffffff;
          -webkit-text-stroke: 2px #000000;
          text-stroke: 2px #000000;
        }
      }
      .box_btn {
        margin-right: 115px;
        width: 564px;
        height: 247px;
        background: url("../assets/web/pack/openbtn.png") no-repeat;
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > div {
          width: 510px;
          height: 90px;
          > p {
            font-size: 59px;
            font-family: MStiffHei PRC;
            font-weight: 800;
            color: #ffffff;
            /* padding-bottom: 15px; */
            -webkit-text-stroke: 3px #000000;
            text-stroke: 3px #000000;
          }
        }
      }
    }
  }
}

@media all and (orientation: portrait) {
.pack{
  min-height: 100vh;
  overflow-y: auto;
  display: block;
  background: url("../assets/h5/pack/bg.jpg") no-repeat center/cover;
  .pack_bg{
    height: 100%;
    margin-top: unset;
    padding-top: 180px;
    display: block;
    .wrapper_box{
      width: 692px;
      height: 620px;
      .box_left{
        width: 180px;
        height: 103px;
        background: url("../assets/h5/pack/left.png") no-repeat center/cover;
      }
      .box_right{
        width: 164px;
        height: 103px;
        background: url("../assets/h5/pack/right.png") no-repeat center/cover;
      }
      .box_bg{
        width: 692px;
        height: 560px;
        .box_item{
          width: 251px !important;
          height: 312px;
          .box_item_img{
            width: 251px;
            height: 312px;
          }
        }
        .box_item.playAnimate {
          &:nth-child(1) {
            animation: takeBack1M 0.3s linear forwards;
          }
          &:nth-child(2) {
            animation: takeBack2M 0.3s linear forwards;
          }
          &:nth-child(3) {
            animation: none;
          }
          &:nth-child(4) {
            animation: takeBack4M 0.3s linear forwards;
          }
          &:nth-child(5) {
            animation: takeBack5M 0.3s linear forwards;
          }
        }
        .box_item.playAnimate2 {
          &:nth-child(1) {
            animation: takeBack12M 0.3s linear forwards;
          }
          &:nth-child(2) {
            animation: takeBack22M 0.3s linear forwards;
          }
          &:nth-child(3) {
            animation: none;
          }
          &:nth-child(4) {
            animation: takeBack42M 0.3s linear forwards;
          }
          &:nth-child(5) {
            animation: takeBack52M 0.3s linear forwards;
          }
        }
        .box_item:nth-child(1) {
          left: 0;
          z-index: 2;
        }
        .box_item:nth-child(2) {
          top: 250px;
          left: 100px;
          z-index: 1;
        }
        .box_item:nth-child(3) {
          left: 214px;
          z-index: 3;
        }
        .box_item:nth-child(4) {
          left: 440px;
          right: unset;
          z-index: 2;
        }
        .box_item:nth-child(5) {
          top: 242px;
          right: 100px;
          z-index: 1;
        }
      }
    }
    .openbox{
      width: 100%;
      height: auto;
      display: block;
      .box2{
        width: 911px;
        height: 904px;
        background: url("../assets/h5/pack/box.png") no-repeat center/cover;
        margin-top: -320px;
        margin-left: -100px;
        pointer-events: none;
        > img{
          width: 143px;
          height: 157px;
          top: 440px;
          left: 390px;
        }
        > p{
          left: 210px;
          bottom: 268px;
          font-size: 38px;
        }
      }
      .box_btn{
        margin: -230px auto 0;
      }
    }
  }
}
  .open_pop{
    width: 100%;
    height: 100%;
    background: url("../assets/h5/pack/open_box/bg.jpg") no-repeat top/cover;
    .person_name{
      width: 286px;
      height: 251px;
      top: 600px;
      margin-top: unset;
      margin-left: 80px;
      opacity: 0;
      animation: personNameM 0.5s forwards linear;
    }
    .hoopman{
      width: 972px;
      height: 1471px;
      top: 0;
      margin-top: unset;
      margin-left: -380px;
    }
    .rarity{
      width: 840px;
      height: 289px;
      margin-top: -300px;
      margin-left: -1250px;
      animation: rarityM .17s forwards ease-out;
      animation-delay: .5s;
      z-index: 4;
    }
    .info{
      width: 828px;
      height: 1010px;
      margin-top: -250px;
      margin-left: -430px;
      animation: info .23s forwards ease-out;
      animation-delay: .77s;
      z-index: 3;
      .info_desc{
        width: 450px;
        height: 450px;
        top: 400px;
        left: 180px;
      }
    }
  }
}
</style>

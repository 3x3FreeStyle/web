<template>
  <div class="mission">
    <div class="content">
      <div
        class="tag_2022 tag_2022_d tag_2022_s"
        @click="change(2022)"
        ref="tag_2022"
      ></div>
      <div
        class="tag_2023 tag_2023_d"
        @click="change(2023)"
        ref="tag_2023"
      ></div>
      <div
        class="tag_2024 tag_2024_d"
        @click="change(2024)"
        ref="tag_2024"
      ></div>
      <div class="text_page4">
        <div
          class="text_main"
          v-for="(item, index) in Object.keys(textData[textindex])"
          :key="index"
        >
          <div class="text_title">{{ textindex + "  " + item }}</div>
          <p
            class="text_info"
            v-for="(item1, index1) in textData[textindex][item]"
            :key="index1"
          >
            {{ item1 }}
          </p>
        </div>
      </div>
    </div>
    <div class="person"></div>
    <div class="idot"></div>
  </div>
</template>

<script>
export default {
  name: "mission",
  data() {
    return {
      textindex: 2022,
      textData: {
        2022: {
          Q3: [
            "Complete the game concept design and function planning.",
            "Establish a core game architecture based on Blockchain.",
            "Start working on front-end and back-end development.",
            "Conduct preliminary user interface design.",
          ],
          Q4: [
            "Complete the development of front-end and back-end, and conduct preliminary integration testing.",
            "Start the development of the multiplayer battle function of the game.",
            "Optimization and improvement of user interface.",
            "Worked on art design and sound effects for the game.",
          ],
        },
        2023: {
          Q1: [
            "Complete the development of the multiplayer battle function, and conduct testing and optimization.",
            "Started the development of social function of the game,such as friend system and chat function.",
            "Optimize game performance and stability.",
            "Start marketing and promotional campaigns for your game.",
          ],
          Q2: [
            "Introduce NFT elements of the game, such as player cards and stadium decorations.",
            "Started the development of the competitive mode of the game, including the leaderboard and season system.",
            "Game testing and bug fixing.",
            "Continuing marketing and promotional activities to attract more users.",
          ],
          Q3: [
            "Complete the development of the competitive mode, and conduct testing and optimization.",
            "Introduce the game's community features, such as forums and social media integration.",
            "Localize the game to attract global players.",
            "Launch the mobile version of the game, adapting to iOS and Android platforms.",
          ],
          Q4: [
            "Start the cross-chain function development of the game to support other blockchain networks.",
            "Introducing the game's virtual economy system, including trading markets and in-game currency.",
            "Conduct user feedback collection and improvement of the game.",
            "Continue to carry out marketing and publicity activities to increase the popularity and user base of the game.",
          ],
        },
        2024: {
          Q1: [
            "improve the cross-chain function so that the game can run on multiple blockchain networks.",
            "Introduce the game's social competitive features, such as team games and friendly matches.",
            "Conduct game security audits and bug fixes.",
            "Esports events and rewards programs for games launched.",
          ],
          Q2: [
            "Continue to improve the social and competitive features of the game and conduct user testing.",
            "Carry out global offline activities of the game and interact face-to-face with fans and players.",
            "Introducing a major update to the game.",
          ],
          Q3: [
            "Introducing the story mode of the game.",
            "Host online global 3×3FreeStyle tournaments",
            "Started independent development of blockchain for 3×3 Moba game",
          ],
        },
      },
    };
  },
  mounted() {
    this.getLong();
  },
  methods: {
    getLong() {
      if (window.screen.height / window.screen.width < 1.8) {
        document.documentElement
          .getElementsByClassName("homeHowWork_mobile_content")[0]
          .classList.add("short");
      }
    },
    change(index) {
      this.textindex = index;
      if (index == 2022) {
        this.$refs.tag_2022.classList.add("tag_2022_s");
        this.$refs.tag_2023.classList.remove("tag_2023_s");
        this.$refs.tag_2024.classList.remove("tag_2024_s");
      }
      if (index == 2023) {
        this.$refs.tag_2023.classList.add("tag_2023_s");
        this.$refs.tag_2022.classList.remove("tag_2022_s");
        this.$refs.tag_2024.classList.remove("tag_2024_s");
      }
      if (index == 2024) {
        this.$refs.tag_2024.classList.add("tag_2024_s");
        this.$refs.tag_2022.classList.remove("tag_2022_s");
        this.$refs.tag_2023.classList.remove("tag_2023_s");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mission {
  width: 100%;
  height: 100%;
  background: url("../assets/web/home/mission/bg.webp") no-repeat center/cover;
  position: relative;
  overflow: hidden;
  .person {
    width: 768px;
    height: 928px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url("../assets/web/home/mission/person.png") no-repeat
      center/cover;
  }
  .idot {
    width: 887px;
    height: 837px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url("../assets/web/home/mission/idot.png") no-repeat
      center/cover;
  }
  .content {
    width: 1863px;
    height: 913px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: url("../assets/web/home/mission/content.png") no-repeat
      center/cover;
    .tag_2022 {
      width: 176px;
      height: 126px;
      left: 365px;
      top: 86px;
      z-index: 1;
      position: absolute;
    }
    .tag_2022_d {
      background: url("../assets/web/home/mission/2022.png") no-repeat
        center/cover;
    }
    .tag_2022_s {
      background: url("../assets/web/home/mission/2022_select.png") no-repeat
        center/cover;
    }
    .tag_2023 {
      width: 168px;
      height: 112px;
      left: 383px;
      top: 185px;
      z-index: 1;
      position: absolute;
    }
    .tag_2023_d {
      background: url("../assets/web/home/mission/2023.png") no-repeat
        center/cover;
    }
    .tag_2023_s {
      background: url("../assets/web/home/mission/2023_seletct.png") no-repeat
        center/cover;
    }
    .tag_2024 {
      width: 170px;
      height: 121px;
      left: 397px;
      top: 268px;
      z-index: 1;
      position: absolute;
    }
    .tag_2024_d {
      background: url("../assets/web/home/mission/2024.png") no-repeat
        center/cover;
    }
    .tag_2024_s {
      background: url("../assets/web/home/mission/2024_select.png") no-repeat
        center/cover;
    }
    .text_page4 {
      width: 1000px;
      height: 550px;
      position: absolute;
      left: 700px;
      top: 200px;
      overflow-y: auto;
      margin-bottom: 30px;

      .text_main {
        text-align: left;
        margin-bottom: 40px;
        .text_title {
          font-size: 55px;
          font-family: newTitle;
          color: #2b687b;
          margin-bottom: 20px;
        }
        .text_info {
          font-size: 26px;
          width: 900px;
          font-family: Cooper Std;
          line-height: 26px;
          position: relative;
          margin-left: 20px;
          color: #0a2e3a;
          margin-bottom: 20px;
        }
        .text_info::before {
          content: "";
          width: 10px;
          height: 10px;
          background: #0a2e3a;
          position: absolute;
          left: -17px;
          top: 3px;
          transform: rotate(45deg);
        }
      }
    }
    .text_page4::-webkit-scrollbar {
      width: 4px;
      // height: 10px;
      // scrollbar-arrow-color: red;
      background: url("../assets/web/home/mission/scroll.png") no-repeat
        center/cover;
    }
    .text_page4::-webkit-scrollbar-thumb {
      width: 16px;
      height: 92px;
      background: url("../assets/web/home/mission/bar.png") no-repeat
        center/cover;
    }
  }
}
@media all and (orientation: portrait) {
  .mission {
    background: url("../assets/h5/home/mission/bg.png") no-repeat center/cover;
    padding-top: 213px;
    overflow: hidden;
    .content {
      width: 750px;
      height: 1575px;
      left: 0;
      top:-100px;
      // transform: scale(0.9);
      .tag_2022 {
      width: 172px;
      height: 95px;
      left: 90px;
      top: 281px;
      z-index: 1;
      position: absolute;
      
    }
    .tag_2022_d {
      background: url("../assets/h5/home/mission/2022_d.png") no-repeat
        center/cover;
    }
    .tag_2022_s {
      background: url("../assets/h5/home/mission/2022_s.png") no-repeat
        center/cover;
    }
    .tag_2023 {
      width: 169px;
      height: 92px;
      left: 261px;
      top: 256px;
      z-index: 1;
      position: absolute;
    }
    .tag_2023_d {
      background: url("../assets/h5/home/mission/2023_d.png") no-repeat
        center/cover;
    }
    .tag_2023_s {
      background: url("../assets/h5/home/mission/2023_s.png") no-repeat
        center/cover;
    }
    .tag_2024 {
      width: 182px;
      height: 93px;
      left: 436px;
      top: 227px;
      z-index: 1;
      position: absolute;
    }
    .tag_2024_d {
      background: url("../assets/h5/home/mission/2024_d.png") no-repeat
        center/cover;
    }
    .tag_2024_s {
      background: url("../assets/h5/home/mission/2024_s.png") no-repeat
        center/cover;
    }
      background: url("../assets/h5/home/mission/content.png") no-repeat
        center/cover;
      .text_page4 {
        width: 500px;
        height: 900px;
        top: 400px;
        left: 120px;
        .text_main {
          text-align: left;
          margin-bottom: 40px;
          .text_title {
            font-size: 50px;
            font-family: newTitle;
            color: #2b687b;
            margin-bottom: 20px;
          }
          .text_info {
            font-size: 24px;
            width: 470px;
            font-family: Cooper Std;
            line-height: 26px;
            position: relative;
            margin-left: 20px;
            color: #0a2e3a;
            margin-bottom: 20px;
          }
          .text_info::before {
            content: "";
            width: 10px;
            height: 10px;
            background: #0a2e3a;
            position: absolute;
            left: -17px;
            top: 3px;
            transform: rotate(45deg);
          }
        }
      }
    }
    .person {
      display: none;
    }
    .idot {
      display: none;
    }
  }
}
</style>

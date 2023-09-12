<template>
<div class="boxbg">
    <div class="box_item">
        <img class="boxicon" :src= itemlist.bg alt="">
        <div class="boxtext">
            <div class="top">
                <p>xxx Pack</p>
            </div>
            <div class="text">
            <div class="text_line1">
                <p>Price: {{itemlist.text1}}</p>
            </div>
            <div class="text_line2">
                <p>Amount: {{itemlist.text2}}/{{itemlist.text3}}</p>
            </div>
            <div class="text_line3">
                <p>End Date: {{itemlist.datatime}}</p>
                <p></p>
            </div>
            <div class="text_line4">
                <p>Series: Best Players of 2022</p>
            </div>
            </div>
            <div class="boxicon2">
                <p id="title">Quantity</p>
                <div class="delbox" @click="del()">
                    <img id="del" src="../assets/web/presale/del.png" alt="" >
                </div>
                <input id="conts" type="number"  v-model.number="value" maxlength="3" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" @change="onClickGoodsNum()">
                <div class="addBox" @click="add()">
                    <img id="add" src="../assets/web/presale/add.png" alt="" >
                </div>
            </div>
            <div class="down" @click="buypop()">
                <p id="single">Purchase Now</p>
                <p id="dobule">Purchase Now</p>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>

export default {
    name:'presalebox',
    data(){
        return{
            value:1,
            inputBoxNum:999,
        }
    },
    props:{
        itemlist: {
            type: [Object],
        },
        itemnum: {
            type:[Number],
        },
        isshow:{
            type:[Boolean],
        },
    },
    methods:{
        add(){
            this.value = parseInt(Math.floor(this.value))
            console.log("+++",this.value);
            var input = document.getElementById("conts")
            console.log(input.value);
            if (input.value == '') {
                console.log("1111111111");
                this.value = 0
            }
            if(this.value < 999) {
                (this.value) += 1
            }
        },
        del(){
            console.log("---",this.value);
            var input = document.getElementById("conts")
            if (input.value == '') {
                this.value = 1
            }
            if(this.value > 1) {
                this.value -= 1
            }
        },
        onClickGoodsNum(){
            this.value = parseInt(Math.floor(this.value))
            if(this.value > 0 && this.value < this.inputBoxNum){
                    this.value = this.value + 0
                }else if(this.value > this.inputBoxNum){
                    this.value = this.inputBoxNum
                }else if(this.value == '' || this.value < 1){
                    this.value = 1
                }
        },
        buypop() {
            console.log("!!!!",localStorage.getItem("isclickbtn"));
            if (this.$store.getters.isConnectWallet) {
                console.log("11111");
                if (localStorage.getItem("isclickbtn")) {
                    console.log("1222222");
                    this.$emit("showpop",this.value,this.itemnum)
                }
            } else {
                this.$popup.show({ title: "Tips", text: "Please login to your account first!" });
            }
            
            // this.$emit("showpop",this.value,this.itemnum)
        },
    },
    mounted(){
    }

}
</script>

<style lang ="scss" scoped>
.boxbg{
    display: flex;
    pointer-events: none;
    .box_item{
        display: flex;
        .boxicon{
          width: 174px;
          height: 203px;
        }
        .boxtext{
            position: relative;
            top: -5%;
          .top{
            width: 294px;
            height: 57px;
            background: url("../assets/web/presale/texttop.png") no-repeat center/cover;
            p{
                font-size: 28px;
                font-family: MStiffHei PRC;
                font-weight: 800;
                color: #000000;
                line-height: 75px;
                text-align: left;
                margin-left: 18%;
            }
          }
          .text{
            width: 227px;
            height: 91px;
            margin-left: 9%;
            letter-spacing: 1px;
            position: relative;
            top: 7px;
            .text_line1{
              display: flex;
              p{
                  font-family: Cooper Std;
                  font-size: 18.5px;
                  color: #000000;
              }
            }
            .text_line2{
              display: flex;
              p{
                  font-family: Cooper Std;
                  font-size: 18.5px;
                  color: #000000;
              }
            }
            .text_line3{
              display: flex;
               width: 125%;
              p{
                  font-family: Cooper Std;
                  font-size: 18.5px;
                  color: #000000;
              }
            }
            .text_line4{
              display: flex;
              width: 125%;
              p{
                    letter-spacing: 0.5px;
                  font-family: Cooper Std;
                  font-size: 16.5px;
                  color: #000000;
              }
            }
          }
          .boxicon2{
            pointer-events: auto;
            width: 270px;
            height: 36px;
            background: url("../assets/web/presale/icon2.png") no-repeat center/cover;
            display: flex;
            margin-left: 20px;
            position: relative;
            top: 12px;
            z-index: 5;
            #title{
                font-size: 19px;
                font-family: MStiffHei PRC;
                font-weight: 800;
                color: #F8F5E7;
                margin-left: 5%;
                line-height: 36px;
            }
            #conts{
                width: 69px;
                height: 28px;
                font-size: 24px;
                font-family: MStiffHei PRC;
                font-weight: 800;
                color: #000000;
                margin-left: 10%;
                margin-top: 4px;
                text-align: center;
                z-index: 2;
                background: none;
            }
            #add{
                width: 24px;
                height: 24px;
                position: relative;
                top: 7px;
                left: 7px;
                z-index: 2;
            }
            .delbox{
                width: 24px;
                height: 24px;
                position: relative;
                top: 5px;
                left: 23px;
                z-index: 2;
                #del{
                    width: 24px;
                    height: 6px;
                    transform: translateY(180%);
                }
            }
            
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                -webkit-appearance: none;
            }
            input[type=number] {
                -moz-appearance:textfield;
            }
          }
          .down{
              width: 219px;
              height: 95px;
              background: url("../assets/web/presale/down.png") no-repeat center/cover;
              position: relative;
              left: 5%;
              top: -3%;
              pointer-events: auto;
              p{
                font-size: 19px;
                font-family: MStiffHei PRC;
                font-weight: 800;
                color: #FFFFFF;
                line-height: 95px;
              }
              #dobule{
                  position: relative;
                  top: -100%;
              }
              #single{
                -webkit-text-stroke: 5px #000000;
              }
          }
        }
      }
}

@media all and (orientation: portrait){
    .boxbg{
        z-index: 30;
        position: relative;
        .box_item{
            width: 100%;
            margin-top: 10px;
            transform: scale(1.2);
            .boxicon{
                transform: scale(0.8);
            }
            .boxtext{
                 top: 0;
                .top{
                    width: 274px;
                    height: 53px;
                    transform: scale(0.8);
                    margin-left: -40px;
                }
                .text{
                    width: 100%;
                    height: unset;
                    top: 0;
                    margin-left: 0;
                    .text_line1{
                        display: flex;
                        p{
                            font-family: Cooper Std;
                            font-size: 14px;
                            color: #000000;
                        }
                    }
                    .text_line2{
                        display: flex;
                        p{
                            font-family: Cooper Std;
                            font-size: 14px;
                            color: #000000;
                        }
                    }
                    .text_line3{
                        display: flex;
                        width: 130%;
                        p{
                            font-family: Cooper Std;
                            font-size: 14px;
                            text-align: left;
                            color: #000000;
                        }
                    }
                    .text_line4{
                        display: flex;
                        width: 130%;
                        p{
                            font-family: Cooper Std;
                            font-size: 14px;
                            text-align: left;
                            color: #000000;
                        }
                    }
                }
                .boxicon2{
                    position: relative;
                    margin-left: 0;
                    width: 255px;
                    height: 50px;
                    background: url("../assets/web/presale/icon2.png") no-repeat center/cover;
                    background-size: 255px 30px;
                    #title{
                        font-size: 15.86px;
                        margin-top: 10px;
                    }
                    #conts{
                        margin-left: -13px;
                        margin-top: 10px;
                        width: 50px;
                    }
                    .addBox {
                        width: 50px;
                        height: 100%;
                        #add{
                            width: 20px;
                            height: 20px;
                            position: relative;
                            top: 15px;
                            left: 5px;
                            z-index: 2;
                        }
                    }
                    .delbox {
                        width: 50px;
                        height: 100%;
                        top: 0;
                        left: -10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        #del{
                            width: 20px;
                            height: 6px;
                            z-index: 2;
                            transform: translateY(0);
                        }
                    }
                }
                .down{
                    margin-top: 5px;
                    width: 197px;
                    height: 86px;
                    left: 0;
                    /* top: -10%; */
                    p{
                        line-height: 86px;
                    }
                }
            }
            
        }
    }
}

</style>
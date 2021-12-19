<template>
  <div class="njl-rotaryTable">
    <view class="box">
      <view class="point"></view>

      <!-- 转盘容器 -->
      <view
          class="lottery"
          :style="{
            transform: `rotate(${ch}deg)`,
            transition: turn ? `all ${playanmite}ms ease` : '',
          }"
      >
        <view
            class="block"
            v-for="(item, index) in list"
            :key="index"
            :style="{
              transform: `rotate(${index * (360 / list.length)}deg) skewY(${90 - 360 / list.length}deg)`,
            }"
        >
          <view
              class="content"
              :style="{
                transform: `skewY(-${90 - 360 / list.length}deg) rotate(-${360 / list.length / 2}deg) translate(20rpx, 70rpx);`,
              }"
          >
            <view class="text">
              <view>{{ item.id }}</view>
              <view>{{ item.id }}name</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 转盘周边的小圆点 -->
      <view class="round" v-if="round">
        <view class="li" v-for="i in 48" :key="i" />
      </view>

      <!-- 开始抽奖的图 -->
      <view :class="turn ? 'btn' : 'btn-anima'" @click="clickBtn" />

    </view>
  </div>
</template>
<script>
// https://ext.dcloud.net.cn/plugin?id=5799#detail

export default {
  name: 'njlRotaryTable',
  data() {
    return {
      id: 1, // 抽奖id
      ch: 22.5, // 指针角度
      dch: 22.5, // 默认角度
      turn: false, // 转盘转动时状态
      turnNum: 0, // 转盘使用次数
    }
  },
  props: {
    // 数据列表
    list: {
      type: Array,
      default: [],
    },
    bgcolor: {
      type: Array,
      default: ['#fffbed', '#ffe0c3'],
    },
    // 是否显示周边圆点
    round: {
      type: Boolean,
      default: false,
    },
    // 转圈圈数
    numberOfTurns: {
      type: Number,
      default: Math.floor(Math.random() * 10 + 4),
    },
    // 转圈过渡时间 毫秒
    playanmite: {
      type: Number,
      default: 5000,
    },
    // 转盘是否自动转动
    autoTurns: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 设置默认角度
    defaultAngle() {
      let angle = 360 / this.list.length / 2
      this.ch = angle
      this.dch = angle
    },
    // 开始抽奖
    clickBtn() {
      this.$emit('click')
    },
    start(id) {
      if (this.list.length <= 0) return;
      // 圆心角度
      let angle = 360 / this.list.length
      if (!this.turn) {
        this.ch = this.dch
        setTimeout(() => {
          this.turn = true
          // 抽到的奖品位置
          var n1 = 0
          this.list.forEach((item, index) => {
            if (String(id) === item.id) {
              n1 = index
            }
          })
          var num = Math.floor(Math.random() * 20) + 1
          var n2 = this.numberOfTurns
          if (this.turnNum % 2 == 0) {
            this.ch += 360 * n2 - angle * n1 + num
          } else {
            this.ch += 360 * n2 - angle * n1 - num
          }
          this.turnNum++
        }, 100)
        setTimeout(() => {
          this.turn = false
          this.complete(id)
        }, this.playanmite)
      } else {
        console.log('正在抽奖')
      }
    },
    // 转盘转完后
    complete(id) {
      this.$emit('complete', id)
    },
  },
  watch: {
    list: {
      deep: true,
      handler: function () {
        this.defaultAngle()
      },
    },
  },
}
</script>
<style scoped lang="scss">
.njl-rotaryTable {
  .box {
    position: relative;
    width: 696.5rpx;
    height: 696.5rpx;
    background: url('https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/5nfqc51t1qo0000.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 50%;
    margin: 0 auto;
    padding: 20rpx;
    position: relative;
    overflow: hidden;
  }

  .point {
    position: absolute;
  }

  .round {
    position: absolute;
    top: 50rpx;
    width: 694rpx;
    border-radius: 50%;
    position: relative;
    animation-name: round; // 动画名称
    animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
    animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
    animation-delay: 0s; // 动画延迟时间
    animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
    animation-duration: 1s; // 动画完成时间
    @keyframes round {
      0% {
        opacity: 0;
      }
      25% {
        opacity: 0.25;
      }
      50% {
        opacity: 0.5;
      }
      75% {
        opacity: 0.75;
      }
      100% {
        opacity: 1;
      }
    }

    .li {
      margin: 0;
      list-style-type: none;
      padding: 0;
      width: 14rpx;
      height: 14rpx;
      position: absolute;
      background-color: #fff;
      border-radius: 50%;
      line-height: 46rpx;
      text-align: center;
      left: 50%;
      margin-left: -23rpx;
      margin-top: -23rpx;
      color: #fff;
      transform-origin: 23rpx 320rpx;

      &:nth-child(odd) {
        box-shadow: 0 0 5rpx 0 rgba(255, 255, 255, 1);
      }

      &:nth-child(even) {
        box-shadow: 0 0 5rpx 0 rgba(0, 0, 0, 0.2) inset;
      }
    }

    .li:first-child {
      transform-origin: 0 0;
    }

    @for $i from 1 through 48 {
      .li:nth-of-type(#{$i}) {
        transform: rotate(($i - 1) * 7.5 + deg);
      }
    }
    @for $i from 1 through 48 {
      .li:nth-of-type(#{$i}) span {
        display: block;
        transform: rotate(($i - 1) * -7.5 + deg);
      }
    }
  }

  .lottery {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 560rpx;
    height: 560rpx;
    margin: auto;
    border-radius: 50%;
    overflow: hidden;
  }

  .block {
    position: absolute;
    width: 280rpx;
    height: 280rpx;
    transform-origin: right bottom 0;
    -webkit-transform-origin: right bottom 0;
  }

  .block:nth-child(odd) {
    background-color: #6BCA14;
  }

  .block:nth-child(even) {
    background-color: #FFB32C;
  }
}

.content {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 200rpx;
  height: 200rpx;
  font-size: 24rpx;
  transform-origin: center center 0;
  // transform: skewY(-45deg) rotate(-22.5deg) translate(20rpx, 70rpx);
  // -webkit-transform: skewY(-45deg) rotate(-22.5deg) translate(20rpx, 70rpx);
  text-align: center;
}

.content .img {
  width: 100rpx;
  height: 100rpx;
  margin: 0 auto;
}

.content .text {
  width: 200rpx;
  height: 50rpx;
  line-height: 32rpx;
  color: #ec5330;
  letter-spacing: 0.8rpx;
  text-align: center;
  font-weight: bold;
  margin: 0 auto;
}

.content .text p:last-of-type {
  max-width: 40.5rpx;
  margin: 0 auto;
}

.content .none {
  width: 34px;
  height: 200px;
  margin: 0 auto;
  text-align: center;
  font-size: 34px;
  line-height: 200%;
  font-weight: bold;
}

.content img {
  width: 80px;
  height: 100px;
}

.btn {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
  cursor: pointer;
  background: url('https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/69xldzr5q6k0000.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
}

.btn-anima {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 28px;
  cursor: pointer;
  background: url('https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/69xldzr5q6k0000.png') no-repeat;
  background-size: 100% 100%;
  color: #fff;
  //animation-name: likes; // 动画名称
  animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
  animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
  animation-delay: 0s; // 动画延迟时间
  animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
  animation-duration: 1s; // 动画完成时间
}

/*@keyframes likes {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(0.85);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}*/

.str {
  height: 0px;
  width: 0px;
  position: absolute;
  top: 10px;
  left: 300px;
  border-top: 60px solid #9966cc;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
</style>

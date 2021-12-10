<template>
  <view>
    <custom-navbar title="关于我们" />

    <back-container>

      <view class="about-us">
        <image class="about-us-img" src="" />
        <view class="about-us-text">
          空间布局是体系化视觉设计的起点，和传统的平面设计的不同之处在于，UI 界面的布局空间要基于「动态、体系化」的角度出发
          展开。我们受到建筑界大师柯布西耶的模度思想的启发，基于「秩序之美」的原则，探索 UI 设计中的动态空间秩序，形
          成了 Ant Design 的界面布局方式，为设计者构筑具备理性之美的布局空间创造了条件。
        </view>

        <view class="list-box">
          <view class="list-item-cc" v-for="i in list" :key="i.title">
            <image class="list-item-img" :src="i.url" />
            <view class="list-title"></view>
            <view class="list-text"></view>
            <view class="list-item-copy">复制</view>
          </view>
        </view>
      </view>
    </back-container>

    <iphonex-bottom z-index="99">
      <big-btn button-text="我要咨询" />
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BigBtn from "../addressManage/component/bigBtn";

export default {
  name: "aboutUs",
  components: { BigBtn, IphonexBottom, BackContainer },
  data() {
    return {
      list: [
        { url: '', title: '', text: '' },
        { url: '', title: '', text: '' },
        { url: '', title: '', text: '' },
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
.about-us {
  .about-us-img {

  }

  .about-us-text {

  }

  .list-box {
    .list-item-cc {
      .list-item-img {

      }

      .list-title {

      }

      .list-text {

      }

      .list-item-copy {

      }
    }
  }
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>

<template>
  <Demo>
    <h2>评论图片单行展示</h2>
    <nut-cell>
      <nut-comment
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        :operation="['replay']"
        @click="handleclick"
        @click-images="clickImages"
      >
        <template #comment-labels>
          <img
            class="nut-comment-header__labels--item"
            src="https://img11.360buyimg.com/imagetools/jfs/t1/211858/17/4258/12101/618e6f78Ed0edcadc/e83a673555edf59f.jpg"
            style="width: 100rpx"
          />
        </template>
      </nut-comment>
    </nut-cell>

    <h2>评论图片多行展示</h2>
    <nut-cell>
      <nut-comment
        header-type="complex"
        images-rows="multi"
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        ellipsis="6"
        @click-images="clickImages"
      >
        <template #comment-labels>
          <img
            class="nut-comment-header__labels--item"
            src="https://storage.360buyimg.com/imgtools/78925d9440-f9e874d0-e93d-11eb-8e5c-0da9e18a13b1.png"
            style="height: 12px; width: 60rpx"
          />
        </template>

        <template #comment-shop-reply>
          <div class="nut-comment-shop">
            <span style="display: inline">京东美妆国际：</span
            >尊敬的客户您好，非常抱歉给您带来不愉快的购物体验，关于过敏，什么成分都不存在个别性和普遍性。
          </div>
        </template>
      </nut-comment>
    </nut-cell>

    <h2>追评</h2>
    <nut-cell>
      <nut-comment
        images-rows="multi"
        :images="cmt.images"
        :videos="cmt.videos"
        :info="cmt.info"
        :follow="cmt.follow"
        @click-images="clickImages"
      ></nut-comment>
    </nut-cell>
  </Demo>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Taro from '@tarojs/taro'
let cmt = ref({})

const handleclick = (info: any) => {
  console.log('进行跳转', info)
}

onMounted(() => {
  getData()
})

const getData = () => {
  Taro.request({
    method: 'GET',
    url: 'https://storage.360buyimg.com/nutui/3x/comment_data.json',
    success: (res) => {
      res.data.Comment.info.avatar
        = 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png'
      cmt.value = res.data.Comment
    }
  })
}

const clickImages = (imgs: any) => {
  console.log('进行图片展示', imgs)
}
</script>

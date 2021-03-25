<template>
  <div v-if="urlList">
    <swiper
      ref="mySwiper"
      :options="swiperOption"
      v-if="urlList.length>0"
    >
      <!-- @someSwiperEvent="callback" -->
      <!-- slides -->
      <swiper-slide
        v-for="(item,index) in urlList"
        :key="index"
        
      >
        <img
          style="width:100%;height:100%;cursor: pointer;"
          @click="ImageClick(item)"
          :src="item"
        >
      </swiper-slide>
      <!-- <swiper-slide>
        <img
          style="width:100%;height:100%;"
          src="../../assets/404_images/image404_1.png"
        >

      </swiper-slide> -->
      <!-- <swiper-slide style="border: 1px solid red"><img src="../../assets/largeScreen/stopFly.png"/></swiper-slide>
    <swiper-slide style="border: 1px solid red"><img src="../../assets/largeScreen/stopFly.png"/></swiper-slide>
    <swiper-slide style="border: 1px solid red"><img src="../../assets/largeScreen/stopFly.png"/></swiper-slide>
    <swiper-slide style="border: 1px solid red"><img src="../../assets/largeScreen/stopFly.png"/></swiper-slide>
    <swiper-slide style="border: 1px solid red"><img src="../../assets/largeScreen/stopFly.png"/></swiper-slide> -->
      <!-- Optional controls -->
      <div
        slot="pagination"
        class="swiper-pagination"
      />
      <div
        slot="button-prev"
        class="swiper-button-prev"
      />
      <div
        slot="button-next"
        class="swiper-button-next"
      />
    </swiper>
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="imgList"
    />
  </div>
</template>

<script>
import config from '@/config/config'
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
  export default {
    components: { ElImageViewer },
    name: 'MySwiper',
    props:{
      urlList:{
        type:[Array,Object], default: () => {return []}
      }
    },
    data() {
      return {
        showViewer: false,
        imgList:[],
        swiperOption: {
          slidesPerView: 3,
          spaceBetween : 10,
          url:config.url,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
          },
          errImages:['../../assets/404_images/image404_1.png']
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      // console.log('this is current swiper instance object', this.swiper)
      // this.swiper.slideTo(3, 1000, false)
    },
    methods:{
      ImageClick(url){
        this.showViewer=true;
        this.imgList=[url]
        console.log(url)
      },
        // 关闭查看器
      closeViewer() {
        this.showViewer = false;
      },
    },
  }
</script>

<template>
  <ProductZoomer :base-images="images"
                 :base-zoomer-options="zoomerOptions"
                 ref="productZoomer"
                 class="tag-box"
  />
</template>

<script>
  export default {
    props: ['imgSrc'],
    computed: {
      images () {
        const images = this.imgSrc
        let formattedImages = {
          normal_size: []
        }

        if(Array.isArray(images)) {
          images.forEach((item, index) => {
            formattedImages.normal_size.push({id: index, url: item })
          })
        } else {
          formattedImages.normal_size.push({id: 1, url: images })
        }

        return formattedImages
      }
    },

    mounted() {
      const tag = this.$refs.productZoomer
      tag.choosedThumb = tag.thumbs[0]
    },

    data: () => ({

      zoomerOptions: {
        zoomFactor: 4,
        pane: "container",
        hoverDelay: 300,
        namespace: "inline-container",
        move_by_click: false,
        scroll_items: 7,
        choosed_thumb_border_color: "#dd2c00",
        scroller_position: "left"
      }
    }),
  }
</script>


<style>
  .thumb-list{
    height:376px !important;
    width:76.6px !important;
    grid-template-rows:calc(100%/6/2) repeat(4, auto) calc(100%/6/2);
    visibility:visible !important;
  }

  .pane-container {
    height: 400px !important;
    width: 400px !important;
  }

  .preview-box {
    height: 300px !important;
    width: 300px !important;
  }

  .inline-container-base-container {
    width: 300px !important;
  }

  .zoomer-control {
    height: 27px !important;
  }
</style>

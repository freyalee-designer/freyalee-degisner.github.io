<template>
  <div class="black-frame addcart-frame" :class="{ active: is_open }">
    <div class="loading-box" :class="{ active: is_animate }">
      <div class="diamond animate">
        <img src="/Content/img/loading-diamond.png" />
      </div>
      <div class="yellowline animate">
        <img src="/Content/img/loading-yellowline.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_open: false,
      is_animate: false,
    };
  },
  components: {},
  created() {},
  methods: {
    closeAddCartBox() {
      const vm = this;
      vm.is_open = false;
    },
    openAddCartBox() {
      const vm = this;
      vm.is_open = true;
    },
    playAnimate() {
      const vm = this;
      vm.is_animate = true;
    },
    resetAnimate() {
      const vm = this;
      vm.is_animate = false;
    },
  },
};
</script>

<style scoped>
.addcart-frame {
  background: transparent;
}
.black-frame.active {
  display: block;
  position: fixed;
}
.addcart-frame .loading-box {
  left: 50%;
  top: 50%;
  transition: 0.5s ease-in-out all;
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 1;
}

.addcart-frame .loading-box.active {
  left: calc(100% - 20px);
  top: 20px;
  transform: translate(-50%, -50%) scale(0.1);
  opacity: 0;
}
@media only screen and (max-width: 734px) {
  .addcart-frame .loading-box {
    transform: translate(-50%, -50%) scale(0.35);
  }
}
</style>

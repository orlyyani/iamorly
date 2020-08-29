<style scoped>
.main-layout__content {
  height: 100vh;
}
.main-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  max-width: 1110px;
  margin: 0 auto;
}

.left-back-image {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="main-layout">
    <div class="main-layout__holder">
      <div class="main-layout__content">
        <!-- <v-container fluid fill-height pa-0>
          <v-row class="fill-height ma-0">
            <v-col cols="12" md="6" class="ma-0 pa-0">
              <LeftSider />
            </v-col>
            <v-col cols="12" md="6">
              <RightSider />
            </v-col>
          </v-row>
        </v-container> -->
        <v-container fluid fill-height pa-0>
          <v-row class="fill-height ma-0">
            <v-col cols="12" md="6" class="ma-0 pa-0">
              <div :style="cssProps" class="left-back-image"></div>
            </v-col>
            <v-col cols="12" md="6">
              <!-- white space -->
            </v-col>
          </v-row>
        </v-container>
        <v-container fluid fill-height pa-0 class="main-content">
          <v-row class="fill-height ma-0" max-width="1110px">
            <v-col cols="12" md="6" class="ma-0 pa-0">
              <LeftSider />
            </v-col>
            <v-col cols="12" md="6">
              <RightSider />
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import LeftSider from '@/layouts/main/LeftSider'
import RightSider from '@/layouts/main/RightSider'

export default {
  name: 'ManLayout',
  components: {
    LeftSider,
    RightSider,
  },
  data() {
    return {
      cssProps: {
        background: `
          linear-gradient(90deg, rgba(15,12,43,0.9) 0%, rgba(15,12,43,0.9) 100%, rgba(16,13,44,0.9) 100%, rgba(0,212,255,1) 100%),
          url(${require('@/assets/images/back-img.jpeg')}) no-repeat center center fixed
        `,
      },
    }
  }
}
</script>

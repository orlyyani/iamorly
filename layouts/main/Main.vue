<style scoped>
.main-layout__content {
  height: 100vh;
}
</style>
<template>
  <div class="main-layout">
    <div class="main-layout__holder">
      <div class="main-layout__content">
        <v-container fluid fill-height pa-0>
          <v-row class="fill-height ma-0">
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
}
</script>

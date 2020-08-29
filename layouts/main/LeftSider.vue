<style scoped>
.profile-info__details {
  margin-right: 230px;
  text-align: right;
}

.profile-info > .v-lazy {
  position: absolute;
  margin-left: 170px;
}

.profile-info__photo > .v-image {
  overflow: hidden;
  border-top-right-radius: 200px;
  border-bottom-right-radius: 200px;
}

.profile-info__photo:after {
  content: '';
  position: absolute;
  height: 500px;
  width: 200px;
  border-left: 3px solid #fff;
  z-index: 11;
  top: 0;
  top: -45px;
}

.left-sider__holder {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover !important;
}

.user-name {
  background: #fff;
  padding: 5px;
}

.user-name p {
  display: initial;
  border-left: 7px solid #020403;
  padding-left: 5px;
}

.profile {
  position: fixed;
}
</style>

<template>
  <div class="left-sider height-full">
    <div class="left-sider__holder justify-center-xy height-full">
      <div class="profile">
        <div class="profile-info justify-center-xy width-full">
          <div class="profile-info__details">
            <div class="profile-name">
              <v-lazy
                :options="{
                  threshold: 0.5,
                }"
                transition="slide-x-transition"
              >
                <div class="user-name">
                  <p class="f-black f-small">iamorly</p>
                </div>
              </v-lazy>
              <div class="porifle-job">
                <v-lazy
                  :options="{
                    threshold: 0.1,
                  }"
                  transition="slide-x-transition"
                >
                  <p class="f-white f-medium">Programmer</p>
                </v-lazy>
                <v-lazy
                  :options="{
                    threshold: 0.5,
                  }"
                  transition="slide-x-transition"
                >
                  <p class="f-white f-medium">/ Developer</p>
                </v-lazy>
                <v-lazy
                  :options="{
                    threshold: 1,
                  }"
                  transition="slide-x-transition"
                >
                  <p class="f-white f-medium">& Designer</p>
                </v-lazy>
              </div>
            </div>
          </div>
          <v-lazy
            :options="{
              threshold: 0.5,
            }"
            transition="scale-transition"
          >
            <div class="profile-info__photo">
              <v-img
                ref="profileImageRef"
                :src="ProfileImage"
                height="400"
                width="200"
                aspect-ratio
                @load="onImgLoad(ProfileImage)"
              />
            </div>
          </v-lazy>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileImage from '@/assets/images/profile-image.gif'
import GlitchEffect from 'glitch-canvas'

export default {
  name: 'LeftSider',
  data() {
    return {
      ProfileImage,
    }
  },
  methods: {
    onImgLoad(image) {
      const that = this
      const glitchParams = {
        seed: 10, // integer between 0 and 99
        quality: 60, // integer between 0 and 99
        amount: 5, // integer between 0 and 99
        iterations: 1, // integer
      }

      // GlitchEffect(glitchParams)
      //   .fromImage(this.$refs.profileImageRef.image)
      //   .toDataURL()
      //   .then(function (dataURL) {
      //     that.ProfileImage = dataURL
      //   })
    },
  },
}
</script>

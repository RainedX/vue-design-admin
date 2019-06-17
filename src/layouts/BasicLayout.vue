<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-postion-${navPosition}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      v-if="calcPos"
      collapsible
      :theme="navTheme"
      v-model="collapsed"
      :trigger="null"
    >
      <div class="logo" v-if="!collapsed">Admin</div>
      <div class="logo" v-else>
        <a-icon type="windows"></a-icon>
      </div>
      <side-menu :collapsed="collapsed" :navTheme="navTheme"></side-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
        <a-icon
          v-auth="['admin']"
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <ant-header></ant-header>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <ant-footer></ant-footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <Authorized :authority="['admin']">
    <set-theme></set-theme>
  </Authorized>
  </div>
</template>

<script>
import AntHeader from './Header.vue'
import AntFooter from './Footer.vue'
import SideMenu from './SideMenu.vue'
import SetTheme from '@/components/SetTheme.vue'

export default {
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    navTheme () {
      return this.$route.query.navTheme || 'dark'
    },
    navPosition () {
      return this.$route.query.navPosition || 'left'
    },
    calcPos () {
      return this.navPosition === 'left'
    }
  },
  components: {
    AntHeader,
    AntFooter,
    SideMenu,
    SetTheme
  }
}
</script>

<style lang="less" scoped>
#components-layout-demo-side {
  .logo {
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
    height: 32px;
    line-height: 32px;
    background: rgba(255,255,255,.2);
    margin: 16px;
  }
  .trigger {
    padding: 0 20px;
    font-size: 20px;
    line-height: 64px;
  }
}
.nav-theme-dark/deep/ .logo {
  color: #fff;
}
</style>

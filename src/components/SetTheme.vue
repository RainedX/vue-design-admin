<template>
  <div>
    <a-drawer
      title="Setting"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :width="200"
    >
    <template v-slot:handle>
      <div class="handle" @click="visible = !visible">
        <a-icon :type="visible ? 'close-circle' : 'setting'"></a-icon>
      </div>
    </template>
    <div>
      <h3>整体风格定制</h3>
      <a-radio-group
        @change="(e) => handleSettingChange('navTheme', e.target.value)"
        :value="$route.query.navTheme || 'dark'"
      >
        <a-radio value="dark">黑色</a-radio>
        <a-radio value="light">白色</a-radio>
      </a-radio-group>
      <div class="empty"></div>
      <h3>导航模式</h3>
      <a-radio-group
        @change="(e) => handleSettingChange('navPosition', e.target.value)"
        :value="$route.query.navPosition || 'left'"
      >
        <a-radio value="left">左侧</a-radio>
        <a-radio value="top">顶部</a-radio>
      </a-radio-group>
    </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onClose () {
      this.visible = false
    },
    handleSettingChange (type, val) {
      this.$router.push({
        query: { ...this.$route.query, [type]: val }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .handle {
    position: absolute;
    top: 240px;
    right: 200px;
    width: 48px;
    height: 48px;
    background-color: #1890ff;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    border-radius: 3px 0 0 3px;
  }
  .empty {
    height: 20px;
    width: 100%;
  }
</style>

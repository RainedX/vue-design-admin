<template>
  <div>
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="navTheme"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path" @click="() => $router.push({path: item.path, query: $route.query})">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>

import SubMenu from './SubMenu'
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    navTheme: {
      type: String,
      default: 'dark'
    }
  },
  components: {
    'sub-menu': SubMenu
  },
  data () {
    this.selectedKeysMap = {}
    this.openKeysMap = {}
    const menuData = this.getMenuData(this.$router.options.routes)
    console.log('this.selectedKeysMap:', this.selectedKeysMap)
    console.log('this.openKeysMap:', this.openKeysMap)
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    }
  },
  methods: {
    getMenuData (routes = [], parentKeys = [], selectedKey) {
      const menuData = []

      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys
          this.selectedKeysMap[item.path] = [selectedKey || item.path]
          const newItem = { ...item }
          delete newItem.children

          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [...parentKeys, item.path])
          } else {
            this.getMenuData(item.children, selectedKey ? parentKeys : [...parentKeys, item.path], selectedKey || item.path)
          }

          menuData.push(newItem)
        } else if (!item.hideInMenu && item.children && !item.hideChildrenInMenu) {
          menuData.push(...this.getMenuData(item.children, [...parentKeys, item.path]))
        }
      })

      return menuData
    }
  },
  watch: {
    '$route.path' (val) {
      this.selectedKeys = this.selectedKeysMap[val]
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
    },
    collapsed (val) {
      this.openKeys = val ? [] : this.openKeysMap[val]
    }
  }
}
</script>

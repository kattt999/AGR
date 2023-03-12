<template>
  <d2-container>
    <d2-container class="page">
      <d2-page-cover title :sub-title="this.$t('index.title')">
        <img src="/image/theme/d2/logo/all.png" style="width:400px;" />
        <!-- <d2-icon-svg class="page__logo" name="d2-admin" /> -->
      </d2-page-cover>
    </d2-container>
    <!-- <el-tabs v-model="active">
      <el-tab-pane label="权限指令" name="permission">
        <index-tab-permission/>
      </el-tab-pane>
      <el-tab-pane label="富文本编辑器" name="editor">
        <index-tab-editor/>
      </el-tab-pane>
    </el-tabs>-->
  </d2-container>
</template>

<script>
export default {
  components: {
    indexTabPermission: () => import("./components/permission"),
    indexTabEditor: () => import("./components/editor"), 
  },
  data() {
    return {
      active: "permission",
    };
  },
};
</script>
<style lang="scss"> 
.data-chart {
  width: 100%;
  height: 50%;
}
</style>

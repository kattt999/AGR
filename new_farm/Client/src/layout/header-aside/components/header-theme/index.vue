<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="this.$t('index.theme')"
      placement="bottom">
      <d2-button
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text"
        @click="dialogVisible = true">
        <d2-icon
          name="diamond"
          style="font-size: 16px"/>
      </d2-button>
    </el-tooltip>
    <el-dialog
      :title="this.$t('index.theme')"
      width="600px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <d2-theme-list style="margin-top: -25px;"/>
    </el-dialog>
  </div>
</template>

<script>
import themeList from './components/d2-theme-list'
export default {
  components: {
    'd2-theme-list': themeList
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

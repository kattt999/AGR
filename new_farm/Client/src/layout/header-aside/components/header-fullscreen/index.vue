<template>
  <el-tooltip
    effect="dark"
    :content="active ?  this.$t('index.Escfullscreen') : this.$t('index.fullscreen') "
    placement="bottom">
    <d2-button class="d2-mr btn-text can-hover" type="text" @click="toggle">
      <d2-icon v-if="active" name="compress"/>
      <d2-icon v-else name="arrows-alt" style="font-size: 16px"/>
    </d2-button>
  </el-tooltip>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/fullscreen', [
      'active'
    ])
  },
  methods: {
    ...mapMutations('d2admin/fullscreen', [
      'toggle'
    ])
  }
}
</script>

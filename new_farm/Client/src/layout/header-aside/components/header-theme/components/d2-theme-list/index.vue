<template>
  <el-table :data="list" v-bind="table">
    <el-table-column prop="title" align="center" width="160" />
    <el-table-column :label="preview" width="120">
      <div
        slot-scope="scope"
        class="theme-preview"
        :style="{
          backgroundImage: `url(${$env.BASE_URL}${scope.row.preview})`,
        }"
      ></div>
    </el-table-column>
    <el-table-column prop="address" align="center">
      <template slot-scope="scope">
        <d2-button
          v-if="activeName === scope.row.name"
          type="success"
          icon="el-icon-check"
          :label="activated"
          round
        />
        <d2-button
          v-else
          round
          :label="use"
          @click="handleSelectTheme(scope.row.name)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Vue from "vue";
export default {
  name: "d2-theme-list",
  data() {
    return {
      table: {
        showHeader: false,
        border: true,
      },
      use: this.$t("index.use"),
      preview: this.$t("index.preview"),
      activated: this.$t("index.activated"),
    };
  },
  computed: {
    ...mapState("d2admin/theme", ["list", "activeName"]),
  },
  methods: {
    ...mapActions("d2admin/theme", ["set"]),
    handleSelectTheme(name) {
      this.set(name);
    },
  },
};
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>

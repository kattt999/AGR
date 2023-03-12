<template>
  <div>
    <el-dropdown size="default" class="d2-mr">
      <span class="btn-text">{{
        name
          ? this.$t("index.userInfo", { name: name })
          : this.$t("index.userCenter")
      }}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off" class="d2-mr-5" />{{
            this.$t("index.exit")
          }}
        </el-dropdown-item>
        <el-dropdown-item @click.native="updpwd">
          <d2-icon name="edit" class="d2-mr-5" />{{
            this.$t("index.updataPwd")
          }}
        </el-dropdown-item>
        <el-dropdown-item @click.native="refresh">
          <d2-icon name="refresh" class="d2-mr-5" />{{
            this.$t("index.refresh")
          }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-dialog title="修改密码" width="400px"  :visible.sync="dialogVisible"> -->
    <d2-theme-list v-if="dialogVisible" ref="updatePassowrd" />
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import themeList from "./components/d2-upd-pwd";
export default {
  components: {
    "d2-theme-list": themeList,
  },
  computed: {
    ...mapGetters("d2admin/user", ["name"]),
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions("d2admin/user", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout();
    },
    updpwd() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init();
      });
    },
    refresh() {
      window.location.reload(true);
    },
  },
};
</script>

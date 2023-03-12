<template>
  <el-dialog
    width="400px"
    :visible.sync="visible"
    :title="$t('index.updataPwd')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmitHandle()"
      label-width="100px"
    >
      <el-form-item :label="this.$t('management.user.user_name')">
        <span>{{ name }}</span>
      </el-form-item>
      <el-form-item prop="password" :label="this.$t('management.user.opassword')">
        <el-input v-model="dataForm.password" type="password" placeholder="this.$t('management.user.opassword')" />
      </el-form-item>
      <el-form-item prop="newPassword" :label="this.$t('management.user.password')">
        <el-input v-model="dataForm.newPassword" type="password" :placeholder="this.$t('management.user.password')" />
      </el-form-item>
      <el-form-item prop="comfirmPassword" :label="this.$t('management.user.repassword')">
        <el-input v-model="dataForm.comfirmPassword" type="password" :placeholder="this.$t('management.user.repassword')" />
      </el-form-item>
      <el-form-item>
        <el-button @click="visible = false">{{this.$t('cancle')}}</el-button>
        <el-button type="primary" @click="dataFormSubmitHandle()">{{this.$t('ok')}}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { debounce } from 'lodash'
// import { sysUserService } from '@/common/api'
// import md5 from 'md5'
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        password: '',
        newPassword: '',
        comfirmPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters('d2admin/user', ['name']),
    dataRule () {
      var validateComfirmPassword = (rule, value, callback) => {
        if (this.dataForm.newPassword !== value) {
          return callback(
            new Error(this.$t('updatePassword.validate.comfirmPassword'))
          )
        }
        callback()
      }
      return {
        password: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          }
        ],
        comfirmPassword: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          },
          { validator: validateComfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('d2admin/user', ['logout']),
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
    },
    // 表单提交
    dataFormSubmitHandle: debounce(
      function () {
        this.$refs.dataForm.validate(valid => {
          if (!valid) return false
          try {
            var _vo = {}
            _vo.password = this.dataForm.password
            _vo.newpassword = this.dataForm.newPassword
            _vo.user_name = this.name
            this.$axios
              .post('/api/user/updpwd', _vo)
              .then(res => {
                console.dir(res)
                this.$message({
                  message: this.$t("index.updataPwdS"),
                  type: 'success',
                  duration: 500,
                  onClose: () => {
                    this.visible = false
                    this.logout({ focus: true, remote: true, back: false })
                  }
                })
              })
              .catch(() => {})
            // this.$message({ message: "提交成功", type: "success" });
            // this.$emit("success");
          } catch (e) {}
        })
      },
      1000,
      { leading: true, trailing: false }
    )
  }
}
</script>

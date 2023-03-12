import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  data() {
    return {
      api: {
        detail: '/api/user/update',
        create: '/api/user/create',
        update: '/api/user/update'
      }
    }
  },
  computed: {
    setting() {
      return [
        {
          prop: 'user_name',
          default: '',
          label: this.$t('management.user.user_name'),
          rule: [
            { required: true, message: this.$t('required'), trigger: 'change' }
          ],
          render: () => <div>{this.form.model.user_name}</div>
        },
        {
          prop: 'opassword',
          default: '',
          label: this.$t('management.user.opassword'),
          rule: { required: true, message: this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.opassword} type="password" clearable />
        },
        {
          prop: 'password',
          default: '',
          label: this.$t('management.user.password'),
          rule: { required: true, message: this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.password} type="password" clearable />
        },

        {
          prop: 'repassword',
          default: '',
          label: this.$t('management.user.repassword'),
          rule: { required: true, message: this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.repassword} type="password" clearable />
        }
      ]
    }
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict() {
      // 岗位
      this.loadDictOne({
        name: 'user_post',
        method: this.$api.POST_ALL,
        fields: 'id,post_name',
        path: 'list',
        label: 'post_name'
      })
      // 角色
      this.loadDictOne({
        name: 'user_role',
        method: this.$api.ROLE_ALL,
        fields: 'id,role_name',
        path: 'list',
        label: 'role_name'
      })
    },
    /**
     * @description 在提交表单之前可选进行数据处理
     * @param {Object} data 默认的表单数据
     */
    transformSubmitData(data) {
      if (this.mode === 'edit') {
        // 编辑模式下删除密码字段
        return this._.omit(data, ['password'])
      } else {
        // 新建模式下全部发送
        return data
      }
    }
  }
}

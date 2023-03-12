import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  data () {
    return {
      api: {
        detail: '/api/post/update',
        create: '/api/post/create',
        update: '/api/post/update'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'post_name',
          default: '',
          label: this.$t('management.post.post_name'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.post_name} clearable />
        },
        {
          prop: 'post_code',
          default: '',
          label: this.$t('management.post.post_code'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.post_code} clearable />
        },
        {
          prop: 'post_sort',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label: this.$t('management.post.post_sort'),
          render: () => <el-input-number min={this.$env.VUE_APP_FORM_SORT_MIN} vModel={this.form.model.post_sort} />
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: this.$t('status'),
          render: () => <d2-dict-radio vModel={this.form.model.status} name="status" button />
        },
        {
          prop: 'remark',
          default: '',
          label: this.$t('remark'),
          render: () => <el-input vModel={this.form.model.remark} clearable />
        }
      ]
    }
  }
}

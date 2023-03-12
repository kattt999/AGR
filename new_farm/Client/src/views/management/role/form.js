import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  data () {
    return {
      api: {
        detail: '/api/role/update',
        create: '/api/role/create',
        update: '/api/role/update'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'role_name',
          default: '',
          label:  this.$t('management.role.role_name'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.role_name } clearable/>
        },
        {
          prop: 'role_key',
          default: '',
          label:  this.$t('management.role.role_key'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.role_key } clearable/>
        },
        {
          prop: 'role_sort',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label:  this.$t('management.role.role_sort'),
          render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.role_sort }/>
        },
        {
          prop: 'role_menu',
          default: '',
          label:  this.$t('management.role.role_menu'),
          render: () => <d2-tree vModel={ this.form.model.role_menu } source="MENU_ALL" key-label="menu_name" multiple half-mix stringify/>
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: this.$t('status'),
          render: () => <d2-dict-radio vModel={ this.form.model.status } name="status" button/>
        },
        {
          prop: 'remark',
          default: '',
          label: this.$t('remark'),
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  }
}

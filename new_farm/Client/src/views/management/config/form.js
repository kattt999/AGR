import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  data () {
    return {
      api: {
        detail: '/api/configs/update',
        create: '/api/configs/create',
        update: '/api/configs/update'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'config_name',
          default: '',
          label: '参数名称',
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.config_name } clearable/>
        },
        {
          prop: 'config_key',
          default: '',
          label: '参数键名',
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.config_key } clearable/>
        },
        {
          prop: 'config_value',
          default: '',
          label: '参数键值',
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.config_value } clearable/>
        },
        {
          prop: 'config_type',
          default: this.$env.VUE_APP_DICT_IS_TRUE,
          label: '系统内置',
          render: () => <d2-dict-radio vModel={ this.form.model.config_type } name="is" button/>
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

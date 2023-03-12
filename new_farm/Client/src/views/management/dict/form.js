import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  data () {
    return {
      api: {
        detail: '/api/dict/update',
        create: '/api/dict/create',
        update: '/api/dict/update'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'dict_name',
          default: '',
          label:  this.$t('management.dict.dict_name'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.dict_name} clearable />
        },
        {
          prop: 'dict_name_en',
          default: '',
          label:  this.$t('management.dict.dict_name_en'), 
          render: () => <el-input vModel={this.form.model.dict_name_en} clearable />
        },
        {
          prop: 'dict_type',
          default: '',
          label: this.$t('management.dict.dict_type'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.dict_type} clearable />
        },
        {
          prop: 'dict_value_type',
          default: this.$env.VUE_APP_DICT_DICT_VALUE_TYPE_NUMBER,
          label: this.$t('management.dict.dict_value_type'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <d2-dict-radio vModel={this.form.model.dict_value_type} name="dict_value_type" disabled={this.mode !== 'create'} button />
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: this.$t('management.dict.status'),
          render: () => <d2-dict-radio vModel={this.form.model.status} name="status" button />
        },
        {
          prop: 'remark',
          default: '',
          label: this.$t('management.dict.remark'),
          render: () => <el-input vModel={this.form.model.remark} clearable />
        }
      ]
    }
  }
}

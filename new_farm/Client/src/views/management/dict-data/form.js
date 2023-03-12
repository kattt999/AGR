import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  props: {
    dictType: {
      type: Number,
      default: 1,
      required: true
    }
  },
  data () {
    return {
      api: {
        detail: '/api/dictdata/update',
        create: '/api/dictdata/create',
        update: '/api/dictdata/update'
      }
    }
  },
  computed: {
    setting () {
      const dictValueNumber = {
        prop: 'dict_number',
        default: 1,
        label: this.$t('management.dictdata.dict_number'),
        rule: { required: true, message:this.$t('required'), trigger: 'change' },
        render: () => <el-input-number min={ 1 } vModel={ this.form.model.dict_number }/>
      }
      const dictValueString = {
        prop: 'dict_value',
        default: '',
        label: this.$t('management.dictdata.dict_number'),
        rule: { required: true, message: this.$t('required'), trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.dict_value } clearable/>
      }
      const dictValue = this.dictType === 1 ? dictValueNumber : dictValueString 
      return [
        {
          prop: 'dict_id',
          default: this._.get(this.search, 'form.model.dict_id', ''),
          label: this.$t('management.dictdata.dict_id'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <d2-dict value={ this.form.model.dict_id } name="dict_id" custom disabled/>
        },
        {
          prop: 'dict_type',
          default: this._.get(this.search, 'form.model.dict_type', ''),
          label: this.$t('management.dictdata.dict_type'),
          render: () => <el-input vModel={ this.form.model.dict_type } clearable  custom disabled/>
        },
        {
          prop: 'dict_label',
          default: '',
          label: this.$t('management.dictdata.dict_label'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dict_label } clearable/>
        },
        {
          prop: 'dict_label_en',
          default: '',
          label: this.$t('management.dictdata.dict_label_en'), 
          render: () => <el-input vModel={ this.form.model.dict_label_en } clearable/>
        },
        dictValue,
        {
          prop: 'css_class',
          default: '',
          label: this.$t('management.dictdata.css_class'),
          render: () => <el-input vModel={ this.form.model.css_class } clearable/>
        },
        {
          prop: 'list_class',
          default: '',
          label: this.$t('management.dictdata.list_class'),
          render: () => <el-input vModel={ this.form.model.list_class } clearable/>
        },
        {
          prop: 'is_default',
          default: this.$env.VUE_APP_DICT_IS_FALSE,
          label: this.$t('management.dictdata.is_default'),
          render: () => <d2-dict-radio vModel={ this.form.model.is_default } name="is" button/>
        },
        {
          prop: 'dict_sort',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label: this.$t('management.dictdata.dict_sort'),
          render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.dict_sort }/>
        },
        {
          prop: 'status',
          default: this.$env.VUE_APP_DICT_STATUS_ACTIVE,
          label: this.$t('management.dictdata.status'),
          render: () => <d2-dict-radio vModel={ this.form.model.status } name="status" button/>
        },
        {
          prop: 'remark',
          default: '',
          label: this.$t('management.dictdata.remark'),
          render: () => <el-input vModel={ this.form.model.remark } clearable/>
        }
      ]
    }
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict () {
      // 字典
      this.loadDictOne({
        name: 'dict_id',
        method: this.$api.DICT_ALL,
        fields: 'dict_name,id',
        path: 'list',
        label: 'dict_name'
      })
    }
  }
}

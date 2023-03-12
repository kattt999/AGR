import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [form],
  data() {
    return {
      api: { 
        detail: '/api/cropland/update',
        create: '/api/cropland/create',
        update: '/api/cropland/update'
      }
    }
  },
  computed: {
    setting() {
      return [
        {
          prop: 'sn',
          default: '',
          label: this.$t('farm.cropland.sn'),
          rule: { required: true, message: this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.sn} clearable />
        },
        {
          prop: 'linkman',
          default: '',
          label: this.$t('farm.cropland.linkman'),
          render: () => <el-input vModel={this.form.model.linkman} clearable />
        },
        {
          prop: 'area',
          default: '',
          label: this.$t('farm.cropland.area'),
          render: () => <el-input vModel={this.form.model.area} clearable />
        },   
        {
          prop: 'mainCrop',
          default: '',
          label: this.$t('farm.cropland.mainCrop'),
          render: () => <el-input vModel={this.form.model.mainCrop} clearable />
        },     
        {
          prop: 'location',
          default: '',
          label: this.$t('farm.cropland.location'),
          render: () => <el-input vModel={this.form.model.location} clearable />
        },         
        {
          prop: 'farmId',
          default: '',
          label: this.$t('farm.cropland.farmId'), 
          render: () => <d2-dict-select name="farm_id" vModel={this.form.model.farmId} style="width: 100%;" custom   stringify />
        }, 
        {
          prop: 'remark',
          default: '',
          label: this.$t('remark'),
          render: () => <el-input vModel={this.form.model.remark} clearable />
        },
      ]
    }
  },
  methods: {
    /**
     * @description 加载需要的字典数据
     */
    loadDict() { 
      this.loadDictOne({
        name: 'farm_id',
        method: this.$api.FARM_ALL,
        fields: 'name,id',
        path: 'list',
        label: 'name'
      })
    }
  }
}

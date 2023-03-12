import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [form],
  data() {
    return {
      api: {
        detail: '/api/device/update',
        create: '/api/device/create',
        update: '/api/device/update'
      }
    }
  },
  computed: {
    setting() {
      return [
        {
          prop: 'sn',
          default: '',
          label: this.$t('farm.device.sn'),
          rule: { required: true, message: this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.sn} clearable />
        },
        {
          prop: 'name',
          default: '',
          label: this.$t('farm.device.name'), 
          render: () => <el-input vModel={this.form.model.name} clearable />
        }, 
        {
          prop: 'location',
          default: '',
          label: this.$t('farm.device.location'), 
          render: () => <el-input vModel={this.form.model.location} clearable />
        }, 
        {
          prop: 'standard',
          default: '',
          label: this.$t('farm.device.standard'), 
          render: () => <el-input vModel={this.form.model.standard} clearable />
        }, 
        {
          prop: 'manufacturer',
          default: '',
          label: this.$t('farm.device.manufacturer'), 
          render: () => <el-input vModel={this.form.model.manufacturer} clearable />
        },       
        {
          prop: 'typeId',
          default: '',
          label: this.$t('farm.device.typeId'), 
          render: () => <d2-dict-select name="type_id" vModel={this.form.model.typeId} style="width: 100%;" custom   stringify />
        },       
        {
          prop: 'userId',
          default: '',
          label: this.$t('farm.device.userId'), 
          render: () => <d2-dict-select name="user_id" vModel={this.form.model.userId} style="width: 100%;" custom   stringify />
        },       
        {
          prop: 'farmId',
          default: '',
          label: this.$t('farm.device.farmId'), 
          render: () => <d2-dict-select name="farm_id" vModel={this.form.model.farmId} style="width: 100%;" custom   stringify />
        }, 
        {
          prop: 'softwareVersion',
          default: '',
          label: this.$t('farm.device.softwareVersion'), 
          render: () => <el-input vModel={this.form.model.softwareVersion} clearable />
        }, 
        {
          prop: 'thresholdMin',
          default: 0,
          label: this.$t('farm.device.thresholdMin'), 
          render: () =><el-input-number precision="2"  vModel={this.form.model.thresholdMin} clearable />
        }, 
        {
          prop: 'thresholdMax',
          default: '',
          label: this.$t('farm.device.thresholdMax'), 
          render: () => <el-input-number precision="2"   vModel={this.form.model.thresholdMax} clearable />
        }, 
        {
          prop: 'installTime',
          default: '',
          label: this.$t('farm.device.installTime'),
          render: () => <el-date-picker vModel={this.form.model.installTime} value-format="yyyy-MM-dd HH:DD:SS" type="datetime" placeholder={ this.$t('farm.device.installTime')} />
        },
        {
          prop: 'state',
          default: '1',
          label: this.$t('status'),
          render: () => <d2-dict-radio vModel={this.form.model.state} name="device_status" button />
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
        name: 'user_id',
        method: this.$api.SYSUSER_ALL,
        fields: 'nickname,id',
        path: 'list',
        label: 'nickname'
      })
      this.loadDictOne({
        name: 'farm_id',
        method: this.$api.FARM_ALL,
        fields: 'name,id',
        path: 'list',
        label: 'name'
      })

      this.loadDictOne({
        name: 'type_id',
        method: this.$api.DEVICETYPE_ALL,
        fields: 'name,id',
        path: 'list',
        label: 'name'
      })
    }
  }
}

import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [form],
  data() {
    return {
      api: { 
        detail: '/api/products/update',
        create: '/api/products/create',
        update: '/api/products/update'
      }
    }
  },
  computed: {
    setting() {
      return [ 
        {
          prop: 'name',
          default: '',
          label: this.$t('farm.products.name'),
          render: () => <el-input vModel={this.form.model.name} clearable />
        },
        {
          prop: 'plantnum',
          default: '',
          label: this.$t('farm.products.plantnum'),
          render: () => <el-input-number precision="2" vModel={this.form.model.plantnum} clearable />
        },   
        {
          prop: 'price',
          default: 0,
          label: this.$t('farm.products.price'),
          render: () => <el-input-number precision="2" vModel={this.form.model.price} clearable />
        },      
        {
          prop: 'type',
          default: '',
          label: this.$t('farm.products.type'), 
          render: () => <d2-dict-select name="farm_type" vModel={this.form.model.type} style="width: 100%;"     stringify />
        },         
        {
          prop: 'state',
          default: 1,
          label: this.$t('status'), 
          render: () => <d2-dict-select name="status" vModel={this.form.model.state} style="width: 100%;"     stringify />
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

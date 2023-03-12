import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [form],
  data() {
    return {
      api: {
        detail: '/api/task/update',
        create: '/api/task/create',
        update: '/api/task/update'
      }
    }
  },
  computed: {
    setting() {
      return [
        {
          prop: 'content',
          default: '',
          label: this.$t('farm.task.content'),
          rule: { required: true, message: this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={this.form.model.content} clearable />
        }, 
        {
          prop: 'producter_id',
          default: '',
          label: this.$t('farm.task.producter_id'), 
          render: () => <d2-dict-select name="producter_id" vModel={this.form.model.producter_id} style="width: 100%;" custom   stringify />
        },       
        {
          prop: 'sys_user_id',
          default: '',
          label: this.$t('farm.task.sys_user_id'), 
          render: () => <d2-dict-select name="user_id" vModel={this.form.model.sys_user_id} style="width: 100%;" custom   stringify />
        },       
        {
          prop: 'farm_id',
          default: '',
          label: this.$t('farm.task.farm_id'), 
          render: () => <d2-dict-select name="farm_id" vModel={this.form.model.farm_id} style="width: 100%;" custom   stringify />
        }, 
        {
          prop: 'area',
          default: '',
          label: this.$t('farm.task.area'), 
          render: () => <el-input vModel={this.form.model.area} clearable />
        }, 
        {
          prop: 'desc_content',
          default: '',
          label: this.$t('farm.task.desc_content'), 
          render: () => <el-input vModel={this.form.model.desc_content} clearable />
        },  
        {
          prop: 'activity_date',
          default: '',
          label: this.$t('farm.task.activity_date'),
          render: () => <el-date-picker vModel={this.form.model.activity_date} value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder={ this.$t('farm.task.activity_date')} />
        },
        {
          prop: 'finish_date',
          default: '',
          label: this.$t('farm.task.finish_date'),
          render: () => <el-date-picker vModel={this.form.model.finish_date} value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder={ this.$t('farm.task.finish_date')} />
        },
        {
          prop: 'img1',
          default: '',
          label: this.$t('farm.task.img1'), 
          render: () => <el-input vModel={this.form.model.img1} clearable />
        },  
        {
          prop: 'img2',
          default: '',
          label: this.$t('farm.task.img2'), 
          render: () => <el-input vModel={this.form.model.img2} clearable />
        },   
        {
          prop: 'img3',
          default: '',
          label: this.$t('farm.task.img3'), 
          render: () => <el-input vModel={this.form.model.img3} clearable />
        },   
        {
          prop: 'img4',
          default: '',
          label: this.$t('farm.task.img4'), 
          render: () => <el-input vModel={this.form.model.img4} clearable />
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
        name: 'producter_id',
        method: this.$api.PRODUCTER_ALL,
        fields: 'username,id',
        path: 'list',
        label: 'username'
      })
    }
  }
}

import form from '@/mixins/crud-form'
import utils from '@/utils/index'

export default {
  mixins: [form],
  data () {
    return {
      api: {
        detail: '/api/dept/update',
        create: '/api/dept/create',
        update: '/api/dept/update'
      }
    }
  },
  computed: {
    setting () {
      return [
        {
          prop: 'dept_name',
          default: '',
          label:  this.$t('management.dept.dept_name'),
          rule: { required: true, message:this.$t('required'), trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.dept_name } clearable/>
        },
        {
          prop: 'parent_id',
          default: 0,
          label:  this.$t('management.dept.parent_id'),
          render: () => <d2-tree-popover vModel={ this.form.model.parent_id } source="DEPT_ALL" key-label="dept_name"/>
        },
        {
          prop: 'leader',
          default: '',
          label:  this.$t('management.dept.leader'),
          render: () => <el-input vModel={ this.form.model.leader } clearable/>
        },
        {
          prop: 'email',
          default: '',
          label:  this.$t('management.dept.email'),
          rule: { validator: utils.helper.isLegalEmailValidator, trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.email } clearable/>
        },
        {
          prop: 'phone',
          default: '',
          label:  this.$t('management.dept.phone'),
          rule: { validator: utils.helper.isLegalMobilePhoneValidator, trigger: 'change' },
          render: () => <el-input vModel={ this.form.model.phone } clearable/>
        },
        {
          prop: 'order_num',
          default: this.$env.VUE_APP_FORM_SORT_MIN,
          label:  this.$t('management.dept.order_num'),
          render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.order_num }/>
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

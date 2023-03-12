import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [table],
  components: {
    componentForm: () => import('./form'),
    componentForm2: () => import('./form2')
  },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={this.search.panel.active}>
          <d2-bar slot="title">
            <d2-bar-space />
            {this.p('query') ? <d2-bar-cell>{this.vNodePaginationMini}</d2-bar-cell> : <d2-bar-cell>{this.vNodeSearchPanelAlertNoPermissionQuery}</d2-bar-cell>}
            <d2-bar-space />
            <d2-bar-cell>
              <el-button-group>
                {this.p('query') ? this.vNodeButtonSearch : null}
                {this.vNodeButtonTableColumnsFilterTrigger}
              </el-button-group>
            </d2-bar-cell>
            {this.p('add') ? <d2-bar-cell>{this.vNodeButtonCreate}</d2-bar-cell> : null}
          </d2-bar>
          {this.p('query') ? this.vNodeSearchForm : null}
        </d2-search-panel>
        {this.vNodeTable}
        <d2-bar slot="footer">
          <d2-bar-cell>{this.vNodePaginationFull}</d2-bar-cell>
          <d2-bar-space />
        </d2-bar>
        <component-form ref="form" on-success={this.onFormSuccess} />
        <component-form-2 ref="form2" on-success={this.onFormSuccess} />
        {this.vNodeTableColumnsFilter}
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: '/api/role/index',
        delete: '/api/role/delete'
      },
      permission: {
        query: 'system:role:query',
        add: 'system:role:add',
        edit: 'system:role:edit',
        editData: 'system:role:editData',
        remove: 'system:role:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'role_name', label:  this.$t('management.role.role_name'), minWidth: '100px', fixed: 'left' },
        { prop: 'role_key', label:  this.$t('management.role.role_key'), minWidth: '100px' },
        { prop: 'data_scope', label:  this.$t('management.role.data_scope'), minWidth: '100px', render: ({ row }) => <d2-dict value={row.data_scope} name="data_scope" /> },
        { prop: 'role_sort', label:  this.$t('management.role.role_sort'), minWidth: '100px', show: false },
        { prop: 'status', label: this.$t('status'), width: '100px', render: ({ row }) => <d2-dict name="status" value={row.status} />, show: false },
        { prop: 'remark', label: this.$t('remark'), width: '100px' },
        { prop: 'created_at', label: this.$t('created_at'), width: '200px', formatter: row => utils.time.format(row.created_at, 'YYYY-MM-DD HH:mm:ss'), show: false },
        { prop: 'updated_at', label: this.$t('updated_at'), width: '200px', formatter: row => utils.time.format(row.updated_at, 'YYYY-MM-DD HH:mm:ss'), show: false }
      ].map(setting => {
        setting.sortable = 'custom'
        return setting
      })
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', label: this.$t('edit'), action: () => this.edit(row.id) }], []),
        ...this.p('editData', [{ icon: 'el-icon-edit-outline', label: this.$t('management.role.data_scope'), action: () => this.edit(row.id, 'form2') }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', label: this.$t('remove'), type: 'danger',confirm: this.$t('delete', { msg: row.role_name }),  action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'role_name',
          label:  this.$t('management.role.role_name'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.role_name} style="width:100px;" clearable />
        },
        {
          prop: 'role_key',
          label:  this.$t('management.role.role_key'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.role_key} style="width:100px;" clearable />
        },
        {
          prop: 'status',
          label: this.$t('status'),
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={this.search.form.model.status} name="status" button all />
        },
        {
          prop: 'start_time',
          label: this.$t('start_time'),
          default: '',
          render: () => <el-date-picker vModel={this.search.form.model.start_time} value-format="yyyy-MM-dd" type="date" placeholder={this.$t('start_time')} style="width:130px;" />
        },
        {
          prop: 'end_time',
          label: this.$t('end_time'),
          default: '',
          render: () => <el-date-picker vModel={this.search.form.model.end_time} value-format="yyyy-MM-dd" type="date" placeholder={this.$t('end_time')} style="width:130px;" />
        }
      ]
    }
  },
  methods: {
    onFormSuccess () {
      this.$store.dispatch('d2admin/permission/load', { focus: true })
      this.research()
    }
  }
}

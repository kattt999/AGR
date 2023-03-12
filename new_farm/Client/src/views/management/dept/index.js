import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [table],
  components: {
    componentForm: () => import('./form')
  },
  render () {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={ this.search.panel.active }>
          <d2-bar slot="title">
            <d2-bar-space/>
            { this.p('query') ? null : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreateWithParentId0 }</d2-bar-cell> : null }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <component-form ref="form" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: '/api/dept/findall',
        delete: '/api/dept/delete'
      },
      permission: {
        query: 'system:dept:query',
        add: 'system:dept:add',
        edit: 'system:dept:edit',
        remove: 'system:dept:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'dept_name', label: this.$t('management.dept.dept_name'), minWidth: '200px', fixed: 'left' },
        { prop: 'email', label: this.$t('management.dept.email'), minWidth: '200px', show: false },
        { prop: 'phone', label: this.$t('management.dept.phone'),minWidth: '200px', show: false },
        { prop: 'status', label: this.$t('status'), width: '100px', render: ({ row }) => <d2-dict name="status" value={row.status} /> },
        { prop: 'parent_id', label: this.$t('management.dept.parent_id'), minWidth: '200px', show: false },
        { prop: 'order_num', label: this.$t('management.dept.order_num'), minWidth: '200px', show: false },
        { prop: 'leader', label: this.$t('management.dept.leader'), minWidth: '200px', show: false },
        { prop: 'created_at', label: this.$t('created_at'), formatter: row => utils.time.format(row.created_at, 'YYYY-MM-DD HH:mm:ss'), width: '140px', show: false },
        { prop: 'updated_at', label: this.$t('updated_at'), formatter: row => utils.time.format(row.updated_at, 'YYYY-MM-DD HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: this.$t('remark'), width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('create', [{ icon: 'el-icon-plus', type: 'primary', action: () => this.create({ parent_id: row.id }) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm:  this.$t('delete', { msg: row.dept_name }),  action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'dept_name',
          label: this.$t('management.dept.dept_name'),
          default: '',
          render: () => <el-input vModel={ this.search.form.model.dept_name } style="width:100px;" clearable/>
        },
        {
          prop: 'status',
          label: this.$t('status'),
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.status } name="status" button all/>
        }
      ]
    }
  }
}

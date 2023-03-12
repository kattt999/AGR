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
            { this.p('query') ? <d2-bar-cell>{ this.vNodePaginationMini }</d2-bar-cell> : <d2-bar-cell>{ this.vNodeSearchPanelAlertNoPermissionQuery }</d2-bar-cell> }
            <d2-bar-space/>
            <d2-bar-cell>
              <el-button-group>
                { this.p('query') ? this.vNodeButtonSearch : null }
                { this.vNodeButtonTableColumnsFilterTrigger }
              </el-button-group>
            </d2-bar-cell>
            { this.p('add') ? <d2-bar-cell>{ this.vNodeButtonCreate }</d2-bar-cell> : null }
          </d2-bar>
          { this.p('query') ? this.vNodeSearchForm : null }
        </d2-search-panel>
        { this.vNodeTable }
        <d2-bar slot="footer">
          <d2-bar-cell>{ this.vNodePaginationFull }</d2-bar-cell>
          <d2-bar-space/>
        </d2-bar>
        <component-form ref="form" on-success={ this.research }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: '/api/post/index',
        delete: '/api/post/delete'
      },
      permission: {
        query: 'system:post:query',
        add: 'system:post:add',
        edit: 'system:post:edit',
        remove: 'system:post:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'post_name', label: this.$t('management.post.post_name'), minWidth: '100px', fixed: 'left' },
        { prop: 'post_code', label: this.$t('management.post.post_code'), minWidth: '100px' },
        { prop: 'post_sort', label: this.$t('management.post.post_sort'), minWidth: '100px', show: false },
        { prop: 'status', label: this.$t('status'), width: '100px', render: ({ row }) => <d2-dict name="status" value={ row.status }/>, show: false },
        { prop: 'remark', label: this.$t('remark'), width: '100px', show: false },
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
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm:  this.$t('delete', { msg: row.post_name }),  action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'post_name',
          label: this.$t('management.post.post_name'),
          default: '',
          render: () => <el-input vModel={ this.search.form.model.post_name } style="width:100px;" clearable/>
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

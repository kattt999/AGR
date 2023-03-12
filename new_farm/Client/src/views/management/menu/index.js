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
        <component-form ref="form" on-success={ this.onFormSuccess }/>
        { this.vNodeTableColumnsFilter }
      </d2-container>
    return page
  },
  data () {
    return {
      api: {
        index: '/api/menu/menus',
        delete: '/api/menu/delete'
      },
      permission: {
        query: 'system:menu:query',
        add: 'system:menu:add',
        edit: 'system:menu:edit',
        remove: 'system:menu:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns () {
      return [
        { prop: 'menu_name', label: this.$t('management.menu.menu_name'), minWidth: '200px', fixed: 'left' },
        { prop: 'menu_name_en', label: this.$t('management.menu.menu_name_en'), minWidth: '200px', fixed: 'left' },
        { prop: 'icon', label: this.$t('management.menu.icon'), render: ({ row }) => row.icon ? <d2-icon name={ row.icon }></d2-icon> : <span class="d2-opacity-3">无</span>, width: '60px' },
        { prop: 'url', label: this.$t('management.menu.url'), minWidth: '200px' },
        { prop: 'perms', label: this.$t('management.menu.perms'), width: '200px' },
        { prop: 'route_name', label: this.$t('management.menu.route_name'), minWidth: '160px' },
        { prop: 'route_path', label: this.$t('management.menu.route_path'), minWidth: '160px' },
        { prop: 'route_component', label: this.$t('management.menu.route_component'), minWidth: '160px' },
        { prop: 'route_cache', label: this.$t('management.menu.route_cache'), render: ({ row }) => <d2-dict name="is" value={ row.route_cache }/>, width: '80px' },
        { prop: 'id', label: 'ID', width: '100px', show: false },
        { prop: 'order_num', label: this.$t('management.menu.order_num'), minWidth: '100px' },
        { prop: 'menu_type', label: this.$t('management.menu.menu_type'), render: ({ row }) => <d2-dict name="menu_type" value={ row.menu_type }/>, width: '60px' },
        { prop: 'is_frame', label: this.$t('management.menu.is_frame'), render: ({ row }) => <d2-dict name="is" value={ row.is_frame }/>, width: '60px' },
        { prop: 'visible', label: this.$t('management.menu.visible'), render: ({ row }) => <d2-dict name="visible" value={ row.visible }/>, width: '60px' },
        { prop: 'created_at', label: this.$t('management.menu.created_at'), formatter: row => utils.time.format(row.created_at, 'YYYY-MM-DD HH:mm:ss'), width: '140px', show: false },
        { prop: 'updated_at', label: this.$t('management.menu.updated_at'), formatter: row => utils.time.format(row.updated_at, 'YYYY-MM-DD HH:mm:ss'), width: '140px', show: false },
        { prop: 'remark', label: this.$t('management.menu.remark'), width: '200px', show: false }
      ]
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig () {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('add', [{ icon: 'el-icon-plus', type: 'primary', action: () => this.create({ parent_id: row.id }) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm:  this.$t('delete',{msg:row.menu_name}) , action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch () {
      return [
        {
          prop: 'menu_name',
          label: this.$t('management.menu.menu_name'),
          default: '',
          render: () => <el-input vModel={ this.search.form.model.menu_name } style="width:100px;" clearable/>
        },
        {
          prop: 'visible',
          label: this.$t('management.menu.visible'),
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={ this.search.form.model.visible } name="visible" button all/>
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

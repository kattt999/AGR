import { mapActions } from 'vuex'
import utils from '@/utils'
import table from '@/mixins/crud-table.js'

export default {
  mixins: [table],
  components: {
    componentForm: () => import('./form')
  },
  render() {
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
        <component-form ref="form" on-success={this.research} />
        {this.vNodeTableColumnsFilter}
      </d2-container>
    return page
  },
  data() {
    return {
      api: {
        index: '/api/dict/index',
        delete: '/api/dict/delete'
      },
      permission: {
        query: 'system:dict:query',
        add: 'system:dict:add',
        edit: 'system:dict:edit',
        detail: 'system:dict:detail',
        remove: 'system:dict:remove'
      }
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns() {
      return [
        { prop: 'dict_name', label: this.$t('management.dict.dict_name'), minWidth: '120px', fixed: 'left', render: ({ row }) => <d2-button type="text" label={row.dict_name} on-click={() => { if (this.p('detail')) { this.goDictData(row.id, row.dict_type) } }} /> },
        { prop: 'dict_name_en', label: this.$t('management.dict.dict_name_en'), minWidth: '120px' },
        { prop: 'dict_type', label: this.$t('management.dict.dict_type'), minWidth: '100px', render: ({ row }) => <d2-button type="text" label={row.dict_type} on-click={() => { if (this.p('detail')) { this.goDictData(row.id, row.dict_type) } }} /> },
        { prop: 'dict_value_type', label: this.$t('management.dict.dict_value_type'), minWidth: '100px', render: ({ row }) => <d2-dict name="dict_value_type" value={row.dict_value_type} /> },
        { prop: 'status', label: this.$t('management.dict.status'), width: '100px', render: ({ row }) => <d2-dict name="status" value={row.status} />, show: false },
        { prop: 'remark', label: this.$t('management.dict.remark'), width: '100px', show: false },
        { prop: 'created_at', label: this.$t('management.dict.created_at'), width: '200px', formatter: row => utils.time.format(row.created_at, 'YYYY-MM-DD HH:mm:ss'), show: false },
        { prop: 'updated_at', label: this.$t('management.dict.updated_at'), width: '200px', formatter: row => utils.time.format(row.updated_at, 'YYYY-MM-DD HH:mm:ss'), show: false }
      ].map(setting => {
        setting.sortable = 'custom'
        return setting
      })
    },
    // 配置项
    // 表格操作列配置
    settingActionsConfig() {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('detail', [{ icon: 'el-icon-collection', action: () => this.goDictData(row.id, row.dict_type) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm:  this.$t('delete', { msg: row.dict_name }),  action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch() {
      return [
        {
          prop: 'dict_name',
          label: this.$t('management.dict.dict_name'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.dict_name} style="width:100px;" clearable />
        },
        {
          prop: 'dict_type',
          label: this.$t('management.dict.dict_type'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.dict_type} style="width:100px;" clearable />
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
        },
        {
          prop: 'status',
          label: this.$t('management.dict.status'),
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={this.search.form.model.status} name="status" button all />
        }
      ]
    }
  },
  methods: {
    ...mapActions('d2admin/page', [
      'closeBy'
    ]),
    goDictData(id, dict_type) {
      console.log(id)
      console.log(dict_type)
      this.closeBy(page => page.name === 'management-dict-data')
      this.$router.push({
        name: 'management-dict-data',
        query: {
          dict_id: id,
          dict_type: dict_type
        }
      })
    }
  }
}

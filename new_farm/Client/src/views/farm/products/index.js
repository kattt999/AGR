import utils from '@/utils'
import table from '@/mixins/crud-table.js'
import dayjs from 'dayjs'

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
            {this.p('add') ? <d2-bar-cell>{this.vNodeButtonCreateWithParentId0}</d2-bar-cell> : null}
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
        index: '/api/products/index',
        delete: '/api/products/delete'
      },
      permission: {
        query: 'farm:products:query',
        add: 'farm:products:add',
        edit: 'farm:products:edit',
        remove: 'farm:products:remove'
      },
      sort: {
        'prop': 'id',
        'type': ''
      }
    }
  },
  computed: {
    settingColumns() {
      return [
        { prop: 'id', 'show-overflow-tooltip': true, label: 'ID', show: false },
        { prop: 'name', 'show-overflow-tooltip': true, label: this.$t('farm.products.name'), minWidth: '120px', },
        { prop: 'plantnum', 'show-overflow-tooltip': true, label: this.$t('farm.products.plantnum'), minWidth: '100px', },
        { prop: 'price', 'show-overflow-tooltip': true, label: this.$t('farm.products.price'), minWidth: '100px', },
        { prop: 'type', 'show-overflow-tooltip': true, label: this.$t('farm.products.type'), minWidth: '100px', render: ({ row }) => <d2-dict name="farm_type" value={row.type} /> },
        { prop: 'state', 'show-overflow-tooltip': true, label: this.$t('status'), minWidth: '100px', render: ({ row }) => <d2-dict type={row.state === 1 ? 'success' : 'warning'} tag="el-tag" name="status" value={row.state} /> },
        { prop: 'remark', 'show-overflow-tooltip': true, label: this.$t('farm.products.remark'), minWidth: '120px', },
        { prop: 'createTime', label: this.$t('created_at'), formatter: row => utils.time.format(row.createTime, 'YYYY-MM-DD HH:mm:ss'), width: '140px' },
        { prop: 'updateTime', label: this.$t('updated_at'), formatter: row => utils.time.format(row.updateTime, 'YYYY-MM-DD HH:mm:ss'), width: '140px' },
      ].map(setting => {
        setting.sortable = 'custom'
        return setting
      })
    },
    settingActionsConfig() {
      return ({ row }) => [
        ...this.p('edit', [{ icon: 'el-icon-edit-outline', action: () => this.edit(row.id) }], []),
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: this.$t('delete', { msg: row.PlateNo }), action: () => this.delete(row.id) }], [])
      ]
    },
    settingSearch() {
      return [
        {
          prop: 'name',
          label: this.$t('farm.products.name'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.name} style="width:100px;" clearable />
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


  }
}

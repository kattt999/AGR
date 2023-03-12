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
        index: '/api/device/index',
        delete: '/api/device/delete'
      },
      permission: {
        query: 'farm:device:query',
        add: 'farm:device:add',
        edit: 'farm:device:edit',
        remove: 'farm:device:remove'
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
        { prop: 'sn', 'show-overflow-tooltip':true, label: this.$t('farm.device.sn'), minWidth: '100px' },
        { prop: 'name', 'show-overflow-tooltip':true, label: this.$t('farm.device.name'), minWidth: '120px', },
        { prop: 'location', 'show-overflow-tooltip':true, label: this.$t('farm.device.location'), minWidth: '120px', },
        { prop: 'standard','show-overflow-tooltip':true,  label: this.$t('farm.device.standard'), minWidth: '100px', },
        { prop: 'manufacturer', 'show-overflow-tooltip':true,label: this.$t('farm.device.manufacturer'), minWidth: '100px', },
        { prop: 'typeId', 'show-overflow-tooltip':true, label: this.$t('farm.device.typeId'), width: '120px', render: ({ row }) => <d2-dict name="type_id" value={row.typeId} custom /> }, 
        { prop: 'userId', 'show-overflow-tooltip':true, label: this.$t('farm.device.userId'), width: '100px', render: ({ row }) => <d2-dict name="user_id" value={row.userId} custom /> }, 
        { prop: 'farmId', 'show-overflow-tooltip':true, label: this.$t('farm.device.farmId'), width: '100px', render: ({ row }) => <d2-dict name="farm_id" value={row.farmId} custom /> },  
        // { prop: 'farmId', 'show-overflow-tooltip':true, label: this.$t('farm.device.farmId'), minWidth: '120px', },
        { prop: 'softwareVersion', label: this.$t('farm.device.softwareVersion'), minWidth: '120px', },
        { prop: 'thresholdMin', label: this.$t('farm.device.thresholdMin'), minWidth: '120px', },
        { prop: 'thresholdMax', label: this.$t('farm.device.thresholdMax'), minWidth: '120px', },
        { prop: 'remark','show-overflow-tooltip':true,  label: this.$t('farm.device.remark'), minWidth: '120px', },
        { prop: 'operator', label: this.$t('farm.device.operator'), minWidth: '100px', },
        { prop: 'state', label: this.$t('status'), width: '100px', render: ({ row }) => <d2-dict  type={row.state === '0' ? 'success' : 'warning'} tag="el-tag" name="device_status" value={row.state} />  },
        { prop: 'installTime', label: this.$t('farm.device.installTime'), formatter: row => utils.time.format(row.installTime, 'YYYY-MM-DD HH:mm:ss'), width: '140px' },
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
          prop: 'sn',
          label: this.$t('farm.device.sn'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.sn} style="width:100px;" clearable />
        },
        {
          prop: 'name',
          label: this.$t('farm.device.name'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.name} style="width:100px;" clearable />
        },
        {
          prop: 'location',
          label: this.$t('farm.device.location'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.location} style="width:100px;" clearable />
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

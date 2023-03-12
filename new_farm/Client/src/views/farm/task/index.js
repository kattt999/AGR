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
        index: '/api/task/index',
        delete: '/api/task/delete'
      },
      permission: {
        query: 'farm:task:query',
        add: 'farm:task:add',
        edit: 'farm:task:edit',
        remove: 'farm:task:remove'
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
        { prop: 'content', 'show-overflow-tooltip':true, label: this.$t('farm.task.content'), minWidth: '120px' }, 
        { prop: 'producter_id', 'show-overflow-tooltip':true, label: this.$t('farm.task.producter_id'), width: '120px', render: ({ row }) => <d2-dict name="producter_id" value={row.producter_id} custom /> }, 
        { prop: 'sys_user_id', 'show-overflow-tooltip':true, label: this.$t('farm.task.sys_user_id'), width: '100px', render: ({ row }) => <d2-dict name="user_id" value={row.sys_user_id} custom /> }, 
        { prop: 'farm_id', 'show-overflow-tooltip':true, label: this.$t('farm.task.farm_id'), width: '100px', render: ({ row }) => <d2-dict name="farm_id" value={row.farm_id} custom /> }, 
        { prop: 'area','show-overflow-tooltip':true,  label: this.$t('farm.task.area'), minWidth: '120px', },
        { prop: 'desc_content','show-overflow-tooltip':true,   label: this.$t('farm.task.desc_content'), minWidth: '200px', },
        { prop: 'activity_date',label: this.$t('farm.task.activity_date'),  formatter: row => utils.time.format(row.activity_date, 'YYYY-MM-DD HH:mm:ss'), width: '140px' },
        { prop: 'finish_date', label: this.$t('farm.task.finish_date'), formatter: row => utils.time.format(row.finish_date, 'YYYY-MM-DD HH:mm:ss'), width: '140px' },
        { prop: 'createTime', label: this.$t('created_at'), formatter: row => utils.time.format(row.createTime, 'YYYY-MM-DD HH:mm:ss'), width: '140px' }, 
        { prop: 'img1','show-overflow-tooltip':true, label: this.$t('farm.task.img1'), minWidth: '120px', },
        { prop: 'img2','show-overflow-tooltip':true, label: this.$t('farm.task.img2'), minWidth: '120px', },
        { prop: 'img3','show-overflow-tooltip':true, label: this.$t('farm.task.img3'), minWidth: '120px', },
        { prop: 'img4','show-overflow-tooltip':true, label: this.$t('farm.task.img4'), minWidth: '120px', },
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
          prop: 'content',
          label: this.$t('farm.task.content'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.content} style="width:100px;" clearable />
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
        name: 'producter_id',
        method: this.$api.PRODUCTER_ALL,
        fields: 'username,id',
        path: 'list',
        label: 'username'
      })
      
      
    }
    
  }
}

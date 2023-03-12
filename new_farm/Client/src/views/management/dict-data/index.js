import utils from '@/utils'
import table from '@/mixins/crud-table.js'
import env from '@/env'

export default {
  mixins: [table],
  components: {
    componentForm: () => import('./form')
  },
  render() {
    const page =
      <d2-container spacious>
        <d2-search-panel slot="header" vModel={this.search.panel.active}>
          <d2-bar slot="prefix">
            <d2-bar-cell>
              <d2-button type="primary" icon="el-icon-arrow-left" label="返回字典列表" to="/management/dict" plain />
            </d2-bar-cell>
          </d2-bar>
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
            {this.dictValueType !== 0 && this.p('add') ? <d2-bar-cell>{this.vNodeButtonCreate}</d2-bar-cell> : undefined}
          </d2-bar>
          {this.p('query') ? this.vNodeSearchForm : null}
        </d2-search-panel>
        {this.vNodeTable}
        <d2-bar slot="footer">
          <d2-bar-cell>{this.vNodePaginationFull}</d2-bar-cell>
          <d2-bar-space />
        </d2-bar>
        <component-form ref="form" dict-type={this.dictValueType} on-success={this.research} />
        {this.vNodeTableColumnsFilter}
      </d2-container>
    return page
  },
  data() {
    return {
      api: {
        index: '/api/dictData/index',
        delete: '/api/dictData/delete'
      },
      permission: {
        query: 'system:dict-data:query',
        add: 'system:dict-data:add',
        edit: 'system:dict-data:edit',
        remove: 'system:dict-data:remove'
      },
      // [本页面特有] 当前选择的字典的值类型 1 数字 2 字符
      dictValueType: 0
    }
  },
  computed: {
    // 配置项
    // 表格列
    // 建议的书写顺序 [prop] -> [label] -> [align] -> [minWidth][width] -> [fixed] -> [other] -> [render][formatter] -> [if][show]
    settingColumns() {
      return [
        { prop: 'dict_label', label: this.$t('management.dictdata.dict_label'), minWidth: '100px', fixed: 'left' },
        { prop: 'dict_label_en', label: this.$t('management.dictdata.dict_label_en'), minWidth: '100px', fixed: 'left' },
        { prop: 'dict_type', label: this.$t('management.dictdata.dict_type'), minWidth: '100px' },
        {
          prop: 'dict_number',
          label: this.$t('management.dictdata.dict_number'),
          minWidth: '100px',
          formatter: row => row.dict_number === 0 ? '' : row.dict_number,
          show: this.dictValueType === 0 || this.dictValueType === 1
        },
        {
          prop: 'dict_value',
          label: this.$t('management.dictdata.dict_number'),
          minWidth: '100px',
          show: this.dictValueType === 0 || this.dictValueType === 2
        },
        { prop: 'dict_sort', label: this.$t('management.dictdata.dict_sort'), width: '100px', show: true },
        { prop: 'status', label: this.$t('management.dictdata.status'), width: '100px', render: ({ row }) => <d2-dict name="status" value={row.status} />, show: true },
        { prop: 'remark', label: this.$t('management.dictdata.remark'), width: '100px', show: true },
        { prop: 'created_at', label: this.$t('management.dictdata.created_at'), width: '200px', formatter: row => utils.time.format(row.created_at, 'YYYY-MM-DD HH:mm:ss'), show: true },
        { prop: 'updated_at', label: this.$t('management.dictdata.updated_at'), width: '200px', formatter: row => utils.time.format(row.updated_at, 'YYYY-MM-DD HH:mm:ss'), show: true }
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
        ...this.p('remove', [{ icon: 'el-icon-delete', type: 'danger', confirm: this.$t('delete', { msg: row.dict_label }),   action: () => this.delete(row.id) }], [])
      ]
    },
    // 配置项
    // 表格搜索条件
    // 建议的书写顺序 [prop] -> [label] -> [default] -> [render] -> [if][show]
    settingSearch() {
      return [
        {
          prop: 'dict_id',
          label:  this.$t('management.dictdata.dict_id'),
          default: this.dictId,
          render: () => <d2-dict-select vModel={this.search.form.model.dict_id} name="dict_id" custom all />
        },
        {
          prop: 'dict_type',
          label:this.$t('management.dictdata.dict_type'),
          default: this.dictType,
          render: () => <el-input vModel={this.search.form.model.dict_type} style="width:150px;" clearable />
        },
        {
          prop: 'dict_label',
          label: this.$t('management.dictdata.dict_label'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.dict_label} style="width:100px;" clearable />
        },
        {
          prop: 'dict_value',
          label: this.$t('management.dictdata.dict_number'),
          default: '',
          render: () => <el-input vModel={this.search.form.model.dict_value} style="width:100px;" clearable />
        },
        {
          prop: 'status',
          label: this.$t('management.dictdata.status'),
          default: this.$env.VUE_APP_DICT_EMPTY_NUMBER,
          render: () => <d2-dict-radio vModel={this.search.form.model.status} name="status" button all />
        }
      ]
    },
    // [本页面特有] 父级字典项目的 id 强制转为数字
    dictId() {
      return utils.helper.getNumberOrZero(this.$route.query.dict_id)
    },
    // [本页面特有] 父级字典项目的 id 强制转为数字
    dictType() {
      return this.$route.query.dict_type
    }
  },
  methods: {
    /**
     * @description 搜索方法
     * @returns 数据
     */
    async searchMethod() {
      // 获得父级字典的类型
      const dictIdInSearchForm = this.search.form.model.dict_id
      if (dictIdInSearchForm !== 0) {
        const dict = await this.$api.DICT_DETAIL(dictIdInSearchForm)
        this.dictValueType = this._.get(dict, 'dict_value_type', 0)
      }
      // 获取当前字典下的条目
      const method = this.$api.DICTDATA_ALL
      const dictData = await method(this.searchData)
      // 返回给下一步处理
      return dictData
    },
    /**
     * @description 加载需要的字典数据
     */
    loadDict() {
      let _ff = utils.cookies.get('lang') || env.VUE_APP_I18N_LOCALE
      if (_ff === 'zh-chs') {
        this.loadDictOne({
          name: 'dict_id',
          method: this.$api.DICT_ALL,
          fields: 'dict_name,id',
          path: 'list',
          label: 'dict_name'
        })
      } else {
        this.loadDictOne({
          name: 'dict_id',
          method: this.$api.DICT_ALL,
          fields: 'dict_name_en,id',
          path: 'list',
          label: 'dict_name_en'
        })
      } 
      
    }
  }
}

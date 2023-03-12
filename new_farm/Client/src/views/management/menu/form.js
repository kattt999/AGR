import form from '@/mixins/crud-form'

export default {
  mixins: [form],
  data () {
    return {
      api: {
        detail: '/api/menu/update',
        create: '/api/menu/create',
        update: '/api/menu/update'
      }
    }
  },
  computed: {
    setting () {
      const menuName = {
        prop: 'menu_name',
        default: '',
        label: this.$t('management.menu.menu_name'),
        rule: { required: true, message:this.$t('required'), trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.menu_name } clearable/>
      }
      const menuNameEn = {
        prop: 'menu_name_en',
        default: '',
        label: this.$t('management.menu.menu_name_en'),
        rule: { required: true, message:this.$t('required'), trigger: 'change' },
        render: () => <el-input vModel={ this.form.model.menu_name_en } clearable/>
      }
      const parentId = {
        prop: 'parent_id',
        default: 0,
        label: this.$t('management.menu.parent_id'),
        render: () => <d2-tree-popover vModel={ this.form.model.parent_id } source="MENU_ALL" key-label="menu_name"/>
      }
      const menuType = {
        prop: 'menu_type',
        default: this.$env.VUE_APP_DICT_MENU_TYPE_MENU,
        label: this.$t('management.menu.menu_type'),
        render: () => <d2-dict-radio name="menu_type" vModel={ this.form.model.menu_type } on-change={ this.onMenuTypeChange } button/>
      }
      const orderNum = {
        prop: 'order_num',
        default: this.$env.VUE_APP_FORM_SORT_MIN,
        label: this.$t('management.menu.order_num'),
        render: () => <el-input-number min={ this.$env.VUE_APP_FORM_SORT_MIN } vModel={ this.form.model.order_num }/>
      }
      const url = {
        prop: 'url',
        default: '',
        label: this.$t('management.menu.url'),
        render: () => <el-input vModel={ this.form.model.url } placeholder="/foo/path?key=value" clearable on-input={ this.onUrlChange }/>
      }
      const routeName = {
        prop: 'route_name',
        default: '',
        label: this.$t('management.menu.route_name'),
        render: () => <el-input vModel={ this.form.model.route_name } placeholder="foo-path" clearable/>
      }
      const routePath = {
        prop: 'route_path',
        default: '',
        label: this.$t('management.menu.route_path'),
        render: () => <el-input vModel={ this.form.model.route_path } placeholder="foo/path" clearable/>
      }
      const routeComponent = {
        prop: 'route_component',
        default: '',
        label: this.$t('management.menu.route_component'),
        render: () => <el-input vModel={ this.form.model.route_component } placeholder="foo/path" clearable/>
      }
      const routeCache = {
        prop: 'route_cache',
        default: this.$env.VUE_APP_DICT_IS_FALSE,
        label: this.$t('management.menu.route_cache'),
        render: () => <d2-dict-radio vModel={ this.form.model.route_cache } name="is" button/>
      }
      const perms = {
        prop: 'perms',
        default: '',
        label: this.$t('management.menu.perms'),
        render: () => <el-input vModel={ this.form.model.perms } clearable/>
      }
      const icon = {
        prop: 'icon',
        default: '',
        label: this.$t('management.menu.icon'),
        render: () => <d2-icon-select vModel={ this.form.model.icon }/>
      }
      const visible = {
        prop: 'visible',
        default: 1,
        label: this.$t('management.menu.visible'),
        render: () => <d2-dict-radio name="visible" vModel={ this.form.model.visible } button/>
      }
      const isFrame = {
        prop: 'is_frame',
        default: this.$env.VUE_APP_DICT_IS_FALSE,
        label: this.$t('management.menu.is_frame'),
        render: () => <d2-dict-radio name="is" vModel={ this.form.model.is_frame } button/>
      }
      const remark = {
        prop: 'remark',
        default: '',
        label: this.$t('management.menu.remark'),
        render: () => <el-input vModel={ this.form.model.remark } clearable/>
      }
      return [
        parentId,
        menuName,menuNameEn,
        menuType,
        // 菜单类型 menu_type === 菜单 [菜单图标] [是否外链] [菜单链接] [路由名称] [路由地址] [路由组件] [路由缓存] [权限标识] [可见性]
        ...this.form.model.menu_type === this.$env.VUE_APP_DICT_MENU_TYPE_MENU ? [icon, isFrame, url, routeName, routePath, routeComponent, routeCache, perms, visible] : [],
        // 菜单类型 menu_type === 按钮 [权限标识]
        ...this.form.model.menu_type === this.$env.VUE_APP_DICT_MENU_TYPE_BUTTON ? [perms] : [],
        orderNum,
        remark
      ]
    }
  },
  methods: {
    /**
     * @description 菜单类型改变时重新计算表单
     */
    onMenuTypeChange () {
      this.modelReload({
        pick: ['parent_id', 'menu_name', 'menu_type', 'order_num', 'remark']
      })
    },
    /**
     * @description 菜单链接改变触发
     * @param {String} url url
     */
    onUrlChange (url) {
      const data = (url.indexOf('?') ? url.split('?')[0] : url).split('/').filter(s => s)
      this.modelSet('route_name', data.join('-'))
      this.modelSet('route_path', data.join('/'))
      this.modelSet('route_component', data.join('/'))
    }
  }
}

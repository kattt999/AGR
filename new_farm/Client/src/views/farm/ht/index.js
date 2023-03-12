import utils from '@/utils'
import table from '@/mixins/crud-table.js'
import dayjs from 'dayjs'
import ChartsLine from "./ChartsLine.vue";
import ChartsLine1 from "./ChartsLine1.vue";
export default {
    name: "ht",
    mixins: [table],
    components: {
        ChartsLine, ChartsLine1
    },
    render() {
        const page =
            <d2-container spacious>
                <d2-search-panel slot="header" vModel={this.search.panel.active}>
                    {this.p('query') ? this.vNodeSearchForm : null}
                </d2-search-panel>
                <ChartsLine
                    title={this.title}
                    data={this.h}
                    class="data-chart"
                />
                <ChartsLine1
                    title={this.title}
                    data={this.t}
                    class="data-chart"
                />
                {this.vNodeTableColumnsFilter}
            </d2-container>
        return page
    },
    data() {
        return {
            load: false,
            api: {
                index: '/api/ht/index',
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
            }, 
            h: [], 
            t: [],
            commonChartsData: { h: [], t: [] },
            title: ""
        }
    },
    mounted() {
        var _this = this
        // setInterval(function () {
        //     console.log(JSON.stringify(_this.table.data))
        // }, 3000)
    },
    watch: {
        'table.data'(val, oldVal) {
            // this.commonChartsData = val
            this.h = val[0].h
            this.t = val[0].t
            console.log(JSON.stringify(val));
        },
    },
    computed: {
        settingSearch() {
            return [

                {
                    prop: 'farmId',
                    label: this.$t('farm.device.farmId'),
                    default: '',
                    render: () => <d2-dict-select vModel={this.search.form.model.farmId} name="farm_id" custom all />
                },
                {
                    prop: 'start_time',
                    label: this.$t('start_time'),
                    default: dayjs().add(-3, "day").format("YYYY-MM-DD"),
                    render: () => <el-date-picker vModel={this.search.form.model.start_time} value-format="yyyy-MM-dd" type="date" placeholder={this.$t('start_time')} style="width:130px;" />
                },
                {
                    prop: 'end_time',
                    label: this.$t('end_time'),
                    default: dayjs().format("YYYY-MM-DD"),
                    render: () => <el-date-picker vModel={this.search.form.model.end_time} value-format="yyyy-MM-dd" type="date" placeholder={this.$t('end_time')} style="width:130px;" />
                }
            ]
        }
    },
    methods: {
        loadDict() {
            this.loadDictOne({
                name: 'farm_id',
                method: this.$api.FARM_ALL,
                fields: 'name,id',
                path: 'list',
                label: 'name'
            })


        }
    }
}

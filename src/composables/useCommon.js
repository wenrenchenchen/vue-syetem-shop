import { computed, reactive, ref } from 'vue';
export function useInitTable(opt = {}) {
    // const searchForm = reactive({
    //     keyword: ""
    // })
    // // 重置
    // const resetSearchForm = () => {
    //     searchForm.keyword = ""
    //     getData()
    // }
    let searchForm = null
    let resetSearchForm = null
    if(opt.searchForm){
        searchForm = reactive({ ...opt.searchForm})
        resetSearchForm = ()=>{
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()
        }
    }

    const tableData = ref([])
    //加载动画
    const loading = ref(false)

    //分页
    const currentPage = ref(1) //默认是第一页
    const total = ref(0) //总条数
    const limit = ref(10) //每页显示10条


    // 获取数据
    function getData(p = null) {
        if (typeof p == "number") {
            currentPage.value = p
        }

        loading.value = true
        opt.getList(currentPage.value, searchForm)
            .then(res => {
                if(opt.onGetListSuccess && typeof opt.onGetListSuccess == "function"){
                    opt.onGetListSuccess(res)
                }else{

                tableData.value = res.list
                total.value = res.totalCount
                }


            })
            .finally(() => {
                loading.value = false
            })
    }

    getData()

    return {
        searchForm,
        resetSearchForm,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData
    }
}
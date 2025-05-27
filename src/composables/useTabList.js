import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import {router} from '~/router'

export function useTabList() {
    const route = useRoute()
    const cookie = useCookies()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: "/"
        },


    ])

    //添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        // 让标签刷新后也不消失，即持久化存储
        cookie.set("tabList", tabList.value)
    }

    // 初始化标签导航列表
    function initTabList() {
        let tab = cookie.get("tabList")
        if (tab) {
            tabList.value = tab
        }
    }

    initTabList()

    onBeforeRouteUpdate((to, from) => {
        // 当前激活状态也就是当前路由
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })
    })

    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }

    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nexTab = tab[index + 1] || tabs[index - 1]
                    if (nexTab) {
                        a = nexTab.path
                    }
                }
            })
        }

        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)

        cookie.set("tabList", tabList.value)
    }

    const handleClose = (c) => {
        if (c == "clearAll") {
            //切换回首页
            activeTab.value = "/"
            //过滤只剩下首页
            tabList.value = [{
                title: '后台首页',
                path: "/"
            }]
        } else if (c == "clearOther") {
            //过滤只剩下首页和当前激活
            tabList.value = tabList.value.filter(tab => tab.path == "/" || tab.path
                == activeTab.value)

        }
        cookie.set("tabList", tabList.value)
    }


    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}


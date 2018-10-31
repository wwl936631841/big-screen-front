import InnerLink from '@layouts/components/nav-link/inner-link'
import OuterLink from '@layouts/components/nav-link/outer-link'
export default {
    components: {
        InnerLink,
        OuterLink
    },
    methods: {
        // 用于计算导航的组件是什么类型的
        navComponent (item) {
            switch (item.linkType) {
                case "1":
                    return 'inner-link'
                case "2":
                    return 'outer-link'
            }
            return 'router-link'
        },
    }    
}
import Err404 from './404.vue'
import Err401 from './401.vue'

export const router = [
  {
    path: '/err401',
    component: Err401,
    meta: { nvPermission: false }
  },
  {
    path: '/err404',
    component: Err404,
    meta: { nvPermission: false }
  },
  {
    path: '*',
    component: Err404,
    meta: { nvPermission: false }
  }
]

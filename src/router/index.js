import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/HomeManage',
    name: 'HomeManage',
    component: Layout,
    meta: { title: '首页管理', icon: 'example' },
    children: [
      {
        path: 'manageType',
        component: () => import('@/views/HomeManage/manageType/index'),
        meta: { title: '商品类型', icon: 'example' }
      },
      // {
      //   path:"typeInsert",
      //   component:(o)=>import('@/views/HomeManage/manageType/insert'),
      //   meta:{title:"类型添加",icon:'example'}
      // },
      {
        path: 'manageInfo',
        component: () => import('@/views/HomeManage/manageInfo/index'),
        meta: { title: '商品信息', icon: 'example' }
      }
      // {
      //   path:'infInsert',
      //   component: () => import('@/views/HomeManage/manageInfo/insert'),
      //   meta: { title: '信息添加', icon: 'example' }

      // }
    ]
  },

  {
    path: '/bannerManage',
    name: 'bannerManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/bannerManage/index'),
      meta: { title: '轮播图管理', icon: 'example' }
    }]
  },


  {
    path: '/commodityManage',
    name: 'commodityManage',
    component: Layout,
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'TypePage',
        component: () => import('@/views/commodityManage/TypePage/index'),
        meta: { title: '商品类型', icon: 'example' }
      },
      {
        path: 'InfoPage',
        component: () => import('@/views/commodityManage/InfoPage/index'),
        meta: { title: '商品信息', icon: 'example' }
    },
    {
      path: 'AddattributesName',
      component: () => import('@/views/commodityManage/AddattributesName/index'),
      meta: { title: '新增商品', icon: 'example' }
    }
  ]
  },
  {
    path: '/orderManage',
    name: 'orderManage',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/orderManage/index'),
      meta: { title: '订单管理', icon: 'example' }
    }]
  },

  {
    path: '/Announce',
    name: 'Announce',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Announce/index'),
        meta: { title: '发布公告', icon: 'example' }
      }
    ]
  },
  {
    path: '/postage',
    name: 'postage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/postage/index'),
        meta: { title: '邮费管理', icon: 'example' }
      }
    ]
  },
  // {
  //   path: '/Imgupdata',
  //   name: 'Imgupdata',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/Imgupdata/index'),
  //       meta: { title: '图片上传', icon: 'example' }
  //     }
  //   ]
  // },

  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'example' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'example' }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/cookies'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  // 开始启动页面进度条
  NProgress.start()

  // set page title
  // 设置网页的title
  document.title = getPageTitle(to.meta.title)

  // Determine whether the user has logged in
  // 判断vuex的user模块的token是否存在
  if (UserModule.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // Check whether the user has obtained his permission roles
      // 检查用户是否获得了他的权限角色
      if (UserModule.roles.length === 0) {
        // console.log('没有权限')
        try {
          // Get user info, including roles
          await UserModule.GetUserInfo()
          // TODO:需要判断权限，获取不同权限下的路由表
          const accessRoutes = []
          // 添加404路由
          accessRoutes.push({ path: '*', redirect: '/404', meta: { hidden: true } })

          // 添加动态路由
          router.addRoutes(accessRoutes)
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          // Remove token and redirect to login page
          UserModule.ResetToken()
          Message.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        // console.log('已获取权限')
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done()
})

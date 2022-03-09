module.exports = {
  router: {
    linkActiveClass: 'active',
    extendRoutes (routes, resolve) {
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home')
            },
            {
              path: '/login', // 登录路由
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register', // 注册路由
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username', // 个人中心
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings', // 
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/article/:slug', // 
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
            {
              path: '/editor', // 注册路由
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            }
          ]
        }
      ])
    }
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/day.js'
  ]
}
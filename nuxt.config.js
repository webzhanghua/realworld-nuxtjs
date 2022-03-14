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
  ],
  server: {
    host: '0.0.0.0', // localhost：本地访问，外网不能访问；0.0.0.0:支持外网访问
    port: 3000, // 访问的端口号
  }
}
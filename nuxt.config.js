module.exports = {
  router: {
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
              component: resolve(__dirname, 'pages/login')
            },
            {
              path: '/register', // 注册路由
              name: 'register',
              component: resolve(__dirname, 'pages/login')
            }
          ]
        }
      ])
    }
  }
}
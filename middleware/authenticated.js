/**
 * 验证是否登录的中间件
 * @param {*} param.store   状态管理对象
 * @param {*} param.redirect  路由重定向
 */
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}
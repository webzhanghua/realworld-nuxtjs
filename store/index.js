const cookieparser = process.server ? require('cookieparser') : undefined


export const state = () => {
  return {
    // 保存用户登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    console.log('state, data: ', state, data);
    // 设置用户登录状态
    state.user = data
  }
}

export const actions = {
  /**
   * nuxtServerInit是一个特殊的action
   * 该方法会在服务端渲染期间执行
   * 初始化store，传递数据给客户端使用
   * @param {*} commit store中commit 
   * @param {*} req 请求头信息 
   */
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 判断请求头中是否有cookie
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (e) {
      }
    }
    commit('setUser', user)
  }
}
// 在服务渲染运行期间都是同一个实例
// 放置数据冲突，state必须是函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    console.log('state, data: ', state, data);
    state.user = data
  }
}


export const actions = {

}
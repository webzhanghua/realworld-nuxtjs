import request from "@/utils/request";


// 登录
export const login = data => {
  request({
    method: 'POST',
    url: "api/users/login",
    data: data
  })
}

// 注册
export const register = data => {
  request({
    method: 'PSOT',
    url: 'api/users',
    data: data
  })
}
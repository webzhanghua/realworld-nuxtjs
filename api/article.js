import { request } from "@/plugins/request";


// 获取文章信息
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: "api/articles",
    params
  })
}
// 获取当前人的文章信息
export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: "api/articles/feed",
    // Authorization: Token jwt.token.here
    // headers: {
    //   Authorization: `Token ${token}`
    // },
    params
  })
}


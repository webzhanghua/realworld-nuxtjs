import request from "@/utils/request";


// 获取文章信息
export const getArticles = (params, token) => {
  return request({
    method: 'GET',
    url: "api/articles",
    params
  })
}
// 获取当前人的文章信息
export const getFeedArticles = (params, token) => {
  return request({
    method: 'GET',
    url: "api/articles/feed",
    // Authorization: Token jwt.token.here
    headers: {
      Authorization: `Token ${token}`
    },
    params
  })
}


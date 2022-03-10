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

// 对文章进行点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `api/articles/${slug}/favorite`,
  })
}
// 对文章取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}/favorite`,
  })
}
// 获取文章内容
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `api/articles/${slug}`,
  })
}
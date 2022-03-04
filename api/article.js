import request from "@/utils/request";


// 获取文章信息
export const getArticles = params => {
  return request({
    method: 'GET',
    url: "api/articles",
    params
  })
}


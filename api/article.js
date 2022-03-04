import request from "@/utils/request";


// 获取文章信息
export const getArticles = data => {
  return request({
    method: 'GET',
    url: "api/articles",
    data: data
  })
}


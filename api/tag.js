import request from "@/utils/request";


// 获取标签信息
export const getTags = () => {
  return request({
    method: 'GET',
    url: "api/tags",
  })
}


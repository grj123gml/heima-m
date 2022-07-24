import request from '@/utils/request'
// 获取文章列表
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
/**
 *点赞文章
 * @param {integer} target 点赞的文章id
 * @returns Promise
 */
export const addLikeArticle = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

/**
 *取消点赞文章
 * @param {interger} target 取消点赞文章的id
 * @returns Promise
 */
export const cancelLikeArticle = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${target}`
  })
}

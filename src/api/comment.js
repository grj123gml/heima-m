import request from '@/utils/request'
// 获取评论或评论回复
export const getArticleComment = (type, source, offset, limit) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
// 对文章或者评论进行评论
export const PostComment = (target, content, artId) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
/**
 * 点赞评论或回复评论
 * @param {String} target 点赞的评论id
 */
export const addLikeComment = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/**
 *取消点赞
 * @param {interger} target 要取消点赞的评论id或评论回复id
 */
export const deleteLikeComment = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

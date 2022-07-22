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

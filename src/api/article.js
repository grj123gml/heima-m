import request from '@/utils/request'
// 获取新闻详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: '/v1_0/articles/' + articleId
  })
}
/**
 *收藏文章
 * @param {interger} target 收藏的目标文章id
 * @returns  Promise
 */
export const ArticleCollection = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
/**
 *取消收藏文章
 * @param {interger} target 取消收藏的文章
 * @returns Promise
 */
export const deleteArticleCollection = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}

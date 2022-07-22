import request from '@/utils/request'
import store from '@/store'
/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
// 登录
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
// 验证码
export const onSendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // 发送请求头数据
    headers: {
      // 注意：该接口需要授权才能访问
      //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}

/**
 *关注用户接口
 * @param {String} target 关注用户的id
 * @returns  Promise
 */
export const addFollow = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
/**
 *取消用户关注的接口
 * @param {String} target 目标用户（被取消关注的用户id）
 * @returns  Promise
 */
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

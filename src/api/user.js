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
 *获取用户个人资料
 * @returns Promise
 */
export const getUserprofile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
/**
 * 编辑用户照片资料（头像、身份证照片）
 */
export const uploadPhoto = (formDate) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data: formDate
  })
}

/**
 * 编辑用户的个人资料
 * @param {Object} data
 * @returns
 */
export const updataUserInfo = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

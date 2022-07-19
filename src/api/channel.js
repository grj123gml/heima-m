import request from '@/utils/request'
import storage from '@/utils/storage'
// 获取我的频道列表
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
// 获取所有频道列表
export const getAllMyChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 在本地存储中存和取我的频道的数据
const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelToLocal = (channel) => storage.set(HEIMA_TOUTIAO_CHANNELS, channel)

// 删除用户频道
/**
 *
 * @param {String|Number} channelId 用户频道id
 * @returns
 */
export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
// 添加用户频道
/**
 *
 * @param {Number} id 频道的id
 * @param {Number} seq  频道的索引
 * @returns
 */
export const addUserChannel = (id, seq) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id, seq }]
    }
  })
}

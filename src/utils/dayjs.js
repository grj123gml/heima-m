import dayjs from 'dayjs'
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 配置中文包,dayjs默认语言English
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文

export default dayjs

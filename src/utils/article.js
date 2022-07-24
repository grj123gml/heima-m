import storage from './storage'

const getId = 'ArticleId'

export const getArtId = () => storage.get(getId)

export const setArtId = (id) => storage.set(getId, id)

export const removeArtId = () => storage.remove(getId)

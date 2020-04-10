export const state = () => ({
  tags: [],
  newsMessage: []
})

export const mutations = {
  setInitData(state, data = {}) {
    state.tags = data.tags || []
    state.newsMessage = data.newsMessage || []
  }
}

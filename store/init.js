export const state = () => ({
  tags: []
})

export const mutations = {
  setInitData(state, data = {}) {
    state.tags = data.tags || []
  }
}

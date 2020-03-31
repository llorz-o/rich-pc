export default async function (ctx) {
  let {
    data
  } = await ctx.$axios.get('/init')
  ctx.store.commit('init/setInitData', data)
  console.log('init middleware');

}

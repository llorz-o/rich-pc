export default ({
  app
}, inject) => {
  app.asyncWrap = promise => {
    return new Promise(resolve => {
      promise.then(data => resolve({
        err: undefined,
        data
      })).catch(err => resolve({
        err,
        data: undefined
      }))
    })
  }
}

export default function ({
  $axios,
  redirect
}) {
  $axios.onRequest(config => {

  })

  $axios.onResponse(err => {
    const code = parseInt(err.response && err.response.status)
    if (code === 400 || code == 404 || code == 500) {
      redirect('/404')
      console.log(err.response)
    }
  })

  $axios.onError(err => {
    console.log('onError', err);
  })

  $axios.onRequestError(err => {
    console.log('onRequestError', err);
  })

  $axios.onRequestError(err => {
    console.log('onRequestError', err);
  })

}

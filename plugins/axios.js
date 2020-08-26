
export default function ({ $axios, redirect }) {

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onResponse(response => {
    // console.log(response, response.request, response.request.responseURL)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code, error.response)
  })
}

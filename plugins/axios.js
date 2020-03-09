import { Auth } from 'aws-amplify'

export default async function({ $axios, redirect }, inject) {
  $axios.onRequest((config) => {
    console.log(`Making request to ${config.url}`)
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
  const session = await Auth.currentSession()
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken.jwtToken}`
      }
    }
  })
  api.setBaseURL('http://localhost')
  inject('api', api)
}

import { Auth } from 'aws-amplify'

export default async function({ $axios }) {
  // $axios.onRequest((config) => {
  //   console.log(`Making request to ${config.url}`)
  // })
  // $axios.onError((error) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
  const session = await Auth.currentSession()
  const _axios = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken.jwtToken}`
      }
    }
  })
  _axios.setBaseURL('http://localhost')
  $axios = _axios
}

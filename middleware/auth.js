import { Auth } from 'aws-amplify'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default async function({ route, store, redirect }) {
  AmplifyEventBus.$on('authState', (info) => {
    console.log(`authState: ${info}`)
  })
  if (route.fullPath === '/sign-in') {
    return
  }
  try {
    await Auth.currentAuthenticatedUser()
  } catch (error) {
    return redirect('/sign-in')
  }
}

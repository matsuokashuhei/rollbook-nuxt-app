import { Auth } from 'aws-amplify'

export default async function({ route, redirect }) {
  if (route.fullPath === '/sign-in') {
    return
  }
  try {
    await Auth.currentAuthenticatedUser()
  } catch (error) {
    return redirect('/sign-in')
  }
}

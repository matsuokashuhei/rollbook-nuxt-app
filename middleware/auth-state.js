import { AmplifyEventBus } from 'aws-amplify-vue'

export default async function({ redirect }) {
  AmplifyEventBus.$on('authState', (info) => {
    console.log(`authState: ${info}`)
    if (info === 'signedIn') {
      redirect('/')
    }
  })
}

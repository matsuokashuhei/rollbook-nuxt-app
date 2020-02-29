import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin, components } from 'aws-amplify-vue'
// import awsconfig from '../aws-exports'

// Amplify.configure(awsconfig)
Amplify.configure({
  Auth: {
    region: process.env.AWS_REGION,
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.AWS_COGNITO_USER_POOL_CLIENT_ID
  }
})
Amplify.Logger.LOG_LEVEL = 'DEBUG'

Vue.use(AmplifyPlugin, AmplifyModules)
Vue.component(components)

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children:[
          {
              path: 'postman',
              name: 'postman',
              component:require('@/components/postman/index').default
          },
          {
              path: 'npmvue',
              name: 'npmvue',
              component:require('@/components/devloper/index').default
          },
          {
              path: 'banAccount',
              name: 'banAccount',
              component:require('@/components/handler/index').default
          },
          {
              path: 'tool',
              name: 'tool',
              component:require('@/components/tool/index').default
          }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

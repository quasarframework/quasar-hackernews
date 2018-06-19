import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import MainLayout from '../layouts/MainLayout.vue'

// route-level code splitting
const createListView = id => () => import('../pages/CreateListView').then(m => m.default(id))

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        component: MainLayout,
        children: [
          { path: 'top/:page(\\d+)?', component: createListView('top') },
          { path: 'new/:page(\\d+)?', component: createListView('new') },
          { path: 'show/:page(\\d+)?', component: createListView('show') },
          { path: 'ask/:page(\\d+)?', component: createListView('ask') },
          { path: 'job/:page(\\d+)?', component: createListView('job') },
          { path: 'item/:id(\\d+)', component: () => import('../pages/ItemView.vue') },
          { path: 'user/:id', component: () => import('../pages/UserView.vue') },
          { path: '', redirect: '/top' }
        ]
      }
    ]
  })
}

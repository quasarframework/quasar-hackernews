import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import { host, timeAgo } from './util/filters'

import Quasar, {
  QLayout,
  QLayoutHeader,
  QLayoutFooter,
  QTabs,
  QRouteTab,
  QPageContainer,
  QPage,
  QPageSticky,
  QSpinner,
  QPagination
} from 'quasar'

Vue.use(Quasar, {
  components: {
    QLayout,
    QLayoutHeader,
    QLayoutFooter,
    QTabs,
    QRouteTab,
    QPageContainer,
    QPage,
    QPageSticky,
    QSpinner,
    QPagination
  }
  // directives: {},
  // plugins: {},
  // iconSet,
  // config: {}
})

// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Vue.filter('host', host)
Vue.filter('timeAgo', timeAgo)

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp (ssrContext) {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,
    store,
    render: h => h(App)
  }

  const ctx = { app }

  if (ssrContext) {
    ctx.ssr = {
      req: ssrContext.req,
      res: ssrContext.res,
      setBodyClasses (cls) {
        ssrContext.bodyClasses = cls.join(' ')
      },
      setHtmlAttrs (attrs) {
        const str = []
        for (let key in attrs) {
          str.push(`${key}=${attrs[key]}`)
        }
        ssrContext.htmlAttrs = str.join(' ')
      }
    }
  }

  Quasar.ssrUpdate(ctx)

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {
    app: new Vue(app),
    router,
    store
  }
}

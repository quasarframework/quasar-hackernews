![Quasar Framework logo](https://cdn.rawgit.com/quasarframework/quasar-art/863c14bd/dist/svg/quasar-logo-full-inline.svg)

> Build responsive Single Page Apps, **SSR Apps**, PWAs, Hybrid Mobile Apps and Electron Apps, all using the same codebase!, powered with Vue.

# quasar-hackernews

HackerNews clone built with Vue 2.0 + vue-router + vuex + [Quasar Framework](https://quasar-framework.org), with server-side rendering.

*Will get rewritten by using Quasar CLI soon*

<p align="center">
  <a href="https://quasar-hackernews.now.sh" target="_blank">
    <img src="https://cdn.rawgit.com/quasarframework/quasar-hackernews/dev/quasar-hackernews-screenshot.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

Forked from [vue-hackernews-2.0](https://github.com/quasarframework/quasar-hackernews).

## Features

> Note: in practice, it is unnecessary to code-split for an app of this size (where each async chunk is only a few kilobytes), nor is it optimal to extract an extra CSS file (which is only 1kb) -- they are used simply because this is a demo app showcasing all the supported features. In real apps, you should always measure and optimize based on your actual app constraints.

- Server Side Rendering
  - Vue + vue-router + vuex working together
  - Server-side data pre-fetching
  - Client-side state & DOM hydration
  - Automatically inlines CSS used by rendered components only
  - Preload / prefetch resource hints
  - Route-level code splitting
- Progressive Web App
  - App manifest
  - Service worker
  - 100/100 Lighthouse score
- Single-file Vue Components
  - Hot-reload in development
  - CSS extraction for production
- Animation
  - Effects when switching route views
  - Real-time list updates with FLIP Animation

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
$ yarn # or: npm install

# serve in dev mode, with hot reload at localhost:9554
$ yarn dev # or: npm run dev
# ..or with iOS theme:
$ QUASAR_THEME=ios yarn dev

# build for production
$ yarn build # or: npm run build
# ..or with iOS theme:
$ QUASAR_THEME=ios yarn build

# serve in production mode (after building it)
$ yarn start # or: npm start
```

## License

MIT

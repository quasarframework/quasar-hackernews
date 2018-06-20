<template>
  <q-layout view="hHh lpr fFf">
    <component :is="`q-layout-${$q.theme === 'mat' ? 'header' : 'footer'}`" class="text-white bg-primary">
      <div class="header-inner row no-wrap items-center">
        <router-link slot="title" to="/" exact class="header-left row items-center q-mx-lg">
          <img class="logo" src="~public/logo-48.png" alt="logo">
        </router-link>
        <q-tabs color="primary" class="col nav-tabs">
          <q-route-tab slot="title" to="/top" label="Top" />
          <q-route-tab slot="title" to="/new" label="New" />
          <q-route-tab slot="title" to="/show" label="Show" />
          <q-route-tab slot="title" to="/ask" label="Ask" />
          <q-route-tab slot="title" to="/job" label="Jobs" />
        </q-tabs>
        <a
          slot="title"
          class="header-right row items-center q-mx-lg text-white"
          href="https://github.com/quasarframework/quasar-hackernews"
          target="_blank"
          rel="noopener"
        >
          Built with Quasar
        </a>
      </div>
    </component>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <router-view class="view" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style lang="stylus">
@import '~variables'

body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  color $text-color
  background #f2f3f5

a
  color inherit
  text-decoration none
  &:not(.disabled):hover
    color $primary

.logo
  width 24px
  height 24px

.view
  max-width $container-width
  margin 0 auto
  position relative

.q-layout-footer .q-tabs-head
  min-height 55px

.header-inner
  width 100%
  max-width $container-width
  margin 0 auto

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 600px)
  .header-left, .header-right
    display none !important

@media (min-width 830px)
  .header-left
    margin-left 0
  .header-right
    margin-right 0
</style>

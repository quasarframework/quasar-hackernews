<template>
  <q-layout view="hHh lpr fFf">
    <component :is="`q-layout-${$q.theme === 'mat' ? 'header' : 'footer'}`">
      <q-tabs color="primary" align="center" class="nav-tabs">
        <router-link slot="title" to="/" exact class="header-extras row items-center q-mx-lg">
          <img class="logo" src="~public/logo-48.png" alt="logo">
        </router-link>
        <q-route-tab slot="title" to="/top" label="Top" />
        <q-route-tab slot="title" to="/new" label="New" />
        <q-route-tab slot="title" to="/show" label="Show" />
        <q-route-tab slot="title" to="/ask" label="Ask" />
        <q-route-tab slot="title" to="/job" label="Jobs" />
        <a
          slot="title"
          class="header-extras github row items-center q-mx-lg text-white"
          href="https://github.com/quasarframework/quasar-hackernews"
          target="_blank"
          rel="noopener"
        >
          Built with Quasar
        </a>
      </q-tabs>
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

a
  color inherit
  text-decoration none
  &:not(.disabled):hover
    color $primary

.logo
  width 24px
  height 24px

.view
  max-width 800px
  margin 0 auto
  position relative

.q-layout-footer .q-tabs-head
  min-height 55px

.github
  font-size .9em

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 600px)
  .header-extras
    display none !important
</style>

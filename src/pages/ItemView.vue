<template>
  <q-page class="item-view" v-if="item">
    <div class="item-view-comments">
      <div class="item-view-comments-header row items-center">
        {{ item.kids ? item.descendants + ' comments' : 'No comments yet.' }}
        <q-spinner color="primary" size="32px" class="q-ml-md" v-if="loading" />
      </div>
      <ul v-if="!loading" class="comment-children">
        <comment v-for="id in item.kids" :key="id" :id="id"/>
      </ul>
    </div>

    <q-page-sticky position="top" expand>
      <div class="header-inner item-view-header row">
        <a :href="item.url" target="_blank" class="col-12 q-mb-xs">
          <h1 class="text-weight-medium">{{ item.title }}</h1>
        </a>
        <div class="meta row">
          <div v-if="item.url" class="host q-mr-sm">
            ({{ item.url | host }})
          </div>
          <div>
            {{ item.score }} points
            | by <router-link :to="'/user/' + item.by">{{ item.by }}</router-link>
            {{ item.time | timeAgo }} ago
          </div>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import Comment from '../components/Comment.vue'

export default {
  name: 'ItemView',
  components: { Comment },

  data: () => ({
    loading: true
  }),

  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },

  // We only fetch the item itself before entering the view, because
  // it might take a long time to load threads with hundreds of comments
  // due to how the HN Firebase API works.
  asyncData ({ store, route: { params: { id } } }) {
    return store.dispatch('FETCH_ITEMS', { ids: [id] })
  },

  title () {
    return this.item.title
  },

  // Fetch comments when mounted on the client
  beforeMount () {
    this.fetchComments()
  },

  // refetch comments if item changed
  watch: {
    item: 'fetchComments'
  },

  methods: {
    fetchComments () {
      if (!this.item || !this.item.kids) {
        return
      }

      this.loading = true
      this.$bar.start()
      fetchComments(this.$store, this.item).then(() => {
        this.$bar.stop()
        this.loading = false
      })
    }
  }
}

// recursively fetch all descendent comments
function fetchComments (store, item) {
  if (item && item.kids) {
    return store.dispatch('FETCH_ITEMS', {
      ids: item.kids
    }).then(() => Promise.all(item.kids.map(id => {
      return fetchComments(store, store.state.items[id])
    })))
  }
}
</script>

<style lang="stylus">
@import '~variables'

.item-view
  padding-top 120px
  padding-bottom 45px

.item-view-header
  background-color #fff
  padding 1em 2em 1em
  box-shadow 0 1px 4px rgba(0,0,0,.1)
  h1
    display inline
    font-size 1.5em
    margin 0
    margin-right .5em
  .host, .meta
    color $text-light-color
  .meta a
    text-decoration underline

.item-view-comments
  background-color #fff
  padding 0 1em

.item-view-comments-header
  margin 0
  font-size 1.1em
  position relative
  min-height 55px

.comment-children
  list-style-type none
  padding-left 0
  padding-bottom 1em
  margin-top 0

@media (max-width 800px)
  .item-view-header
    h1
      font-size 1.25em
  .item-view-header
    padding 1em
  .item-view-comments
    padding 0.5em
</style>

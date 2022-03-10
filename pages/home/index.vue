<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'your_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'global_feed' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'tag' }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag
                    }
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="item in articles"
            :key="item.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: item.author.username
                  }
                }"
                ><img :src="item.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: item.author.username
                    }
                  }"
                  >{{ item.author.username }}</nuxt-link
                >
                <span class="date">{{
                  item.createdAt | date("MMM DD YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: item.favorited }"
                :disabled="item.favoriteDisabled"
                @click="favoriteHandle(item)"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: item.slug
                }
              }"
              class="preview-link"
            >
              <h1>{{ item.title }}</h1>
              <p>{{ item.body }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: page === item }"
                v-for="item in totalPage"
                :key="item"
              >
                <!-- a链接，后端服务器响应 -->
                <!-- <a class="page-link" :href="'/?page=' + item">{{ item }}</a> -->
                <!--  -->
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag
                    }
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    page: $route.query.page,
                    tag: tag,
                    tab: 'tag'
                  }
                }"
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  addFavorite,
  deleteFavorite
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "home",
  async asyncData({ query, store }) {
    const limit = 1;
    const page = Number.parseInt(query.page || 1);
    const { tag, tab = "global_feed" } = query;
    const token = store.state.user && store.state.user.token;
    const loadArticles =
      store.state.user && tab === "your_feed" ? getFeedArticles : getArticles;
    const [articlesRes, tagsRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTags()
    ]);
    const { articles, articlesCount } = articlesRes.data;
    console.log("articles: ", articles);
    articles.forEach(article => (article.favoriteDisabled = false));
    const { tags } = tagsRes.data;
    return {
      articles: Array.isArray(articles) ? articles : [articles],
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab
    };
  },
  // 监听路由信息中query对象中的page属性，当发生变化时，重新加载asyncData
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  methods: {
    async favoriteHandle(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favoritesCount += -1;
        article.favorited = false;
      } else {
        await addFavorite(article.slug);
        article.favoritesCount += 1;
        article.favorited = true;
      }
      article.favoriteDisabled = false;
    }
  }
};
</script>

<style></style>

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
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
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
                <span class="date">{{ item.createdAt }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: item.favorited }"
              >
                <i class="ion-heart"></i> {{ item.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: item.aslug
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
                    query: { page: item }
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
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";

export default {
  name: "home",
  async asyncData({ query }) {
    const limit = 1;
    const page = Number.parseInt(query.page || 1);
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    });
    console.log(" data.articlesCount: ", data.articlesCount);
    return {
      articles: Array.isArray(data.articles) ? data.articles : [data.articles],
      articlesCount: data.articlesCount,
      limit,
      page
    };
  },
  // 监听路由信息中query对象中的page属性，当发生变化时，重新加载asyncData
  watchQuery: ["page"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  }
};
</script>

<style></style>

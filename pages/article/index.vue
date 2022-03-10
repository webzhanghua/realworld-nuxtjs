<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <article-comments :article="article" />
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkDown from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
export default {
  name: "ArticleIndex",
  middleware: "authenticated",
  components: {
    ArticleMeta,
    ArticleComments
  },
  async asyncData({ params }) {
    console.log("params: ", params);
    const { data } = await getArticle(params.slug);
    const { article } = data;
    console.log("res: ", article);
    const md = new MarkDown();
    article.body = md.render(article.body);
    return { article };
  },
  // seo优化，设置页面的title、meat信息
  head() {
    return {
      title: `${this.article.title}-readworld`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description
        }
      ]
    };
  }
};
</script>

<style></style>

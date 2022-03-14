<template>
  <div>
    <!-- 顶部导航 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Article
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
            </li>
          </template>
          <li v-if="user" class="nav-item">
            <nuxt-link class="nav-link" to="/profile/2"
              ><img class="user-pic" :src="user.image" alt="" />{{
                user.username
              }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </nav>

    <!-- 子页面 -->
    <nuxt-child></nuxt-child>

    <!-- 底部说明 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span>666</span>
        <span class="attribution">
          An interactive learning project from
          <a href="/">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style></style>

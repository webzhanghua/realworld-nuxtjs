<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sing in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <a v-if="isLogin" href="/register">Need an account?</a>
            <a v-else href="/login">Have an account?</a>
          </p>

          <ul class="error-messages">
            <template v-for="(message, field) in errors">
              <li v-for="(item, index) in message" :key="index">
                {{ field }}-{{ item }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                placeholder="Email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                required
                minlength="6"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sing in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      errors: {}
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    }
  },
  methods: {
    async onSubmit() {
      try {
        const data = this.isLogin
          ? await login({ user: this.user })
          : await register({ user: this.user });
        this.$router.push("/");
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    }
  }
};
</script>

<style></style>

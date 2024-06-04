<template>
    <div id="app">
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    methods: {
      goTo(path) {
        this.$router.push(path);
      }
    }
  }
  </script>
  
  <style>

  </style>
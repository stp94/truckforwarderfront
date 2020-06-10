<template>

  <div id="app">
    <MainMenu> </MainMenu>
    <router-view></router-view>

  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #415040;
}


</style>

<script>
  import MainMenu from "@/components/MainMenu";

  export default {
    components: {MainMenu,

    }
  }


</script>

<template>

  <div id="app">
    <MainMenu> </MainMenu>
    <router-view> </router-view>

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
  import axios from "axios";

  export default {
    data(){
      return {
        timer: ''
      }
    },

    components: {MainMenu,

    },

    methods:{
      refreshCourseTable(){
        console.log("app");
        for (let i=0;i<this.$store.state.courses.length;i++){
            if(this.$store.state.courses[i].Progress>=100){
              console.log("Dojechala")
              this.$store.state.finishedCourses.push(this.$store.state.courses[i]);
              this.$store.state.courses.splice(i,1)
            }
            else {

             setTimeout(() => {this.$store.state.courses[i].Progress++
               const params = new URLSearchParams([['id', this.$store.state.courses[i].ID],['progress',this.$store.state.courses[i].Progress]]);
               axios.get('http://localhost:8080/session/course/update_progress', {
                 params,
                 withCredentials: true
               })}, this.$store.state.courses[i].Czas*50);
              console.log(this.$store.state.courses[i].ID, " : " , this.$store.state.courses[i].Progress)


            }
        }

      },
    },

    beforeMount(){
      this.$store.commit('update_playerDetails');
      this.$store.commit('update_courses');
      this.$store.commit('update_update_availableTrucks');
      this.$store.commit('update_orders');
      this.timer = setInterval(this.refreshCourseTable, 1000);

    },

  }


</script>

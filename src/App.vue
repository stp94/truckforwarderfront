<template>

    <div id="app">
        <MainMenu></MainMenu>
        <transition mode="out-in">
            <router-view></router-view>
        </transition>

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
    //import axios from "axios";

    export default {
        data() {
            return {
                timer: ''
            }
        },
        components: {
            MainMenu,
        },
        methods: {
            refreshCourseTable() {
                console.log(this.$store.commit('refreshCourseTable'))
            },
        },
        beforeMount() {
            this.$store.commit('update_playerDetails');
            this.$store.commit('update_courses');
            this.$store.commit('update_availableTrucks');
            this.$store.commit('update_orders');
        },
        mounted() {
            this.timer = setInterval(this.refreshCourseTable, 1000);
        }
    }


</script>

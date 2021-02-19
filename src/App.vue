<template>

    <div id="app">
        <MainMenu/>
        <transition  mode="out-in">
            <router-view/>
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

    .slide-enter-active,
    .slide-leave-active{
        transition: opacity 1s, transform 1s;
    }

    .slide-enter,
    .slide-leave-to{
        opacity: 0;
        transform: translateX(-30%);
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

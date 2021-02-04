<template>
    <div class="container emp-profile">
        <div class="row">
            <div class="col-md-4">
                <div class="profile-img">
                    <img src="@/assets/call-center-worker.png" alt=""/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="profile-head">
                    <h5>
                        {{this.$store.state.playerDetails[0].playerName}}
                    </h5>
                    <h6>
                        Twoje fundusze: {{this.$store.state.playerDetails[0].playerCash}}
                    </h6>
                    <p class="proile-rating">RANKINGS : <span>8/10</span></p>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="profile-work">
                    <p>Umiejętności</p>
                    <a href="">Reakcja:</a><br/>
                    <a href="">
                        <b-progress :value="this.$store.state.playerDetails[0].playerSpeed" :max="100" class="mb-3"
                                    show-value show-progress animated></b-progress>
                    </a><br/>
                    <a href="">Odpowiedzialność:</a><br/>
                    <a href="">
                        <b-progress :value="this.$store.state.playerDetails[0].playerResponsibility" :max="100"
                                    class="mb-3" show-value show-progress animated></b-progress>
                    </a><br/>
                    <a href="">Szacunek:</a><br/>
                    <a href="">
                        <b-progress :value="this.$store.state.playerDetails[0].playerRespect" :max="100" class="mb-3"
                                    show-value show-progress animated></b-progress>
                    </a><br/>
                </div>
            </div>

            <div class="col-md-6">

                <div id="tabs" class="container">
                    <div class="tabs">
                        <b-button class="tabButton" v-on:click="activetab=1"
                                  v-bind:class="[ activetab === 1 ? 'active' : '' ]">Aktualne kursy
                        </b-button>
                        <b-button class="tabButton" v-on:click="activetab=2"
                                  v-bind:class="[ activetab === 2 ? 'active' : '' ]">Ukończone kursy
                        </b-button>
                    </div>
                    <div class="content">
                        <div v-if="activetab === 1" class="tabcontent">
                            <ul class="courses-list">
                                <b-list-group horizontal class="courses-list-element" id="currentCourses"
                                              v-for="item in this.$store.state.courses" :key="item.ID">
                                    <b-list-group-item> {{item.ID}}</b-list-group-item>
                                    <b-list-group-item> {{item.Zrodlo}}</b-list-group-item>
                                    <b-list-group-item> {{item.Cel}}</b-list-group-item>
                                    <b-list-group-item class="bar">
                                        <b-progress height="2rem" :value="item.Progress" show-progress
                                                    class="w-100"></b-progress>
                                    </b-list-group-item>
                                </b-list-group>
                            </ul>

                        </div>
                        <div v-if="activetab === 2" class="tabcontent">
                            <ul class="courses-list">
                                <b-list-group horizontal class="courses-list-element"
                                              v-for="item in this.$store.state.finishedCourses" :key="item.ID">
                                    <b-list-group-item> {{item.ID}}</b-list-group-item>
                                    <b-list-group-item> {{item.Zrodlo}}</b-list-group-item>
                                    <b-list-group-item> {{item.Cel}}</b-list-group-item>
                                    <b-list-group-item> nr {{item.nr_Zlecenia}}</b-list-group-item>
                                </b-list-group>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'Panel',
        data() {
            return {
                activetab: 1,
                timer: '',
            }
        },
        create() {
            this.generateProgressBars();
        },
        method: {
            showUnfinished() {
                document.getElementById("courses-list").setAttribute("display", "none");
            },
        },

        mounted() {
            this.$store.commit('update_courses');
            this.timer = setInterval(document.getElementsById("currentCourses").window.location.reload, 1000);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    body {
        background: -webkit-linear-gradient(left, #3931af, #00c6ff);
    }

    .emp-profile {
        padding: 3%;
        margin-top: 3%;
        margin-bottom: 3%;
        border-radius: 0.5rem;
        background: #fff;
    }

    .profile-img {
        text-align: center;
    }

    .profile-img img {
        width: 70%;
        height: 100%;
    }

    .profile-img .file {
        position: relative;
        overflow: hidden;
        margin-top: -20%;
        width: 70%;
        border: none;
        border-radius: 0;
        font-size: 15px;
        background: #212529b8;
    }

    .profile-img .file input {
        position: absolute;
        opacity: 0;
        right: 0;
        top: 0;
    }

    .profile-head h5 {
        color: #333;
    }

    .profile-head h6 {
        color: #0062cc;
    }

    .proile-rating {
        font-size: 12px;
        color: #818182;
        margin-top: 5%;
    }

    .proile-rating span {
        color: #495057;
        font-size: 15px;
        font-weight: 600;
    }

    .profile-work {
        padding: 14%;
        margin-top: -15%;
    }

    .profile-work p {
        font-size: 12px;
        color: #818182;
        font-weight: 600;
        margin-top: 10%;
    }

    .profile-work a {
        text-decoration: none;
        color: #495057;
        font-weight: 600;
        font-size: 14px;
    }

    .profile-work ul {
        list-style: none;
    }

    .profile-tab label {
        font-weight: 600;
    }

    .profile-tab p {
        font-weight: 600;
        color: #0062cc;
    }

    .courses-list {
        list-style: none;
        align-items: center;
    }

    .courses-list li {
        color: #00c6ff;
        text-align: left;
        display: inline;
    }

    .courses-list .bar {
        width: 100%
    }


    .tabButton {

        padding-left: 2%;
        margin-left: 5%;


    }


</style>

<template>
    <div class="container emp-profile">

        <div class="row">
            <div class="col-md-4">
                <div class="profile-img">
                    <img src="@/assets/call-center-worker.png"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="profile-head">
                    <h5>{{playerDetails.playerName}}</h5>
                    <h6>Twoje fundusze: {{ playerDetails.playerCash }}</h6>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="profile-work">
                    <p>Umiejętności</p>
                    <a href="">Reakcja:</a><br/>
                    <a href="">
                        <b-progress :max="100" :value="playerDetails.playerSpeed" animated
                                    class="mb-3" show-progress show-value/>
                    </a><br/>
                    <a href="">Odpowiedzialność:</a><br/>
                    <a href="">
                        <b-progress :max="100" :value="playerDetails.playerResponsibility"
                                    animated class="mb-3" show-progress show-value/>
                    </a><br/>
                    <a href="">Szacunek:</a><br/>
                    <a href="">
                        <b-progress :max="100" :value="playerDetails.playerRespect" animated
                                    class="mb-3" show-progress show-value/>
                    </a><br/>
                </div>

            </div>

            <div class="col-md-6">
                <div class="container" id="tabs">
                    <div class="tabs">
                        <b-button class="tabButton" v-bind:class="[ activetab === 1 ? 'active' : '' ]"
                                  v-on:click="activetab=1">Aktualne kursy
                        </b-button>
                        <b-button class="tabButton" v-bind:class="[ activetab === 2 ? 'active' : '' ]"
                                  v-on:click="activetab=2">Ukończone kursy
                        </b-button>
                    </div>
                    <div class="content">
                        <div class="tabcontent" v-if="activetab === 1">
                            <ul class="courses-list">
                                <b-list-group :key="item.ID" class="courses-list-element" horizontal
                                              id="currentCourses" v-for="item in this.$store.state.courses">
                                    <b-list-group-item> {{item.ID}}</b-list-group-item>
                                    <b-list-group-item> {{item.Zrodlo}}</b-list-group-item>
                                    <b-list-group-item> {{item.Cel}}</b-list-group-item>
                                    <b-list-group-item class="bar">
                                        <b-progress :value="item.Progress" lass="w-100" height="2rem" id="progressBar"
                                                    show-progress>
                                            <div v-if="item.Progress==5">
                                                {{$bvModal.show('callModal')}}
                                            </div>

                                        </b-progress>
                                    </b-list-group-item>
                                </b-list-group>
                            </ul>

                        </div>
                        <div class="tabcontent" v-if="activetab === 2">
                            <ul class="courses-list">
                                <b-list-group :key="item.ID" class="courses-list-element"
                                              horizontal v-for="item in this.$store.state.finishedCourses">
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



            <b-modal id="callModal" ref="callModal"  class="popup_box">
                <div>
                    <b-container>
                        <b-row> {{incidents.ID}}</b-row>
                        <b-row> {{incidents.Question}} </b-row>
                        <b-row> <b-button class="answerButton" @click="sendAnswer(1)"> {{incidents.Answer_a}}  </b-button>  </b-row>
                        <b-row> <b-button class="answerButton" @click="sendAnswer(2)"> {{incidents.Answer_b}} </b-button>  </b-row>
                        <b-row> <b-button class="answerButton" @click="sendAnswer(3)"> {{incidents.Answer_c}} </b-button>  </b-row>
                    </b-container>

                </div>

            </b-modal>

        </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: 'Panel',
        data() {
            return {
                activetab: 1,
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false,
                progress: 0,



            }
        },

        methods: {

            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
            showModal(){
                    this.$refs['callModal'].show();
                    this.$store.state.callPause=true;
                    console.log("modalmodal")


            },

            sendAnswer(answer){
                axios.post("http://localhost:8080/session/course/incidents/answer",{
                        ID: this.incidents.ID,
                        answer: answer
                        },
                    {withCredentials: true}
                );
                this.$store.commit('update_playerDetails');
                this.$refs['callModal'].hide();
            }

        },

        mounted() {


            this.$store.commit('update_courses');
            this.$store.commit('update_playerDetails');
            this.$store.commit('update_incidents');
            this.timer = setInterval(document.getElementsById("currentCourses").window.location.reload, 1000);

        },

        computed: {
            playerDetails: function () {
                return this.$store.state.playerDetails[0];
            },

            courses: function () {
                return this.$store.state.courses;
            },

            incidents: function(){
                return this.$store.state.incidents[0];
            },

            incidentFlag: function(){

                return this.$store.state.incidentFlag;
            }

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

    .answerButton {
        margin-left: 2%;


    }

    .fullscreenAlert{
    position: absolute; top: 0; left: 0;
        width: 100%;
        height: 100%;
    }

    #alertIncident:active{
        animation: blink 0.02s 20 alternate;
    }

    @keyframes blink {
        from { background-color: purple; }
        to { background-color: red; }

    }

    .callWindow{
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);

    }

    .answer{
        margin-left: 5%;
    }

    .answerButton{
        margin: 0.5%;
    }

    .popup_box
    {

        position:relative;
        top: 0%;
        left: 0%;


    }

</style>

<template>
    <div class="login_panel">
            <div>
                <label for="login">Login:</label><br>
                <input id="login" v-model="username">
                <label for="password">Haslo:</label><br>
                <input type="password" id="password" v-model="password"><br>
                <button v-on:click="submitPrincipal()" >Zaloguj</button>

            </div>
    </div>
</template>
<script>

    import axios from 'axios';
    let userDetailsData;
    export default {
        name: "Account",
        methods:{
            submitPrincipal: function(){
                //console.log(this.username, this.password);
                let url = new URL('http://localhost:8080/login'); // or construct from window.location
                let params = new URLSearchParams(url.search.slice(1));
                params.append('username',this.username);
                params.set('password',this.password);
                axios.post('http://localhost:8080/login',params,{
                    withCredentials: true,
                    headers:  { 'Content-Type': 'application/x-www-form-urlencoded'}

                }).then(function(response){
                    console.log(response.data);
                });
            },

            showPrincipalData: function(){
                axios.get('http://localhost:8080/session/player/info',{
                    withCredentials: true
                })
                    .then(function (response) {
                        userDetailsData = response;
                        console.log(userDetailsData);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            }
        },
        data() {
            return {
                username: "",
                password: "",
            }
        }
    }
</script>

<style scoped>

</style>

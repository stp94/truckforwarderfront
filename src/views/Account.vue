<template>
 <div class="account">
    <div class="login_panel" >
<!--            <div>-->
<!--                <label for="login">Login:</label><br>-->
<!--                <input id="login" v-model="username">-->
<!--                <label for="password">Haslo:</label><br>-->
<!--                <input type="password" id="password" v-model="password"><br>-->
<!--                <button v-on:click="submitPrincipal()">Zaloguj</button>-->

<!--            </div>-->



        <div class="row justify-content-center">
            <b-form  class="row justify-content-center">
                    <b-form-input class="input-form"
                            v-model="username"
                            placeholder="login"/>
                    <b-form-input class="input-form" type="password"
                            v-model="password"
                            placeholder="haslo"/>
<!--                <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>-->
                <b-button variant="primary" class="login-button" v-on:click="submitPrincipal" >Zaloguj</b-button>
            </b-form>
        </div>
        <div class="register_panel" >
            <div class="row justify-content-center">
                <b-form  class="row justify-content-center">
                    <b-form-input class="input-form"
                                  v-model="new_username"
                                  placeholder="login"/>
                    <b-form-input class="input-form" type="password"
                                  v-model="new_password"
                                  placeholder="haslo"/>
                    <b-form-input class="input-form"  type="password"
                                  v-model="new_confirmPassword"
                                  placeholder="potwierdz haslo"/>
                    <b-button variant="primary" class="login-button" v-on:click="registerPrincipal()">Zarejestruj</b-button>
                </b-form>
            </div>
        </div>
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
                if(this.username!=="" && this.password!==""){

                let url = new URL('http://localhost:8080/login');
                let params = new URLSearchParams(url.search.slice(1));
                params.append('username',this.username);
                params.set('password',this.password);
                axios.post('http://localhost:8080/login',params,{
                    withCredentials: true,
                    headers:  { 'Content-Type': 'application/x-www-form-urlencoded'},


                }).then(response=> {
                    console.log("test");
                    console.log(response);
                })
                    .catch(error => {
                        if(error.response.status==405){
                           this.$toast.warning("Niepoprawny login lub haslo. Sprobuj ponownie")
                        }

                        if(error.response.status==404){
                            this.$toast.success("Zalogowano pomyslne. Przejdz do sekcji Panel")
                        }
                        console.log(error.response.status);
                     })
                }

            },
            registerPrincipal: function() {

                if (this.new_username!="" && this.new_password==this.new_confirmPassword){
                    let url = new URL('http://localhost:8080/register');
                    let params = new URLSearchParams(url.search.slice(1));
                    params.append('username',this.new_username);
                    params.set('password',this.new_password);
                    axios.post('http://localhost:8080/register',params,{
                        headers:  { 'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(response=> {
                        if(response.status==200){
                            this.$toast.success("Zarejestrowane konto. Mozesz sie zalogowac")
                        }
                    })
                        .catch(error => {
                            if(error.response.status==500){
                                this.$toast.warning("Login zajety. Wybierz inny")
                            }
                        })
                }
                else {
                    this.$toast.warning("Wprowadz poprawne dane")
                }

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

                new_username:"",
                new_password:"",
                new_confirmPassword:"",
            }
        }
    }
</script>

<style scoped>

    .loginForm{
        align-content: center;
        margin-left: auto;
        margin-right: auto;
        background-color: red;
    }

    .input-form{

        margin: 1%;
    }

    .login-button{

    }

</style>

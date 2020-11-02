<template>
    <div class="container-fluid" style="height: 700px;background-color: white;">
        <div>
            <div class="row">
                <div class="profile">
                    <i class="material-icons" style="font-size: 150px">person</i>
                    <h1> Witaj {{playerName}}  </h1>
                    <h2> Twoje fundusze: {{playerCash}} zl </h2>




                    <div class="profile-courses">
                        <p> Ukonczone kursy: {{playerFinishedCourse}} </p>
                        <p> Nieukonczone kursy: {{playerFailedCourse}} </p>

                    </div>

                </div>

                <div class="profile-additional">
                    <p> Szybkosc: {{playerSpeed}} </p>
                    <p> Odpowiedzialnosc: {{playerResponsibility}} </p>
                    <p> Szacunek: {{playerRespect}} </p>

                </div>
            </div>






        </div>

    </div>


</template>

<script>

    import axios from "axios";

export default {
  name: 'Panel',

  methods:{
    showProfile: function(){

        let userDetailsData;
        const that = this;


        axios.get('http://localhost:8080/session/player/info',{
            withCredentials: true
        })
            .then(function (response) {
                userDetailsData = response;
                that.playerName = userDetailsData.data.name;
                that.playerCash = userDetailsData.data.cash;
                that.playerSpeed = userDetailsData.data.speed;
                that.playerResponsibility = userDetailsData.data.responsibility;
                that.playerRespect = userDetailsData.data.respect;
                that.playerFinishedCourse = userDetailsData.data.finished_courses;
                that.playerFailedCourse = userDetailsData.data.failed_courses;

                console.log(this.playerName);
                console.log(userDetailsData.data.name);


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })





    }
  },
    data(){
      return{
          playerName: " ",
          playerCash: " ",
          playerSpeed: " ",
          playerResponsibility: " ",
          playerRespect: " ",
          playerFinishedCourse: " ",
          playerFailedCourse: " "

      }
    },

    mounted(){
     this.showProfile()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.profile{


    width: 20%;
    display: block;
    text-align: left;

}
    .profile, p{
        font-size: 20px;
    }



    .profile, h1{
       font-size: 30px;

    }

    .profile, h2{
        font-size: 25px;

    }



.container-fluid, row{
    padding: 2%;

}






</style>

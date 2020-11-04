<template>
    <div>

        <div class="BoughtTrucksTable">
            <div>

                <b-table class="TrucksTable" selectable responsive="true" striped hover :items="trucksTableBought" :fields="trucksTableBoughtFields" @row-clicked="onRowSelected"> Error Element

                    <template #cell(Status)="">

                        <i class="material-icons" style="font-size: 20px;">{{statusTruck}}</i>
                    </template>


                </b-table>
            </div>


        </div>




    </div>
</template>

<script>



    import axios from "axios";


    export default {
        name: "Flota",

        data () {
            return {

                selected: [],
                trucksTableBought: [],
                trucksTableBoughtFields:["ID","Nazwa","Stan","Status"],
                statusTruck: "ee ",

            }
        },

        mounted () {
            let trucksDataBought;

            const that = this;
            axios.get('http://localhost:8080/session/player/bought_trucks',{
                withCredentials: true
            })
                .then(function (response) {
                    trucksDataBought = response;



                    for(let i=0; i<trucksDataBought.data.length; i++)
                    {





                        that.trucksTableBought.push({ID: trucksDataBought.data[i].id, Nazwa: trucksDataBought.data[i].name, Stan: trucksDataBought.data[i].life, Dostepnosc: trucksDataBought.data[i].available})

                        if(that.trucksTableBought[i].Dostepnosc == "0") {
                            that.trucksTableBought[i].Dostepnosc = "wolna";
                            that.statusTruck = "domain";



                        }
                        else {
                            that.trucksTableBought[i].Dostepnosc = "zajeta";
                        }

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        },







        methods: {
        }
    }
</script>

<style scoped>

    .BoughtTrucksTable{
        padding: 3%;
        margin-top: 3%;
        margin-bottom: 3%;
        border-radius: 0.5rem;
        background: #fff;
    }

</style>

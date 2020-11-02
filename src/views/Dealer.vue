<template>
    <div>

        <div class="TrucksMarketTable">
            <div>
                <b-table class="TrucksTable" selectable responsive="true" striped hover :items="trucksTable" @row-clicked="onRowSelected"> Error Element </b-table>
            </div>
        </div>

        <div class="TrucksInfoSection">
            <div class="TrucksImageFirst"> <img :src="trucksImage">  </div>
            <div class="TrucksDescriptionSecond"> {{trucksDescription}}  </div>
            <div class="TrucksBuyButtonThird"> <button v-on:click="buyTruck"> Kup </button>  </div>
            <div class="modal-content" id="ModalWindow">Na pewno?</div>


        </div>




      </div>
</template>

<script>
    import axios from 'axios';


    export default {
        name: "Dealer",


        data () {
            return {

                modal: null,
                trucksImage: null,
                trucksDescription: null,
                trucksData: null,
                selected: [],


                        trucksTable: [
                            {   Typ: null, Ladowanie: null, Dlugosc: null, Szerokosc: null, Wysokosc: null, Waga: null, Pojemnosc: null, Cena: null, },
                            {   Typ: null, Ladowanie: null, Dlugosc: null, Szerokosc: null, Wysokosc: null, Waga: null, Pojemnosc: null, Cena: null, },
                            {   Typ: null, Ladowanie: null, Dlugosc: null, Szerokosc: null, Wysokosc: null, Waga: null, Pojemnosc: null, Cena: null, },
                            {   Typ: null, Ladowanie: null, Dlugosc: null, Szerokosc: null, Wysokosc: null, Waga: null, Pojemnosc: null, Cena: null, },
                            {   Typ: null, Ladowanie: null, Dlugosc: null, Szerokosc: null, Wysokosc: null, Waga: null, Pojemnosc: null, Cena: null, },

                        ]

            }
        },
        mounted () {

            const that = this;
            axios.get('http://localhost:8080/trucks/all',{
                withCredentials: true
            })
                .then(function (response) {

                    const trucksData = response;

                   // $trucksDataa = trucksData;



                    for(let i=0; i<5; i++)
                    {
                        that.truckName = trucksData.data[i].name;
                        that.truckLoadingType = trucksData.data[i].loading;
                        that.truckLength = trucksData.data[i].length;
                        that.truckWidth = trucksData.data[i].width;
                        that.truckHeight = trucksData.data[i].height;
                        that.truckWeight = trucksData.data[i].weight;
                        that.truckCapacity = trucksData.data[i].capacity;
                        that.truckPrice = trucksData.data[i].price;

                        that.trucksTable[i].Typ = that.truckName;
                        that.trucksTable[i].Ladowanie = that.truckLoadingType;
                        that.trucksTable[i].Dlugosc = that.truckLength;
                        that.trucksTable[i].Szerokosc = that.truckWidth;
                        that.trucksTable[i].Wysokosc = that.truckHeight;
                        that.trucksTable[i].Waga = that.truckWeight;
                        that.trucksTable[i].Pojemnosc = that.truckCapacity;
                        that.trucksTable[i].Cena = that.truckPrice;

                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        },

        methods: {
           onRowSelected(trucksTable){
               this.selected = trucksTable;

               let selectedTruck = this.selected.Typ;
                    switch (selectedTruck) {
                       case 'Plandeka':
                       this.trucksImage="http://localhost:8081/trucktilt.png";
                       this.trucksDescription="Opis ciezarowki Plandeka/Firanka";
                           break;

                       case 'Standard':
                           this.trucksImage="http://localhost:8081/truckstandard.png";
                           this.trucksDescription="Opis ciezarowki Standard";
                           break;
                       case 'Zestaw':
                           this.trucksImage="http://localhost:8081/truckset.png";
                           this.trucksDescription="Opis ciezarowki Zestaw";
                           break;

                       case 'Cysterna':
                           this.trucksImage="http://localhost:8081/trucktank.png";
                           this.trucksDescription="Opis ciezarowki Cysterna";
                           break;

                       case 'Wywrotka':
                           this.trucksImage="http://localhost:8081/trucktipper.png";
                           this.trucksDescription="Opis ciezarowki Wywrotka";
                           break;
                       default:
                           console.log(`Sorry, we are out of `);
                   }



           },

            buyTruck(){
                let selectedTruck = this.selected.Typ;

                axios.post("http://localhost:8080/session/player/purchase_truck",

                    {
                       SelectedTruck: selectedTruck},
                    {withCredentials: true}
                )


            }

        }

    }







</script>

<style scoped>
     .TrucksTable{
         cursor: pointer;
     }

    .TrucksTable tr:active{
        font-size: 50px;
    }

    .TrucksInfoSection{
        display: inline-flex;

    }

    .TrucksImageFirst{
        padding-right: 5%;

    }

</style>

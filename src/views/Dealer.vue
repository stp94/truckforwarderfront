<template>
    <div>

        <div class="TrucksMarketTable">
            <div>
                <b-table class="TrucksTable" selectable responsive striped hover :items="trucksTable" @row-clicked="onRowSelected"></b-table>
            </div>
        </div>

        <div class="TrucksInfoSection">
            <div class="TrucksImageLeft"> <img :src="trucksImage">  </div>
            <div class="TrucksDescriptionRight">  </div>
        </div>




      </div>
</template>

<script>
    import axios from 'axios';


    export default {
        name: "Dealer",

        data () {
            return {
               trucksImage:"@/assets/trucktilt.png",
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
            let trucksData;
            const that = this;
            axios.get('http://localhost:8080/trucks/all',{
                withCredentials: true
            })
                .then(function (response) {
                    trucksData = response;


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
                       this.trucksImage="@trucktilt.png";
                           break;

                       case 'Standard':
                           this.trucksImage="@/assets/truckstandard.png";
                           break;
                       case 'Zestaw':
                           this.trucksImage="@/assets/truckset.png";
                           break;

                       case 'Cysterna':
                           this.trucksImage="@/assets/trucktank.png";
                           break;

                       case 'Wywrotka':
                           this.trucksImage="@/assets/trucktipper.png";
                           break;
                       default:
                           console.log(`Sorry, we are out of `);
                   }



           },



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

    .TrucksImageLeft{
        padding-right: 5%;
    }

</style>

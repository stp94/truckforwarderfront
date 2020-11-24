<template>
    <div>
        <b-table class="OrdersTable" selectable responsive="true" stacked="md" striped hover :items="orderTable" :fields="orderTableFields" @row-clicked="onRowSelected">

            <template #thead-top>
                <b-tr>
                    <b-th variant="secondary" colspan="7" >Trasa</b-th>
                    <b-th variant="primary" colspan="7">Towar</b-th>
                </b-tr>
                
            </template>

        </b-table>

        <div>
            <b-modal ref="my-modal" hide-footer title="Wybierz pojazd">
                <div class="d-block text-center">
                Zlecenie nr: {{selected.ID}} <br>
                    {{selected.Poczatek}} -> {{selected.Koniec}}
                </div>

                <Flota availableTrucks="hello!"></Flota>

                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
            </b-modal>

        </div>

    </div>

</template>

<script>
    import axios from "axios";
    import Flota from "@/views/Flota";

    export default {
        name: "Zlecenia",
        data () {
            return {
                BoughtTrucks: [],
                selected: [],
                orderTable: [],
                orderTableFields:[  {key: "ID", sortable:true}, {key: "Poczatek",sortable: true},
                    {key: "Koniec",sortable: true},{key:"Odleglosc",sortable: true},
                    {key:"Opis",sortable: true},{key: "Klient",sortable:true},{key:"Wynagrodzenie",sortable: true},
                    {key:"Rodzaj",sortable:true},{key:"Ilosc",sortable:true},
                    {key:"Dlugosc",sortable:true},{key: "Szerokosc", sortable:true},
                    {key:"Wysokosc",sortable: true},{key:"Waga",sortable:true},{key:"Pojemnosc",sortable:true}],
            }
        },
        mounted () {
            axios.get('http://localhost:8080/order/vieworders',{
                withCredentials: true
            })
                .then( response => {
                    const data = response.data;
                    for(let i=0; i<data.length; i++) {
                        this.orderTable.push({ID: data[i].id , Poczatek: data[i].source, Koniec: data[i].destination,
                                            Odleglosc: data[i].distance, Rodzaj: data[i].type, Ilosc: data[i].size, Dlugosc: data[i].length,
                                            Szerokosc: data[i].width, Wysokosc: data[i].height, Waga: data[i].weight, Pojemnosc: data[i].capacity,
                                            Opis: data[i].desc, Wynagrodzenie: data[i].reward, Klient: data[i].client})
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

        },
        methods: {

            onRowSelected(orderTable){
                this.BoughtTrucks = Flota.data().trucksTableBought;
                this.selected = orderTable;
                this.$refs['my-modal'].show()
            }
        }
    }
</script>

<style scoped>

    .OrdersTable{
        padding: 3%;
        margin-top: 3%;
        margin-bottom: 3%;
        border-radius: 0.5rem;
        background: #fff;



    }



</style>

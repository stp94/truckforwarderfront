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
                Zlecenie nr: {{selectedOrder.ID}} <br>
                    {{selectedOrder.Poczatek}} -> {{selectedOrder.Koniec}}
                </div>

<!--                <b-table class="TrucksTable" selectable responsive="true" striped hover :items="filteredTrucksToOrders" :fields="filteredTrucksToOrdersFields" @row-clicked="onRowSelected"> Error Element-->
<!--                    <template #cell(Status)="itemRow">-->
<!--                        <i v-if="itemRow.item.Dostepnosc" class="material-icons"  style="font-size: 20px;color: green">fiber_manual_record</i>-->
<!--                        <i v-else class="material-icons"  style="font-size: 20px;color: red">fiber_manual_record</i>-->
<!--                    </template>-->

<!--                    <template #cell(.)="itemRow">-->
<!--                        <img v-if="itemRow.item.Typ==='Plandeka'" src="http://localhost:8081/trucktilt.png" class="iconTruckTable">-->
<!--                        <img v-if="itemRow.item.Typ==='Standard'" src="http://localhost:8081/truckstandard.png" class="iconTruckTable">-->
<!--                        <img v-if="itemRow.item.Typ==='Zestaw'" src="http://localhost:8081/truckset.png" class="iconTruckTable">-->
<!--                        <img v-if="itemRow.item.Typ==='Cysterna'" src="http://localhost:8081/trucktank.png" class="iconTruckTable">-->
<!--                        <img v-if="itemRow.item.Typ==='Wywrotka'" src="http://localhost:8081/trucktipper.png" class="iconTruckTable">-->
<!--                    </template>-->
<!--                </b-table>-->



                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button>
            </b-modal>

        </div>

    </div>

</template>

<script>
    import Flota from "@/views/Flota";

    export default {
        name: "Zlecenia",
        data () {
            return {
                BoughtTrucks: [],
                selectedOrder: [],
                orderTable: [],
                orderTableFields:[
                    {key: "ID", sortable:true}, {key: "Poczatek",sortable: true},
                    {key: "Koniec",sortable: true},{key:"Odleglosc",sortable: true},
                    {key:"Opis",sortable: true},{key: "Klient",sortable:true},{key:"Wynagrodzenie",sortable: true},
                    {key:"Rodzaj",sortable:true},{key:"Ilosc",sortable:true},
                    {key:"Dlugosc",sortable:true},{key: "Szerokosc", sortable:true},
                    {key:"Wysokosc",sortable: true},{key:"Waga",sortable:true},{key:"Pojemnosc",sortable:true}],
                filteredTrucksToOrdersFields:[
                    {key: "ID"},
                    {key: "Typ"},
                    {key: "Stan"},
                ],
                filteredTrucksToOrders: []
            }
        },
        mounted () {

            this.$store.commit('update_orders');
            this.$store.commit('update_availableTrucks');
            this.orderTable = this.$store.state.orders;
        },
        methods: {

            onRowSelected(orderTable){
                this.BoughtTrucks = Flota.data().trucksTableBought;
                this.selectedOrder = orderTable;



                this.$refs['my-modal'].show()
            }
        },


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

    .iconTruckTable{
        padding: 1%;
    }

    .availableTrucks > li {
        padding: 5%;
        text-align: justify;
    }

    .truck-details-label{
        font-style: oblique;
    }



</style>

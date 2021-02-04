<template>
    <div>

        <div class="BoughtTrucksTable">
            <div>
                <b-table class="TrucksTable" selectable responsive="true" striped hover :items="trucksTableBought" :fields="trucksTableBoughtFields" @row-clicked="onRowSelected"> Error Element
                    <template #cell(Status)="itemRow">
                        <i v-if="itemRow.item.Dostepnosc" class="material-icons"  style="font-size: 20px;color: red">fiber_manual_record</i>
                        <i v-else class="material-icons"  style="font-size: 20px;color: green">fiber_manual_record</i>
                    </template>
                    <template #cell(.)="itemRow">
                        <img v-if="itemRow.item.Typ==='Plandeka'" src="http://localhost:8081/trucktilt.png" class="iconTruckTable">
                        <img v-if="itemRow.item.Typ==='Standard'" src="http://localhost:8081/truckstandard.png" class="iconTruckTable">
                        <img v-if="itemRow.item.Typ==='Zestaw'" src="http://localhost:8081/truckset.png" class="iconTruckTable">
                        <img v-if="itemRow.item.Typ==='Cysterna'" src="http://localhost:8081/trucktank.png" class="iconTruckTable">
                        <img v-if="itemRow.item.Typ==='Wywrotka'" src="http://localhost:8081/trucktipper.png" class="iconTruckTable">
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Flota",

        data () {
            return {
                selected: [],
                trucksTableBought: [],
                trucksTableBoughtFields:["ID","Typ",".","Stan","Status"],
                statusTruck: "ee ",
            }
        },
        beforeMount () {
            this.trucksTableBought = [];
            this.$store.commit('update_availableTrucks');
            this.trucksTableBought = this.$store.state.trucksTableBought;
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

    .iconTruckTable{
        max-width: 100%;
        height: auto;
    }

</style>

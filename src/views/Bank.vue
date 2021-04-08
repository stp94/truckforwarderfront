<template>
    <div class="container bank">
        <div class="row">
            <div class="col-md-3">
                <b-card
                        title="15 000"
                        img-src="http://localhost:8081/cash.png"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                >
                    <b-card-text>
                        10 x 2000 co 15 minut
                    </b-card-text>

                    <b-button href="#" variant="primary">Weź kredyt</b-button>
                </b-card>
            </div>
            <div class="col-md-3">
                <b-card
                        title="30 000"
                        img-src="http://localhost:8081/cash.png"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                >
                    <b-card-text>
                       25 x 2000 co 15 minut
                    </b-card-text>

                    <b-button href="#" variant="primary">Weź kredyt</b-button>
                </b-card>
            </div>
            <div class="col-md-3">
                <b-card
                        title="50 000"
                        img-src="http://localhost:8081/cash.png"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                >
                    <b-card-text>
                        20 x 4000 co 10 minut
                    </b-card-text>

                    <b-button href="#" variant="primary">Weź kredyt</b-button>
                </b-card>
            </div>


        </div>


    </div>
</template>

<script>
    export default {
        name: "Bank"
    }
</script>

<style scoped>
    .container bank{


    }

</style>

<template>
    <div>
        <header class="Header" style="width: 100%;"><img src="@/assets/truckforwarderLOGO.png" width="100" height="100">
            <b-navbar toggleable="lg" class="custom-navbar" width="100%">
                <b-navbar-brand>TruckForwarder</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                        <b-collapse id="nav-collapse" is-nav>
                            <b-navbar-nav class="ml-auto">
                                <b-nav-item class="items">
                                    <router-link to="/panel">
                                         <i class="material-icons" style="font-size: 20px;">domain</i>
                                         <p>Panel</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/flota">
                                        <i class="material-icons" style="font-size: 20px;">local_shipping</i>
                                        <p>Flota</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/zlecenia">
                                        <i class="material-icons" style="font-size: 20px;">content_paste</i>
                                         <p>Zlecenia</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/dealer">
                                        <i class="material-icons" style="font-size: 20px;">shopping_cart</i>
                                        <p>Dealer</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/bank">
                                        <i class="material-icons" style="font-size: 20px;">attach_money</i>
                                        <p>Bank</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/ranking">
                                        <i class="material-icons" style="font-size: 20px;">trending_up</i>
                                        <p>Ranking</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/pomoc">
                                        <i class="material-icons" style="font-size: 20px;">help_outline</i>
                                        <p>Pomoc</p>
                                    </router-link>
                                </b-nav-item>

                                <b-nav-item class="items">
                                    <router-link to="/account">
                                        <i class="material-icons" style="font-size: 20px;">help_outline</i>
                                        <p>Konto</p>
                                    </router-link>
                                </b-nav-item>

                            </b-navbar-nav>
                        </b-collapse>
            </b-navbar>
        </header>
    </div>
</template>

<script>
    export default {
        name: "MainMenu"
    }
</script>

<style scoped="scss">
    .Header {
        display: inline-flex;
        background-color: #64b5f6;
    }

    .items{
        padding-right: 30px;
    }

    .custom-navbar {
        width: 100%;
        justify-content: flex-end;
    }

    nav li:active i, p{
        color: black;
        text-decoration-color: black;
    }

    nav li i, p{
        color: #1d1d1d;
    }
</style>

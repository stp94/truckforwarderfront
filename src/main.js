import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import VueToast from 'vue-toast-notification';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-toast-notification/dist/theme-sugar.css';


import router from './router'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.use(VueToast);
Vue.component('menu-icon', MenuIcon, VueToast);

import axios from 'axios';

const store = new Vuex.Store({
    state: {
        trucksTableBought: [],
        orders: [],
        playerDetails: [],
        courses: [],
        finishedCourses: []
    },
    mutations: {
        update_availableTrucks(state) {
            axios.get('http://localhost:8080/session/player/bought_trucks', {
                withCredentials: true
            })
                .then(response => {
                    const data = response.data;
                    state.trucksTableBought = [];
                    for (let i = 0; i < data.length; i++) {
                        state.trucksTableBought.push({
                            ID: data[i].id,
                            Typ: data[i].name,
                            Stan: data[i].life,
                            Dostepnosc: data[i].available,
                            Dlugosc: data[i].length,
                            Szerokosc: data[i].width,
                            Wysokosc: data[i].height,
                            Waga: data[i].weight
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },

        update_orders(state) {
            axios.get('http://localhost:8080/order/vieworders', {
                withCredentials: true
            })
                .then(response => {
                    const data = response.data;
                    state.orders = [];
                    for (let i = 0; i < data.length; i++) {
                        state.orders.push({
                            ID: data[i].id,
                            Poczatek: data[i].source,
                            Koniec: data[i].destination,
                            Odleglosc: data[i].distance,
                            Rodzaj: data[i].type,
                            Ilosc: data[i].size,
                            Dlugosc: data[i].length,
                            Szerokosc: data[i].width,
                            Wysokosc: data[i].height,
                            Waga: data[i].weight,
                            Pojemnosc: data[i].capacity,
                            Opis: data[i].desc,
                            Wynagrodzenie: data[i].reward,
                            Klient: data[i].client
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        },
        update_playerDetails(state) {
            axios.get('http://localhost:8080/session/player/info', {
                withCredentials: true
            })
                .then(function (response) {
                    const userDetailsData = response.data;
                    state.playerDetails = [];
                    state.playerDetails.push({
                        playerName: userDetailsData.name,
                        playerCash: userDetailsData.cash,
                        playerSpeed: userDetailsData.speed,
                        playerResponsibility: userDetailsData.responsibility,
                        playerRespect: userDetailsData.respect,
                        playerFinishedCourse: userDetailsData.finished_courses,
                        playerFailedCourse: userDetailsData.failed_courses,
                    });
                    console.log(userDetailsData.name);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        },
        update_courses(state) {
            axios.get('http://localhost:8080/session/course/viewcourses', {
                withCredentials: true
            })
                .then(response => {
                    const data = response.data;
                    state.courses = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].progress < 100) {
                            state.courses.push({
                                ID: data[i].id,
                                Zrodlo: data[i].source,
                                Cel: data[i].destination,
                                Typ: data[i].name,
                                nr_Zlecenia: data[i].idorder,
                                Czas: data[i].duration,
                                Progress: data[i].progress,
                                nr_Pojazdu: data[i].idbought_trucks,
                            })
                        } else {
                            state.finishedCourses = [];
                            state.finishedCourses.push({
                                ID: data[i].id,
                                Zrodlo: data[i].source,
                                Cel: data[i].destination,
                                Typ: data[i].name,
                                nr_Zlecenia: data[i].idorder,
                                Czas: data[i].duration,
                                Progress: data[i].progress,
                                nr_Pojazdu: data[i].idbought_trucks
                            });
                            console.log(state.finishedCourses.size)
                        }
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        },
        refreshCourseTable(state) {
            console.log("refreshCourseTableIsOn");
            for (let i = 0; i < state.courses.length; i++) {
                if (state.courses[i].Progress >= 100) {
                    console.log("Dojechala");
                    state.finishedCourses.push(state.courses[i]);
                    state.playerDetails[0].playerCash += state.orders[state.courses[i].nr_Zlecenia].Wynagrodzenie;
                    axios.post("http://localhost:8080/session/player/changeAvailabilityToTrue",
                        {
                            selectedTruckId: state.courses[i].nr_Pojazdu,
                            rewardCash:  state.orders[state.courses[i].nr_Zlecenia].Wynagrodzenie

                        },
                        {withCredentials: true});
                    state.courses.splice(i, 1);


                }else {
                    setTimeout(() => {
                        state.courses[i].Progress++;
                        const params = new URLSearchParams([['id', state.courses[i].ID], ['progress', state.courses[i].Progress]]);
                        axios.get('http://localhost:8080/session/course/update_progress', {
                            params,
                            withCredentials: true
                        });
                            if(state.courses[i].Progress==10){
                                console.log("Podaj zdarzenie")
                            }
                    }, state.courses[i].Czas * 50);
                    console.log(state.courses[i].ID, " : ", state.courses[i].Progress)
                }
            }
        },
    },
    getters: {
        getAvailableTrucks() {
            return this.state.trucksTableBought;
        }
    },
    actions: {
        generateCourses(commit) {
            commit('update_courses');
        },
        startTracking(commit) {
            commit('refreshCourseTable')
        }
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

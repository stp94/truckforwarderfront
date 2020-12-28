import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import VueToast from 'vue-toast-notification';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-toast-notification/dist/theme-sugar.css';


import router from './router'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.use(VueToast);
Vue.component('menu-icon', MenuIcon, VueToast);

import axios from 'axios';


const store = new Vuex.Store({
  state: {
    trucksTableBought: [],
    orders: []
  },
  mutations: {
    update_availableTrucks(state) {
      axios.get('http://localhost:8080/session/player/bought_trucks', {
        withCredentials: true
      })
          .then(response => {
            const data = response.data;
            state.trucksTableBought=[];
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
      //state.trucksTableBought=this.trucksTableBought;
    },

    update_orders(state){
      axios.get('http://localhost:8080/order/vieworders',{
        withCredentials: true
      })
          .then( response => {
            const data = response.data;
            state.orders = [];
            for(let i=0; i<data.length; i++) {
              state.orders.push({ID: data[i].id , Poczatek: data[i].source, Koniec: data[i].destination,
                Odleglosc: data[i].distance, Rodzaj: data[i].type, Ilosc: data[i].size, Dlugosc: data[i].length,
                Szerokosc: data[i].width, Wysokosc: data[i].height, Waga: data[i].weight, Pojemnosc: data[i].capacity,
                Opis: data[i].desc, Wynagrodzenie: data[i].reward, Klient: data[i].client})
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })

    }

  },


  getters: {
    getAvailableTrucks(){
      return this.state.trucksTableBought;

    }
  }

});

new Vue({
  router,
  store,



  render: h => h(App)
}).$mount('#app')

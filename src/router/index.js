import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies';
import Panel from "@/views/Panel";
import Flota from "@/views/Flota";
import Dealer from "@/views/Dealer";
import Bank from "@/views/Bank";
import Zlecenia from "@/views/Zlecenia";
import Ranking from "@/views/Ranking";
import Pomoc from "@/views/Pomoc";
import Account from "@/views/Account";

Vue.use(VueRouter, VueCookies, Vuex);


  const routes = [

  // {   <---- Daj znac czym sie to rozni od tej wersji wyzej
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },



    {
      path: '/panel',
      name: 'Panel',
      component: Panel
    },

    {
      path: '/flota',
      name: 'Flota',
      component: Flota
    },
    {
      path: '/zlecenia',
      name: 'Zlecenia',
      component: Zlecenia
    },
    {
      path: '/dealer',
      name: 'Dealer',
      component: Dealer
    },
    {
      path: '/bank',
      name: 'Bank',
      component: Bank
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking
    },
    {
      path: '/pomoc',
      name: 'Pomoc',
      component: Pomoc
    },


    {
      path: '/account',
      name: 'Account',
      component: Account
    },
  ];



const router = new VueRouter({
  routes
});





export default router

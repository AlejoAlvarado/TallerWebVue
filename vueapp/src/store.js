
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


import {Dependencies} from './Data/dependencies.js'
export default new Vuex.Store({
    state:{
        dependencies: Dependencies,       
    },
    mutations:{
        deleteDependency(state, payload){            
            state.dependencies.splice(payload,1)
        },

    },
    actions:{
            deleteDependency({commit},payload){
                //console.log(this.state.dependencies[payload].name)
                commit('deleteDependency',payload)

            },
    }
})

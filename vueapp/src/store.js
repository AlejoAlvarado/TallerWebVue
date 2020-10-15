
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


import {Dependencies} from './Data/dependencies.js'
export default new Vuex.Store({
    state:{
        dependencies: Dependencies,
        editDepen:{
            id: 0,
              name: " ",
              coor: " ",
              location: " ",
              max: 0,
              active: false,
          },       
    },
    mutations:{

        deleteDependency(state, payload){            
            state.dependencies.splice(payload,1)
        },
        editDependency(state, payload){         
            state.editDepen= state.dependencies[payload];
            console.log("Store", state.editDepen.name)
        },
        sendChanges(state, payload){                  
           let newedit = state.dependencies.find(depen => depen.name === payload.id)
            let localdep = state.dependencies.indexOf(newedit);
            state.dependencies[localdep] = payload;
            state.editDepen = {
                id: 0,
                  name: " ",
                  coor: " ",
                  location: " ",
                  max: 0,
                  active: false,
              }




        }

    },
    actions:{
            deleteDependency({commit},payload){
                //console.log(this.state.dependencies[payload].name)
                commit('deleteDependency',payload)

            },
            editDependency({commit}, payload){
                commit('editDependency',payload)
            },
            sendChanges({commit},payload){
                commit('sendChanges',payload)
            }
    },
    getters:{
        editDepen(state){
            return state.editDepen
        }
    }
})

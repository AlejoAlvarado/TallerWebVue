
import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

import {Dependencies} from './Data/dependencies.js'
import {Users} from './Data/users.js'
export default new Vuex.Store({
    state:{
        dependencies: Dependencies,
        users:Users ,
        editDepen:{
            id: 0,
              name: " ",
              coor: " ",
              location: " ",
              max: 0,
              active: false,
          }, 
          editUse:{
            id: 0,
            name: "",
            lastname: "",
            email: "",
            dependencyId: "",
            password: "",
            valid_until: "",
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
        sendChangesDepen(state, payload){                  
           let newedit = state.dependencies.find(depen => depen.id === payload.id)
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
        },
        editUser(state, payload){            
            state.editUse = state.users[payload]
            console.log("Store init", state.editUse.name)

        },
        deleteUser(state , payload){
            state.users.splice(payload,1);
        },
        sendChangesUser(state, payload){          
                   
            let newedit = state.users.find(editu => editu.id === payload.id)
             let localuser = state.users.indexOf(newedit);
             console.log("Store update before", state.editUse.name)
             state.users[localuser] = payload;
             state.editUse = {
                id: 0,
                name: "",
                lastname: "",
                email: "",
                dependencyId: "",
                password: "",
                valid_until: "",
                active: false,
               }
               console.log("Store update after", state.editUse.name)
               
         },

    },
    actions:{
            deleteDependency({commit},payload){
                //console.log(this.state.dependencies[payload].name)
                commit('deleteDependency',payload)

            },
            editDependency({commit}, payload){
                commit('editDependency',payload)
            },
            sendChangesDepen({commit},payload){
                commit('sendChangesDepen',payload)
            },
            deleteUser({commit},payload){
                //console.log(this.state.dependencies[payload].name)
                commit('deleteUser',payload)

            },
            editUser({commit}, payload){
                commit('editUser',payload)
            },
            sendChangesUser({commit},payload){
                commit('sendChangesUser',payload)
            }
    },
    getters:{
        editDepen(state){
            return state.editDepen
        },
        editUse(state){
            return state.editUse
        },
    }
})

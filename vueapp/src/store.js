import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

//import {Dependencies} from './Data/dependencies.js'
import { db } from "./firebase";
import { dependenciesCollection } from "./firebase";
import { usersCollection } from "./firebase";
export default new Vuex.Store({
  state: {
    dependencies: [],
    users: [],
    status: true,
    refresh: true,
    editDepen: {
      id:"",
      name: " ",
      coor: " ",
      location: " ",
      max: 0,
      active: false,
      members: 0,
    },
    editUse: {
      id:"",
      name: "",
      lastname: "",
      email: "",
      dependencyId: "",
      password: "",
      valid_until: "",
      active: false,
    },
    indexuser:"",
    indexdepen:"",
  },

  mutations: {
    createDependency(state, payload) {
      dependenciesCollection.add(payload);
      state.dependencies.push(payload);
    },
    updateMembers(state, payload) {
      let dependencyId = payload[0]
      dependenciesCollection.doc(dependencyId).update({members: payload[1]});
      
    },
    deleteDependency(state, payload) {
      let del = state.dependencies[payload];

      db.collection("Dependencies")
        .get()
        .then((doc) => {
          doc.forEach((depen) => {
            if (depen.data().name === del.name) {
              let id = db.collection("Dependencies").doc(depen.id).id;
              //console.log("spuesto id",id)
              state.users.find((user) => {
                if (user.dependencyId === id) {
                  state.status = false;
                }
              });
              if (state.status) {
                db.collection("Dependencies")
                  .doc(depen.id)
                  .delete();
              } else {
                state.status = true;
              }
            }
          });
        });
      state.dependencies.splice(payload, 1);
    },

    editDependency(state, payload) {
      let noedit = state.dependencies[payload];
      state.indexdepen = noedit.name;
      db.collection("Dependencies").get().then((doc) => {
        doc.forEach(depen => {
          if(depen.data().name === noedit.name){
            
            state.editDepen.id = depen.id;
            state.editDepen.name = noedit.name;
            state.editDepen.coor = noedit.coor;
            state.editDepen.location = noedit.location;
            state.editDepen.max =noedit.max;
            state.editDepen.active =noedit.active;
            state.editDepen.members = noedit.members;            

          }
        })
      })
      
    },
    sendChangesDepen(state) {
      let del = state.editDepen;
      db.collection("Dependencies")
        .get()
        .then((doc) => {
          doc.forEach(depen => {
            if (depen.id === del.id) {
               
              db.collection("Dependencies")
                .doc(depen.id)
                .update({
                  active: del.active,
                  coor: del.coor,
                  location:del.location,
                  name: del.name,
                  max: del.max,

                });
                
                let newedit =state.dependencies.find( u => u.name == state.indexdepen);
                let localdep = state.dependencies.indexOf(newedit);
                state.dependencies[localdep] = del;                
                console.log(state.dependencies[localdep].name)
            }
          });
        });       
      state.editDepen = {
        id:"",
        name: " ",
        coor: " ",
        location: " ",
        max: 0,
        active: false,
      };
      state.indexdepen=""
    },
    createUser(state, payload) {
      usersCollection.add(payload);
      state.users.push(payload);
    },
    editUser(state, payload) {
     
      let noedit = state.users[payload];
      state.indexuser = noedit.name;

      db.collection("Users").get().then((doc) => {
        doc.forEach(user => {
          if(user.data().name === noedit.name){
                      
            state.editUse.id = user.id;
            state.editUse.name = noedit.name
            state.editUse.email = noedit.email;
            state.editUse.lastname = noedit.lastname;
            state.editUse.password = noedit.password;
            state.editUse.valid_until =noedit.valid_until;
            state.editUse.active =noedit.active;
            //console.log("Store", state.editUse.name)
                     

          }
        })
      })
    },
    deleteUser(state, payload) {
      let del = state.users[payload];

      db.collection("Users")
        .get()
        .then((doc) => {
          doc.forEach((depen) => {
            if (depen.data().name === del.name) {
              //console.log(del.name)
              db.collection("Users")
                .doc(depen.id)
                .delete();
            }
          });
        });
      state.users.splice(payload, 1);
    },
    sendChangesUser(state) {
      let del = state.editUse;
      db.collection("Users")
        .get()
        .then((doc) => {
          doc.forEach((depen) => {
            if (depen.id === del.id) {
              
              db.collection("Users")
                .doc(depen.id)
                .update({
                  name: del.name,
                  email: del.email,
                  lastname: del.lastname,
                  password: del.password,
                });
                let newuser = state.users.find( u => u.name == state.indexuser);
                let user = state.users.indexOf(newuser);
                state.users[user] = del
                console.log(state.users[user].name)
                
            }
          });
        });
        
      state.editUse = {
        id: "",
        name: "",
        lastname: "",
        email: "",
        dependencyId: "",
        password: "",
        valid_until: "",
        active: false,
      };
      state.indexuser = ""
      //console.log("Store update after", state.editUse.name);
    },
    refreshView(state) {
      state.refresh = true;
    },
  },
  actions: {
    createDependency({ commit }, payload) {
      commit("createDependency", payload);
    },
    updateMembers({ commit }, payload) {
      commit("updateMembers", payload);
    },
    deleteDependency({ commit }, payload) {
      //console.log(this.state.dependencies[payload].name)
      commit("deleteDependency", payload);
    },
    editDependency({ commit }, payload) {
      commit("editDependency", payload);
    },
    sendChangesDepen({ commit }) {
      commit("sendChangesDepen");
    },
    createUser({ commit }, payload) {
      commit("createUser", payload);
    },
    deleteUser({ commit }, payload) {
      //console.log(this.state.dependencies[payload].name)
      commit("deleteUser", payload);
    },
    editUser({ commit }, payload) {
      commit("editUser", payload);
    },
    sendChangesUser({ commit }) {
      commit("sendChangesUser");
    },
    refreshView({ commit }) {
      commit("refreshView");
    },
  },
  getters: {
    editDepen(state) {
      return state.editDepen;
    },
    editUse(state) {
      return state.editUse;
    },
    users(state){
      return state.users;
    },
    dependencies: state=>{
      return state.dependencies;
    }
  },
});

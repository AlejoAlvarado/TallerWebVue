import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

//import {Dependencies} from './Data/dependencies.js'
import { db } from "./firebase";
import { dependenciesCollection } from "./firebase"
export default new Vuex.Store({
  state: {
    dependencies: [],
    users: [],
    status: true,
    refresh: true,
    editDepen: {
      id: 0,
      name: " ",
      coor: " ",
      location: " ",
      max: 0,
      active: false,
      members: 0,
    },
    editUse: {
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

  mutations: {
    createDependency(state, payload) {
        dependenciesCollection.add(payload);
        state.dependencies.push(payload)
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
      let del = state.dependencies[payload];
      db.collection("Dependencies")
        .get()
        .then((doc) => {
          doc.forEach((depen) => {
            if (depen.data().name === del.name) {
              console.log(del.name);
              db.collection("Dependencies")
                .doc(depen.id)
                .update(del);
            }
          });
        });

      state.editDepen = state.dependencies[payload];
      //console.log("Store", state.editDepen.name)
    },
    sendChangesDepen(state, payload) {
      let newedit = state.dependencies.find((depen) => depen.id === payload.id);
      let localdep = state.dependencies.indexOf(newedit);
      state.dependencies[localdep] = payload;
      state.editDepen = {
        id: 0,
        name: " ",
        coor: " ",
        location: " ",
        max: 0,
        active: false,
      };
    },
    editUser(state, payload) {
      let del = state.users[payload];
      db.collection("Users")
        .get()
        .then((doc) => {
          doc.forEach((depen) => {
            if (depen.data().name === del.name) {
              console.log(del.name);
              db.collection("Users")
                .doc(depen.id)
                .update(del);
            }
          });
        });
      state.editUse = state.users[payload];
      //console.log("Store init", state.editUse.name)
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
    sendChangesUser(state, payload) {
      let newedit = state.users.find((editu) => editu.id === payload.id);
      let localuser = state.users.indexOf(newedit);
      console.log("Store update before", state.editUse.name);
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
      };
      console.log("Store update after", state.editUse.name);
    },
    refreshView(state) {
      state.refresh = true;
    },
  },
  actions: {
    createDependency({ commit }, payload) {
        commit("createDependency", payload)
    },
    deleteDependency({ commit }, payload) {
      //console.log(this.state.dependencies[payload].name)
      commit("deleteDependency", payload);
    },
    editDependency({ commit }, payload) {
      commit("editDependency", payload);
    },
    sendChangesDepen({ commit }, payload) {
      commit("sendChangesDepen", payload);
    },
    deleteUser({ commit }, payload) {
      //console.log(this.state.dependencies[payload].name)
      commit("deleteUser", payload);
    },
    editUser({ commit }, payload) {
      commit("editUser", payload);
    },
    sendChangesUser({ commit }, payload) {
      commit("sendChangesUser", payload);
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
  },
});

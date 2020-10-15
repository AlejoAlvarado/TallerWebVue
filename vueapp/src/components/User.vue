<template>
  <div>
    <v-container>
      <div class="form-wrapper">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.name"
                :rules="nameRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.lastname"
                :rules="nameRules"
                label="Apellido"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="user.email"
                :rules="nameRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.password"
                :rules="nameRules"
                label="Contraseña"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="modal1"
                :return-value.sync="dateInit"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateInit"
                    label="Seleccionar fecha de inicio"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateInit" scrollable locale="es-419">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal1 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(dateInit)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>

            <v-col>
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="dateFinal"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFinal"
                    label="Seleccionar fecha de final"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dateFinal" locale="es-419">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(dateFinal)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-subheader>
                Seleccionar dependencia
              </v-subheader>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="select"
                :items="items"
                :hint="`${select.name}, ${select.coor}`"
                item-text="name"
                item-value="id"
                label="Select"
                return-object
                single-line
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="4">
              <v-checkbox
                v-model="user.active"
                label="Activar usuario"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validateUserCreation"
          >
            Guardar
          </v-btn>
        </v-form>
        <v-alert
          border="left"
          color="orange"
          dense
          dismissible
          outlined
          prominent
          text
          transition="scale-transition"
          v-model="fullDependency"
          type="info"
          >Esta dependencia no puede recibir mas miembros</v-alert
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import { Dependencies } from "../Data/dependencies";
import { Users } from "../Data/users";
import { db } from "../firebase";
import { usersCollection } from "../firebase";
import { dependenciesCollection } from "../firebase";
export default {
  data() {
    return {
      fullDependency: false,
      select: {},
      items: [],
      items2: [],
      id: 0,
      user: {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        dependencyId: "",
        password: "",
        valid_until: "",
        active: false,
      },
      nameRules: [
        (name) => !!name || "Obligatorio",
        (name) => name.length > 2 || "El nombre es muy corto",
      ],
      user2: {},
      modal1: false,
      modal2: false,
      valid: false,
      dateInit: new Date().toISOString().substr(0, 10),
      dateFinal: new Date().toISOString().substr(0, 10),
    };
  },
  created() {
    //this.items = Dependencies;
  },
  firestore() {
    return {
      items: db.collection("Dependencies"),
    };
  },
  methods: {
    refresh() {
      this.select = {};
      this.user = {
        id: 0,
        name: "",
        lastname: "",
        email: "",
        dependencyId: "",
        password: "",
        valid_until: "",
        active: false,
      };
    },
    validateUserCreation() {
      console.log("started creating user");
      if (this.select.members.length + 1 > this.select.max) {
        console.log("user not allowed");
        this.refresh();
        this.fullDependency = true;
      } else {
        this.createUser();
      }
    },
    createUser() {
      if (Users.length != 0) {
        console.log("Users.length != 0: " + Users.length);
        this.id = Users[Users.length - 1].id + 1;
      }
      this.user.id = this.id;
      this.user.valid_until = this.dateFinal;
      this.user.dependencyId = this.select.id;

      console.log(this.user);
      Users.push(this.user);
      let current=this.select
      console.log(current)
      usersCollection.add(this.user).then((user) => {
        console.log(current)
        current.members.push(user.id)
        console.log(current)
      });
      console.log(current)
      let current2=current.members
      console.log(current2)
      Dependencies.splice(this.user.dependencyId, 1, this.select);
      dependenciesCollection
        .doc(this.user.dependencyId)
        .update({members: current2})
        .then(() => { 
          console.log("seemed to work");
        });

      this.user2 = Users;
      this.refresh();
      this.id = this.id + 1;
    },
    assignUserId(id){
      this.select.members.push(id)
    }
  },
};
</script>

<style></style>

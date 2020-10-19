<template>
  <div>
    <v-container>
      <div class="form-wrapper">
        <v-form ref="form" v-model="valid" v-if="editus.name !== ''">
          <v-row>
            <v-col>
              <v-text-field
                v-model="editus.name"
                :rules="nameRules"
                label="Nombre"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="editus.lastname"
                :rules="nameRules"
                label="Apellido"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="editus.email"
                :rules="emailRules"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                v-model="editus.password"
                :rules="passwordRules"
                label="Contraseña"
                required
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
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
                    v-model="editus.valid_until"
                    label="Seleccionar fecha de final"
                    prepend-icon="mdi-calendar"
                    readonly
                    :rules="dateRules"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dateFinal"
                  locale="es-419"
                  :rules="dateRules"
                >
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
            <v-col cols="12" md="4">
              <v-checkbox
                v-model="editus.active"
                label="Activar usuario"
              ></v-checkbox>
            </v-col>
          </v-row>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click.capture="sendChangesUser()"
            to="/users"
          >
            Guardar
          </v-btn>
        </v-form>

        <div v-else>
          <v-form ref="form" v-model="valid">
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
                  :rules="emailRules"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  v-model="user.password"
                  :rules="passwordRules"
                  label="Contraseña"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
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
                      :rules="dateRules"
                      label="Seleccionar fecha hasta la que se estará en la membresía"
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
              <v-col> </v-col>
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
                  required
                  :items="items"
                  :hint="`${select.name}, ${select.coor}`"
                  item-text="name"
                  label="Select"
                  return-object
                  :rules="[(v) => !!v || 'Obligatorio']"
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
        </div>

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
          >Esta dependencia no puede recibir mas miembros. <br />
          Seleccione una dependencia que tenga espacio para recibir mas
          miembros.</v-alert
        >

        <v-alert
          border="left"
          color="orange"
          dense
          dismissible
          outlined
          prominent
          text
          transition="scale-transition"
          v-model="selectEmpty"
          type="info"
          >Seleccione una dependencia para poder crear un usuario.</v-alert
        >

        <v-alert
          border="left"
          color="green"
          dense
          dismissible
          outlined
          prominent
          text
          transition="scale-transition"
          v-model="successfullUser"
          type="success"
          >El registro del usuario fue existoso!</v-alert
        >
      </div>
    </v-container>
  </div>
</template>

<script>
import { db } from "../firebase";

//import { usersCollection } from "../firebase";
//import { dependenciesCollection } from "../firebase";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullDependency: false,
      successfullUser: false,
      inactiveDependency: false,
      selectEmpty: false,
      select: {},
      items: [],
      items2: [],
      id: 0,
      show1: false,
      user: {
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
      lastnameRules: [
        (lastname) => !!lastname || "Obligatorio",
        (lastname) => lastname.length > 2 || "El apellido es muy corto",
      ],
      emailRules: [
        (email) => !!email || "Obligatorio",
        (email) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "Email no valido",
      ],
      passwordRules: [(password) => !!password || "Obligatorio"],
      dateRules: [(date) => !!date || "Obligatorio"],
      dependencyRules: [(dependency) => !!dependency || "Obligatorio"],
      user2: {},
      modal1: false,
      modal2: false,
      valid: true,
      editus: this.$store.getters.editUse,
      dateInit: new Date().toISOString().substr(0, 10),
      dateFinal: new Date().toISOString().substr(0, 10),
    };
  },
  created() {
    //this.items = Dependencies;
  },
  firestore() {
    return {
      items: db.collection("Dependencies").where("active", "==", true),
    };
  },
  methods: {
    ...mapActions(["createUser", "updateMembers", "sendChangesUser"]),
    refresh() {
      this.select = {};
      this.user = {
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

      if (Object.entries(this.select).length === 0) {
        this.selectEmpty = true;
      } else if (this.select.members + 1 > this.select.max) {
        console.log("user not allowed");
        this.fullDependency = true;
      } else {
        this.addUser();
        this.successfullUser = true;
      }
    },
    addUser() {
      let md5 = require("js-md5");
      let pass = md5(this.user.password);
      console.log(pass);
      this.user.password = pass;

      this.user.valid_until = this.dateFinal;
      this.user.dependencyId = this.select.id;

      console.log(this.user);

      console.log(this.select);
      this.createUser(this.user);
      var payload = [this.user.dependencyId, this.select.members + 1];
      this.updateMembers(payload);
      //dependenciesCollection.doc(this.user.dependencyId).update({members: this.select.members+1})

      this.refresh();
    },
  },
  computed: {
    editUse() {
      return this.$store.getters.editUse;
    },
  },
};
</script>

<style></style>

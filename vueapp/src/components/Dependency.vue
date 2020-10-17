<template>
  <v-container>
    <div class="form-wrapper">
      <v-form
        ref="form"
        v-model="valid"
        v-if="editDep.name !== ' '"
      >
        <v-text-field
          v-model="editDep.name"
          :rules="nameRules"
          label="Nombre"
          required
        ></v-text-field>

        <v-text-field
          v-model="editDep.coor"
          :rules="coorRules"
          label="Coordinador"
          required
          >Bienvenido</v-text-field
        >

        <v-text-field
          v-model="editDep.location"
          :rules="locationRules"
          label="Ubicación"
          required
        ></v-text-field>

        <v-row>
          <v-col cols="12" md="4">
            <v-checkbox
              v-model="editDep.active"
              label="Activar dependencia"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" md="6">
            <v-slider
              v-model="editDep.max"
              max="20"
              label="Numero maximo de usuarios"
              thumb-label
            >
            </v-slider>
          </v-col>
        </v-row>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click.capture="sendChangesDepen(editDep)"
          to="/dependencies"
        >
          Guardar
        </v-btn>
      </v-form>
      <div v-else>
        <v-form ref="form" v-model="valid" >
          <v-text-field
            v-model="dependency.name"
            :rules="nameRules"
            label="Nombre"
            required
          ></v-text-field>

          <v-text-field
            v-model="dependency.coor"
            :rules="coorRules"
            label="Coordinador"
            required
          ></v-text-field>

          <v-text-field
            v-model="dependency.location"
            :rules="locationRules"
            label="Ubicación"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-checkbox
                v-model="dependency.active"
                label="Activar dependencia"
              ></v-checkbox>
            </v-col>

            <v-col cols="12" md="6">
              <v-slider
                v-model="dependency.max"
                max="20"
                label="Numero maximo de usuarios"
                thumb-label
              >
              </v-slider>
            </v-col>
          </v-row>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="createDep"
          >
            Guardar
          </v-btn>
        </v-form>
        <v-alert
          border="left"
          color="green"
          dense
          dismissible
          outlined
          prominent
          text
          transition="scale-transition"
          v-model="successfullDependency"
          type="success"
          >El registro de la dependencia fue existoso!</v-alert
        >
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { dependenciesCollection } from "../firebase";
export default {
  data() {
    return {
      id: 0,
      successfullDependency: false,
      dependency: {
        name: " ",
        coor: " ",
        location: " ",
        max: 0,
        active: false,
        members: 0,
      },
      dependency2: {},
      valid: true,
      editDep: this.$store.getters.editDepen,

      nameRules: [
        (name) => !!name || "Obligatorio",
        (name) => name.length > 2 || "El nombre es muy corto",
      ],
      coorRules: [
        (coor) => !!coor || "Obligatorio",
        (coor) => coor.length > 2 || "El nombre del coordinador es muy corto",
      ],
      locationRules: [
        (location) => !!location || "Obligatorio",
        (location) => location.length > 2 || "La ubicación es muy corta",
      ],
    };
  },
  computed: {
    editDependency() {
      //console.log("Entre",this.$store.getters.editDepen.name)
      return this.$store.getters.editDepen;
    },
  },
  methods: {
    ...mapActions(["sendChangesDepen", "createDependency"]),
    refresh() {
      this.dependency = {
        name: " ",
        coor: " ",
        location: " ",
        max: 0,
        active: false,
        members: 0,
      };
    },
    createDep() {
      this.createDependency(this.dependency);

      console.log(dependenciesCollection);
      this.refresh();
      this.successfullDependency=true
    },
  },
};
</script>

<style>
.form-wrapper {
  padding: 40px;
}
</style>

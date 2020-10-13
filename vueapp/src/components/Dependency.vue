<template>
  <v-container>
    <div class="form-wrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
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
          @click="createDepency"
        >
          Guardar
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { Dependencies } from "../Data/dependencies";

export default {
  data() {
    return {
      id: 0,
      dependency: {
        id: 0,
        name: " ",
        coor: " ",
        location: " ",
        max: 0,
        active: false,
      },
      dependency2: {},

      nameRules: [
        (name) => !!name || "Obligatorio",
        (name) => name.length > 2 || "El nombre es muy corto",
      ],
      coorRules: [],
      locationRules: [],
    };
  },
  methods: {
    refresh() {
      this.dependency = {
        id: 0,
        name: " ",
        coor: " ",
        location: " ",
        max: 0,
        active: false,
      };
    },
    createDepency() {
      if (Dependencies.length != 0) {
        console.log("Dependencies.length != 0: "+ Dependencies.length)
        this.id=Dependencies[Dependencies.length - 1].id+1;
      }
      this.dependency.id = this.id;
      console.log(this.dependency);
      Dependencies.push(this.dependency);
      this.dependency2 = Dependencies;
      this.refresh();
      this.id = this.id + 1;
    },
  },
};
</script>

<style>
.form-wrapper {
  padding: 40px;
}
</style>

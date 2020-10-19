<template>
  <v-container>
    <v-card elevation="10" shaped>
      <v-card-title>Bienvenido</v-card-title>
      <v-card-text>
        <p>
          Aquí podras realizar toda la gestión de los usuarios y sus
          dependencias con facilidad: En la pestaña de usuario podrás agregar
          nuevos usuarios, en la pestaña de dependecia podras agregar nuevas
          dependencias.
        </p>
        <p>
          Para visualizar los datos que has agregado puedes verlo en Lista de
          usuarios o Lista de dependencias según desees.
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
};
</script>

<style></style>

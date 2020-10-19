<template>
  <v-container>
    
    <v-card elevation="10"  shaped  >
      <v-card-title>Bienvenido</v-card-title>
      <v-card-text>
        <p>
           Aquí podras realizar toda la gestión de los usuarios y sus dependencias con facilidad:
          En la pestaña de usuario podrás agregar nuevos usuarios, en la pestaña de dependecia podras agregar nuevas dependencias.          
        </p>
        <p>
          Para visualizar los datos que has agregado puedes verlo en Lista de usuarios o Lista de dependencias según desees.
        </p>
        
      </v-card-text>
    </v-card>
    
    <v-toolbar class="mt-10">
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field> </v-text-field>
       <v-btn :items="items" icon>
        <v-icon >mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
        select: { state: 'Dependencia 1' },
        items: [
          { state: 'Dependencia 1' },
          { state: 'Dependencia 2' },
          { state: 'Dependencia 3' },
          { state: 'Dependencia 4'},
          { state: 'Dependencia 5' },
        ],
        
    }
    }
};
</script>

<style></style>

<template>
  <v-container>
    <div>
      Home
    </div>
    <v-toolbar>
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

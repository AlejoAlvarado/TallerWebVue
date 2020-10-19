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
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
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

<template>
  <v-app>
    <main>
      <div class="app-container">
    <v-app-bar  color="indigo darken-1" flat >
    <v-btn to="/">Home</v-btn>
    <v-btn to="/user">usuario</v-btn>
    <v-btn to="/dependency">Dependencias</v-btn>
    </v-app-bar>
    

    <router-view></router-view>
     <footer v-bind="localAttrs" :padless="padless">
         <v-card   flat tile width="100%" class="indigo darken-1 text-center">
          <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
        </footer>
      </div>
</main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({

     icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
        'mdi-delete',
      ],
    //
  }),
};
</script>

<template>
  <v-app>
    <main>
      <div class="app-container">
        <header class="app-header">
          <v-app-bar
            absolute
            dark
            shrink-on-scroll
            dense
            src="https://images.unsplash.com/photo-1476249202953-93ec0d185ab7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1750&q=80"
            fade-img-on-scroll
          >
            <v-toolbar-title>Gestión de Usuarios</v-toolbar-title>
            <template v-slot:extension>
              <v-tabs align-with-title>
                <v-tab to="/">Home</v-tab>
                <v-tab to="/user">Usuario</v-tab>
                <v-tab to="/dependency">Dependencias</v-tab>
                <v-tab to="/users">Lista de usuarios</v-tab>
                <v-tab to="/dependencies">Lista de dependencias</v-tab>
              </v-tabs>
            </template>
          </v-app-bar>
        </header>

        <div class="content">
          <router-view></router-view>
        </div>
      </div>

      <v-footer  >
        <v-card flat tile width="100%" class="black text-center">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
              <v-icon size="24px">
                {{ icon }}
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>Alejandro Alvarado - Laura Rubio</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    //
  }),
};
</script>
<style lang="scss">
.content {
  padding: 15px;
  margin-top: 15%;
}
.main {
  padding: 40px;
  font-family: "Roboto", "sans-serif";
  background: #fff top center repeat;
  color: #444;
  background-image: url("https://raw.githubusercontent.com/VueVixens/projects/master/petshop/images/bg.jpg");
}

.app-container {
  max-width: 1040px;
  margin: 0 auto;
  background-color: #fff;
}
</style>

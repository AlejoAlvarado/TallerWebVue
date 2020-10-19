<template >
  <v-app>
    
    <main>
      <v-img  src="https://images.unsplash.com/photo-1490131784822-b4626a8ec96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1550&q=80">

      
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

      
      
    </v-img>
    </main>
    <v-footer  :padless="padless" dark v-bind="localAttrs" >
      <v-card  width="100%"  >      
      <v-card-text class=" white--text text-center ">
        {{ new Date().getFullYear() }} — <strong>Alejandro Alvarado - Laura Rubio</strong>
      </v-card-text>
    </v-card>
  </v-footer>
    
  </v-app>
</template>

<script>
import { db } from "./firebase";
export default {
  name: "App",
  data(){
    return{
       padless: false,
      variant: 'default',
      
    }
  },
  components: {},
  computed:{
    localAttrs () {
        const attrs = {}

        if (this.variant === 'default') {
          attrs.absolute = true
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
  },
  
  created(){
     // console.log("works")
      db.collection("Dependencies").get().then((doc) => 
        {doc.forEach(item => this.$store.state.dependencies.push(item.data()) )
            });

      db.collection("Users").get().then((doc) => 
        {doc.forEach(item => this.$store.state.users.push(item.data()) )
            })
            
  },
  
};
</script>
<style lang="scss">
.content {
  padding: 15px;
  margin-top: 18%;
  margin-bottom: 5%;
   
  
  
}
.main {
  padding: 40px;
  font-family: "Roboto", "sans-serif";
 
  
 
}
.app-container {
  max-width: 1040px;
  margin: 0 auto;
  
  
}
.body{
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1498962342534-ee08a0bb1d45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80");

}
</style>

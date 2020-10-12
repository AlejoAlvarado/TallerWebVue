<template>
   
 <v-container >
    
    
    <div class="form-wrapper">
      <v-form ref="form" v-model="valid" lazy-validation>

      <v-text-field v-model="name"  :rules="nameRules" label="Nombre" required ></v-text-field>

      <v-text-field v-model="coor" :rules="coorRules" label="Coordinador"  required ></v-text-field>

      <v-text-field v-model="location" :rules="locationRules" label="Ubicación" required></v-text-field>

      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox v-model="active" label="Activar dependencia"></v-checkbox>
        </v-col>

        <v-col cols="12" md="6">
          <v-slider v-model="max" max="1000" label="Numero maximo de usuarios" thumb-label> </v-slider>
        </v-col>

        

      </v-row>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Guardar
      </v-btn>
    </v-form>

    </div>
    

 </v-container>
    
  
 
  
</template>

<script>
export default {

  data(){
    return{
       name: " ",
       coor: " ",
       location: " ",
       nameRules:[
          (name) => !!name || "Obligatorio",
          (name)=> name.length >2 || "El nombre es muy corto",

       ],
       coorRules:[

       ],
       locationRules:[

       ],


    }
   

  }
};
</script>

<style>
.form-wrapper{
    padding: 40px ;
}
</style>
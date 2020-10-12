<template>
  <div>
     <v-container >
    
    
    <div class="form-wrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
            <v-col>
                 <v-text-field v-model="name"  :rules="nameRules" label="Nombre" required ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="name"  :rules="nameRules" label="Apellido" required ></v-text-field>
            </v-col>
        </v-row>

         <v-row>
            <v-col>
                 <v-text-field v-model="name"  :rules="nameRules" label="Email" required ></v-text-field>
            </v-col>
            <v-col>
                <v-text-field v-model="name"  :rules="nameRules" label="Contraseña" required ></v-text-field>
            </v-col>
        </v-row>  
      
      <v-row >
          <v-col >
            <v-dialog  ref="dialog" v-model="modal1" :return-value.sync="dateInit" persistent width="290px" >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field  v-model="dateInit" label="Seleccionar fecha de inicio"  prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker  v-model="dateInit" scrollable locale="es-419" >
                <v-spacer></v-spacer>
                <v-btn  text color="primary" @click="modal1 = false">
                        Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(dateInit)" >
                OK
                </v-btn>
                </v-date-picker>
            </v-dialog>
        </v-col>

        <v-col > 
            <v-dialog  ref="dialog" v-model="modal2" :return-value.sync="dateFinal" persistent width="290px" >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field  v-model="dateFinal" label="Seleccionar fecha de final"  prepend-icon="mdi-calendar"  readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker  v-model="dateFinal"  locale="es-419">
                <v-spacer></v-spacer>
                <v-btn  text color="primary" @click="modal2 = false">
                        Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(dateFinal)" >
                OK
                </v-btn>
                </v-date-picker>
            </v-dialog>
        </v-col>
          
        
    </v-row>
    <v-row>
         <v-col cols="6">
        <v-subheader>
          Seleccionar dependencia
        </v-subheader>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="select"         
          :items="items"
          item-text="state"          
          label="Select"          
          return-object
          single-line
        ></v-select>

      </v-col>

    </v-row>     

      <v-row>
        <v-col cols="12" md="4">
          <v-checkbox v-model="active" label="Activar usuario"></v-checkbox>
        </v-col>     

      </v-row>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Guardar
      </v-btn>
    </v-form>

    </div>
    

 </v-container>
  </div>
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
        modal1: false,
        modal2: false,
        dateInit: new Date().toISOString().substr(0, 10),
        dateFinal: new Date().toISOString().substr(0, 10),
    }
    }
}
</script>

<style>

</style>
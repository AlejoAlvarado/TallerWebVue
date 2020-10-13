<template>
   <v-container >
   <div class= "form-wrapper">
       <h2>Lista de Dependencias</h2>
        

        <v-card class="mx-auto" max-width="1000" >
    <v-list>
      <v-list-item-group  v-model="model" mandatory color="indigo">
        <v-list-item v-for="(item, i) in listDepen" :key="i" >         

          <v-list-item-content @click="infoDependy(i)" >
            <v-row class="userList">
                <v-col class="dependencyitem" >
                  <v-list-item-title  v-text="item.nombre"  ></v-list-item-title>
                </v-col>
              
              <v-col class="btnitems">
                <v-btn class="mx-2" fab dark small color="primary" >
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>

               <!-- <v-col class="btnitems" >
                <v-btn class="mx-2" fab dark small color="primary" >
                  <v-icon dark>
                    mdi-eye
                  </v-icon>
                </v-btn>
              </v-col> -->

               <v-col class="btnitems">
                <v-btn class="mx-2" fab dark small color="primary" @click="deleteDepen">
                  <v-icon dark>
                   mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>                                
          </v-list-item-content>
          
        </v-list-item>
      </v-list-item-group>
      <v-dialog   v-model="dialog"    max-width="360px" >
          <v-card scrollable >
            <v-divider></v-divider>
            <v-card-title>Información de {{selectedDepen.nombre}}</v-card-title>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
               <v-card-text >
                  Información de la dependencia:
                  la dependencia tiene 6 usuarios
                  El id de la dependencia es: {{selectedDepen.id}}
                                    
                </v-card-text>              
                 <v-simple-table fixed-header  >
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">
                              Usuario
                            </th>
                            <th class="text-left">
                              Edad
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="user in users" :key="user.age">
                            <td>{{ user.name }}</td>
                            <td>{{ user.age }}</td>
                          </tr>
                        </tbody>
                      </template>
            </v-simple-table>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="dialog = false" >
                    Close
                  </v-btn>         
            </v-card-actions>
        </v-card>
    </v-dialog>
     
      
    </v-list>
  </v-card>
   </div>
    
  </v-container>
</template>

<script>
import {Dependencies} from '../Data/dependencies.js'
export default {

   data(){
     return{
      listDepen: Dependencies,
      
      model:true,
      dialog:false,
      selectedDepen:"" ,
      users: [
          {
            name: 'User 1',
            age: 25,
          },
          {
            name: 'User 2',
            age: 37,
          },
          {
            name: 'User 3',
            age: 34,
          },
          {
            name: 'User 4',
            age: 3,
          },
          
      ],

     }
    
  },
  methods:{
    infoDependy(i){      
      this.selectedDepen = this.listDepen[i];     
      this.dialog=true;
      
      
    },
    deleteDepen(){

    }
  }

}
</script>

<style>
.form-wrapper{
    padding: 40px ;
}
.userList{
  height: 50px;
}
.dependencyitem{
  margin-right: 600px;
}
.btnitems{
    margin-left: 0px;
    margin-right: 0px;
   
    
}
</style>
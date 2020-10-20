<template>
   <v-container >
   <div class= "form-wrapper">
       <h2>Lista de Dependencias</h2>
       

        <v-card class="mx-auto" max-width="1000" >
    <v-list>
      
      <v-list-item-group  v-model="model" mandatory color="indigo">
        <v-list-item v-for="(item, i) in dependenciesStore" :key="i" >         

          <v-list-item-content  >
            <v-row >
                <v-col class="dependencyitem" >
                  <v-list-item-title v-text="item.name"  ></v-list-item-title>
                </v-col>
            
             
              <v-col class="btnitems">
                <v-btn  @click.capture="editDependency(i)" to="/editdepenency"  class="mx-2" fab dark small color="primary"  >
                  
                  <v-icon dark>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </v-col>

               <v-col class="btnitems" >
                <v-btn @click="infoDependy(i); searchUserDepen(selectedDepen.name) " class="mx-2" fab dark small color="primary" >
                  <v-icon dark>
                    mdi-eye
                  </v-icon>
                </v-btn>
              </v-col>

               <v-col class="btnitems">
                <v-btn class="mx-2" fab dark small color="primary" @click="deleteDependency(i)">
                  <v-icon dark>
                   mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>                                
          </v-list-item-content>
          
        </v-list-item>
        
      </v-list-item-group>
      <v-dialog   v-model="dialog"  persistent  max-width="360px"  >
          <v-card   >
            <v-divider style="height: 600px;"></v-divider>
            <v-card-title >Información de {{selectedDepen.name}}</v-card-title>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <br>
               <v-card-text >
                 <strong> </strong>                     
                  <p>
                    Coor :  {{selectedDepen.coor}}
                    Ubicacion: {{selectedDepen.location}}<br>
                    Cantidad maxima de usuarios {{selectedDepen.max}}<br>
                    Usuarios actuales:{{selectedDepen.members}}<br>
                    Estado:{{selectedDepen.active}}<br>                    
                  </p>                                                   
                </v-card-text>                             
                 <v-simple-table fixed-header>
                      <template v-slot:default>
                        
                        <thead>
                          <tr>
                            <th class="text-left">
                              Usuario
                            </th>
                            <th class="text-left">
                              lastname
                            </th>
                            <th class="text-left">
                              email
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="user in userbydepen" :key="user.name">
                            <td>{{ user.name }}</td>
                            <td>{{ user.lastname }}</td>
                            <td>{{ user.email }}</td>
                          </tr>
                        </tbody>
                      </template>
            </v-simple-table>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="dialog = false ; cleanUsersDepen()" >
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


import {mapActions} from 'vuex'


export default {

  

   data(){
     return{    
      
      model:true,
      dialog:false,
      selectedDepen:"" ,     
      usersDepen: "",
     }
    
  },
  computed:{
    dependenciesStore(){       
      return this.$store.getters.dependencies;
    },
    userbydepen(){
      return this.$store.getters.userbydepen;
    }
    
   
  },
  methods:{
    infoDependy(i){      
      this.selectedDepen = this.$store.state.dependencies[i]; 
      this.usersDepen = this.selectedDepen.members;    
      this.dialog=true;     
      
    },   
     
     ...mapActions(['deleteDependency']),
     ...mapActions(['editDependency']),
     ...mapActions(['searchUserDepen']),
     ...mapActions(['cleanUsersDepen'])
     
     
  },
  
 
  

}
</script>

<style>
.form-wrapper{
    padding: 40px ;
}

.dependencyitem{
  margin-right: 400px;
}
.btnitems{
    margin-left: 0px;
    margin-right: 0px;
   
    
}
</style>
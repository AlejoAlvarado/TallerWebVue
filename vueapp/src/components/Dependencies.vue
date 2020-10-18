<template>
   <v-container >
   <div class= "form-wrapper">
       <h2>Lista de Dependencias</h2>
       

        <v-card class="mx-auto" max-width="1000" >
    <v-list>
      
      <v-list-item-group  v-model="model" mandatory color="indigo">
        <v-list-item v-for="(item, i) in dependencies" :key="i" >         

          <v-list-item-content  >
            <v-row class="userList">
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
                <v-btn @click="infoDependy(i)" class="mx-2" fab dark small color="primary" >
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
      <v-dialog   v-model="dialog"    max-width="360px" >
          <v-card scrollable >
            <v-divider></v-divider>
            <v-card-title>Información de {{selectedDepen.name}}</v-card-title>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <br>
               <v-card-text >
                 <strong>La dependencia tiene {{usersDepen.length}} usuarios  </strong>                     
                  <p>
                    Ubicacion: {{selectedDepen.location}}<br>
                    Cantidad maxima de usuarios {{selectedDepen.max}}<br>
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
                              id
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="user in usersDepen" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.id }}</td>
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


import {mapActions} from 'vuex'


export default {

  

   data(){
     return{    
      dependencies: this.$store.getters.dependencies,
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
    
   
  },
  methods:{
    infoDependy(i){      
      this.selectedDepen = this.$store.state.dependencies[i]; 
      this.usersDepen = this.selectedDepen.members;    
      this.dialog=true;
      
      
    },    
     
     ...mapActions(['deleteDependency']),
     ...mapActions(['editDependency']),
     
     
  },
  
 
  

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
  margin-right: 400px;
}
.btnitems{
    margin-left: 0px;
    margin-right: 0px;
   
    
}
</style>
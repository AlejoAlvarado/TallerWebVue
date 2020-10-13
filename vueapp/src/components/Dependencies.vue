<template>
   <v-container >
   <div class= "form-wrapper">
       <h2>Lista de Dependencias</h2>
        

        <v-card class="mx-auto" max-width="1000" >
    <v-list>
      <v-list-item-group  v-model="model" mandatory color="indigo">
        <v-list-item v-for="(item, i) in items" :key="i" >         

          <v-list-item-content @click="infoDependy" v-bind="attrs" v-on="on">
            <v-row class="userList">
                <v-col class="dependencyitem" >
                  <v-list-item-title  v-text="item.text"  ></v-list-item-title>
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
                <v-btn class="mx-2" fab dark small color="primary" >
                  <v-icon dark>
                   mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>                    
          </v-list-item-content>  
        <v-dialog   v-model="dialog"    max-width="360px" >
          <v-card scrollable >
            <v-divider></v-divider>
            <v-card-title>Información de la Dependencia</v-card-title>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
               <v-card-text >
                  Información de la dependencia:
                  la dependencia tiene 6 usuarios
                                    
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
                          <tr v-for="item in users" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.age }}</td>
                          </tr>
                        </tbody>
                      </template>
            </v-simple-table>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>         
            </v-card-actions>
        </v-card>
    </v-dialog>
          
        </v-list-item>
      </v-list-item-group>
      
    </v-list>
  </v-card>
   </div>
    
  </v-container>
</template>

<script>
export default {

   data(){
     return{
       items: [
        {         
          text: 'Dependencia 1',
        },
        {          
          text: 'Dependencia 2',
        },
        {         
          text: 'Dependencia 3',
        },
      ],
      model:true,
      dialog:false,
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
            age: 37,
          },
          {
            name: 'User 4',
            age: 37,
          },
          
      ],

     }
    
  },
  methods:{
    infoDependy(){
      console.log("Show dialog");
      this.dialog=true;
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
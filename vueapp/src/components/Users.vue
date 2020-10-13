<template>
  <v-container >
   <div class= "form-wrapper">
       <h2>Lista de usuarios</h2>
       <v-subheader>La lista de usuarios esta vacia</v-subheader>

        <v-card class="mx-auto" max-width="1000" >
    <v-list>
      <v-list-item-group  v-model="model" mandatory color="indigo">
        <v-list-item v-for="(item, i) in items" :key="i" >         

          <v-list-item-content>
            <v-row class="userList">
                <v-col class="useritem" >
                  <v-list-item-title v-text="item.text"></v-list-item-title>
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
         
          
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
   </div>

        
    
    
  </v-container>
</template>

<script>
export default {
  data: ()=>({
    items: [
        {
         
          text: 'Wifi',
        },
        {
          
          text: 'Bluetooth',
        },
        {
         
          text: 'Data Usage',
        },
      ],
  })
};
</script>

<style>
.form-wrapper{
    padding: 40px ;
}
.userList{
  height: 50px;
}
.useritem{
  margin-right: 600px;
}
.btnitems{
    margin-left: 0px;
    margin-right: 0px;
   
    
}
</style>

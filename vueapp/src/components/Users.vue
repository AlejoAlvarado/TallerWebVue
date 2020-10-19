<template>
  <v-container>
    <div class="form-wrapper">
      <h2>Lista de usuarios</h2>
      <v-card class="mx-auto" max-width="1000">
        <v-list>
          <v-list-item-group v-model="model" mandatory color="indigo">
            <v-list-item v-for="(item, i) in usersore" :key="i">
              <v-list-item-content>
                <v-row class="userList">
                  <v-col class="dependencyitem">
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-col>

                  <v-col class="btnitems">
                    <v-btn
                      @click.capture="editUser(i)"
                      to="/edituser"
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="btnitems">
                    <v-btn
                      @click="infoUser(i)"
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                    >
                      <v-icon dark>
                        mdi-eye
                      </v-icon>
                    </v-btn>
                  </v-col>

                  <v-col class="btnitems">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="primary"
                      @click="deleteUser(i)"
                    >
                      <v-icon dark>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-dialog v-model="dialog" max-width="360px">
            <v-card scrollable>
              <v-divider></v-divider>
              <v-card-title
                >Información de {{ selectedUser.name }}</v-card-title
              >
              <v-divider></v-divider>
              <v-spacer></v-spacer>
              <br />
              <v-card-text>
                <p>
                  Apellido: {{ selectedUser.lastname }}<br />
                  Email: {{ selectedUser.email }}<br />
                  Estado:{{ selectedUser.active }}<br />
                  Fecha :{{ selectedUser.valid_until }}
                </p>
              </v-card-text>

              <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
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
import { mapActions } from "vuex";

export default {
  computed: {
    usersore() {
      return this.$store.getters.users;
    },
  },
  data() {
    return {
      dialog: false,
      selectedUser: "",
      model: true,
    };
  },

  methods: {
    ...mapActions(["deleteUser"]),
    ...mapActions(["editUser"]),

    infoUser(i) {
      this.selectedUser = this.$store.state.users[i];
      this.dialog = true;
    },
  },
};
</script>

<style>
.form-wrapper {
  padding: 40px;
}
.userList {
  height: 50px;
}
.useritem {
  margin-right: 600px;
}
.btnitems {
  margin-left: 0px;
  margin-right: 0px;
}
</style>

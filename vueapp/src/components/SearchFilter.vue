<template>
  <v-container>
    <div class="form-wrapper" v-if="filterByUser">
      <div>
        <h1>Buscar usuarios por nombre</h1>
      </div>

      <v-toolbar>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-text-field v-model="search" placeholder="Buscar usuarios">
        </v-text-field>
      </v-toolbar>
      <div>
        <v-btn color="primary" @click="changeFilter">
          Buscar por dependencia
        </v-btn>
      </div>

      <v-card class="mx-auto" max-width="1000">
        <v-list>
          <v-list-item-group v-model="model" mandatory color="indigo">
            <v-list-item v-for="(user, i) in filteredUsers" :key="i">
              <v-list-item-content>
                <v-row class="userList">
                  <v-col class="dependencyitem">
                    <v-list-item-title v-text="user.name"></v-list-item-title>
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

    <div class="form-wrapper" v-else>
      <div>
        <h1>Buscar usuarios por dependencia</h1>
      </div>

      <v-toolbar>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-text-field v-model="search" placeholder="Buscar usuarios">
        </v-text-field>
      </v-toolbar>
      <div>
        <v-btn color="primary" @click="changeFilter">
          Buscar por nombre
        </v-btn>
      </div>

      <v-card class="mx-auto" max-width="1000">
        <v-list>
          <v-list-item-group v-model="model" mandatory color="indigo">
            <v-list-item v-for="(user, i) in filteredUsers" :key="i">
              <v-list-item-content>
                <v-row class="userList">
                  <v-col class="dependencyitem">
                    <v-list-item-title v-text="user.name"></v-list-item-title>
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

    <div v-for="user in filteredUsers" :key="user.id">
      <h2>{{ user.name }} {{ user.lastname }}</h2>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      search: "",
      users: [],
      filterByUser: true,
      dialog: false,
      selectedUser: "",
      model: true,
    };
  },
  created() {
    this.users = this.$store.getters.users;
  },
  computed: {
    filteredUsers: function() {
      return this.users.filter((user) => {
        var regex = new RegExp(this.search, "gi");
        return this.search != "" ? user.name.match(regex) : null;
        //return user.name.match(this.search);
      });
    },
    filteredUsersByDependency: function() {
      return this.users.filter((user) => {
        var regex = new RegExp(this.search, "gi");
        return this.search != "" ? user.name.match(regex) : null;
        //return user.name.match(this.search);
      });
    },
  },
  methods: {
    ...mapActions(["deleteUser"]),
    ...mapActions(["editUser"]),

    infoUser(i) {
      this.selectedUser = this.$store.state.users[i];
      this.dialog = true;
    },
    changeFilter() {
      this.filterByUser = !this.filterByUser;
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

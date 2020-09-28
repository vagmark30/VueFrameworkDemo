<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                    v-model="username"
                    label="Username"
                    required
                ></v-text-field>
              </v-col>
              <v-col  cols="12"
                sm="6"
                md="4">
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                ></v-text-field>
              </v-col>
                <v-col  cols="12"
                        mt="10"
                        sm="6"
                        md="4">
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="loginF"
                        >
                            Login
                        </v-btn>
                </v-col>

            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
        username:'',
        password:'',
      dialog: true,
    }),
    methods:{
        loginF(){
            const baseURI = 'http://127.0.0.1:10640/Persons/'+this.username+'/'+this.password+'/'
            this.$http.get(baseURI)
            .then((result) => {
                if(result.data.success){
                    this.dialog=false
                }
            })

        }
    }
  }
</script>
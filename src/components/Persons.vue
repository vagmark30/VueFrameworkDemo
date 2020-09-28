<template>
  <div class="persons">

<!-- table atributes -->
      <v-data-table
        :headers="headers"
        :items="personsData"
        :items-per-page="15"
        class="elevation-1"
    >
<!-- toolbar with edit form -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Persons</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >New Item</v-btn>
          </template>
          <v-card>
            <v-card-title dark style="background-color:#3895d3;">
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field disabled v-model="editedItem.id" label="carId"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        :append-icon="showPas ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPas ? 'text' : 'password'"
                        label="Password"
                        counter
                        @click:append="showPas = !showPas"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.zipCode" label="Zip Code"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>


    <!-- action edit-delete formatters -->
    <template v-slot:[`item.password`]="{ item }">
      <p @click="doNothing(item)">*** </p>
      

    </template>
	<template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
	</v-data-table>
  </div>
</template>

<script>

const baseURI = 'http://127.0.0.1:10640/Persons/'
export default {
  name: 'Persons',
  data(){
      return{
          dialog:false,
          showPas:false,
            personsData:[],
            
            headers: [
            {
                text: 'Id',
                align: 'start',
                sortable: false,
                value: 'id',
            },
            { text: 'Username', value: 'name' },
            { text: 'Password', value: 'password' },
            { text: 'ZipCode', value: 'zipCode' },
            { text: 'Actions', value: 'actions'}
            ],
            editedIndex: -1,
            editedItem: {
                id:0,
                name:'',
                password:'',
                zipCode:0,
            },
            defaultItem: {
                id:0,
                name:'',
                password:'',
                zipCode:0,
            }
      }
  },
  mounted () {
    this.fetchPersons();
  },
    methods: {
    fetchPersons: function () {

      this.$http.get(baseURI)
      .then((result) => {
        this.personsData = result.data.result
      })
    },
    editItem (item) {
        this.editedIndex = this.personsData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {

        const index = this.personsData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.personsData.splice(index, 1)
        this.$http.delete(baseURI +item.id)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {

        if (this.editedIndex > -1) {
          this.$http.put(baseURI,this.editedItem)
            .then((result) => {
              this.fetchPersons();
               console.log(result.data.success);
            })
        } else {
            this.$http.post(baseURI,this.editedItem)
              .then((result) => {
                if(result.data.success){
                  this.personsData.push(result.data.result)
                }
              })
          
        }
        this.close()
      },
      doNothing(item){
        return item;
      }
  },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

}


</script>

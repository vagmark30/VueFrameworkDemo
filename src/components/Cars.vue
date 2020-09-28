<template>
  <div class="cars">
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
<!-- table atributes -->
      <v-data-table
        :headers="headers"
        :items="carsData"
        :items-per-page="15"
        :search="search"
        class="elevation-1"
    >
<!-- toolbar with edit form -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Cars</v-toolbar-title>
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
                    <v-text-field disabled v-model="editedItem.carId" label="carId"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.regNum" label="Registration No"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.model" label="Model"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.modelYear" label="Model Year"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.gasType" label="Gas Type"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.transmission" label="Transmission"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.numPerson" label="Person"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.numDoors" label="Doors"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.numLuggage" label="Luggages"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.available" label="Available"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.categId" label="Category"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.locatId" label="Location"></v-text-field>
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
  </v-card>
  </div>
</template>

<script>


export default {
  name: 'Cars',
  data(){
      return{
          search: '',
          dialog:false,
            carsData:[],
            
            carGasTypeEnum:[
                {idGas:0 , nameGas:"Vezina"},
                {idGas:1 , nameGas:"Pertelaio"},
                {idGas:2 , nameGas:"Aerio"},
                {idGas:3 , nameGas:"Hybrid"}
            ],
            headers: [
            {
                text: 'CarId',
                align: 'start',
                sortable: false,
                value: 'carId',
            },
            { text: 'RegNum', value: 'regNum' },
            { text: 'Model', value: 'model' },
            { text: 'ModelYear', value: 'modelYear' },
            { text: 'GasType', value:'gasType'},
            { text: 'Transmission', value: 'transmission' },
            { text: 'NumPerson', value: 'numPerson' },
            { text: 'NumDoors', value: 'numDoors' },
            { text: 'NumLuggage', value: 'numLuggage' },
            { text: 'Available', value: 'available' },
            { text: 'CategId', value: 'categId.catName' },
            { text: 'LocatId', value: 'locatId.locName' },
            { text: 'Actions', value:'actions'}
            ],
            editedIndex: -1,
            editedItem: {
                carId:0,
                regNum:'',
                model:'',
                modelYear:0,
                gasType:0,
                transmission:0,
                numPerson:0,
                numDoors:0,
                numLuggage:0,
                available:0,
                categId:0,
                locatId:0,
            },
            defaultItem: {
                carId:0,
                regNum:'',
                model:'',
                modelYear:0,
                gasType:0,
                transmission:0,
                numPerson:0,
                numDoors:0,
                numLuggage:0,
                available:0,
                categId:0,
                locatId:0,
            }

      }
  },
  mounted () {
    this.fetchCars();
  },
    methods: {
    fetchCars: function () {
      const baseURI = 'http://127.0.0.1:10640/Cars/'
      this.$http.get(baseURI)
      .then((result) => {
        this.carsData = result.data.result
      })
      console.log(this.carsData);
    },
    editItem (item) {
        this.editedIndex = this.carsData.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.carsData.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.carsData.splice(index, 1)
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
          Object.assign(this.carsData[this.editedIndex], this.editedItem)
        } else {
          this.carsData.push(this.editedItem)
        }
        this.close()
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

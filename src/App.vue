<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app
      color=primary
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>VagMark</v-toolbar-title>
    </v-app-bar>

    <!-- Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title><h1> Home</h1></v-list-item-title>
          </v-list-item>

          <v-list-item to="persons">
            <v-list-item-icon>
              <v-icon>mdi-human</v-icon>
            </v-list-item-icon>
            <v-list-item-title ><h1> Persons</h1></v-list-item-title>
          </v-list-item>

          <v-list-item to="cars">
            <v-list-item-icon>
              <v-icon>mdi-car</v-icon>
            </v-list-item-icon>
            <v-list-item-title ><h1> Cars</h1></v-list-item-title>
          </v-list-item>

          <v-list-item to="bookings">
            <v-list-item-icon>
              <v-icon>mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-title ><h1> Bookings</h1></v-list-item-title>
          </v-list-item>

          <v-list-item to="datagriddemo">
            <v-list-item-icon>
              <v-icon>mdi-poll</v-icon>
            </v-list-item-icon>
            <v-list-item-title ><h1> Datagrid Demo</h1></v-list-item-title>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main -->
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <!-- Footer -->
      <v-footer
        fixed
        class="font-weight-medium"
        color=primary
        dense
        dark
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>VagMark implements Vue</strong>
        </v-col>
      </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data () {
      return {
        bookingsData:[],
        drawer: null,
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        permanent: true,
      }
    }
  }
</script>
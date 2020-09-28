<template>

  <div class="home">
    <!-- <Login /> -->
    <h1 class="text-center mt-8">Vue introduction</h1>
    <div>
      <ul>
        <li> <strong>Installation</strong></li> 
        <li> 
          <ul>
            <li> npm install -g @vue/cli @vue/cli-service-global</li> 
            <li> vue create my-vue-project</li> 
            <li> npm install vuetify(TEMPLATE-easyui)</li> 
            <li> npm install axios(AJAX CALLS)</li> 
            <li> npm install router(SPA)</li> 
            <li> npm run serve</li> 
            <li> Vue DevTools on Chrome</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//se sxolia einai 3 grammes gia to modalLoginDialog

// import Login from './Login.vue'
export default {
  name: 'Home',
  components: {
    // Login,
  }
}
</script>
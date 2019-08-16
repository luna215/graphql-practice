<template>
  <div id="app">
    <h3>Example 1</h3>
    <div>
      Data: {{ example1 }}
    </div>
    <button @click="getData">Get Data</button>
    <hr>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      example1: ''
    }
  },
  methods: {
    async getData () {
      try {
        const res = await axios.post('http://localhost:4000/', {
          query: '{ hello }'
        })
        this.example1 = res.data.data.hello
      } catch (error) {
        return;
        // console.log('err', error);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <h3>Example 1</h3>
    <div>
      Data: {{ example1 }}
    </div>
    <button @click="getData">Get Data</button>
    <hr>
    <h3>Example 2</h3>
    <div>
      Data: {{ champions }}
    </div>
    <button @click="getChampions">Get Champions</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      example1: '',
      champions: []
    }
  },
  methods: {
    async getData () {
      try {
        const res = await axios.post('http://localhost:4000/', {
          query: `{ 
            hello
          }`
        })
        this.example1 = res.data.data
      } catch (error) {
        return;
        // console.log('err', error);
      }
    },
    async getChampions () {
      try {
        const res = await axios.post('http://localhost:4000/', {
          query: `{
            getChampions {
              name
            }
          }`
        });
        this.champions = res.data.data;
      } catch (error) {
        return;
      }
    },
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

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
    <hr>
    <h3>Example 3</h3>
    Name: <input v-model="name">
    <div>
      Data: {{ champion }}
    </div>
    <button @click="getChampionByName">Get Champion</button>
    <hr>
    <h3>Example 4</h3>
    Name: <input v-model="name">
    Attack Damage: <input v-model.number="attack">
    <div>
      Data: {{ updatedChampion }}
    </div>
    <button @click="updateAttackDamage">Update Champion</button>
  </div>
</template>

<script>
import axios from 'axios';
import { constants } from 'crypto';

export default {
  name: 'app',
  data () {
    return {
      example1: '',
      champions: [],
      champion: {},
      name: '',
      updatedChampion: '',
      attack: ''
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
    async getChampionByName () {
      try {
        const res = await axios.post(
          'http://localhost:4000/', {
            query:
              `query GetChampionByName($championName: String!) {
            getChampionByName(name: $championName) {
              name
              attackDamage
            }
          }`,
            variables: {
              championName: this.name
            }, headers: {
              'Content-Type': 'application/json'
            }
          });
        this.champion = res.data.data.getChampionByName
      } catch (error) {
        return;
      }
    },
    async updateAttackDamage () {
      try {
        const res = await axios.post('http://localhost:4000/', {
          query: `
          mutation UpdateAttackDamage($championName: String!, $attackDamage: Float) {
              updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
                name
                attackDamage
              }
            }`,
          variables: {
            championName: this.name,
            attackDamage: this.attack,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(res.data.data);
        this.updatedChampion = res.data.data.updateAttackDamage;
      } catch (error) {
        return;
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

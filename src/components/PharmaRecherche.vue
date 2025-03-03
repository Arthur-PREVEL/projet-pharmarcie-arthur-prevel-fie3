<script setup>
import { ref } from 'vue';

const libelle = ref('');
const emit = defineEmits(['recherche']);

function handleInput() {
    emit('recherche', libelle.value);
}
</script>

<template>
 <form @submit.prevent>
   <input v-model="libelle" type="text" placeholder="Nom du médicament" @input="handleInput" />
 </form>
</template>

<style scoped>
input {
    width: 100%;
    padding: 10px;
    border: 2px solid #4CAF50;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
}
input:focus {
    border-color: #ff6600;
}
</style>

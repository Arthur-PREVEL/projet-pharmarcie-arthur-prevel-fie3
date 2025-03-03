<script setup>
    import {ref} from 'vue';
const denomination = ref('');
const formePharmaceutique = ref('');
const quantite = ref('');
const photo = ref('');
const emit = defineEmits(['eventAdd']);

function submitForm() {
    emit('eventAdd', {
        denomination: denomination.value,
        formePharmaceutique: formePharmaceutique.value,
        qte: parseInt(quantite.value), 
        photo: photo.value
    });
    //réinitialisation
    denomination.value = '';
    formePharmaceutique.value = '';
    quantite.value = '';
    photo.value = '';
}
</script> 

<template> 
    <form @submit.prevent="submitForm">
        <h5>Ajouter un Médicament</h5>

        <label for="denomi"> Dénomination : </label>
        <input v-model="denomination" type="text" id="denomi" required>
        <br><br>

        <label for="formeph">Forme galénique :</label>
        <select v-model="formePharmaceutique" id="formeph" required>
            <option value="" disabled>Choisir une forme galénique</option>
            <option value="Comprimé">Comprimé</option>
            <option value="Gélule">Gélule</option>
            <option value="Sirop">Sirop</option>
            <option value="Poudre">Poudre</option>
            <option value="Crème">Crème</option>
            <option value="Gel">Gel</option>
            <option value="Pommade">Pommade</option>
            <option value="Solution injectable">Solution injectable</option>
            <option value="Suppositoire">Suppositoire</option>
            <option value="Collyre">Collyre</option>
            <option value="Aérosol">Aérosol</option>
            <option value="Patch">Patch</option>
            <option value="Suspension">Suspension</option>
        </select>
        <br><br>

        <label for="quanti"> Quantité : </label>
        <input v-model="quantite" type="number" id="quanti" required>
        <br><br>

        <label for="lienPhoto">Photo :</label>
        <select v-model="photo" id="lienPhoto" required>
            <option value="medicament_1740672678.jpg">Rosuvastatine</option>
            <option value="medicament_1740673663.jpg">Primperan</option>
            <option value="medicament_1740673863.jpg">Spasfon</option>
            <option value="medicament_1740674253.jpg">Azopt</option>
            <option value="medicament_1740674594.jpg">Atorvastatine</option>
            <option value="medicament_1740674781.jpg">Permixon</option>
            <option value="medicament_1740674900.jpg">Doliprane</option>
            <option value="medicament_1740675218.jpg">Tercian</option>
            <option value="medicament_1740675309.jpg">Artensium</option>
            <option value="medicament_1740698677.jpg">Efferalgan</option>
            <option value="medicament_1740843637.jpg">Lovenox</option>
        </select>

        <br><br>

        <button type="submit">Ajouter</button>
    </form>
</template>

<style>
h5 {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
    color: #006699;
    background: linear-gradient(45deg, #006699, #b3e6ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px 20px;
    border-top: 4px solid #00aaff;
    border-bottom: 4px solid #00aaff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
form {
    background-color: #4CAF50; /* Vert */
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    margin: auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    font-family: Arial, sans-serif;
}


label {
    display: block;
    font-weight: bold;
    margin-top: 10px;
}

input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
}

input:focus {
    outline: none;
    box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7);
}

button {
    background-color: white;
    color: #4CAF50;
    border: 1px solid #4CAF50;
    padding: 10px;
    width: 100%;
    margin-top: 15px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #45a049;
    color: white;
}
</style>
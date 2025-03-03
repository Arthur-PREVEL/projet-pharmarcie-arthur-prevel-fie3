<script setup>
import { reactive, ref, onMounted } from 'vue';
import { Medicament } from "../Medicament.js";
import PharmaForm from './PharmaForm.vue';
import PharmaRecherche from './PharmaRecherche.vue';

const listeM = reactive([]);
const searchQuery = ref('');

function getMedicaments() {
    const url = "https://apipharmacie.pecatte.fr/api/26/medicaments";
    fetch(url)
        .then(response => response.json())
        .then(dataJSON => {
            listeM.splice(0, listeM.length, ...dataJSON.map(medicament =>
                new Medicament(medicament.id, medicament.denomination, medicament.formepharmaceutique, medicament.qte, medicament.photo)
            ));
        });
}

function updateApi(medicament) {
    const url = "https://apipharmacie.pecatte.fr/api/26/medicaments";
    const fetchOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicament)
    };
    fetch(url, fetchOptions)
        .then(response => response.json())
        .then(data => console.log(`Médicament ${medicament.id} mis à jour.`))
        .catch(error => console.error('Erreur mise à jour API:', error));
}

function addMedicamentToApi(medicament) {
    console.log("Données envoyées à l'API:", medicament);  // Debugging
    const url = "https://apipharmacie.pecatte.fr/api/26/medicaments";
    const fetchOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            denomination: medicament.denomination,
            formepharmaceutique: medicament.formePharmaceutique,
            qte: medicament.qte,
            photo: medicament.photo
        })
    };
    fetch(url, fetchOptions)
    .then(response => response.json())
    .then(data => console.log("Réponse API:", data))
    .catch(err => console.error("Erreur API:", err));
}

function deleteMedicamentFromApi(id) {
    const url = `https://apipharmacie.pecatte.fr/api/26/medicaments/${id}`;
    fetch(url, { method: "DELETE" })
        .then(response => response.json())
        .then(() => console.log('Medicament deleted'))
        .catch(err => console.error('API delete failed:', err));
}

function handlerAjouterMedicament(nouveauMedicament) {
    listeM.push(new Medicament(
        listeM.length + 1, 
        nouveauMedicament.denomination,
        nouveauMedicament.formePharmaceutique,
        nouveauMedicament.qte,
        nouveauMedicament.photo
    ));
    addMedicamentToApi(listeM[listeM.length - 1]);
}

function handlerAjouterStock(index, qte) {
    listeM[index].ajouterStock(qte);
    updateApi(listeM[index]);
}

function handlerRetirerStock(index, qte) {
    listeM[index].retirerStock(qte);
    updateApi(listeM[index]);
}

function handlerSupprimer(index) {
    const id = listeM[index].id;
    listeM.splice(index, 1);
    deleteMedicamentFromApi(id);
}

const filteredMedicaments = () => {
    return searchQuery.value
        ? listeM.filter(m => m._denomination.toLowerCase().includes(searchQuery.value.toLowerCase()))
        : listeM;
};

onMounted(() => {
    getMedicaments();
});
</script>

<template>
    <h4>Liste des médicaments</h4>
    <PharmaRecherche @recherche="searchQuery = $event" />
    <ul>
        <li v-for="(medicament, index) in filteredMedicaments()" :key="medicament.id" class="medicament-card">
            <img :src="'https://apipharmacie.pecatte.fr/images/' + medicament._photo" alt="Photo du médicament" class="medicament-photo">
            <div class="medicament-info">
                <h3>{{ medicament._denomination }}</h3>
                <p>Forme galénique : {{ medicament._formePharmaceutique }}</p>
                <p>Quantité : {{ medicament._qte }}</p>
            </div>
            <div class="medicament-actions">
                <button @click="handlerAjouterStock(index, 1)">+1</button>
                <button @click="handlerRetirerStock(index, 1)">-1</button>
                <button>Modifier</button>
                <button @click="handlerSupprimer(index)">Supprimer</button>
            </div>
        </li>
    </ul>
    <PharmaForm @eventAdd="handlerAjouterMedicament" />
</template>

<style>
.medicament-card {
    display: flex;
    align-items: center;
    background-color: #f0f8f0;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    font-family: Arial, sans-serif;
}

.medicament-photo {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
}

.medicament-info {
    flex: 1;
}

.medicament-info h3 {
    margin: 0;
    font-size: 18px;
    color: #2d6a4f;
}

.medicament-actions {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.medicament-actions button {
    padding: 8px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
}

.medicament-actions button:hover {
    background-color: #45a049;
}

h4 {
    font-size: 3rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
    color: #ff6600;
    background: linear-gradient(45deg, #ff6600, #ffcc00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 10px 20px;
    border-bottom: 4px solid #ff6600;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>

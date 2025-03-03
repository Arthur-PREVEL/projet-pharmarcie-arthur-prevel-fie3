export class Medicament {
  constructor(id, denomination, formePharmaceutique, qte, photo) {
    this._id = id;
    this._denomination = denomination;
    this._formePharmaceutique = formePharmaceutique;
    this._qte = qte;
    this._photo = photo;
  }

  // ---- Getters
  get id() {
    return this._id;
  }

  get denomination() {
    return this._denomination;
  }

  get formePharmaceutique() {
    return this._formePharmaceutique;
  }

  get qte() {
    return this._qte;
  }

  get photo() {
    return this._photo;
  }

  // ---- Setters
  set denomination(denomination) {
    this._denomination = denomination;
  }

  set formePharmaceutique(formePharmaceutique) {
    this._formePharmaceutique = formePharmaceutique;
  }

  set qte(qte) {
    this._qte = qte;
  }

  set photo(photo) {
    this._photo = photo;
  }

  // ---- Méthodes
  ajouterStock(quantite) {
    this._qte += quantite;
  }

  retirerStock(quantite) {
    if (this._qte >= quantite) {
      this._qte -= quantite;
    } else {
      console.warn("Stock insuffisant");
    }
  }

  toString() {
    return `Médicament: ${this._denomination} (${this._formePharmaceutique}), Quantité: ${this._qte}`;
  }
}

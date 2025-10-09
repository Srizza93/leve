export interface Festival {
  nom_du_festival: string;
  envergure_territoriale: string | null;
  region_principale_de_deroulement: string;
  departement_principal_de_deroulement: string;
  commune_principale_de_deroulement: string;
  code_postal_de_la_commune_principale_de_deroulement: string;
  code_insee_commune: string;
  code_insee_epci_collage_en_valeur: string;
  libelle_epci_collage_en_valeur: string;
  numero_de_voie: string | null;
  type_de_voie_rue_avenue_boulevard_etc: string | null;
  nom_de_la_voie: string | null;
  adresse_postale: string | null;
  complement_d_adresse_facultatif: string | null;
  site_internet_du_festival: string | null;
  adresse_e_mail: string | null;
  decennie_de_creation_du_festival: string | null;
  annee_de_creation_du_festival: string | null;
  discipline_dominante: string | null;
  sous_categorie_spectacle_vivant: string | null;
  sous_categorie_musique: string | null;
  sous_categorie_musique_cnm: string | null;
  sous_categorie_cinema_et_audiovisuel: string | null;
  sous_categorie_arts_visuels_et_arts_numeriques: string | null;
  sous_categorie_livre_et_litterature: string | null;
  periode_principale_de_deroulement_du_festival: string | null;
  identifiant_agence_a: string | null;
  identifiant: string;
  geocodage_xy: {
    lon: number;
    lat: number;
  } | null;
  identifiant_cnm: string | null;
}

export interface FestivalResponse {
  results: Festival[]
  total_count: number
}
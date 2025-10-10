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

export enum FestivalKeys {
  NOM_DU_FESTIVAL = 'nom_du_festival',
  ENVERGURE_TERRITORIALE = 'envergure_territoriale',
  REGION_PRINCIPALE_DE_DEROULEMENT = 'region_principale_de_deroulement',
  DEPARTEMENT_PRINCIPAL_DE_DEROULEMENT = 'departement_principal_de_deroulement',
  COMMUNE_PRINCIPALE_DE_DEROULEMENT = 'commune_principale_de_deroulement',
  CODE_POSTAL_DE_LA_COMMUNE_PRINCIPALE_DE_DEROULEMENT = 'code_postal_de_la_commune_principale_de_deroulement',
  CODE_INSEE_COMMUNE = 'code_insee_commune',
  CODE_INSEE_EPCI_COLLAGE_EN_VALEUR = 'code_insee_epci_collage_en_valeur',
  LIBELLE_EPCI_COLLAGE_EN_VALEUR = 'libelle_epci_collage_en_valeur',
  NUMERO_DE_VOIE = 'numero_de_voie',
  TYPE_DE_VOIE_RUE_AVENUE_BOULEVARD_ETC = 'type_de_voie_rue_avenue_boulevard_etc',
  NOM_DE_LA_VOIE = 'nom_de_la_voie',
  ADRESSE_POSTALE = 'adresse_postale',
  COMPLEMENT_D_ADRESSE_FACULTATIF = 'complement_d_adresse_facultatif',
  SITE_INTERNET_DU_FESTIVAL = 'site_internet_du_festival',
  ADRESSE_E_MAIL = 'adresse_e_mail',
  DECENNIE_DE_CREATION_DU_FESTIVAL = 'decennie_de_creation_du_festival',
  ANNEE_DE_CREATION_DU_FESTIVAL = 'annee_de_creation_du_festival',
  DISCIPLINE_DOMINANTE = 'discipline_dominante',
  SOUS_CATEGORIE_SPECTACLE_VIVANT = 'sous_categorie_spectacle_vivant',
  SOUS_CATEGORIE_MUSIQUE = 'sous_categorie_musique',
  SOUS_CATEGORIE_MUSIQUE_CNM = 'sous_categorie_musique_cnm',
  SOUS_CATEGORIE_CINEMA_ET_AUDIOVISUEL = 'sous_categorie_cinema_et_audiovisuel',
  SOUS_CATEGORIE_ARTS_VISUELS_ET_ARTS_NUMERIQUES = 'sous_categorie_arts_visuels_et_arts_numeriques',
  SOUS_CATEGORIE_LIVRE_ET_LITTERATURE = 'sous_categorie_livre_et_litterature',
  PERIODE_PRINCIPALE_DE_DEROULEMENT_DU_FESTIVAL = 'periode_principale_de_deroulement_du_festival',
  IDENTIFIANT_AGENCE_A = 'identifiant_agence_a',
  IDENTIFIANT = 'identifiant',
  GEOCODAGE_XY = 'geocodage_xy',
  IDENTIFIANT_CNM = 'identifiant_cnm',
}


export const _axes = [
	"Veiller au respect des exigences légales et autres exigences applicables",
	"Satisfaire les besoins et attentes de nos clients et parties intéressées en garantissant la qualité des résultats et la fiabilité de nos services",
	"Garantir la santé et améliorer la sécurité de notre personnel et les conditions de travail en évaluant les risques",
	"professionnels et en proposant des mesures de prévention pertinentes",
	"Prévenir et diminuer les impacts de nos activités en gérant les déchets et les rejets au sein de la société et sur tous les autres sites de travail",
	"Maitriser et améliorer le fonctionnement de nos processus et améliorer les compétences de notre personnel"
]

const axes = {
	"Intituleé": "Intituleé",
	"Slog": "Slog"
}

const objectifs_operationnel= {
	"Intituleé": "Intituleé",
	"axe": [],
	"processus":[],
}

const indicateur = {
	"Intituleé": "Intituleé",
	"mesure": [
		"%",
		""
	],
	"objectifs_operationnel": [],
	"crétere": "",
	"paramètres": "",
	"frequence": [
		"mentiels",
		"trimestriel",
		"semestriel",
		"annuel"
	],
	"sueil": [
		"Min",
		"Max",
		"Valeur à attendre",
		"Plage de valeurs"
	],
}

const indicateur_qualishare = {
	"Année": [],
	"objectifs_operationnel": [],
	"Processus": [],
	"Domaine": [
		"Qualité",
		"Enirenement",
		"Santé & Securité",
	],
	"Sens":[
		">",
		"<",
		"="
	],
	"Objectif": "Description",
	"Seuil": "valeur",
	"Unité": [
		"Heures",
		"Jours",
		"Nombre",
		"Dinars",
		"%"
	],
	"Calcul":[
		"Somme",
		"Moyene",
		"Resultat comulé"
	],
	"Méthode de calcul": "Méthode de calcul"
}




const action_amelioration = {
	// DESCRIPTION
	"Intitulé action": "h",
	"Type d'action": [
		"Preventive",
		"Strategique"
	],
	"Origine de l'action": [
		"SWOT",
		"Non Conformite",
		"Analyse des risques",
		"Auto evaluation ISO 9001:2015",
		"Constat d'audit",
		"Exigences des PIP",
		"Gestion du changement",
		"Veille legale et reglementaire",
		"Autre"
	],
	"objectif_operation": [],
	"Processus": [
		"Achats & MGX",
		"Commercial",
		"Finance & Comptabilité",
		"Maintenance",
		"Exploitation",
		"Ressource Humaine",
		"SI",
		"DG",
		"QHSE"
	],
	"Analyse causes (AC) / risques (AP)": "description de la causes",
	"Plan d'actions": "description du plan d'action",
	"Délai mise en oeuvre": "Date d'echeance",
	"Assigné à": "Nom ou address mail",
	"Délai mesure efficacité": "Délai mesure efficacité",
	"Type de critère d'efficacité": [
		"Atteinte d'un objectif précis",
		"non (ré)apparition de la non-conformité",
		"Amélioration de la satisfaction client",
		"Amélioration de l'efficacité globale du processus"
	],
	"Détail sur le critère d'efficacité": "Détail sur le critère d'efficacité",
	"Pièce(s) jointe(s)": "Pièce(s) jointe(s)",
	// RÉALISATION
	"Action réalisée": "",
	"Date de réalisation": "Date de réalisation",
	"État": [
		"Non commencé",
		"En cours",
		"Terminé",
		"Différé"
	],
	// MESURE D'ÉFFICACITÉ
	"Date cloture": "Date cloture",
	"Résultat mesure efficacité": [
		"Efficace",
		"Non efficace"
	],
	"Coût": "Coût"
}

const non_conformites = {
	// DESCRIPTION DU PROBLÈME
	"Nature": [
		"Non conformité-interne",
		"Non conformité externe",
		"Non conformité PIP",
		"Reclamation client",
		"Incident / Accident",
		"Inspection"
	],
	//"objectis_operationnel": [],
	"concerné": "concerné",
	"Processus": [],
	"Intitulé de l'évènement indésirable": "Intitulé de l'évènement indésirable",
	"Cause type": [
		"Matiere Premiere",
		"Main d'oueuvre",
		"Materiel",
		"Methode",
		"Milieu",
		"Autre"
	],
	"Date non-conformité": "Date non-conformité",
	"Description détaillée": "Description détaillée",
	"Resp. traitement": "Noms ou mails",
	"Délai prévu": "Date",
	"Pièce(s) jointe(s)": "fichier",
	// TRAITEMENT DU PROBLÈME
	"Action de correction": "Action de correction",
	"Avancement": "pourcentage",
	"Coûts (€)": "number",
	"Date Cloture": "Date"
}
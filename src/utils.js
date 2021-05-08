import { useAppStore } from "stores";
import * as moment from "moment"

export const scrollbarWidth = () => {
	const scrollDiv = document.createElement('div')
	scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;')
	document.body.appendChild(scrollDiv)
	const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
	document.body.removeChild(scrollDiv)
	return scrollbarWidth
}

export const hasRole = (user, roleName) => {
	if (user.username === "admin") {
		return true
	}
	let _hasRole = false
	user.roles.map((r, i) => {
		if (roleName === r.name) {
			_hasRole = true
		}
	})
	return _hasRole
}


export const _hasRole = (roleName) => {
	const { user } = useAppStore()
	if (user.username === "admin") {
		return true
	}
	let _hasRole = false
	user.roles.map((r, i) => {
		if (roleName === r.name) {
			_hasRole = true
		}
	})
	return _hasRole
}

export const months = [
	"JAN", "FEV", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOUT", "SEP", "OCT", "NOV", "DEC"
]
export const indicateurCastDate = (dateValue) => {
	let date = JSON.parse(dateValue)
	if (date.type == "month") {
		return date.year + "[" + months[date.value] + "]"
	}
	if (date.type == "quarter") {
		return date.year + "[" + "T" + date.value + "]"
	}
	if (date.type == "day") {
		return date.value
	}
	if (date.type == "week") {
		return date.year + "[" + "S" + date.value + "]"
	}
	return date.year
}

export const indicateurCastTypeDate = (type) => {
	if (type == "day") {
		return "Journalier"
	}
	if (type == "week") {
		return "Hebdomadaire"
	}
	if (type == "month") {
		return "Mensuelle"
	}
	if (type == "quarter") {
		return "Trimestriel"
	}
	if (type == "year") {
		return "Annuel"
	}
	return ""
}

export const getIndicateurEcart = (row) => {
	if (row.valeurs?.length !== 0) {
		const res = row?.valeurs[row.valeurs?.length - 1].valeur - row?.seuil
		if (row.indicateur_sueil == ">") {
			return res
		} else {
			return res * -1
		}
	} else {
		return null
	}
}

export const listProcessus = [
	{
		id: 1,
		value: "DIRECTION GENERALE"
	},
	{
		id: 2,
		value: "MQHSE"
	},
	{
		id: 3,
		value: "EXPLOITATION"
	},
	{
		id: 4,
		value: "MAINTENANCE"
	},
	{
		id: 5,
		value: "COMMERCIAL"
	},
	{
		id: 6,
		value: "ACHATS"
	},
	{
		id: 7,
		value: "RH"
	},
	{
		id: 8,
		value: "FINANCES ET COMPTABILITE"
	},
	{
		id: 9,
		value: "SYSTEME D'INFORMATION"
	}
]
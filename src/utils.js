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
		return "Mensuel"
	}
	if (type == "quarter") {
		return "Trimestriel"
	}
	if (type == "year") {
		return "Annuel"
	}
	return ""
}
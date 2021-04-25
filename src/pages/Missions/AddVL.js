import React from "react"
import { message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import * as moment from "moment"
import { useHistory } from "react-router-dom";
import SearchMultipleInput from "components/SearchMultipleInput"

export default function () {
	const { api, user } = useAppStore()
	window.api = api
	const history = useHistory()
	const add = (dataForm) => {
		dataForm["type"] = "VL"
		dataForm["date_bon_mission"] = dataForm["date_bon_mission"] ? dataForm["date_bon_mission"].format("yy-M-D") : null
		dataForm["date_depart_mission"] = dataForm["date_depart_mission"] ? dataForm["date_depart_mission"].format("yy-M-D") : null
		dataForm["date_arrivee_mission"] = dataForm["date_arrivee_mission"] ? dataForm["date_arrivee_mission"].format("yy-M-D") : null
		api.post("/missionvls", dataForm).then((res) => {
			message.info("Bien ajouter")
			history.push("/missions_vl")
		})
	}
	return (
		<Page title="Nouvelle mission VL">
			<FormBuilder
				formItems={[
					{
						name: "numero",
						label: "Numero bon commande",
						type: "text",
					},
					{
						name: "date_bon_mission",
						label: "Date d'effet(Bon commande)",
						rules: [{ required: true, message: _messages.required }],
						type: "date",
					},
					{
						name: "car_id",
						label: "Véhicule",
						type: "search",
						url: "cars/search",
						//	query_string: "groupe=leger",
						rules: [{ required: true, message: _messages.required }],
						defaultOptionName: "car",
						mapOptionToString: c => c?.matricule + " | " + c?.marque
					},
					{
						name: "client_id",
						label: "Client",
						type: "search",
						url: "clients/search",
						rules: [{ required: true, message: _messages.required }],
						defaultOptionName: "client",
						mapOptionToString: c => c?.designation
					},
					{
						name: "depart_id",
						label: "Départ",
						type: "search",
						url: "cities/search",
						rules: [{ required: true, message: _messages.required }],
						defaultOptionName: "depart",
						mapOptionToString: c => c?.wilaya_name + " - " + c?.daira_name + " - " + c?.commune_name
					},
					{
						name: "destinations",
						label: "Destination",
						type: "text",
						rules: [{ required: true, message: _messages.required }],
					},
					{
						name: "driver1_id",
						label: "Conducteur 1",
						type: "search",
						url: "drivers/search",
						rules: [{ required: true, message: _messages.required }],
						defaultOptionName: "driver1",
						mapOptionToString: c => c?.firstname + " " + c?.lastname + " | C/P: " + c?.code_paie
					},
					{
						name: "driver2_id",
						label: "Conducteur 2",
						type: "search",
						url: "drivers/search",
						defaultOptionName: "driver2",
						mapOptionToString: c => c?.firstname + " " + c?.lastname + " | C/P: " + c?.code_paie
					},
					{
						name: "date_depart_mission",
						label: "Date depart",
						rules: [{ required: true, message: _messages.required }],
						type: "date",
						disabledDate: (current, form) => current && current < form.getFieldValue("date_bon_mission")
					},
					{
						name: "date_arrivee_mission",
						label: "Date arrivée",
						rules: [{ required: true, message: _messages.required }],
						type: "date",
						disabledDate: (current, form) => current && current < form.getFieldValue("date_depart_mission")
					},
					{
						name: "Observation",
						label: "observation",
						type: "textarea",
					},
				]}
				initialValues={{
					date_bon_mission: moment(),
					date_depart_mission: moment(),
					depart_id: 1158,
					depart: {
						"id": 1158,
						"wilaya_name": "Bordj Bou Arreridj",
						"daira_name": "Bordj Bou Arreridj",
						"commune_name": "Bordj Bou Arreridj"
					}
				}}
				onFinish={add}
			/>
		</Page>
	)
}
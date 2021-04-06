import React, { useEffect, useState } from "react"
import { message } from 'antd';
import * as moment from "moment"

import Page from "components/Page"
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom"

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useRouteMatch } from "react-router-dom";

import { formItems } from "./columns"

export default function () {
	const { params } = useRouteMatch()
	const { api } = useAppStore()
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState({})
	const history = useHistory()

	const edit = (data) => {
		data["type"] = "VL"
		data["date_arrivee"] = data["date_arrivee"] ? data["date_arrivee"].format("yy-M-D") : moment().format("yy-M-D")
		data["date_arrivee_destination"] = data["date_arrivee_destination"] ? data["date_arrivee_destination"].format("yy-M-D") : moment().format("yy-M-D")
		data["date_arrivee_mission"] = data["date_arrivee_mission"] ? data["date_arrivee_mission"].format("yy-M-D") : null
		data["date_depart"] = data["date_depart"] ? data["date_depart"].format("yy-M-D") : moment().format("yy-M-D")
		data["date_depart_destination"] = data["date_depart_destination"] ? data["date_depart_destination"].format("yy-M-D") : moment().format("yy-M-D")
		data["date_depart_mission"] = data["date_depart_mission"] ? data["date_depart_mission"].format("yy-M-D") : moment().format("yy-M-D")
		data["date_bon_mission"] = data["date_bon_mission"] ? data["date_bon_mission"].format("yy-M-D") : moment().format("yy-M-D")

		api.put("/missionvls/" + params.id, data).then((res) => {
			message.info("Bien modifier")
			history.push("/missions_vl")
		})
	}

	useEffect(() => {
		api.get("/missionvls/" + params.id).then(({ data }) => {
			setData(data.data)
			setLoading(false)
		})
	}, [])

	return (
		<Page withBack={true} loading={loading} title="Modifie Mission VL" selectedSiderKey="list-drivers">
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
						query_string: "groupe=leger",
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
						name: "destination_id",
						label: "Destination",
						type: "search",
						url: "cities/search",
						rules: [{ required: true, message: _messages.required }],
						defaultOptionName: "destination",
						mapOptionToString: c => c?.wilaya_name + " - " + c?.daira_name + " - " + c?.commune_name
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
					...data,
					date_arrivee: moment(data["date_arrivee"]),
					date_arrivee_destination: moment(data["date_arrivee_destination"]),
					date_arrivee_mission: data["date_arrivee_mission"] ? moment(data["date_arrivee_mission"]) : null,
					date_bon_mission: moment(data["date_bon_mission"]),
					date_depart: moment(data["date_depart"]),
					date_depart_destination: moment(data["date_depart_destination"]),
					date_depart_mission: data["date_depart_mission"] ? moment(data["date_depart_mission"]) : null,
					created_at: moment(data["created_at"]),
					updated_at: moment(data["updated_at"]),
				}}
				onFinish={edit}
			/>
		</Page>
	)

}
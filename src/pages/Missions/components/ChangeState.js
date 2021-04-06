import React from "react"
import {
	Select,
	Spin
} from "antd"

import { useAppStore } from "stores"
export default ({ mission }) => {
	const [state, setState] = React.useState(mission.missionvls_state)
	const [loading, setLoading] = React.useState(false)
	const { api, user } = useAppStore()

	const _onChange = (value) => {
		setLoading(true)
		api.post("/missionvls/change_state/" + mission.id, { state: value })
			.then(() => {
				setState(value)
				setLoading(false)
			})
			.catch(() => {
				setLoading(false)
			})
	}
	if (loading) {
		return <Spin />
	}
	return (
		<Select onChange={_onChange} style={{ width: 120 }} placeholder="Selectioné" defaultValue={state} >
			<Select.Option value={"EN ATTENTE"}>EN ATTENTE</Select.Option>
			<Select.Option value={"EN COURS"}>EN COURS</Select.Option>
			<Select.Option value={"ANNULE"}>ANNULE</Select.Option>
			<Select.Option value={"FIN MISSION"}>FIN MISSION</Select.Option>
		</Select >
	)
}
import React, { useRef, useState, useEffect } from "react"
import { Divider, message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { _postes, _messages } from "_consts";

import PrintMission from "components/PrintMission";
import PrintRestitition from "components/PrintRestitition";
import { useReactToPrint } from "react-to-print";
import { useRouteMatch } from "react-router-dom";

import Print from "components/Print"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function () {
	const { api } = useAppStore()
	const { params } = useRouteMatch()
	const history = useHistory()
	const [mission, setMission] = useState({ step: 0 })

	useEffect(() => {
		api.get("missionvls/" + params.id).then((res) => {
			setMission(res.data.data)
		})
	}, [params])



	const printMission = useRef(null);
	const handlePrintMission = useReactToPrint({
		content: () => printMission.current,
		onBeforeGetContent: async () => { },
	});

	const printRestitition = useRef(null);
	const handlePrintRestitition = useReactToPrint({
		content: () => printRestitition.current,
		onBeforeGetContent: async () => { },
	});
	return (
		<Page withBack={true} loading={!mission} title={"Affiche mission n° " + params.id}>
			{
				mission.car &&
				<Print
					disabledDelete={true}
					component={
						<PrintMission mission={mission} />
					}
					onDelete={() => {
						api.post("missionvls/delete/" + mission.id).then(() => {
							history.push("/mission")
							message.info("Checklist est supprimer")
						})
					}}
				/>

			}
		</Page >
	)
}
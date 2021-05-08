import React from "react"
import { useAppStore } from "stores";
import {
	Tag,
	message,
	Popconfirm,
	Button,
	Divider,
	Statistic,
	Card,
	Row,
	Col,
	Spin,
	Typography,
	Collapse
} from "antd"

import {
	ArrowUpOutlined,
	ArrowDownOutlined
} from "@ant-design/icons"
import IndicateursvChart from "./components/IndicateursvChart";
import GaugeIndicateur from "./components/GaugeIndicateur";
import Page from "components/Page";
import ChartNatureActions from "./components/ChartNatureActions";
import ChartNatureNC from "./components/ChartNatureNC";

const { Panel } = Collapse;

const Indicateur = ({ indicateur }) => {
	const { api, user } = useAppStore()
	const [loading, setLoading] = React.useState(true)
	const [valeurs, setValeurs] = React.useState([])

	React.useEffect(() => {
		setLoading(true)
		api.get("smi_indicateurs/" + indicateur.id)
			.then((res) => {
				setValeurs(res?.data?.data?.data)
				//console.log(res.data.data.data)
				setLoading(false)
			})
	}, [indicateur])

	let lastValeur = null
	if (valeurs?.length >= 1) {
		lastValeur = valeurs[valeurs?.length - 1]
	}
	let beforeLastValeur = null
	if (valeurs?.length >= 2) {
		beforeLastValeur = valeurs[valeurs?.length - 2]
	}

	return (
		<IndicateursvChart valeurs={valeurs} loading={loading} beforeLastValeur={beforeLastValeur} lastValeur={lastValeur} indicateur={indicateur} />
	)
}

const Processu = ({ p }) => {
	return (
		<div >
			<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
				<ChartNatureActions p={p} />
				<ChartNatureNC p={p} />
			</div>
			<Divider>Indicateurs</Divider>
			<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} >
				{
					p?.indicateurs?.map((i) => (
						<Indicateur indicateur={i} />
					))
				}
			</div>
		</div>
	)
}

export default () => {
	const { api, user } = useAppStore()
	const [processus, setProcessus] = React.useState([])
	const [processusId, setProcessusId] = React.useState(
		Number.parseInt(localStorage.getItem("processu_id")) ? Number.parseInt(localStorage.getItem("processu_id")) - 1 : 0
	)
	React.useEffect(() => {
		api.get("smi_processus")
			.then((res) => {
				setProcessus(res.data.data)
			})
	}, [])

	return (
		<Page title="Tableau de board QHSE" >
			<Collapse defaultActiveKey={[processusId]}>

				{
					processus.map((p, index) => (
						<Panel header={p.name} key={index} extra={<div><b>{p.indicateurs.length}</b> INDICATEURS</div>}>
							<Processu p={p} />
						</Panel>
					))
				}
			</Collapse>
		</Page>
	)
}
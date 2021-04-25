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
		<Page >
			<GaugeIndicateur loading={loading} beforeLastValeur={beforeLastValeur} lastValeur={lastValeur} indicateur={indicateur} />
		</Page>
	)
}

const Processu = ({ p }) => {
	return (
		<Row gutter={18}>

			{
				p?.indicateurs?.map((i) => (
					<Indicateur indicateur={i} />
				))
			}
		</Row>
	)
}

export default () => {
	const { api, user } = useAppStore()
	const [processus, setProcessus] = React.useState([])

	React.useEffect(() => {
		api.get("smi_processus")
			.then((res) => {
				setProcessus(res.data.data)
			})
	}, [])

	return (
		<Page title="Tableau de board QHSE" >
			<Collapse defaultActiveKey={['0']}>
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
	return (
		<div>
			{
				processus.map((p) => (
					<>
						<Processu p={p} />
					</>
				))
			}
		</div>
	)
}
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
	Spin
} from "antd"

import {
	ArrowUpOutlined,
	ArrowDownOutlined
} from "@ant-design/icons"

const Indicateur = ({ i }) => {
	const { api, user } = useAppStore()
	const [loading, setLoading] = React.useState(true)
	const [valeurs, setValeurs] = React.useState([])

	React.useEffect(() => {
		setLoading(true)
		api.get("smi_indicateurs/" + i.id)
			.then((res) => {
				setValeurs(res.data.data.valeurs)
				setLoading(false)
			})
	}, [])

	let lastValeur = "-"
	if (valeurs?.length !== 0) {
		lastValeur = valeurs[valeurs?.length - 1].valeur
	}

	return (
		<Col span={6}>
			<Card>
				{
					!loading &&
					<Statistic
						title={i.name.toUpperCase()}
						value={lastValeur}
						valueStyle={{ color: lastValeur > i.seuil ? '#3f8600' : "red" }}
						prefix={lastValeur > i.seuil ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix={`/ ${i.seuil}`}
					/>
				}
				{
					loading && <Spin />
				}
			</Card>
		</Col>
	)
}

const Processu = ({ p }) => {
	return (
		<div>
			<Divider plain><b>{p?.slog}</b> | {p?.name}</Divider>
			<Row gutter={18}>

				{
					p?.indicateurs?.map((i) => (
						<Indicateur i={i} />
					))
				}
			</Row>
		</div>
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
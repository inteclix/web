import React from 'react';
import { TinyArea } from '@ant-design/charts';
import { indicateurCastDate } from "utils"
import { Card, Spin, Button } from 'antd';
import Text from 'antd/lib/typography/Text';

import {
	CheckCircleTwoTone,
	CloseCircleTwoTone
} from '@ant-design/icons';

import { getIndicateurEcart, indicateurCastTypeDate } from "utils"

import AddNonConformite from "./AddNonConformite";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default ({ indicateur, valeurs, loading }) => {
	const [data, setData] = React.useState([])
	React.useEffect(() => {
		const d = valeurs?.map((v) => {
			return {
				year: indicateurCastDate(v.date),
				value: v?.valeur
			}
		})
		setData(d)
	}, [valeurs])

	if (loading) {
		return (
			<Card title={indicateur?.name} style={{ width: 300, height: 180, margin: 5 }}  >
				<Spin style={{ alignSelf: "center" }} />
			</Card>
		);
	}
	if (valeurs.length == 0) {
		return (
			<Card title={indicateur?.name} style={{ width: 300, height: 180, margin: 5 }}  >
				Aucun valeur trouver
			</Card>
		)
	}
	const config = {
		height: 60,
		autoFit: true,
		data: valeurs.map(v => v.valeur),
		smooth: true,
	}

	const renderSeuil = () => {
		let ecart = getIndicateurEcart({ ...indicateur, valeurs });
		if (ecart == null) {
			return ""
		}
		ecart = ecart.toFixed(2)
		if (ecart >= 0) {
			return (
				<Button style={{ width: 80 }} type="text" block={true} title={ecart} icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} >{" " + ecart}</Button>
			)
		} else {
			return (
				<AddNonConformite
					indicateurv_id={valeurs[valeurs?.length - 1].id}
					reload={() => { }}
					addButton={(onClick) => (<Button style={{ width: 80 }} onClick={onClick} type="text" block={true} title={ecart} icon={<CloseCircleTwoTone twoToneColor="#ff5722" />} >{" " + ecart}</Button>)} />
			)
		}
	}
	return (
		<Card title={indicateur?.name} style={{ width: 300, height: 180, margin: 5 }} >
			<div style={{ borderBottom: "1px dashed lightgray", marginBottom: 5 }}>
				<TinyArea {...config} />
			</div>
			<Card.Meta
				title={<Link to={"/smi/qualite/indicateurs/" + indicateur.id}>{indicateurCastTypeDate(JSON.parse(valeurs[valeurs?.length - 1].date).type)} | {indicateurCastDate(valeurs[valeurs?.length - 1].date)} <b>: {valeurs[valeurs?.length - 1].valeur} {indicateur.mesure == "nombre" ? "" : indicateur.mesure}</b></Link>}
				description={
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
						<div >
							<Text>
								{`Critère de performance: ${indicateur.seuil} ${indicateur.mesure == "nombre" ? "" : indicateur.mesure}`}
							</Text>
						</div>
						{
							renderSeuil()
						}
					</div>
				}
			/>
		</Card>
	)
};
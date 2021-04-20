import React, { useEffect, useState } from 'react';
import { Drawer, Button, Tooltip, Tag, Popconfirm, message, Spin } from 'antd';
import { GiGps } from "react-icons/gi";
import * as moment from "moment"
import {
	EyeOutlined,
	PrinterOutlined,
	ToTopOutlined,
	DeleteOutlined,
	HistoryOutlined,
	EditOutlined,
	PlusOutlined
} from '@ant-design/icons';
import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useAppStore } from "stores";

import { Timeline, Radio } from 'antd';


export default ({ title, reload, mesure, indicateur_id }) => {
	const { api, user } = useAppStore()
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = React.useState(true)
	const [indicateur, setIndicateur] = React.useState(null)
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
		reload()
	};

	const getIndicateur = () => {
		setLoading(true)
		api.get("smi_indicateurs/" + indicateur_id)
			.then((res) => {
				setIndicateur(res.data.data)
				setLoading(false)
			})
	}

	React.useEffect(() => {
		//getIndicateur()
	}, [visible, indicateur])

	const renderValeur = (d) => {
		const date = JSON.parse(d.date)
		return (
			<div>
				<Tag color="blue">{date.year}</Tag>
				<Tag color="purple" >{date.value}</Tag>
				<Popconfirm
					title="Êtes-vous sûr de vouloir supprimer?"
					onConfirm={() => {
						api.post("/smi_indicateurvs/delete/" + d.id).then(() => { message.info("Bien Supprimé"); getIndicateur()})
					}}
					onCancel={() => { }}
					okText="Oui"
					cancelText="No"
				>
						<Button type="dashed" shape="circle" icon={<DeleteOutlined />} />
				</Popconfirm>
			</div>
		)
	}

	return (
		<>
			<Tooltip title="Historique des valeurs">
				<Button
					onClick={showDrawer}
					shape="circle" icon={<HistoryOutlined />} />
			</Tooltip>
			{
				visible &&
				<Drawer
					title={title}
					placement="right"
					closable={false}
					onClose={onClose}
					visible={visible}
					width={420}
					destroyOnClose={true}
					afterVisibleChange={getIndicateur}
				>
					{loading &&
						<div style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}>
							<Spin />
						</div>
					}
					<Timeline mode={"left"}>
						{
							indicateur?.valeurs.map((v) => (
								<Timeline.Item label={v?.valeur + " " + mesure}>{
									renderValeur(v)
								}</Timeline.Item>
							))
						}
					</Timeline>
				</Drawer>
			}
		</>
	);
};
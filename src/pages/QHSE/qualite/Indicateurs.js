import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm, Select, Form } from "antd";

import ProTable from "@ant-design/pro-table";
import {
	EyeOutlined,
	PrinterOutlined,
	ToTopOutlined,
	DeleteOutlined,
	HistoryOutlined,
	EditOutlined,
	PlusOutlined,
	InfoOutlined,
	CheckCircleTwoTone,
	CloseCircleTwoTone
} from '@ant-design/icons';
import { FaUserEdit, FaCheck, FaPaintBrush, FaInfo } from 'react-icons/fa';

import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";
import { hasRole, getIndicateurEcart } from "utils";
import AddObjetif from "./components/AddObjetif";
import AddIndicateur from "./components/AddIndicateur";
import AddIndicateurv from "./components/AddIndicateurv";
import HistoryIndicateurv from "./components/HistoryIndicateurv";
import { indicateurCastDate, indicateurCastTypeDate, listProcessus } from "utils"
import IndicateurInfo from "./components/IndicateurInfo";
import AddNonConformite from "./components/AddNonConformite";
const months = [
	"JAN",
	"FEV",
	"MAR",
	"AVR",
	"MAI",
	"JUN",
	"JUI",
	"AOUT",
	"SEP",
	"OCT",
	"NOV",
	"DEC"
]
const Item = Form.Item
export default () => {
	const { api, user } = useAppStore()
	const history = useHistory()
	const actionRef = React.useRef()
	const [processusId, setProcessusId] = React.useState(
		Number.parseInt(localStorage.getItem("processu_id")) ? Number.parseInt(localStorage.getItem("processu_id")) : 1
	)
	const columns = [
		{
			title: "Objectif",
			dataIndex: "objectif",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.objectif?.name
			}
		},
		{
			title: "Indicateur",
			dataIndex: "name",
			copyable: false,
			hideInSearch: false,
			sorter: true,
		},
		{
			title: "Critère de performance",
			dataIndex: "seuil",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return `${row?.indicateur_sueil} à ${row?.seuil} ${row?.mesure == "nombre" ? "" : row?.mesure}`
			}
		},
		{
			title: "Fréquence",
			dataIndex: "frequence",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return indicateurCastTypeDate(row.frequence)
			}

		},
		{
			title: "Résultat",
			dataIndex: "valeur",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				if (row.valeurs?.length !== 0) {
					return `${row?.valeurs[row.valeurs?.length - 1].valeur} ${row?.mesure == "nombre" ? "" : row?.mesure}`
				} else {
					return "-"
				}
			}
		},
		{
			title: "Date valeur",
			dataIndex: "date",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				if (row.valeurs?.length !== 0) {
					return indicateurCastDate(row?.valeurs[row.valeurs?.length - 1].date)
				} else {
					return "-"
				}
			}
		},
		{
			title: "Ecart",
			dataIndex: "valeur",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				let ecart = getIndicateurEcart(row);
				if (ecart == null) {
					return "Acucun valeur"
				}
				ecart = ecart.toFixed(2)
				if (ecart >= 0) {
					return (
						<Button type="text" block={true} title={ecart} icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} >{" " + ecart}</Button>
					)
				} else {
					return (
						<AddNonConformite
							indicateurv_id={row?.valeurs[row.valeurs?.length - 1].id}
							reload={() => { }}
							addButton={(onClick) => (<Button onClick={onClick} type="text" block={true} title={ecart} icon={<CloseCircleTwoTone twoToneColor="#ff5722" />} >{" " + ecart}</Button>)} />
					)
				}
			}
		},


		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [
				<IndicateurInfo indicateur={row} ><Button shape="circle" icon={<InfoOutlined />} /></IndicateurInfo>,
				<>
					{
						hasRole(user, "AJOUTER_VALEUR_INDICATEUR") &&
						<AddIndicateurv reload={() => action.reload()} title={row.name} frequence={row.frequence} indicateur_id={row.id} />
					}
				</>,
				//<HistoryIndicateurv reload={() => action.reload()} mesure={row?.mesure} indicateur_id={row.id} valeurs={row?.valeurs} title={"Historique des valeurs"} />,
				<Tooltip title="Historique des valeurs">
					<Button
						onClick={() => history.push("/smi/qualite/indicateurs/" + row.id)}
						shape="circle" icon={<HistoryOutlined />} />
				</Tooltip>,
				<>
					{
						hasRole(user, "SUPPRIMER_INDICATEUR") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir supprimer?"
							onConfirm={() => {
								api.post("/smi_indicateurs/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
							}}
							onCancel={() => { }}
							okText="Oui"
							cancelText="No"
						>
							<Tooltip title="Supprimer">
								<Button
									shape="circle" icon={<DeleteOutlined />} />
							</Tooltip>
						</Popconfirm>
					}
				</>,
			]
		}
	];



	return (
		<Page title="Indicateurs & valeurs">
			<div style={{ marginBottom: 15 }}>
				{
					hasRole(user, "AJOUTER_INDICATEUR") &&
					<AddIndicateur reload={() => actionRef.current.reload()} />
				}
			</div>
			<ProTable
				actionRef={actionRef}
				size="small"
				search={true}
				columns={columns}
				ellipsis={true}
				request={(params, sort, filters) => {
					if (sort) {
						params["sortBy"] = Object.keys(sort)[0]
						params["sort"] = Object.values(sort)[0]
					}
					if (filters) {
						params["filterBy"] = Object.keys(filters)[0]
						params["filter"] = Object.values(filters)
					}
					params["processu_id"] = processusId
					return api.get("/smi_indicateurs", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 5
				}}
				toolBarRender={(action) => [
					<div >
						<Item label="Processus" >
							<Select defaultValue={processusId} style={{ width: 220 }} onChange={(value) => {
								setProcessusId(value);
								localStorage.setItem("processu_id", value);
								action.reload()
							}}>
								{listProcessus.map(p => (
									<Select.Option value={p.id}>{p.value}</Select.Option>
								))}
							</Select>
						</Item>
					</div>
				]}
			/>
		</Page>
	)
}
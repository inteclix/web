import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm, Select, Tag } from "antd";

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
import { indicateurCastDate, indicateurCastTypeDate } from "utils"
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

export default () => {
	const { api, user } = useAppStore()
	const history = useHistory()
	const actionRef = React.useRef()
	const columns = [
		{
			title: "Processus",
			dataIndex: "processus",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.processu?.slog
			}
		},
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
			copyable: true,
			hideInSearch: false,
			sorter: true,
		},
		{
			title: "Critère de performance",
			dataIndex: "seuil",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.indicateur_sueil + " à " + row?.seuil + " " + row?.mesure
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
					return row?.valeurs[row.valeurs?.length - 1].valeur + " " + row?.mesure
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
				const ecart = getIndicateurEcart(row);
				if (!ecart) {
					return "Acucun valeur"
				}
				if (ecart > 0) {
					return (
						<Button type="text" block={true} title={ecart} icon={<CheckCircleTwoTone twoToneColor="#52c41a" />} >{" " + ecart}</Button>
					)
				} else {
					return (
						<AddNonConformite
							indicateurv_id={1}
							reload={() => { }}
							addButton={(onClick) => (<Button onClick={onClick} type="text" block={true} title={ecart} icon={<CloseCircleTwoTone twoToneColor="#ff5722" />} >{" " + ecart}</Button>)} />
					)
				}
			}
		},

		{
			title: "Date de la valeur",
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
		<Page title="Objectifs & indicateurs">
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
					return api.get("/smi_indicateurs", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 5
				}}
			/>
		</Page>
	)
}
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
	PlusOutlined
} from '@ant-design/icons';
import { FaUserEdit, FaCheck, FaPaintBrush, FaInfo } from 'react-icons/fa';

import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";
import { hasRole } from "utils";
import AddObjetif from "./components/AddObjetif";
import AddIndicateur from "./components/AddIndicateur";
import AddIndicateurv from "./components/AddIndicateurv";
import HistoryIndicateurv from "./components/HistoryIndicateurv";
import { indicateurCastDate, indicateurCastTypeDate } from "utils"
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
			title: "intitulé",
			dataIndex: "name",
			copyable: true,
			hideInSearch: false,
			sorter: true,
		},
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
			title: "Fréquence",
			dataIndex: "frequence",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return indicateurCastTypeDate(row.frequence)
			}
			
		},
		{
			title: "Date",
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
			title: "Valeur",
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
			title: "Critère de performance",
			dataIndex: "seuil",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.indicateur_sueil + " à " + row?.seuil + " " + row?.mesure
			}
		},
		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [

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
		<Page title="Liste des indicateurs">
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
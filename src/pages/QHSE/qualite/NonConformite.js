import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm, Select, Tag, Progress } from "antd";

import ProTable from "@ant-design/pro-table";
import {
	EyeOutlined,
	PrinterOutlined,
	ToTopOutlined,
	DeleteOutlined,
	HistoryOutlined,
	EditOutlined,
	PlusOutlined,
	InfoOutlined
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
import AddNonConformite from "./components/AddNonConformite";
import EditNonConformite from "./components/EditNonConformite";
import NonConformiteInfo from "./components/NonConformiteInfo";
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
			title: "ID",
			dataIndex: "id",
			hideInSearch: true,
			sorter: true,
		},
		{
			title: "intitulé",
			dataIndex: "name",
			copyable: true,
			hideInSearch: false,
			sorter: true,
		},
		{
			title: "Nature de la non-conformité",
			dataIndex: "nature",
			copyable: true,
			hideInSearch: true,
		},
		{
			title: "Libellé de la nature",
			dataIndex: "nature_label",
			copyable: true,
			hideInSearch: true
		},

		{
			title: "description",
			dataIndex: "Description",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.objectif?.name
			}
		},
		{
			title: "Date non-conformité",
			dataIndex: "date",
			sorter: true,
			hideInSearch: true,
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
			title: "Avancement",
			dataIndex: "avancement",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return <Progress steps={5} percent={row?.avancement} />
			}
		},
		{
			title: "Cree par",
			dataIndex: "createdby",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.createdby?.username
			}
		},


		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [
				<NonConformiteInfo nonconformite={row} ><Button shape="circle" icon={<InfoOutlined />} /></NonConformiteInfo>,
				<>
					{
						hasRole(user, "EDIT_NON_CONFORMITE") &&
						<EditNonConformite reload={() => action.reload()} title={row.name} frequence={row.frequence} indicateur_id={row.id} row={row} />
					}
				</>,
				<>
					{
						hasRole(user, "SUPPRIMER_INDICATEUR") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir supprimer?"
							onConfirm={() => {
								api.post("/smi_conformites/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
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
		<Page title="Liste des non-conformités">
			<div style={{ marginBottom: 15 }}>
				{
					hasRole(user, "AJOUTER_INDICATEUR") &&
					<AddNonConformite reload={() => actionRef.current.reload()} />
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
					return api.get("/smi_conformites", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 5
				}}
			/>
		</Page>
	)
}
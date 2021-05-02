import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm, Progress, Tag, Typography } from "antd";

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
import IndicateurInfo from "./components/IndicateurInfo";
import EditAction from "./components/EditAction";
import AddAction from "./components/AddAction";
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
			title: "Intitulé",
			dataIndex: "actions_name",
			copyable: true,
			hideInSearch: false,
			sorter: true,
		},
		{
			title: "Processus",
			dataIndex: "processus_slog",
			hideInSearch: true,
			sorter: true,
		},
		{
			title: "Type",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row.conformites_name ?
					<Tooltip title={"NC: " + row?.conformites_name}>
						<Tag color="blue">AC</Tag>
					</Tooltip>
					:
					<Tag color="green">AA</Tag>
			}
		},
		{
			title: "Date echeance",
			dataIndex: "actions_date_echeance",
			sorter: true,
			hideInSearch: true,
		},
		{
			title: "Responsables",
			dataIndex: "actions_users",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return JSON.parse(row?.actions_users)?.map((a, i) => (
					<Tag>{a}</Tag>
				))
			}
		},
		{
			title: "Avancement",
			dataIndex: "actions_avancement",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return <Progress steps={5} percent={row?.actions_avancement} />
			}
		},
		{
			title: "Cree par",
			dataIndex: "createdbys_username",
			hideInSearch: true,
		},
		{
			title: "Accepter par",
			dataIndex: "acceptedbys_username",
			hideInSearch: true,
		},
		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [
				<>
					{
						hasRole(user, "SMI_EDIT_ACTION") &&
						<EditAction row={row} reload={() => action.reload()} title={row.name} />
					}
				</>,
				<>
					{
						hasRole(user, "SMI_VALIDER_ACTION") &&
						<Popconfirm
							title="Elle est efficase?"
							onConfirm={() => {
								api.post("/smi_actions/accepte/" + row.id).then(() => { message.info("Bien ajouter"); action.reload(); })
							}}
							onCancel={() => { }}
							okText="Oui"
							cancelText="No"
						>
							<Button
								shape="circle" icon={<FaCheck />} />
						</Popconfirm>
					}
				</>,
				<>
					{
						hasRole(user, "SMI_SUPPRIMER_ACTION") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir supprimer?"
							onConfirm={() => {
								api.post("/smi_actions/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
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
		<Page title="AC & AA">
			<div style={{ marginBottom: 15 }}>
				{
					hasRole(user, "AJOUTER_INDICATEUR") &&
					<AddAction reload={() => actionRef.current.reload()} />
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
					return api.get("/smi_actions", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 5
				}}
			/>
		</Page>
	)
}
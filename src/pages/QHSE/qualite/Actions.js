import * as React from "react";
import moment from "moment";
import {
	Button,
	Tooltip,
	message,
	Popconfirm,
	Progress,
	Tag,
	Typography,
	Select,
	Form
} from "antd";

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
import { hasRole, listProcessus } from "utils";
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
const Item = Form.Item
export default () => {
	const { api, user } = useAppStore()
	const history = useHistory()
	const [processusId, setProcessusId] = React.useState(
		Number.parseInt(localStorage.getItem("processu_id")) ? Number.parseInt(localStorage.getItem("processu_id")) : 1
	)
	const actionRef = React.useRef()
	window.actio = actionRef
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
			title: "Type",
			dataIndex: "actions_type",
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row.conformites_name ?
					<Tooltip title={"NC: " + row?.conformites_name}>
						<Tag color="blue">AC</Tag>
					</Tooltip>
					:
					<Tag color="green">AA</Tag>
			},
			filters: [
				{ text: 'AC', value: 'AC' },
				{ text: 'AA', value: 'AA' },
			]
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
			},
			filters: [
				{ text: 'En cours', value: 'en_cours' },
				{ text: 'Réalisé', value: 'realise' },
			]
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
					hasRole(user, "SMI_AJOUTER_ACTION") &&
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
					console.log(filters)
					if (filters) {
					//	params["filterBy"] = Object.keys(filters)[0]
					//	params["filter"] = Object.values(filters)
					}
					params["filters"] = JSON.stringify(filters)
					params["processu_id"] = processusId
					return api.get("/smi_actions", { params }).then((res) => res.data)
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
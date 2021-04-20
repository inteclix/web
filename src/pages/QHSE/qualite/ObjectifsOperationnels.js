import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm, Select } from "antd";

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

export default () => {
	const { api, user } = useAppStore()
	const history = useHistory()
	const actionRef = React.useRef()

	const columns = [
		{
			title: "intitulée",
			dataIndex: "name",
			copyable: true,
			hideInSearch: false,
			sorter: true,
		},
		{
			title: "Axe",
			dataIndex: "axe.slog",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row?.axe?.slog
			}
		},
		{
			title: "Processus",
			dataIndex: "processus",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				let pTexts = ""
				row?.processus.map(p => {
					pTexts += p.slog + ", "
				})
				return pTexts
			}
		},
		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [
				<>
					{
						hasRole(user, "SUPPRIMER_OBJECTIF_OP") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir supprimer?"
							onConfirm={() => {
								api.post("/smi_objectifs/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
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
		<Page title="Liste des objectifs opérationnels">
			{
				hasRole(user, "AJOUTER_OBJECTIF_OP") &&
				<div style={{ marginBottom: 15 }}>
					<AddObjetif />
				</div>
			}
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
					return api.get("/smi_objectis", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 10
				}}
			/>
		</Page>
	)
}
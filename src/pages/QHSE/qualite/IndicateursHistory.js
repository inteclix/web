import React from "react"


import {
	useRouteMatch,
	useHistory
} from "react-router-dom"
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
import { Button, Tooltip, message, Popconfirm, Select, Tag } from "antd";

import Page from "components/Page"

import { useAppStore } from "stores"
import { Spin } from "antd"

import IndicateursvChart from "./components/IndicateursvChart"
import { indicateurCastDate, indicateurCastTypeDate, hasRole } from "utils"

export default () => {
	const history = useHistory()
	const { params } = useRouteMatch()
	const { api, user } = useAppStore()
	const [data, setData] = React.useState(null)
	const [loading, setLoading] = React.useState(true)

	const actionRef = React.useRef()
	const columns = [
		{
			title: "Date",
			dataIndex: "date",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return indicateurCastDate(row.date)
			}
		},
		{
			title: "Valeur",
			dataIndex: "valeur",
			sorter: true,
			hideInSearch: true,
		},
		{
			title: "Comment",
			dataIndex: "comment",
			sorter: true,
			hideInSearch: true,

		},
		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [
				//<HistoryIndicateurv reload={() => action.reload()} mesure={row?.mesure} indicateur_id={row.id} valeurs={row?.valeurs} title={"Historique des valeurs"} />,
				<>
					{
						hasRole(user, "SUPPRIMER_INDICATEURV") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir supprimer?"
							onConfirm={() => {
								api.post("/smi_indicateurvs/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
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
		<Page withBack={true} title={"Historique des valeurs"} >
			{data &&
				<div style={{ height: 120 }}>
					<IndicateursvChart valeurs={data} />
				</div>}
			<div>
				<ProTable
					actionRef={actionRef}
					size="small"
					search={true}
					columns={columns}
					ellipsis={true}
					request={(p, sort, filters) => {
						if (sort) {
							p["sortBy"] = Object.keys(sort)[0]
							p["sort"] = Object.values(sort)[0]
						}
						if (filters) {
							p["filterBy"] = Object.keys(filters)[0]
							p["filter"] = Object.values(filters)
						}
						return api.get("/smi_indicateurs/" + params.id, { params: p }).then((res) => {
							console.log(res.data.data.data)
							setData(res.data.data.data)
							return res.data.data
						})
					}}
					pagination={{
						defaultCurrent: 1,
						pageSize: 5
					}}
				/>
			</div>
		</Page>
	)
}
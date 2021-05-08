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
	PlusOutlined,
	CloseOutlined
} from '@ant-design/icons';
import { Button, Tooltip, message, Popconfirm, Select, Tag } from "antd";

import Page from "components/Page"

import { useAppStore } from "stores"
import { Spin, Input } from "antd"

import IndicateurValeursChart from "./components/IndicateurValeursChart"
import { indicateurCastDate, indicateurCastTypeDate, hasRole } from "utils"

const ChangeValuerIndicateur = ({ row, onSuccess }) => {
	const [isEdit, setIsEdit] = React.useState(false)
	const [value, setValue] = React.useState(row.valeur)
	const { api } = useAppStore()
	if (isEdit) {
		return (
			<Input
				style={{ width: "auto" }}
				type="number"
				onChange={e => setValue(e.target.value)}
				value={value}
				onPressEnter={() => {
					api.post("/smi_indicateurvs/update/" + row.id, { valeur: value })
						.then((res) => {
							setIsEdit(false);
							onSuccess()
						})
				}}
				suffix={<CloseOutlined onClick={()=>setIsEdit(false)} />}
			/>
		)
	}
	return (
		<div onDoubleClick={() => setIsEdit(true)} >
			{row.valeur}
		</div>
	)
}

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
			render: (text, row, index, action) => (<ChangeValuerIndicateur onSuccess={action.reload} row={row} />)
		},
		{
			title: "Observation",
			dataIndex: "comment",
			sorter: true,
			hideInSearch: true,

		},
		{
			title: "Cree par",
			dataIndex: "createdbys_username",
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
					<IndicateurValeursChart valeurs={data.data} />
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
							console.log(res.data.data)
							setData(res.data.data)
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
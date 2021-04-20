import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm, DatePicker } from "antd";

import ProTable from "@ant-design/pro-table";
import {
	EyeOutlined,
	ToTopOutlined,
	DeleteOutlined,
	HistoryOutlined,
	EditOutlined
} from '@ant-design/icons';
import { FaUserEdit, FaCheck } from 'react-icons/fa';
import { RiFileExcel2Line } from "react-icons/ri";

import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";
import { hasRole } from "utils";

export default function () {
	const { api, user } = useAppStore()
	const history = useHistory()
	const actionRef = React.useRef()
	const [date1, setDate1] = React.useState(moment().startOf('month'))
	const [date2, setDate2] = React.useState(moment())
	const columns = [
		{
			title: "Matricule",
			dataIndex: "cars_matricule",
			copyable: true,
			sorter: true,
		},
		{
			title: "Code GPS",
			dataIndex: "cars_code_gps",
			sorter: true,
			hideInSearch: false
		},
		{
			title: "Client",
			dataIndex: "clients_designation",
			copyable: true,
			sorter: true,
			hideInSearch: false,
			render: (text, row, index, action) => {
				if (row.clients_mother_designation) {
					return row.clients_designation + " / " + row.clients_mother_designation

				} else {
					return row.clients_designation
				}
			}
		},
		{
			title: "Date Décharge",
			dataIndex: "decharges_date_decharge",
			sorter: true,
			hideInSearch: true
		},
		{
			title: "Date Fin Prestation",
			dataIndex: "decharges_date_fin_prestation",
			sorter: true,
			hideInSearch: true
		},
		{
			title: "Date restitution",
			dataIndex: "restititions_date_restitition",
			sorter: true,
			hideInSearch: true
		},
		{
			title: "Cree par",
			dataIndex: "createdby_username",
			sorter: true,
			hideInSearch: true
		},
		{
			title: "Valider par",
			dataIndex: "acceptedby_username",
			sorter: true,
			hideInSearch: true
		},
		{
			title: "option",
			valueType: "option",
			dataIndex: "id",
			render: (text, row, index, action) => [
				<Tooltip title="Afficher">
					<Button
						onClick={() => {
							history.push("/decharges/show/" + row.id)
						}}
						shape="circle" icon={<EyeOutlined />} />
				</Tooltip>,
			]
		}
	];
	return (
		<Page title={"Mise à disposition VL"}>
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
					params["date1"] = date1 ? date1.format("yy-M-D") : moment().format("yy-M-D")
					params["date2"] = date2 ? date2.format("yy-M-D") : moment().format("yy-M-D")
					params["format"] = "json"
					return api.get("/mise_disposition_vl", { params }).then((res) => res.data)
				}}
				toolBarRender={(action) => [
					<div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
						<DatePicker
							placeholder="date1"
							format="DD/MM/YYYY"
							onChange={(value) => { setDate1(value); action.reload() }}
							value={date1}
							style={{ width: "100%" }}
						/>
						<DatePicker
							placeholder="date2"
							format="DD/MM/YYYY"
							onChange={(value) => { setDate2(value); action.reload() }}
							value={date2}
							style={{ width: "100%" }}
						/>

					</div>,
					<div style={{ cursor: "pointer", "marginTop": 7 }} >
						<RiFileExcel2Line
							size={20}
							onClick={() => {
								const d1 = date1 ? date1.format("yy-M-D") : moment().format("yy-M-D")
								const d2 = date2 ? date2.format("yy-M-D") : moment().format("yy-M-D")
								api.get(`/mise_disposition_vl?format=excel&date1=${d1}&date2=${d2}`,
									{
										responseType: 'blob',
										headers: {
											'Content-Disposition': `attachment; filename=etat_vehicules.xlsx`,
											'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
										}
									}
								).then((res) => {
									const url = window.URL.createObjectURL(new Blob([res.data]));
									const link = document.createElement('a');
									link.href = url;
									link.setAttribute('download', 'etat_vehicules_' + moment().format("DD_MM_YYYY__HH_MM") + '.xlsx');
									document.body.appendChild(link);
									link.click();
								})
							}}
						/>
					</div>
				]}
				pagination={{
					defaultCurrent: 1,
					pageSize: 10
				}}
			/>
		</Page>
	);
}


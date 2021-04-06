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
	EditOutlined
} from '@ant-design/icons';
import { FaUserEdit, FaCheck, FaPaintBrush, FaInfo } from 'react-icons/fa';
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";
import { hasRole } from "utils";
import ChangeState from "./components/ChangeState"
import CalcGPS from "./components/CalcGPS"

export default function () {
	const { api, user } = useAppStore()
	const history = useHistory()
	const actionRef = React.useRef()
	window.actionRef = actionRef
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
			title: "Conducteur",
			dataIndex: "driver1s_fullname",
			copyable: true,
			sorter: true,
			hideInSearch: true
		},
		{
			title: "Depart",
			dataIndex: "driver1s_fullname",
			copyable: true,
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row.departs_wilaya_name
			}
		},
		{
			title: "Destinations",
			dataIndex: "driver1s_fullname",
			copyable: true,
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => {
				return row.destinations_wilaya_name
			}
		},
		{
			title: "Date départ",
			dataIndex: "missions_date_depart_mission",
			sorter: true,
			hideInSearch: true
		},
		{
			title: "Date arrivee",
			dataIndex: "missions_date_arrivee_mission",
			sorter: true,
			hideInSearch: true,
		},
		{
			title: "Status",
			dataIndex: "missionvls_state",
			sorter: true,
			hideInSearch: true,
			render: (text, row, index, action) => (<ChangeState mission={row} />)
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
			title: "GPS par",
			dataIndex: "gpsby_username",
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
							history.push("/missions_vl/show/" + row.id)
						}}
						shape="circle" icon={<PrinterOutlined />} />
				</Tooltip>,
				<>
					{
						hasRole(user, "MODIFIER_GPS_MISSION_VL") &&
						<CalcGPS />
					}
				</>,
				<>
					{hasRole(user, "VALIDER_MISSION_VL") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir valider?"
							onConfirm={() => {
								api.post("/missionvls/accepte/" + row.id).then(() => {
									message.success("Mission validée!")
									actionRef.current.reload()
								})
							}}
							onCancel={() => { }}
							okText="Oui"
							cancelText="No"
							disabled={row.acceptedby_username}
						>
							<Tooltip title="Valider">
								<Button
									disabled={row.acceptedby_username}
									shape="circle" icon={<FaCheck />} />
							</Tooltip>
						</Popconfirm>
					}
				</>,
				<>
					{hasRole(user, "MODIFIER_MISSION_VL") &&
						<Tooltip title="Modifier">
							<Button
								onClick={() => {
									history.push("/missions_vl/edit/" + row.id)
								}}
								shape="circle" icon={<EditOutlined />} />
						</Tooltip>
					}
				</>,
				<>
					{
						hasRole(user, "SUPPRIMER_MISSION_VL") &&
						<Popconfirm
							title="Êtes-vous sûr de vouloir supprimer?"
							onConfirm={() => {
								api.post("/missionvls/delete/" + row.id).then(() => {
									message.info("Bien Supprimé"); action.reload();
								})
							}}
							onCancel={() => { }}
							okText="Oui"
							cancelText="No"
						>
							<Button
								shape="circle" icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					}
				</>

			]
		}
	];
	return (
		<Page title={"Missions VL"} selectedSiderKey="list-cars">
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
					return api.get("/missionvls", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 10
				}}
			/>
		</Page>
	);
}


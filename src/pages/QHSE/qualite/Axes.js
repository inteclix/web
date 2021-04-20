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

export default () => {
	const { api, user } = useAppStore()
	const history = useHistory()
	const actionRef = React.useRef()

	const columns = [
		{
			title: "ID",
			dataIndex: "id",
		},
		{
			title: "intitulée",
			dataIndex: "name",
			copyable: true,
			sorter: true,
		},
		{
			title: "Slog",
			dataIndex: "slog",
			sorter: true,
			copyable: true,
			hideInSearch: false
		}
	];
	return (
		<Page title="Liste des axes stratigique">
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
					return api.get("/smi_axes", { params }).then((res) => res.data)
				}}
				pagination={{
					defaultCurrent: 1,
					pageSize: 10
				}}
			/>
		</Page>
	)
}
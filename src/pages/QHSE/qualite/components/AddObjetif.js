import React, { useEffect, useState } from 'react';
import { Drawer, Button, Tooltip, message } from 'antd';
import { GiGps } from "react-icons/gi";

import {
	EyeOutlined,
	PrinterOutlined,
	ToTopOutlined,
	DeleteOutlined,
	HistoryOutlined,
	EditOutlined,
	PlusOutlined
} from '@ant-design/icons';
import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useAppStore } from "stores";

export default () => {
	const { api, user } = useAppStore()
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

	React.useEffect(() => {

	}, [visible])

	const add = (dataForm) => {
		dataForm["processu_ids"] = dataForm["processu_ids"].map(o => o.id)
		api.post("/smi_objectifs", dataForm).then((res) => { message.info("Bien ajouter"); onClose(); })
		//console.log(dataForm)
	}
	return (
		<>
			<Tooltip title="Nouvel élément">
				<Button onClick={showDrawer} icon={<PlusOutlined />}>Nouvel élément</Button>
			</Tooltip>
			<Drawer
				title="Objectif opérationnel"
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
				width={420}
			>

				<FormBuilder
					full
					formItems={[
						{
							name: "name",
							label: "intitulée",
							type: "textarea",
						},
						{
							name: "axe_id",
							label: "Axe",
							type: "search",
							url: "smi_axes/search",
							rules: [{ required: true, message: _messages.required }],
							defaultOptionName: "axe",
							mapOptionToString: c => c?.slog + " | " + c?.name
						},
						{
							name: "processu_ids",
							optionLabelProp: "slog",
							label: "Processus",
							type: "debounceSelect",
							url: "smi_processus/search",
							rules: [{ required: true, message: _messages.required }],
							defaultOptionName: "processu",
							mapOptionToString: c => c?.slog
						}
					]}
					initialValues={{

					}}
					onFinish={add}
				/>
			</Drawer>
		</>
	);
};
import React, { useEffect, useState } from 'react';
import { Drawer, Button, Tooltip, message } from 'antd';
import { GiGps } from "react-icons/gi";
import * as moment from "moment"
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

export default ({ title, reload, indicateur_id, frequence }) => {
	const { api, user } = useAppStore()
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
		reload()
	};

	React.useEffect(() => {

	}, [visible])

	const add = (dataForm) => {
		if (!dataForm["date"]) {
			return
		}
		dataForm["indicateur_id"] = indicateur_id
		if (frequence == "day") {
			dataForm["date"] = {
				value: dataForm["date"].format("yy-M-D"),
				type: "day",
				year: dataForm["date"].year()
			}
		}
		if (frequence == "week") {
			dataForm["date"] = {
				value: dataForm["date"].week(),
				type: "week",
				year: dataForm["date"].year()
			}
		}
		if (frequence == "month") {
			dataForm["date"] = {
				value: dataForm["date"].month(),
				type: "month",
				year: dataForm["date"].year()
			}
		}
		if (frequence == "quarter") {
			dataForm["date"] = {
				value: dataForm["date"].quarter(),
				type: "quarter",
				year: dataForm["date"].year()
			}
		}
		if (frequence == "year") {
			dataForm["date"] = {
				value: dataForm["date"].year(),
				type: "year",
				year: dataForm["date"].year()
			}
		}
		dataForm["date"] = JSON.stringify(dataForm["date"])
		api.post("/smi_indicateurs/create_valeur", dataForm).then((res) => { message.info("Bien ajouter"); onClose(); reload() })
		//console.log(dataForm)
	}

	let type = "date"
	if (frequence == "week") {
		type = "date_picker_week"
	}
	if (frequence == "month") {
		type = "date_picker_month"
	}
	if (frequence == "quarter") {
		type = "date_picker_quarter"
	}
	if (frequence == "year") {
		type = "date_picker_year"
	}

	return (
		<>
			<Tooltip title="Ajouter une valeur">
				<Button
					onClick={showDrawer}
					shape="circle" icon={<PlusOutlined />}
				/>
			</Tooltip>
			{
				visible &&
				<Drawer
					title={title}
					placement="right"
					closable={false}
					onClose={onClose}
					visible={visible}
					width={420}
					destroyOnClose={true}
				>

					<FormBuilder
						full
						formItems={[
							{
								name: "date",
								label: "Date",
								type: type,
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "valeur",
								label: "Valeur",
								type: "number",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "comment",
								label: "Commentaire",
								type: "textarea",
							}
						]}
						initialValues={{

						}}
						onFinish={add}
					/>
				</Drawer>
			}
		</>
	);
};
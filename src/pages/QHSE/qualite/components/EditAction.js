import React, { useEffect, useState } from 'react';
import { Drawer, Button, Tooltip, message, Form, Divider, Progress, Typography } from 'antd';
import { GiGps } from "react-icons/gi";
import * as moment from "moment"
import {
	EyeOutlined,
	PrinterOutlined,
	ToTopOutlined,
	DeleteOutlined,
	HistoryOutlined,
	EditOutlined,
	PlusOutlined,
	MinusCircleOutlined,
	InfoCircleOutlined
} from '@ant-design/icons';
import { FormBuilder, renderItem } from "components/UIBuilder"
import { _postes, _messages } from "_consts";
import { useAppStore } from "stores";
import TextArea from 'antd/lib/input/TextArea';


const Text = Typography.Text
export default ({ title, reload, indicateur_id, frequence, row }) => {
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

	const postData = (dataForm) => {

		api.post("/smi_actions/correcte/" + row.id, dataForm).then((res) => {
			message.info("Bien ajouter")
			//onClose();
			//reload()
		})
	}
	const add = (dataForm) => {
		if (dataForm["avancement"] == 100 && dataForm["date_cloture"]) {
			dataForm["date_cloture"] = dataForm["date_cloture"].format("yy-M-D")
			console.log("post data with date_cloture and avancemetn 100")
			return postData(dataForm)
		}
		if (!dataForm["date_cloture"] && dataForm["avancement"] != 100 && dataForm["avancement"] != 0) {
			dataForm["date_cloture"] = null
			console.log("post data with date_cloture of null")
			return postData(dataForm)
		}
		message.warn("Error !")
	}



	return (
		<>
			<Tooltip title="TRAITEMENT ACTION">
				<Button
					onClick={showDrawer}
					shape="circle" icon={<EditOutlined />}
				/>
			</Tooltip>
			{
				visible &&
				<Drawer
					title={"TRAITEMENT ACTION"}
					placement="right"
					closable={false}
					onClose={onClose}
					visible={visible}
					width={"50%"}
					destroyOnClose={true}
				>

					<FormBuilder
						full
						formItems={[
							{
								name: "avancement",
								label: "Avancement",
								type: "progress",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "date_cloture",
								label: "Date cloture",
								type: "date",
							},
							{
								name: "observation",
								label: "Observation",
								type: "textarea",
							},
							{
								name: "state",
								label: "Etat de action",
								type: "select",
								selects: [
									{
										label: "Anullée", value: "Anullée"
									}
								]
							},
						]}
						initialValues={{
							date_cloture: row?.date_cloture ? moment(row?.date_cloture) : null,
							avancement: row?.avancement,
							observation: row?.observation
						}}
						onFinish={add}
					/>
				</Drawer>
			}
		</>
	);
};
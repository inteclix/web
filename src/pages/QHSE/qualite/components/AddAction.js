import React, { useEffect, useState } from 'react';
import { Drawer, Button, Tooltip, message, Form, Divider, Progress, Select, Typography } from 'antd';
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

		api.post("/smi_actions/", dataForm).then((res) => {
			message.info("Bien ajouter")
			onClose();
			reload()
		})
	}
	const add = (dataForm) => {
		dataForm["echeance"] = dataForm["echeance"] ? dataForm["echeance"].format("yy-M-D") : moment().format("yy-M-D")
		return postData(dataForm)
	}



	return (
		<>
			<Tooltip title="AJOUTER ACTION">
				<Button
					onClick={showDrawer}
					icon={<PlusOutlined />}
				>Ajouter</Button>
			</Tooltip>
			{
				visible &&
				<Drawer
					title={"AJOUTER ACTION"}
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
								name: "processu_id",
								optionLabelProp: "slog",
								label: "Processus",
								type: "search",
								url: "smi_processus/search",
								rules: [{ required: true, message: _messages.required }],
								defaultOptionName: "processu",
								mapOptionToString: c => c?.slog
							},
							{
								name: "action",
								label: "Intitulé",
								type: "textarea",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "conformite_id",
								label: "Non-conformité (AC)",
								type: "search",
								url: "smi_conformites/search",
								defaultOptionName: "conformite",
								mapOptionToString: c => c?.name
							},
							{
								name: "echeance",
								label: "Date echeance",
								type: "date",
							},
							{
								type: "selectmultiple",
								name: "users",
								label: "Responsables",
							},
						]}
						initialValues={{
							echeance: row?.date_cloture ? moment(row?.date_cloture) : null,
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
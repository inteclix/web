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
import moment from 'moment';

export default ({ reload, addButton, indicateurv_id }) => {
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
		dataForm["indicateurv_id"] = indicateurv_id
		dataForm["date_prevu"] = dataForm["date_prevu"] ? dataForm["date_prevu"].format("yy-M-D") : moment().format("yy-M-D")
		dataForm["date"] = dataForm["date"] ? dataForm["date"].format("yy-M-D") : moment().format("yy-M-D")
		api.post("/smi_conformites", dataForm).then((res) => { message.info("Bien ajouter"); onClose(); reload() })
		//console.log(dataForm)
	}
	window.addButton = addButton
	return (
		<>
			<Tooltip title="Ajouter non-conformité">
				{
					addButton &&
					addButton(showDrawer)
				}
				{
					!addButton &&
					<Button onClick={showDrawer} icon={<PlusOutlined />}>Ajouter</Button>
				}
			</Tooltip>
			{
				visible &&
				<Drawer
					title="Non Conformité"
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
								name: "name",
								label: "intitulé",
								type: "text",
							},
							{
								name: "nature",
								label: "Nature de la non-conformité",
								type: "select",
								selects: [
									{ label: "Produit/service acheté", value: "Produit/service achete" },
									{ label: "Reclamation client", value: "Reclamation client" },
									{ label: "Plainte", value: "Plainte" },
									{ label: "Accident/incident", value: "Accident/incident" },
									{ label: "Impact environnemental", value: "Impact environnemental" },
									{ label: "Non atteinte d'un objectif", value: "Non atteinte d'un objectif" },
									{ label: "Inspection", value: "Inspection" },
									{ label: "Règlementation", value: "Reglementation" },
									{ label: "Autres", value: "Autres" },
								],
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "nature_label",
								label: "Libellé de la nature",
								type: "text",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "date",
								label: "Date non-conformité",
								type: "date",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "description",
								label: "Description",
								type: "textarea",
								rules: [{ required: true, message: _messages.required }],
							},
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
								name: "domaine",
								label: "Domaine",
								type: "selectmultiple",
								selects: [
									{ label: "Qualité", value: "qualite" },
									{ label: "Environnement", value: "environnement" },
									{ label: "Santé & Securité", value: "sante" },
								],
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "date_prevu",
								label: "Délais prévu",
								type: "date",
								//disabledDate: (current, form) => current && current < form.getFieldValue("date"),
								rules: [{ required: true, message: _messages.required }],
							},
						]}
						initialValues={{
							date: moment(),
							date_prevu: moment()
						}}
						onFinish={add}
					/>
				</Drawer>
			}
		</>
	);
};
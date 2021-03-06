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

export default ({ reload }) => {
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
		dataForm["type"] = dataForm["type"] ? 1 : 0
		dataForm["domaine"] = "qualite"
		api.post("/smi_indicateurs", dataForm).then((res) => { message.info("Bien ajouter"); onClose(); reload() })
		//console.log(dataForm)
	}
	return (
		<>
			<Tooltip title="Nouvel élément">
				<Button onClick={showDrawer} icon={<PlusOutlined />}>Ajouter</Button>
			</Tooltip>
			{
				visible &&
				<Drawer
					title="Indicateur"
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
								type: "textarea",
							},
							{
								name: "objectif_id",
								optionLabelProp: "slog",
								label: "Objectif operationnel",
								type: "search",
								url: "smi_objectifs/search",
								rules: [{ required: true, message: _messages.required }],
								defaultOptionName: "objectif",
								mapOptionToString: c => c?.name
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
								type: "selectmultipless",
								selects: [
									{ label: "Qualité", value: "qualite" },
									{ label: "Environnement", value: "environnement" },
									{ label: "Santé & Securité", value: "sante" },
								],
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "description",
								label: "Description",
								type: "text",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "type",
								label: "intra processus",
								type: "boolean",
								unCheckedChildren: "Intra processus",
								checkedChildren: "Exta processus",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "mesure",
								label: "Unité de mesure",
								type: "select",
								selects: [
									{ label: "Heures", value: "heures" },
									{ label: "Jours", value: "jours" },
									{ label: "Nombre", value: "nombre" },
									{ label: "Dinars", value: "dinars" },
									{ label: "%", value: "%" }
								],
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "seuil",
								label: "Critère de performance",
								type: "number",
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "indicateur_sueil",
								label: "Sens indicateur / Critère de performance",
								type: "select",
								selects: [
									{ label: ">", value: ">" },
									{ label: "=", value: "=" },
									{ label: "<", value: "<" },
								],
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "methode_calcul",
								label: "Méthode de calcul",
								type: "text",
								rules: [{ required: true, message: _messages.required }],
							},

							{
								name: "frequence",
								label: "Frequence",
								type: "select",
								selects: [
									{ label: "Journalier", value: "day" },
									//								{ label: "Hebdomadaire", value: "week" },
									{ label: "Mensuelle", value: "month" },
									{ label: "Trimestriel", value: "quarter" },
									{ label: "Annuel", value: "year" },
								],
								rules: [{ required: true, message: _messages.required }],
							},
							{
								name: "mode_calcul",
								label: "Mode Calcul",
								type: "select",
								selects: [
									{ label: "Somme", value: "somme" },
									{ label: "Moyene", value: "moyene" },
									{ label: "Resultat comulé", value: "comule" },
								],
								rules: [{ required: true, message: _messages.required }],
							},
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
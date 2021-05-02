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
import Item from 'antd/lib/list/Item';


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
		console.log(dataForm)
		if (dataForm["correctives"] && dataForm["correctives"].length > 0) {
			dataForm["correctives"] = dataForm["correctives"].map(c => ({
				action: c.action,
				echeance: c.echeance.format("yy-M-D"),
				users: c.users
			}))
		}
		api.post("/smi_conformites/correcte/" + row.id, dataForm).then((res) => {
			message.info("Bien ajouter")
			//onClose();
			//reload()
		})
	}
	const add = (dataForm) => {
		if (dataForm["avancement"] == 100 && dataForm["date_cloture"]) {
			if (row?.actions?.length > 0) {
				let isAcs = true
				row?.actions.forEach(a => {
					if (a.avancement < 100) {
						isAcs = false
					}
				});
				if (!isAcs) {
					message.warn("Aucune NC cloturée sans realiser les AC(s) ratachées")
					return
				}
			}
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
			<Tooltip title="TRAITEMENT DU PROBLÈME">
				<Button
					onClick={showDrawer}
					shape="circle" icon={<EditOutlined />}
				/>
			</Tooltip>
			{
				visible &&
				<Drawer
					title={"TRAITEMENT DU PROBLÈME"}
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
								type: "render",
								render: (form) => {
									return (
										<Form.List
											name="corrections"
											initialValue={row?.corrections ? JSON.parse(row?.corrections) : [""]}
											rules={[
												{
													validator: async (_, names) => {
														if (!names || names.length < 1) {
															return Promise.reject(new Error('At least 2 passengers'));
														}
													},
												},
											]}
										>
											{(fields, { add, remove }, { errors }) => (
												<>
													{fields.map((field, index) => (
														<Form.Item
															label={index === 0 ? 'Actions correction' : ''}
															required={false}
															key={field.key}
														>
															<Form.Item
																{...field}
																validateTrigger={['onChange', 'onBlur']}
																rules={[
																	{
																		required: false,
																		whitespace: true,
																		message: "Veuillez saisir la correction ou supprimer ce champ.",
																	},
																]}
																noStyle
															>
																<TextArea placeholder="Action correction" />
															</Form.Item>
															{fields.length > 1 ? (
																<MinusCircleOutlined
																	style={{ position: "absolute", right: -15, top: "50%", color: "#999" }}
																	onClick={() => remove(field.name)}
																/>
															) : null}
														</Form.Item>
													))}
													<Form.Item>
														<Button
															type="dashed"
															onClick={() => add()}
															style={{ width: '60%' }}
															icon={<PlusOutlined />}
														>
															Ajouter une correction
              							</Button>
														<Form.ErrorList errors={errors} />
													</Form.Item>
												</>
											)}
										</Form.List>
									)
								}
							},
							{
								type: "render",
								render: (form) => {
									return (
										<div>

											<Form.List
												name="correctives"
											>
												{(fields, { add, remove }, { errors }) => (
													<>
														{(fields.length !== 0 || row.actions.length !== 0) && renderItem(form, [], {
															type: "render",
															render: () => {
																if (row?.actions?.length > 0) {
																	return (
																		<>
																			<Divider plain>{`Il ya ${row?.actions?.length} action(s) courrective(s)`}</Divider>
																			<div style={{ marginBottom: 10 }}>
																				<div style={{ display: "flex", flexDirection: "row", backgroundColor: "#fafafa" }}>
																					<div style={{ border: "1px lightgray solid", padding: 3, flex: 2 }}>Intitule</div>
																					<div style={{ border: "1px lightgray solid", padding: 3, flex: 1 }}>Date echeance</div>
																					<div style={{ border: "1px lightgray solid", padding: 3, flex: 1 }}>Responsables</div>
																					<div style={{ border: "1px lightgray solid", padding: 3, flex: 1 }}>Avancement</div>
																				</div>
																				{row?.actions?.map((a) => (
																					<div style={{ display: "flex", flexDirection: "row" }}>
																						<div style={{ border: "1px lightgray solid", padding: 3, flex: 2 }}>{a.name}</div>
																						<div style={{ border: "1px lightgray solid", padding: 3, flex: 1 }}>{a.date_echeance}</div>
																						<div style={{ border: "1px lightgray solid", padding: 3, flex: 1 }}>{a.users}</div>
																						<div style={{ border: "1px lightgray solid", padding: 3, flex: 1 }}><Progress steps={5} percent={a?.avancement} /></div>
																					</div>
																				))}
																				<div>
																					<InfoCircleOutlined /><Text style={{ marginLeft: 5 }} type="secondary">On peut le gérer les AC dans la section Plan d'action.</Text>
																				</div>
																			</div>
																		</>)
																} else {
																	<Divider plain>{`Nécessite une action corrective (AC)?`}</Divider>
																}
															}
														})}

														{fields.map((field, index) => (
															<Form.Item
																required={false}
																key={field.key}
															>
																<div key={field.key} style={{ display: "flex", flexDirection: "column", border: "1px lightgray dashed", padding: 5, borderRadius: 3, position: "relative" }} >
																	<div>
																		{renderItem(form, [], { ...field, label: "Action proposées", name: [field.name, "action"], fieldKey: [field.fieldKey, 'action'], type: "textarea" })}
																	</div>
																	<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
																		{renderItem(form, [], { ...field, label: "Echéance", name: [field.name, "echeance"], fieldKey: [field.fieldKey, 'echeance'], type: "date" })}
																		{
																			renderItem(form, [], {
																				...field,
																				type: "selectmultiple",
																				label: "Responsables",
																				name: [field.name, "users"],
																			})
																		}
																	</div>
																	{fields.length > 0 ? (
																		<MinusCircleOutlined
																			style={{ position: "absolute", right: -15, top: "50%", color: "#999" }}
																			onClick={() => remove(field.name)}
																		/>
																	) : null}
																</div>

															</Form.Item>
														))}
														<Form.Item>
															<Button
																type="dashed"
																onClick={() => add()}
																style={{ width: '60%' }}
																icon={<PlusOutlined />}
															>
																Ajouter une action corrective (AC)
              							</Button>
															<Form.ErrorList errors={errors} />
														</Form.Item>
													</>
												)
												}
											</Form.List>
										</div>
									)
								}
							},
							{
								type: "render",
								render: (form) => {
									if (form.getFieldValue("correctives")?.length !== 0 || row.actions.length !== 0) {
										return renderItem(form, [], {
											type: "render",
											render: (form) => {
												window.form = form
												return renderItem(form, [], {
													type: "textarea",
													name: "causes",
													label: "Analyse des causes(identification de la (des) cause(s)) si il ya AC"
												})
											},
										})
									}
								}
							},
							{
								type: "divider",
								text: ""
							},
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
						]}
						initialValues={{
							date_cloture: row?.date_cloture ? moment(row?.date_cloture) : null,
							avancement: row?.avancement,
							causes: row?.causes
						}}
						onFinish={add}
					/>
				</Drawer>
			}
		</>
	);
};
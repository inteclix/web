import React from "react";
import {
	Form,
	Input,
	Button,
	Checkbox,
	Select,
	DatePicker,
	Rate,
	Switch
} from "antd";
import { values } from "lodash";

import SearchInput from "components/SearchInput";
import SearchInput2 from "components/SearchInput2";
import DebounceSelect from "components/DebounceSelect";
import CircularProgress from "components/CircularProgress";

const { Option } = Select;
const { TextArea } = Input;
const { Item } = Form;
export const FormBuilder = ({
	formItems,
	initialValues = [],
	onFinish,
	onFinishFailed,
	extra = () => { },
	loading,
	full = false
}) => {
	const [form] = Form.useForm();
	let formItemLayout = {

	};
	if (!full) {
		formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 5 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 }
			}
		}
	}
	const formTailLayout = {};
	return (
		<Form
			{...formItemLayout}
			name="basic"
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			{formItems.map((item, i) => {
				if (item.type === "progress") {
					return (
						<Item
							name={item.name}
							label={item.label}
							hasFeedback
							rules={item.rules}
						>
							<CircularProgress
								defaultValue={initialValues[item.name]}
								onChange={(value) => {
									form.setFieldsValue(item.name, value);
								}}
							/>
						</Item>
					);
				}
				if (item.type === "search") {
					const { renderValue } = item;
					return (
						<Item
							name={item.name}
							label={item.label}
							hasFeedback
							rules={item.rules}
						>
							<SearchInput
								url={item.url}
								query_string={item.query_string}
								defaultOption={initialValues[item.defaultOptionName]}
								mapOptionToString={item.mapOptionToString}
								onSelect={(value, option) => {
									const field = {};
									field[item.name] = option.id;
									form.setFieldsValue(field);
								}}
								disabled={item.disabled}
								onChange={(value, option) => {
									if (!option) {
										const field = {};
										field[item.name] = null;
										form.setFieldsValue(field);
									}
								}}
								placeholder={item.label}
							/>
						</Item>
					);
				}
				if (item.type === "search2") {
					const { renderValue } = item;
					return (
						<Item
							name={item.name}
							label={item.label}
							hasFeedback
							rules={item.rules}
						>
							<SearchInput2
								url={item.url}
								query_string={item.query_string}
								defaultOption={initialValues[item.defaultOptionName]}
								optionLabelProp={item?.optionLabelProp}
								mapOptionToString={item.mapOptionToString}
								disabled={item.disabled}
								onChange={(options) => {
									if (options) {
										let optionsId = []
										options.map((option) => {
											if (option.id) {
												optionsId.push(option.id)
											}
										})
										console.log({ optionsId })
										const field = {};
										field[item.name] = optionsId
										form.setFieldsValue(field);
									}
								}}
								placeholder={item.label}
							/>
						</Item>
					);
				}
				if (item.type === "debounceSelect") {
					const { renderValue } = item;
					return (
						<Item
							name={item.name}
							label={item.label}
							hasFeedback
							rules={item.rules}
						>
							<DebounceSelect
								mode="multiple"
								//	value={form.getFieldValue(item.name)}
								mapOptionToString={item.mapOptionToString}
								placeholder={item.label}
								url={item.url}
								query_string={item.query_string}
								onChange={(newValue, newOptions) => {
									const field = {};
									field[item.name] = newOptions
									form.setFieldsValue(field);
								}}
							/>
						</Item>
					);
				}
				if (item.type === "select") {
					return (
						<Item
							name={item.name}
							label={item.label}
							hasFeedback
							initialValue={item.initialValue}
							rules={item.rules}
						>
							<Select placeholder="Selectioné">
								{item.selects.map((select, i) => (
									<Option key={i} value={select.value}>
										{" "}
										{select.label}{" "}
									</Option>
								))}
							</Select>
						</Item>
					);
				}
				if (item.type === "text") {
					return (
						<Item label={item.label} name={item.name} rules={item.rules}>
							<Input {...item.inputProp} />
						</Item>
					);
				}
				if (item.type === "textarea") {
					return (
						<Item label={item.label} name={item.name} rules={item.rules}>
							<TextArea />
						</Item>
					);
				}
				if (item.type === "password") {
					return (
						<Item label={item.label} name={item.name} rules={item.rules}>
							<Input.Password />
						</Item>
					);
				}
				if (item.type === "checkbox") {
					return (
						<Item name={item.name} valuePropName="checked">
							<Checkbox> {item.label} </Checkbox>
						</Item>
					);
				}
				if (item.type === "boolean") {
					return (
						<Item name={item.name} >
							<Switch
								checkedChildren={item.checkedChildren}
								unCheckedChildren={item.unCheckedChildren}
								defaultChecked >
									{item.label}
								</Switch>
						</Item>
					);
				}
				if (item.type === "date") {
					return (
						<Item label={item.label} name={item.name}>
							<DatePicker
								format="DD/MM/YYYY"
								disabledDate={(current) => {
									if (item.disabledDate) {
										return item.disabledDate(current, form);
									}
								}}
								onChange={(value) => form.setFieldsValue(item.name, value)}
								style={{ width: "100%" }}
							/>
						</Item>
					);
				}
				if (item.type === "date_picker_year") {
					return (
						<Item label={item.label} name={item.name}>
							<DatePicker picker={"year"} style={{ width: "100%" }} />
						</Item>
					);
				}
				if (item.type === "date_picker_quarter") {
					return (
						<Item label={item.label} name={item.name}>
							<DatePicker picker="quarter" style={{ width: "100%" }} />
						</Item>
					);
				}
				if (item.type === "date_picker_month") {
					console.log("date_picker_month")
					return (
						<Item label={item.label} name={item.name}>
							<DatePicker picker="month" style={{ width: "100%" }} />
						</Item>
					);
				}
				if (item.type === "date_picker_week") {
					return (
						<Item label={item.label} name={item.name}>
							<DatePicker picker={"week"} style={{ width: "100%" }} />
						</Item>
					);
				}

				if (item.type === "rate") {
					return (
						<Item label={item.label} name={item.name}>
							<Rate style={{ backgroundColor: "white" }} defaultValue={initialValues[item.name]} />
						</Item>
					);
				}
				if (item.type === "integer") {
					return (
						<Item label={item.label} name={item.name}>
							<Input
								type={"number"}
								pattern="[0-9]*"
								defaultValue={initialValues[item.name]}
								onChange={(e) => console.log(e.target.value)}
								{...item.inputProp}
							/>
						</Item>
					);
				}
				if (item.type === "number") {
					return (
						<Item label={item.label} name={item.name}>
							<Input
								type={"number"}
								defaultValue={initialValues[item.name]}
								{...item.inputProp}
							/>
						</Item>
					);
				}
				if (item.type === "render") {
					return item.render(form)
					return (
						<Item label={item.label} name={item.name}>
							<Input
								type={"number"}
								defaultValue={initialValues[item.name]}
								{...item.inputProp}
							/>
						</Item>
					);
				}
			})}
			{
				extra(form)
			}
			<Item {...formTailLayout}>
				<Button loading={loading} type="primary" htmlType="submit">
					Envoyer
        </Button>
			</Item>
		</Form>
	);
};

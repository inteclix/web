import React from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Rate,
  InputNumber
} from "antd";
import { values } from "lodash";

import SearchInput from "components/SearchInput";
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
  loading
}) => {
  const [form] = Form.useForm();
  window.form = form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  };
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
      })}

      <Item {...formTailLayout}>
        <Button loading={loading} type="primary" htmlType="submit">
          Envoyer
        </Button>
      </Item>
      {
        extra(form)
      }
    </Form>
  );
};

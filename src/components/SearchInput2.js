import React, { useEffect, useState } from "react"
import Page from "components/Page"
import { AutoComplete, Input, Select, Tag } from "antd"
import { useAppStore } from "stores"

export default ({ url, query_string, mapOptionToString, placeholder, onSelect, onChange, style, defaultOption, disabled, optionLabelProp }) => {
	const { api } = useAppStore()
	const [value, setValue] = useState([]);
	const [options, setOptions] = useState([]);


	const onSearch = (searchText) => {
		api.get(`${url}?data=${searchText}&${query_string}`).then(({ data }) => {
			const options = data.data.map(c => ({ ...c, value: mapOptionToString(c), }))
			setOptions(options)
		})
	};


	return (
		<Select
			mode="tags"
			options={options}
			optionLabelProp={optionLabelProp}
			defaultValue={() => {
				if (defaultOption) {
					return defaultOption
				}
			}}
			showSearch={false}
			disabled={disabled}
			style={style}
			onSearch={onSearch}
			//onChange={_onChange}
			onChange={(labels, options) => {
				setValue(options)
				onChange(options)
			}}
			tagRender={(props) => {
				const { label, value, closable, onClose } = props;
				return (
					<Tag color={"blue"} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
						{value}
					</Tag>
				);
			}}
			placeholder={placeholder}
			value={value}
			labelInValue={true}
		/>
	)
}
import React, { useEffect, useState } from "react"
import Page from "components/Page"
import { AutoComplete, Input } from "antd"
import { useAppStore } from "stores"

export default ({ url, query_string, mapOptionToString, placeholder, onSelect, onChange, style, defaultOption, disabled }) => {
  const { api } = useAppStore()
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);


  const onSearch = (searchText) => {
    api.get(`${url}?data=${searchText}&${query_string}`).then(({ data }) => {
      const options = data.data.map(c => ({ ...c, value: mapOptionToString(c), }))
      setOptions(options)
    })
  };

  return (
    <AutoComplete
      options={options}
      defaultValue={() => {
        if (defaultOption) {
          return mapOptionToString(defaultOption)
        }
      }}
      disabled={disabled}
      style={style}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder={placeholder}

    />
  )
}
import React, { useRef, useState } from "react"
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { useAppStore } from "stores";

const { Option } = Select;


export default ({ url, query_string, mapOptionToString, mapOptionToKey, placeholder, onChange, style, defaultOption, disabled }) => {
  const [fetching, setFetching] = useState(false)
  const [data, setData] = useState([])
  const [value, setValue] = useState([])
  const [lastFetchId, setLastFetchId] = useState(0)
  const { api, user } = useAppStore()
  window.data = data
  const fetchData = value => {
    console.log('fetching data', value);
    //lastFetchId += 1;
    setLastFetchId(lastFetchId + 1)
    const fetchId = lastFetchId;
    setData([])
    setFetching(true)
    api.get(url + "?data=" + value)
      .then(res => {
        if (fetchId !== lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = res.data.data.map(option => ({
          text: mapOptionToString(option),
          value: mapOptionToKey(option),
        }));
        setData(data)
        setFetching(false)
      });
  };

  const handleChange = value => {
    setData([])
    setValue(value)
    setFetching(false)
    onChange(value)
  };

  return (
    <Select
      mode="multiple"
      labelInValue
      value={value}
      placeholder={placeholder}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      onSearch={fetchData}
      onChange={handleChange}
      style={style}
    >
      {data.map((d, i) => (
        <Option key={i}>{d.text}</Option>
      ))}
    </Select>
  );

}

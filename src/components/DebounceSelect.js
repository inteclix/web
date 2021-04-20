import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

import { useAppStore } from "stores"

export default ({ url, query_string, mapOptionToString, debounceTimeout = 800, ...props }) => {
	const { api } = useAppStore()
	const [fetching, setFetching] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const fetchRef = React.useRef(0);

	const debounceFetcher = React.useMemo(() => {
		const loadOptions = (value) => {
			fetchRef.current += 1;
			const fetchId = fetchRef.current;
			setOptions([]);
			setFetching(true);
			api.get(`${url}?data=${value}&${query_string}`).then(({ data }) => {
				if (fetchId !== fetchRef.current) {
					// for fetch callback order
					return;
				}
				const _options = data.data.map(c => ({ ...c, value: mapOptionToString(c), }))
				setOptions(_options)
				setFetching(false);
			})
		};

		return debounce(loadOptions, debounceTimeout);
	}, [debounceTimeout]);

	return (
		<Select
			labelInValue
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size="small" /> : null}
			{...props}
			options={options}
		/>
	);
}
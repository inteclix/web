import React from 'react';
import { Line } from '@ant-design/charts';
import { indicateurCastDate } from "utils"
export default ({ valeurs }) => {
	const [data, setData] = React.useState([])
	React.useEffect(() => {
		const d = valeurs?.map((v) => {
			return {
				year: indicateurCastDate(v.date),
				value: v?.valeur
			}
		})
		setData(d)
	}, [valeurs])

	return <Line
		xField='year'
		yField='value'
		point={{
			size: 5,
			shape: 'diamond',
		}}
		data={data}
	/>;
};
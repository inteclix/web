import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Card, Spin } from "antd"
import { useAppStore } from "stores";

export default ({ p }) => {
	const [loading, setLoading] = React.useState(true)
	const [data, setData] = React.useState([])
	const { api, user } = useAppStore()

	React.useEffect(() => {
		api.get("/smi_actions/nature/" + p.id).then(res => {
			setData(res.data.data)
			setLoading(false)
		})
	}, [])

	var config = {
		appendPadding: 10,
		autoFit: true,
		data: data,
		angleField: 'value',
		colorField: 'type',
		radius: 0.9,
		label: {
			type: 'inner',
			offset: '-30%',
			style: {
				fontSize: 14,
				textAlign: 'center',
			},
		},
		interactions: [{ type: 'element-active' }],
	};
	if (loading) {
		return (
			<Card title={"Nature des actions"} style={{ flex: 1 }}  >
				<Spin style={{ alignSelf: "center" }} />
			</Card>
		)
	}
	return (
		<Card title={"Nature des actions"} style={{ flex: 1 }}  >
			<Pie style={{ height: 200 }} {...config} />
		</Card>
	)
};
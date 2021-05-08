import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { indicateurCastDate } from "utils"
export default ({ valeurs }) => {
	const data = valeurs.map(v => ({ value: v.valeur, type: indicateurCastDate(v.date), seuil: v.seuil }))
	var config = {
		data: data,
		xField: 'type',
		yField: 'value',
		seriesField: '',
		legend: false,
	};
	return <Column {...config} />;
};
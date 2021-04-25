import React, { useState, useEffect } from 'react';
import { Gauge, Liquid, measureTextWidth } from '@ant-design/charts';
import { Card, Spin } from 'antd';
import { indicateurCastDate, indicateurCastTypeDate } from "utils"
import Text from 'antd/lib/typography/Text';
import { CaretUpOutlined, CaretDownOutlined, MinusOutlined } from "@ant-design/icons"
export default ({ lastValeur, beforeLastValeur, indicateur, loading }) => {
	var config = {
		percent: lastValeur?.valeur / 100,
		range: {
			ticks: [0, 1 / 3, 2 / 3, 1],
			color: indicateur.indicateur_sueil == "<" ? ['#30BF78', '#FAAD14', '#F4664A'] : ['#F4664A', '#FAAD14', '#30BF78'],
		},
		indicator: {
			pointer: { style: { stroke: '#D0D0D0' } },
			pin: { style: { stroke: '#D0D0D0' } },
		},
		statistic: {
			content: {
				style: {
					fontSize: '20px',
					lineHeight: '20px',
				},
			},
		},
	};
	if (loading) {
		return (
			<Card title={indicateur.name} style={{ width: 250, height: 250 }} >
				<Spin style={{ alignSelf: "center" }} />
			</Card>
		);
	}
	if (!lastValeur) {
		return (
			<Card title={indicateur.name} style={{ width: 250, height: 250 }} >
				Aucun valeur trouver
			</Card>
		)
	}
	return (
		<Card title={indicateur.name} style={{width: 250, height: 250, }} >
			<Gauge height={150} width={150} {...config} />
			<Card.Meta
				title={<a>{indicateurCastDate(lastValeur.date)}</a>}
				description={
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
						<Text>
							{`Seuil: ${indicateur.seuil} ${indicateur.mesure}  |  ${indicateurCastTypeDate(JSON.parse(lastValeur.date).type)}`}
						</Text>
						{
							beforeLastValeur &&
							<div style={{ color: (lastValeur.valeur - beforeLastValeur.valeur) >= 0 ? "green" : "red" }}>
								<Text style={{ color: (lastValeur.valeur - beforeLastValeur.valeur) >= 0 ? "green" : "red" }}>{Math.abs(lastValeur.valeur - beforeLastValeur.valeur)} {indicateur.mesure} </Text>
								{
									(lastValeur.valeur - beforeLastValeur.valeur) > 0 ?
										<CaretUpOutlined />
										: (
											(lastValeur.valeur - beforeLastValeur.valeur) == 0 ?
												<MinusOutlined />
												: <CaretDownOutlined />
										)
								}
							</div>
						}
					</div>
				}
			/>
		</Card>
	);
};
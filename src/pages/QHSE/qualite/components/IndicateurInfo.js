import React from "react"
import {
	Popover,
	Typography,
	Space,
	Descriptions
} from "antd"

const Text = Typography.Text
export default ({ indicateur, children }) => {
	return (
		<Popover placement="topRight" content={
			<Descriptions  bordered>
				{[
					{
						title: "Description",
						description: indicateur.description
					},
					{
						title: "Methode de calcul",
						description: indicateur.methode_calcul
					},
					{
						title: "Mode de calcul",
						description: indicateur.mode_calcul
					},
					{
						title: "Domaine",
						description: indicateur.domaine
					}
				].map((i) => (
					<Descriptions.Item span={3} label={i.title}>{i.description}</Descriptions.Item>
				))}
			</Descriptions>

		}
		 trigger="click"
		>
			{children}
		</Popover>
	)
}
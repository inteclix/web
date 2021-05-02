import React from "react"
import {
	Popover,
	Typography,
	Space,
	Descriptions
} from "antd"

const Text = Typography.Text
export default ({ nonconformite, children }) => {
	return (
		<Popover placement="topRight" content={
			<Descriptions  bordered>
				{[
					{
						title: "Description",
						description: nonconformite.description
					},
					{
						title: "Domaine",
						description: nonconformite.domaine
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
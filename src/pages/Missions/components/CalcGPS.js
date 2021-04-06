import React, { useState } from 'react';
import { Drawer, Button , Tooltip} from 'antd';
import { GiGps } from "react-icons/gi";

import { useAppStore } from "stores";

export default () => {
	const [visible, setVisible] = useState(false);
	const showDrawer = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};
	return (
		<>
			<Tooltip title="Calcule GPS">
				<Button
					onClick={showDrawer}
					shape="circle" icon={<GiGps />} />
			</Tooltip>
			<Drawer
				title="Basic Drawer"
				placement="right"
				closable={false}
				onClose={onClose}
				visible={visible}
			>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</>
	);
};
import React from "react"
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { useHistory, Route } from "react-router-dom"
import Axes from "./qualite/Axes";
import ObjectifsOperationnels from "./qualite/ObjectifsOperationnels";
import Processus from "./qualite/Processus";
import Indicateurs from "./qualite/Indicateurs";
import { _hasRole } from "utils";
import Dashboard from "./qualite/Dashboard";
const { SubMenu } = Menu;

export default () => {
	const history = useHistory()
	const [current, setCurrent] = React.useState("mail")


	const handleClick = e => {
		setCurrent(e.key)
		history.push("/smi/qualite/" + e.key)
	};

	return (
		<>
			<Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal"

				style={{
					position: 'fixed',
					zIndex: 2,
					width: '100%',
					boxShadow: "0 1px 4px rgba(0,21,41,.08)",
				}}
			>
				<SubMenu key="annuaire" title="Annuaire">
					{
						_hasRole("SMI_AXES") &&
						<Menu.Item key="axes_strategiques">Liste des axes stratégiques</Menu.Item>
					}
					{
						_hasRole("SMI_PROCESSUS") &&
						<Menu.Item key="processus">Liste des processus</Menu.Item>
					}
					{_hasRole("SMI_OBJECTIFS_OP") && <Menu.Item key="objectifs_operationnel">List des objectifs opérationnels</Menu.Item>}
					{_hasRole("SMI_INDICATEURS") && <Menu.Item key="indicateurs">Liste des indicateurs</Menu.Item>}
				</SubMenu>
				<SubMenu key="pilotage" title="Pilotage">
					{_hasRole("SMI_DASHBOARD") && <Menu.Item key="dashboard">Tableau de bord</Menu.Item>}
					<Menu.Item key="veille">Veille</Menu.Item>
				</SubMenu>
				<SubMenu key="amelioration" title="Amélioration">
					<Menu.Item key="actions_amelioration">Actions d'amelioration</Menu.Item>
					<Menu.Item key="non_conformites">Non-conformités</Menu.Item>
				</SubMenu>
				<SubMenu key="documentation" title="Documentation">
					<Menu.Item key="documentation_vigueur">Documentation en vigueur</Menu.Item>
					<Menu.Item key="gestion_documentaire">Gestion documentaire</Menu.Item>
					<Menu.Item key="base_connaissance">Base de connaissance</Menu.Item>
				</SubMenu>
			</Menu>
			<div style={{paddingTop :50}}>
				<Route path="/smi/qualite/axes_strategiques" >
					<Axes />
				</Route>
				<Route path="/smi/qualite/objectifs_operationnel" >
					<ObjectifsOperationnels />
				</Route>
				<Route path="/smi/qualite/processus" >
					<Processus />
				</Route>
				<Route path="/smi/qualite/indicateurs" >
					<Indicateurs />
				</Route>
				<Route path="/smi/qualite/dashboard" >
					<Dashboard />
				</Route>
			</div>
		</>
	)
}
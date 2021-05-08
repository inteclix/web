import React from "react"
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { useHistory, Route } from "react-router-dom"
import Axes from "./qualite/Axes";
import ObjectifsOperationnels from "./qualite/ObjectifsOperationnels";
import Processus from "./qualite/Processus";
import Indicateurs from "./qualite/Indicateurs";
import { hasRole, _hasRole } from "utils";
import Dashboard from "./qualite/Dashboard";
import IndicateursHistory from "./qualite/IndicateursHistory";
import NonConformite from "./qualite/NonConformite";
import Actions from "./qualite/Actions";
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
					zIndex: 10,
					width: '100%',
					boxShadow: "0 1px 4px rgba(0,21,41,.08)",
				}}
			>
				{
					_hasRole("SMI_ANNUAIRE") &&
					<SubMenu key="annuaire" title="Annuaire">
						{
							_hasRole("SMI_AXES") &&
							<Menu.Item key="axes_strategiques">Les axes stratégiques</Menu.Item>
						}
						{_hasRole("SMI_OBJECTIFS_OP") && <Menu.Item key="objectifs_operationnel">Les objectifs opérationnels</Menu.Item>}
						{
							_hasRole("SMI_PROCESSUS") &&
							<Menu.Item key="processus">Les processus</Menu.Item>
						}
					</SubMenu>
				}
				<SubMenu key="pilotage" title="Pilotage">
					{_hasRole("SMI_DASHBOARD") && <Menu.Item key="dashboard">Tableau de bord</Menu.Item>}
					{_hasRole("SMI_INDICATEURS") && <Menu.Item key="indicateurs">Indicateurs & valeurs</Menu.Item>}
					{_hasRole("SMI_RMA") && <Menu.Item key="rma">RMA</Menu.Item>}
				</SubMenu>
				<SubMenu key="amelioration" title="Amélioration">
					<Menu.Item key="non_conformites">Non-conformités</Menu.Item>
					<Menu.Item key="plans_actions">Plan d'actions</Menu.Item>
				</SubMenu>
				<SubMenu key="documentation" title="Documentation">
					<Menu.Item key="documentation_vigueur">Documentation actuelle</Menu.Item>
					<Menu.Item key="gestion_documentaire">Gestion documentaire</Menu.Item>
				</SubMenu>
			</Menu>
			<div style={{ paddingTop: 50 }}>
				<Route path="/smi/qualite/axes_strategiques" >
					<Axes />
				</Route>
				<Route path="/smi/qualite/objectifs_operationnel" >
					<ObjectifsOperationnels />
				</Route>
				<Route path="/smi/qualite/processus" >
					<Processus />
				</Route>
				<Route exact path="/smi/qualite/indicateurs" >
					<Indicateurs />
				</Route>
				<Route exact path="/smi/qualite/indicateurs/:id" >
					<IndicateursHistory />
				</Route>
				<Route path="/smi/qualite/dashboard" >
					<Dashboard />
				</Route>

				{
					//Non Conformité
				}

				<Route exact path="/smi/qualite/non_conformites" >
					<NonConformite />
				</Route>
				<Route exact path="/smi/qualite/plans_actions" >
					<Actions />
				</Route>
			</div>
		</>
	)
}
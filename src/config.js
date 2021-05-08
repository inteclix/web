import {
  UserOutlined,
  VideoCameraOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DashboardOutlined,
	ApartmentOutlined
} from '@ant-design/icons';

import { FaCarAlt, FaBell, FaUserFriends, FaClipboardList } from "react-icons/fa";
import { RiSteeringFill } from "react-icons/ri";
import { GiPathDistance, GiSteeringWheel } from "react-icons/gi";

import Dashboard from "pages/Dashboard"

import ListUsers from "pages/Users/List"
import AddUser from "pages/Users/Add"
import EditUser from "pages/Users/Edit"

import ListCars from "pages/Cars/List"
import AddCars from "pages/Cars/Add"
import EditCars from "pages/Cars/Edit"

import ListDrivers from "pages/Drivers/List"
import AddDriver from "pages/Drivers/Add"
import EditDriver from "pages/Drivers/Edit"

import ListClients from "pages/Clients/List"
import AddClient from "pages/Clients/Add"
import EditClient from "pages/Clients/Edit"

import AddDecharge from "pages/Decharges/Add"
import ListDecharges from "pages/Decharges/List"
import ShowDecharge from "pages/Decharges/Show"
import EditDecharge from "pages/Decharges/Edit"
import RestititionDecharge from "pages/Decharges/RestititionDecharge"
import DechargeHistory from "pages/Decharges/DechargeHistory"
import ChecklistDecharge from "pages/Decharges/ChecklistDecharge"

import UserCars from 'pages/Users/UserCars';
import ListeDechargeRestititions from 'pages/Decharges/ListeDechargeRestititions';
import CarDecharges from 'pages/Cars/CarDecharges';
import ListCarsState from 'pages/Cars/ListCarsState';
import AddCarState from 'pages/Cars/AddCarState';
import GroupCar from 'pages/Cars/GroupCar';


import AddVLMission from "pages/Missions/AddVL"
import AddMDMission from "pages/Missions/AddMD"
import ListRoles from 'pages/Users/ListRoles';
import AddRole from 'pages/Users/AddRole';
import UsersRoles from "pages/Users/UsersRoles"
import CamionRemorque from 'pages/Cars/CamionRemorque';

import ListPeremptions from 'pages/Peremptions/List';
import AddPeremptions from 'pages/Peremptions/Add';
import EditPeremptions from 'pages/Peremptions/Edit';
import ListAlertsPeremptions from 'pages/Peremptions/ListAlerts';
import ChangeCarState from 'pages/Cars/ChangeCarState';
import EditCarState from 'pages/Cars/EditCarState';
import Notifications from 'pages/Users/Notifications';
import ListVL from 'pages/Missions/ListVL';
import ListMiseDispositionVL from 'pages/Clients/ListMiseDispositionVL';
import ShowVL from "pages/Missions/ShowVL"
import EditVL from 'pages/Missions/EditVL';
import EditMD from 'pages/Missions/EditMD';
import SMIQualite from 'pages/QHSE/SMIQualite';
import Axes from 'pages/QHSE/qualite/Axes';
import ListMD from 'pages/Missions/ListMD';

export default {
  appName: "GPark v1.0.0",
  routes: [
    {
      path: '/',
      name: 'dashboard',
      label: "Tableau de bord",
      role: "DASHBOARD",
      component: Dashboard,
      icon: <DashboardOutlined />,
      authority: ["dashboard"],
      hideInSide: true,
      exact: true
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      label: "Tableau de bord",
      role: "DASHBOARD",
      component: Dashboard,
      icon: <DashboardOutlined />,
      authority: ["dashboard"],
    },
    {
      path: '/notifications',
      name: 'Notifications',
      label: "Notifications",
      component: Notifications,
      icon: <DashboardOutlined />,
      authority: ["dashboard"],
      hideInSide: true,
    },
    // users 
    {
      name: 'users',
      label: "Utilisateurs",
      icon: <UserOutlined />,
      role: "UTILISATEURS",
      routes: [
        {
          path: '/users/add',
          name: 'add-user',
          label: 'Ajouter utilisateur',
          component: AddUser,
        },
        {
          path: '/users',
          name: 'list-users',
          label: 'Liste des utilisateurs',
          component: ListUsers,
          exact: true
        },
        {
          path: '/users/edit/:id',
          name: 'edit-user',
          label: "Modifier l'utilisateur",
          component: EditUser,
          hideInSide: true
        },
        {
          path: '/users/cars',
          name: 'user-cars-users',
          label: 'utilisateurs <> véhicules',
          component: UserCars,
          exact: true
        },
        {
          path: '/roles/add',
          name: 'add-roles',
          label: 'Ajouter role',
          component: AddRole,
          exact: true
        },
        {
          path: '/roles',
          name: 'list-roles',
          label: 'Liste des roles',
          component: ListRoles,
          exact: true
        },
        {
          path: '/users/roles',
          name: 'users-roles',
          label: 'Utilisateurs <> Roles',
          component: UsersRoles,
          exact: true
        },
      ]
    },
    // cars
    {
      name: 'cars',
      label: "Véhicules",
      role: "LISTE_VEHICULES",
      icon: <FaCarAlt style={{ marginRight: 10 }} />,
      routes: [
        {
          path: '/cars/add',
          name: 'add-cars',
          label: 'Ajouter véhicule',
          role: "AJOUTER_VEHICULE",
          component: AddCars,
        },
        {
          path: '/cars',
          name: 'list-cars',
          label: 'Liste des véhicules',
          component: ListCars,
          role: "LISTE_VEHICULES",
          exact: true
        },
        {
          path: '/cars/groups',
          name: 'groups-cars',
          label: 'Groupes <> vehicules',
          component: GroupCar,
          role: "VEHICULES_GROUPES",
        },
        {
          path: '/cars_state',
          name: 'status-cars',
          label: 'véhicules > Status',
          component: ListCarsState,
          role: "STATUS_VEHICULES",
          exact: true

        },
        {
          path: '/cars_state/add',
          name: 'add-status-cars',
          label: 'Ajouter status',
          role: "MODIFIER_STATUS_VEHICULE",
          component: AddCarState,
          exact: true
        },
        {
          path: '/cars_state/edit/:id',
          name: 'edit-status-cars',
          label: 'Modifier status d\'une véhicule',
          role: "MODIFIER_STATUS_VEHICULE",
          component: EditCarState,
          hideInSide: true,
        },
        {
          path: '/cars/stats/edit/:id',
          name: 'edit-car-state',
          label: 'Modifier Status véhicule',
          role: "MODIFIER_STATUS_VEHICULE",
          component: ChangeCarState,
          hideInSide: true
        },
        {
          path: '/cars/edit/:id',
          name: 'edit-cars',
          label: 'Modifier véhicule',
          role: "MODIFIER_VEHICULE",
          component: EditCars,
          hideInSide: true
        },
        {
          path: '/cars/decharges/:car_id',
          name: 'decharges-car',
          label: 'Decharge',
          component: CarDecharges,
          hideInSide: true
        },
      ]
    },
    {
      name: "peremptions",
      label: "Péremptions",
      icon: <FaBell style={{ marginRight: 10 }} />,
      role: "LISTE_PEREMPTIONS",
      routes: [
        {
          path: '/peremptions/add',
          name: 'add-peremption',
          label: 'Ajouter péremption',
          role: "AJOUTER_PEREMPTIONS",
          component: AddPeremptions,
        },
        {
          path: '/peremptions/',
          name: 'list-peremptions',
          label: 'Liste péremptions',
          role: "LISTE_PEREMPTIONS",
          component: ListPeremptions,
        },

        {
          path: '/peremptions/edit/:id',
          name: 'edit-peremption',
          label: "Modifier péremption",
          role: "MODIFIER_PEREMPTIONS",
          component: EditPeremptions,
          hideInSide: true
        }
      ]
    },
    {
      name: 'drivers',
      label: "Conducteurs",
      icon: <GiSteeringWheel style={{ marginRight: 10 }} />,
      role: "LISTE_CONDUCTEURS",
      routes: [
        {
          path: '/drivers/add',
          name: 'add-driver',
          label: 'Ajouter conducteur',
          role: "AJOUTER_CONDUCTEUR",
          component: AddDriver,
        },
        {
          path: '/drivers',
          name: 'list-drivers',
          label: 'Liste des conducteurs',
          role: "LISTE_CONDUCTEURS",
          component: ListDrivers,
          exact: true
        },

        {
          path: '/drivers/edit/:id',
          name: 'edit-driver',
          label: "Modifier conducteur",
          role: "MODIFIER_CONDUCTEUR",
          component: EditDriver,
          hideInSide: true
        }
      ]
    },
    {
      name: 'clients',
      label: "Clients",
      icon: <FaUserFriends style={{ marginRight: 10 }} />,
      role: "LISTE_CLIENTS",
      routes: [
        {
          path: '/clients/add',
          name: 'add-client',
          label: 'Ajouter client',
          role: "AJOUTER_CLIENT",
          component: AddClient,
        },
        {
          path: '/clients',
          name: 'list-clients',
          label: 'Liste des clients',
          role: "LISTE_CLIENTS",
          component: ListClients,
          exact: true
        },
        {
          path: '/mise_disposition_vl',
          name: 'list-mise-a-disposition-vl',
          label: 'Mise à disposition VL',
          role: "LISTE_MISE_DISPOSITION_VL",
          component: ListMiseDispositionVL,
          exact: true
        },
        {
          path: '/clients/edit/:id',
          name: 'edit-client',
          label: "Modifier client",
          role: "MODIFIER_CLIENT",
          component: EditClient,
          hideInSide: true
        }
      ]
    },
    {
      name: 'decharges',
      label: "Decharges",
      icon: <FaClipboardList style={{ marginRight: 10 }} />,
      role: "LISTE_DECHARGES",
      routes: [
        {
          path: '/decharges/add',
          name: 'add-decharge',
          label: 'Ajouter decharge',
          component: AddDecharge,
          role: "AJOUTER_DECHARGE",
        },
        {
          path: '/decharges',
          name: 'list-decharges',
          label: 'Etat décharges',
          component: ListDecharges,
          exact: true
        },
        {
          path: '/decharges/show/:id',
          name: 'show-decharge',
          label: "Affiche decharge",
          component: ShowDecharge,
          hideInSide: true
        },
        {
          path: '/decharges/edit/:id',
          name: 'edit-decharge',
          label: "Modifier décharge",
          component: EditDecharge,
          hideInSide: true
        },
        {
          path: '/decharges/restitition/:id',
          name: 'restitition-decharge',
          label: "Restitution decharge",
          component: RestititionDecharge,
          hideInSide: true
        },
        {
          path: '/decharges/restititions',
          name: 'restititions-decharge',
          label: "Décharges restituer",
          role: "LISTE_DECHARGES_RESTITUER",
          component: ListeDechargeRestititions,
        },
        {
          path: '/decharges/history/:car_id',
          name: 'history-decharge',
          label: "History decharge",
          component: DechargeHistory,
          hideInSide: true
        },
        {
          path: '/decharges/checklist/:id',
          name: 'add-checklist-decharge',
          label: "Checklist decharge",
          component: ChecklistDecharge,
          hideInSide: true
        },
      ]
    },

    {
      name: 'missions',
      label: "Missions",
      role: "LISTE_MISSIONS",
      icon: <GiPathDistance style={{ marginRight: 10 }} />,
      routes: [
        {
          path: '/missions_vl/add',
          name: 'add-mission-vl',
          label: 'Ajouter mission VL',
          role: "AJOUTER_MISSION_VL",
          component: AddVLMission,
        },
				{
          path: '/missions_vl/edit/:id',
          name: 'edit-missions-vl',
          label: "Modifier mission",
          role: "MODIFIER_MISSION_VL",
          component: EditVL,
          hideInSide: true
        },
				{
          path: '/missions_md/add',
          name: 'add-mission-md',
          label: 'Ajouter mission MD',
          role: "AJOUTER_MISSION_MD",
          component: AddMDMission,
        },
				{
          path: '/missions_md/edit/:id',
          name: 'edit-missions-md',
          label: "Modifier mission MD",
          role: "MODIFIER_MISSION_MD",
          component: EditMD,
          hideInSide: true
        },
        {
          path: '/missions_vl',
          name: 'list-missions-vl',
          role: "LISTE_MISSIONS_VL",
          label: 'List missions VL',
          component: ListVL,
          exact: true
        },
				{
          path: '/missions_md',
          name: 'list-missions-md',
          role: "LISTE_MISSIONS_MD",
          label: 'List missions MD',
          component: ListMD,
          exact: true
        },
        {
          path: '/missions_vl/show/:id',
          name: 'show-missions-vl',
         // role: "LISTE_MISSIONS_VL",
          label: 'Show missions VL',
          component: ShowVL,
          hideInSide: true
        },
      ]
    },
		{
      name: 'smi',
      label: "SMI",
      role: "SMI",
      icon: <ApartmentOutlined style={{ marginRight: 10 }} />,
      routes: [
        {
          path: '/smi/qualite',
          name: 'qualite',
          label: 'Portail Qualité',
          role: "SMI_QUALITE",
          component: SMIQualite,
        }
      ]
    },

  ]
}
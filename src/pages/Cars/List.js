import React, {useState} from "react";
import moment from "moment";
import { Button, Popover, message, Tooltip, Spin, List, Typography } from "antd";

import ProTable from "@ant-design/pro-table";
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _carStateName, _carStates, _marque, _prop } from "_consts";
import { FaInfo, FaPaintBrush } from "react-icons/fa"
import {
  EyeOutlined,
  ToTopOutlined,
  DeleteOutlined,
  HistoryOutlined,
  EditOutlined
} from '@ant-design/icons';
import { RiFileExcel2Line } from "react-icons/ri";
import { hasRole } from "utils";

const InfoCar = ({ row }) => {
  const { api, user } = useAppStore()
  const [visible, setVisible] = React.useState(false)
  const [car, setCar] = React.useState(null)
  const hide = () => {
    setVisible(false)
  }

  return (
    <Popover
      content={() => (
        <>
          {
            car &&
            <List>
              <List.Item>
                <Typography.Text mark>[PROPRIÉTAIRE]</Typography.Text> {car.prop}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[ANCIEN MATRICULE]</Typography.Text> {car.old_matricule}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[GENRE]</Typography.Text> {car.genre}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[TYPE]</Typography.Text> {car.type}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[PUISSANCE]</Typography.Text> {car.puissance}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[ENERGIE]</Typography.Text> {car.energie}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[CARROSSERIE]</Typography.Text> {car.carrosserie}
              </List.Item>
              <List.Item>
                <Typography.Text mark>[COULEUR]</Typography.Text> {!car.color ? "/" : car.color}
              </List.Item>
            </List>
          }
          {
            !car && <Spin />
          }
        </>
      )}
      title={car ? car.code_gps + " | " + car.matricule : ""}
      trigger="click"
      visible={visible}
      onVisibleChange={(v) => setVisible(v)}
    >
      <Button
        onClick={() => {
          api.get("/cars/" + row.id).then((res) => {
            // alert(JSON.stringify(res.data.data))
            setCar(res.data.data)
          })
        }}
        shape="circle" icon={<FaInfo />} />
    </Popover>
  )
}
export default function () {
  const { api, user } = useAppStore()
  const history = useHistory()
  const [_params, setParams] = useState(null)
  const columns = [
    {
      title: "Matricule",
      dataIndex: "matricule",
      copyable: true,
      sorter: true,
    },

    {
      title: "Code GPS",
      dataIndex: "code_gps",
      sorter: true,
      hideInSearch: false
    },
    {
      title: "Genre",
      dataIndex: "genre",
      sorter: true,
      hideInSearch: true,
      filters: [
        { text: "V P", value: "V P" },
        { text: "CAMION", value: "CAMION" },
        { text: "TRACTEUR", value: "TRACTEUR" },
        { text: "REMORQUE", value: "REMORQUE" },
        { text: "BUS", value: "BUS" },
        { text: "UTILITAIRE", value: "UTILITAIRE" },
        { text: "MICRO BUS", value: "MICRO BUS" },
        { text: "V H", value: "V H" },
        { text: "MOTO", value: "MOTO" },
        { text: "AMBULANCE", value: "AMBULANCE" },
        { text: "MOTOCYCLE", value: "MOTOCYCLE" },
      ]
    },
    {
      title: "Groupe",
      dataIndex: "groupName",
      sorter: true,
      hideInSearch: true,

      filters: [
        { text: 'LEGER', value: 'LEGER' },
        { text: 'LIVRAISON MARCHANDISE', value: 'LIVRAISON MARCHANDISE' },
        { text: 'LOURD', value: 'LOURD' },
        { text: 'TRANSPORT PERSONNEL', value: 'TRANSPORT PERSONNEL' },
      ]

    },
    {
      title: "Marque",
      dataIndex: "marque",
      sorter: true,
      hideInSearch: true,
      filters: _marque.map((m) => ({ text: m.label, value: m.value }))
    },
    {
      title: "Odometre",
      dataIndex: "odometre",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "Client",
      dataIndex: "client",
      copyable: true,
      sorter: true,
      hideInSearch: false
    },
    {
      title: "Conducteur",
      dataIndex: "drivers_fullname",
      copyable: true,
      sorter: true,
      hideInSearch: true,
      render: (text, row, index, action) => {
        return <span style={{ color: !row.client ? "red" : "rgba(0,0,0,.85)" }}>{row.drivers_fullname}</span>
      }
    },
    {
      title: "Status",
      dataIndex: "state",
      sorter: true,
      hideInSearch: true,
      filters: _carStateName.map((m) => ({ text: m.label, value: m.value }))

    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <Tooltip title="Info">
          <InfoCar row={row} />
        </Tooltip>,

        <>
          {
            hasRole(user, "MODIFIER_VEHICULE") &&
            <Tooltip title="Modifier véhicule">
              <Button
                onClick={() => {
                  history.push("/cars/edit/" + row.id)
                }}
                shape="circle" icon={<EditOutlined />} />
            </Tooltip>
          }
        </>,
        <>
          {
            hasRole(user, "MODIFIER_STATUS_VEHICULE") &&
            <Tooltip title="Ajouter Status">
              <Button
                onClick={() => {
                  history.push("/cars/stats/edit/" + row.id)
                }}
                shape="circle" icon={<FaPaintBrush />} />
            </Tooltip>
          }
        </>,
        <Tooltip title="Historiques des décharges">
          <Button
            onClick={() => {
              history.push("/cars/decharges/" + row.id)
            }}
            shape="circle" icon={<HistoryOutlined />} />
        </Tooltip>,
        <>
          { hasRole(user, "SUPPRIMER_VEHICULE") &&
            <Tooltip title="Supprimer">
              <Button
                onClick={() => {
                  api.post("/cars/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
                }}
                shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>}
        </>
      ]
    }
  ];
  const actionRef = React.useRef()
  window.actionRef = actionRef
  return (
    <Page title={"Véhicules"} selectedSiderKey="list-cars">
      <ProTable
        actionRef={actionRef}
        toolBarRender={(request) => [
          <Tooltip title="Exporter fiechier EXCEL" >
            <div style={{ cursor: "pointer", "marginTop": 7 }} >
              <RiFileExcel2Line
                size={20}
                onClick={() => {
                  api.get("/cars?format=excel",
                    {
                      responseType: 'blob',
                      headers: {
                        'Content-Disposition': `attachment; filename=etat_vehicules.xlsx`,
                        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                      }
                    }
                  ).then((res) => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'etat_vehicules_' + moment().format("DD_MM_YYYY__HH_MM") + '.xlsx');
                    document.body.appendChild(link);
                    link.click();
                  })
                }}
              />
            </div>
          </Tooltip>,
        ]}
        search={true}
        size={"small"}
        columns={columns}
        ellipsis={true}
        request={(params, sort, filters) => {
          if (sort) {
            params["sortBy"] = Object.keys(sort)[0]
            params["sort"] = Object.values(sort)[0]
          }
          /* if (filters) {
             params["filterBy"] = Object.keys(filters)[0]
             params["filter"] = Object.values(filters)
           }*/
          console.log(filters)
          params["filters"] = filters
          params["format"] = "json"
          setParams(params)
          return api.get("/cars", { params }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


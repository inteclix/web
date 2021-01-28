import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message, Popconfirm } from "antd";

import ProTable from "@ant-design/pro-table";
import {
  EyeOutlined,
  ToTopOutlined,
  DeleteOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { FaUserEdit } from 'react-icons/fa';

import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";


export default function () {
  const { api, user } = useAppStore()
  const history = useHistory()

  const columns = [
    {
      title: "Matricule",
      dataIndex: "cars.matricule",
      copyable: true,
      sorter: true,
    },
    {
      title: "Code GPS",
      dataIndex: "code_gps",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Client",
      dataIndex: "clients.designation",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Conducteur",
      dataIndex: "drivers_fullname",
      hideInSearch: true
    },
    {
      title: "Date Décharge",
      dataIndex: "date_decharge",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Date Fin Prestation",
      dataIndex: "date_fin_prestation",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Cree par",
      dataIndex: "username",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <Tooltip title="Afficher">
          <Button
            onClick={() => {
              history.push("/decharges/show/" + row.id)
            }}
            shape="circle" icon={<EyeOutlined />} />
        </Tooltip>,
        <Tooltip title="Change conducteur">
          <Button
            onClick={() => {
              history.push("/decharges/checklist/" + row.id)
            }}
            shape="circle" icon={<FaUserEdit />} />
        </Tooltip>,
        <Tooltip title="Restitution">
          <Button
            disabled={row["restititions.id"]}
            onClick={() => {
              history.push("/decharges/restitition/" + row.id)
            }}
            shape="circle" icon={<ToTopOutlined />} />
        </Tooltip>,
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer?"
          onConfirm={() => {
            api.post("/decharges/delete/" + row.id).then(() => {
              message.info("Bien Supprimé"); action.reload();
            })
          }}
          onCancel={() => { }}
          okText="Oui"
          cancelText="No"
        >
          <Button

            shape="circle" icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ]
    }
  ];
  const actionRef = React.useRef()
  return (
    <Page title={"Décharges"} selectedSiderKey="list-cars">
      <ProTable
        actionRef={actionRef}
        size="small"
        search={true}
        columns={columns}
        ellipsis={true}
        request={(params, sort, filters) => {
          if (sort) {
            params["sortBy"] = Object.keys(sort)[0]
            params["sort"] = Object.values(sort)[0]
          }
          if (filters) {
            params["filterBy"] = Object.keys(filters)[0]
            params["filter"] = Object.values(filters)
          }
          return api.get("/decharges", { params }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


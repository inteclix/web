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
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";


export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const routeMatch = useRouteMatch()
  const columns = [
    {
      title: "Matricule",
      dataIndex: "cars_matricule",
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
      title: "Date Restitution",
      dataIndex: "restititions.date_restitition",
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
              console.log(row)
              history.push("/decharges/show/" + row["id"])
            }}
            shape="circle" icon={<EyeOutlined />} />
        </Tooltip>,
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer?"
          onConfirm={() => {
            api.post("/decharges/restititions/delete/" + row["restititions.id"]).then(() => {
              message.info("Bien Supprimé"); action.reload();
            })
          }}
          onCancel={() => { }}
          okText="Oui"
          cancelText="No"
        >
          <Button shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm >
      ]
    }
  ];
  const actionRef = React.useRef()
  return (
    <Page title={"Décharges Restituer"} >
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
          console.log(routeMatch)
          return api.get("/decharges/restititions/", { params }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


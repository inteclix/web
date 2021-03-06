import * as React from "react";
import moment from "moment";
import { Button, Tooltip, message } from "antd";

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
      dataIndex: "matricule",
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
      title: "Date Restitition",
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
              history.push("/decharges/show/" + row.id)
            }}
            shape="circle" icon={<EyeOutlined />} />
        </Tooltip>,
        <Tooltip title="Supprimer">
          <Button
            onClick={() => {
              //api.post("/decharges/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
            }}
            shape="circle" icon={<DeleteOutlined />} />
        </Tooltip>
      ]
    }
  ];
  const actionRef = React.useRef()
  return (
    <Page withBack={true} title={"Historique CheckList"}>
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
          return api.get("/decharges/history/" + routeMatch.params.car_id, { params }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


import * as React from "react";
import moment from "moment";
import { Button, Input, message, Popconfirm, Tooltip } from "antd";

import ProTable from "@ant-design/pro-table";
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { _prop } from "_consts";
import {
  EyeOutlined,
  ToTopOutlined,
  DeleteOutlined,
  HistoryOutlined,
  EditOutlined
} from '@ant-design/icons';
import { FaInfo, FaPaintBrush } from "react-icons/fa"

import { hasRole } from "utils";

export default function () {
  const { api, user } = useAppStore()
  const history = useHistory()

  const columns = [
    {
      title: "matricule",
      dataIndex: "matricule",
      copyable: true,
      sorter: true,
    },
    {
      title: "code_gps",
      dataIndex: "code_gps",
      sorter: true,
      hideInSearch: false
    },
    {
      title: "Designation",
      dataIndex: "name",
      hideInSearch: true,
      sorter: true
    },
    {
      title: "Observation",
      dataIndex: "observation",
      hideInSearch: true,
      sorter: true
    },
    {
      title: "Date status",
      dataIndex: "state_date",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "Cree par",
      dataIndex: "createdby",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <Popconfirm
          title="Êtes-vous sûr de vouloir supprimer?"
          onConfirm={() => {
            api.post("/cars_state/delete/" + row.id).then(() => {
              message.info("Bien Supprimé");
              action.reload();
            })
          }}
          onCancel={() => { }}
          okText="Oui"
          cancelText="No"
        >
          <Button
            shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>,
        <>
          {
            hasRole(user, "MODIFIER_STATUS_VEHICULE") &&
            <Tooltip title="Modifier status véhicule">
              <Button
                onClick={() => {
                  history.push("/cars_state/edit/" + row.id)
                }}
                shape="circle" icon={<EditOutlined />} />
            </Tooltip>
          }
        </>
      ]
    }
  ];
  const actionRef = React.useRef()
  window.actionRef = actionRef
  return (
    <Page title={"Status des véhicules"} selectedSiderKey="list-cars">
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
          return api.get("/cars_state", { params }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


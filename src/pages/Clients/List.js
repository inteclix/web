import * as React from "react";
import moment from "moment";
import { Button, Input, message, Tooltip, Popconfirm } from "antd";

import ProTable from "@ant-design/pro-table";
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import {
  EyeOutlined,
  ToTopOutlined,
  DeleteOutlined,
  HistoryOutlined,
  EditOutlined
} from '@ant-design/icons';
import { hasRole } from "utils";

export default function () {
  const { api, user } = useAppStore()
  const history = useHistory()

  const columns = [
    {
      title: "Code (SAP)",
      dataIndex: "code",
      copyable: true,
      hideInSearch: true,
      sorter: true
    },
    {
      title: "Designation",
      dataIndex: "designation",
      sorter: true,
    },
    {
      title: "Localité",
      dataIndex: "localite",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "TEL",
      dataIndex: "tel",
      sorter: true,
      hideInSearch: true,
      copyable: true
    },
    {
      title: "Client Hierachique",
      dataIndex: ["client_h_designation"],
      sorter: true,
      hideInSearch: true
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <>
          {
            hasRole(user, "SUPPRIMER_CLIENT") &&
            <Popconfirm
              title="Êtes-vous sûr de vouloir supprimer?"
              onConfirm={() => {
                api.post("/clients/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
              }}
              onCancel={() => { }}
              okText="Oui"
              cancelText="No"
            >
              <Tooltip title="Supprimer">
                <Button
                  shape="circle" icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          }
        </>,

        <>
          {hasRole(user, "MODIFIER_CLIENT") &&
            <Tooltip title="Modifier">
              <Button
                onClick={() => {
                  history.push("/clients/edit/" + row.id)
                }}
                shape="circle" icon={<EditOutlined />} />
            </Tooltip>
          }
        </>,
      ]
    }
  ];

  const actionRef = React.useRef()
  window.actionRef = actionRef
  return (
    <Page title="Clients" selectedSiderKey="list-clients">
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
          return api.get("/clients", { params }).then((res) => res.data.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


import * as React from "react";
import moment from "moment";
import { Button, Input, message, Tooltip, Popconfirm } from "antd";

import ProTable from "@ant-design/pro-table";
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";
import { hasRole } from "utils";
import {
  EyeOutlined,
  ToTopOutlined,
  DeleteOutlined,
  HistoryOutlined,
  EditOutlined
} from '@ant-design/icons';

export default function () {
  const { api, user } = useAppStore()
  const history = useHistory()

  const columns = [
    {
      title: "Nom",
      dataIndex: "firstname",
      sorter: true,
    },
    {
      title: "Prénom",
      dataIndex: "lastname",
      sorter: true,
    },
    {
      title: "TEL",
      dataIndex: "tel",
      sorter: true,
      hideInSearch: true,
      copyable: true
    },
    {
      title: "Code paie",
      dataIndex: "code_paie",
      sorter: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Date Creéation",
      dataIndex: "created_at",
      valueType: "dateTime",
      hideInSearch: true
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        ,
        <>
          { hasRole(user, "SUPPRIMER_CONDUCTEUR") &&
            <Tooltip title="Supprimer">
              <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer?"
                onConfirm={() => {
                  api.post("/drivers/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
                }}
                onCancel={() => { }}
                okText="Oui"
                cancelText="No"
              >
                <Button

                  shape="circle" icon={<DeleteOutlined />}
                />
              </Popconfirm>
            </Tooltip>}
        </>,
        <>
          {hasRole(user, "MODIFIER_CONDUCTEUR") &&
            <Tooltip title="Modifier">
              <Button
                onClick={() => {
                  history.push("/drivers/edit/" + row.id)
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
    <Page title="Conducteurs" selectedSiderKey="list-drivers">
      <ProTable
        actionRef={actionRef}
        size="small"
        search={true}
        columns={columns}
        ellipsis={true}
        request={(params, sort, filter) => {
          console.log(sort)
          if (sort) {
            params["sortBy"] = Object.keys(sort)[0]
            params["sort"] = Object.values(sort)[0]
          }
          return api.get("/drivers", { params, sort }).then((res) => res.data)
        }}

        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


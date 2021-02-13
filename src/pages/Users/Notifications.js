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
      title: "Designation",
      dataIndex: "title",
      sorter: true,
      render: (text, row, index, action) => {
        return row.title + " | " + row.sub_title
      }
    },
    {
      title: "Date Creéation",
      dataIndex: "created_at",
      valueType: "dateTime",
      hideInSearch: true,
      sorter: true,
    },
    {
      title: "<>",
      dataIndex: "is_read",
      hideInSearch: true,
      sorter: true,
      render: (text, row, index, action) => {
        return row.is_read ? "DEJA VU" : "Non vu"
      }
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <Button
          onClick={() => {
            api.post("/notifications/" + row.id).then(() => {
              history.push(row.url)
            })
          }}
          shape="circle" icon={<EyeOutlined />}
        />
      ]
    }
  ];

  const actionRef = React.useRef()
  window.actionRef = actionRef
  return (
    <Page title="Notifications" selectedSiderKey="list-notifiactions">
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
          return api.get("/notifications", { params }).then((res) => res.data)
        }}

        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


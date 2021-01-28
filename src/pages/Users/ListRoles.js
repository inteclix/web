import * as React from "react";
import moment from "moment";
import { Button, Input, message } from "antd";

import ProTable from "@ant-design/pro-table";
import Page from "components/Page";
import { useAppStore } from "stores";
import { useHistory } from "react-router-dom";


export default function () {
  const { api } = useAppStore()
  const history = useHistory()

  const columns = [
    {
      title: "designantion",
      dataIndex: "name",
      copyable: true,
      filters: true,
      sorter: true
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <a
          onClick={() => {
            api.post("roles/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
          }}
        >
          Supprimer
      </a>
      ]
    }
  ];

  return (
    <Page title="Roles" >
      <ProTable
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
          return api.get("roles", { params, sort }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


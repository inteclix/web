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
      title: "Nom d'utilisateur",
      dataIndex: "username",
      copyable: true,
      filters: true,
      sorter: true
    },
    {
      title: "Nom",
      dataIndex: "firstname",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Prénom",
      dataIndex: "lastname",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Poste",
      dataIndex: "poste",
      sorter: true,
      hideInSearch: true
    },
    {
      title: "Email",
      dataIndex: "mail",
      valueType: "email",
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
      title: "Tel",
      dataIndex: "tel",
      copyable: true,
      sorter: true,
      hideInSearch: true
    },
    {
      title: "option",
      valueType: "option",
      dataIndex: "id",
      render: (text, row, index, action) => [
        <a
          onClick={() => {
            api.post("auth/users/delete/" + row.id).then(() => { message.info("Bien Supprimé"); action.reload(); })
          }}
        >
          Supprimer
      </a>,
        <a
          onClick={() => {
            history.push("/users/edit/" + row.id)
          }}
        >
          Modifier
      </a>
      ]
    }
  ];

  const actionRef = React.useRef()
  window.actionRef = actionRef
  return (
    <Page title="Utilisateurs" selectedSiderKey="list-users">
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
          return api.get("/auth/users", { params, sort }).then((res) => res.data)
        }}
        pagination={{
          defaultCurrent: 1,
          pageSize: 10
        }}
      />
    </Page>
  );
}


import * as React from "react";
import moment from "moment";
import { Button, Input } from "antd";

//import "antd/dist/antd.css";

import ProTable from "@ant-design/pro-table";
import Page from "components/Page";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    copyable: true
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    ellipsis: true,
    width: 100
  },
  {
    title: "money",
    dataIndex: "money",
    valueType: "money"
  },
  {
    title: "date",
    key: "date",
    dataIndex: "date",
    valueType: "date"
  },
  {
    title: "dateTime",
    key: "dateTime",
    dataIndex: "date",
    valueType: "dateTime"
  },
  {
    title: "time",
    key: "time",
    dataIndex: "date",
    valueType: "time"
  },
  {
    title: "option",
    valueType: "option",
    dataIndex: "id",
    render: (text, row, index, action) => [
      <a
        onClick={() => {
          window.alert("Supprimer");
          action.reload();
        }}
      >
        delete
      </a>,
      <a
        onClick={() => {
          window.alert("Actualisé");
          action.reload();
        }}
      >
        reload
      </a>
    ]
  }
];

const data = [];
for (let i = 0; i < 900; i += 1) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 10 + i,
    money: parseFloat((10000.26 * (i + 1)).toFixed(2)),
    date: moment("2019-11-16 12:50:26").valueOf() + i * 1000 * 60 * 2,
    address: `London, Park Lane no. ${i}`
  });
}

const request = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data,
        success: true
      });
    }, 1000);
  });

export default function () {
  const [keywords, setKeywords] = React.useState("");
  const refTable = React.useRef()
  window.refTable = refTable
  return (
    <Page>
      <ProTable
        actionRef={refTable}
        className="App"
        size="small"
        columns={columns}
        ellipsis={true}
        request={request}
        rowKey="key"
        renderToolBar={action => [
          <Button
            onClick={() => {
              action.reload();
            }}
            type="primary"
          >
            Actualisé
          </Button>,
          <Button
            onClick={() => {
              action.resetPageIndex();
            }}
            type="default"
          >
            Première page
        </Button>
        ]}
        pagination={{
          defaultCurrent: 1
        }}
      />
    </Page>
  );
}


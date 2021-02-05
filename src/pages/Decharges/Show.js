import React, { useRef, useState, useEffect } from "react"
import { Divider, message } from 'antd';

import Page from "components/Page"
import { useAppStore } from "stores";

import { _postes, _messages } from "_consts";

import PrintDecharge from "components/PrintDecharge";
import PrintRestitition from "components/PrintRestitition";
import { useReactToPrint } from "react-to-print";
import { useRouteMatch } from "react-router-dom";

import Print from "components/Print"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function () {
  const { api } = useAppStore()
  const { params } = useRouteMatch()
  const history = useHistory()
  const [allData, setAllData] = useState({ step: 0 })
  window.allData = allData

  useEffect(() => {
    api.get("decharges/" + params.id).then((res) => {
      setAllData({ ...allData, decharge: res.data.data })
    })
  }, [params])



  const printDecharge = useRef(null);
  const handlePrintDecharge = useReactToPrint({
    content: () => printDecharge.current,
    onBeforeGetContent: async () => { },
  });

  const printRestitition = useRef(null);
  const handlePrintRestitition = useReactToPrint({
    content: () => printRestitition.current,
    onBeforeGetContent: async () => { },
  });
  return (
    <Page withBack={true} loading={!allData.decharge} title={"Affiche decharge n° " + params.id}>

      {
        allData?.decharge?.restitition &&
        <>
          <Divider orientation="left"><h1><b>Restitution (Decharge)</b></h1></Divider>
          <Print
            component={<PrintRestitition ref={printRestitition} decharge={allData?.decharge} />}
            disabledDelete={true}
          />
        </>
      }
      {
        allData?.decharge?.checklists.reverse().map((checklist, i) => (
          <>
            <Divider orientation="left"><h1><b>Chcklist Le:</b> {checklist.date_checklist}:</h1></Divider>
            <Print
              component={
                <PrintDecharge checklist={{
                  ...allData?.decharge,
                  ...checklist,
                  "drivers.firstname": checklist.driver.firstname,
                  "drivers.lastname": checklist.driver.lastname
                }}
                />
              }
              onDelete={() => {
                api.post("decharges/checklist/delete/" + checklist.id).then(() => {
                  history.push("/decharges")
                  message.info("Checklist est supprimer")
                })
              }}
              disabledDelete={i === (allData?.decharge?.checklists.length - 1)}
            />
          </>
        ))
      }
    </Page >
  )
}
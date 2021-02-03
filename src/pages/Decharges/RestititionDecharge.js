import React, { useRef, useState, useEffect } from "react"
import { message, Card, Divider } from 'antd';
import * as moment from "moment"
import Page from "components/Page"
import { useAppStore } from "stores";
import { FormBuilder } from "components/UIBuilder"
import { formDechargeItems, formCheckListRestititionItems } from "./columns"
import { Link } from "react-router-dom"
import { _postes, _messages } from "_consts";

import PrintDecharge from "components/PrintDecharge";
import { useReactToPrint } from "react-to-print";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function () {
  const { api } = useAppStore()
  const { params } = useRouteMatch()
  const history = useHistory()
  const [allData, setAllData] = useState({ decharge: null })
  window.allData = allData
  useEffect(() => {
    api.get("decharges/" + params.id).then((res) => {
      const driver = {
        id: res.data.data["drivers.id"],
        firstname: res.data.data["drivers.firstname"],
        lastname: res.data.data["drivers.lastname"],
      }
      setAllData({ ...allData, decharge: res.data.data, driver })

    })
  }, [])

  const restitition = (data) => {
    data["car_id"] = allData.decharge["cars.id"]
    data["decharge_id"] = allData.decharge["decharges.id"]
    data["date_restitition"] = data["date_restitition"] ? data["date_restitition"].format("yy-M-D") : moment().format("yy-M-D")
    data["date_checklist"] = data["date_restitition"]
    api.post("decharges/restitition/" + params.id, data).then((res) => {
      message.success("Bien Ajouter")
      history.push("/decharges/show/" + params.id)
    })
  }
  return (
    <Page withBack={true} loading={!allData.decharge} title={"Restitition (Décharge)"}>
      <Card
        title={`Decharge N° ${allData.decharge && allData.decharge["decharges.id"]}, Le ${allData.decharge && moment(allData.decharge["decharges.date_decharge"]).format("DD-MM-Y")}`}
        extra={<Link to={`/decharges/show/${allData.decharge && allData.decharge["decharges.id"]}`}>Plus d'info</Link>}
      >
        <p><b>Client:</b> {allData.decharge && allData.decharge["clients.designation"]}</p>
        <p><b>Marque véhicule:</b> {allData.decharge && allData.decharge["cars.marque"]}</p>
        <p><b>Matricule véhicule:</b> {allData.decharge && allData.decharge["cars.matricule"]}</p>
        <p><b>Code GPS:</b> {allData.decharge && allData.decharge["cars.code_gps"]}</p>
      </Card>
      <Divider orientation="left"><h1>Chcklist de restitition:</h1></Divider>
      {allData.decharge &&

        <FormBuilder
          formItems={formCheckListRestititionItems} onFinish={restitition}
          initialValues={
            {
              driver: allData.driver,
              driver_id: allData.driver && allData.driver.id,
              odometre: allData?.decharge && allData.decharge.odometre,
              date_restitition: moment(),
              assurance: allData.decharge.assurance,
              boite_pharm: allData.decharge.boite_pharm,
              carnet_enter: allData.decharge.carnet_enter,
              carte_gpl: allData.decharge.carte_gpl,
              carte_grise: allData.decharge.carte_grise,
              cle_roue: allData.decharge.cle_roue,
              cle_vehicule: allData.decharge.cle_vehicule,
              cric: allData.decharge.cric,
              extincteur: allData.decharge.extincteur,
              gillet: allData.decharge.gillet,
              niveau_carburant: allData.decharge.niveau_carburant,
              permis_circuler: allData.decharge.permis_circuler,
              pochette_cle: allData.decharge.pochette_cle,
              poste_radio: allData.decharge.poste_radio,
              roue_secour: allData.decharge.roue_secour,
              scanner: allData.decharge.scanner,
              starts: allData.decharge.starts,
              triangle: allData.decharge.triangle,
              vignette: allData.decharge.vignette
            }
          }
        />
      }
    </Page >
  )
}
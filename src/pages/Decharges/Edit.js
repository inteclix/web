import React, { useRef, useState, useEffect } from "react"
import { message, Steps, Spin } from 'antd';
import * as moment from "moment"
import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { formDechargeItems, formCheckListItems } from "./columns"
import PrintDecharge from "components/PrintDecharge";
import { useReactToPrint } from "react-to-print";
import { useHistory, useRouteMatch } from "react-router-dom";
import { mockComponent } from "react-dom/test-utils";
const { Step } = Steps;

export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const [allData, setAllData] = useState({ step: 0 })
  const [loading, setLoading] = useState(false)
  const { params } = useRouteMatch()
  const [dechargeData, setDechargeData] = useState(null)
  const [loadingData, setLoadingData] = useState(true)
  useEffect(() => {
    api.get("/decharges/" + params.id).then((res) => {
      console.log(res.data)
      setDechargeData(res.data.data)
      setLoadingData(false)
    })
  }, [])

  const decharge = (dataForm) => {
    setLoading(true);
    dataForm["date_decharge"] = dataForm["date_decharge"] ? dataForm["date_decharge"].format("yy-M-D") : moment().format("yy-M-D")
    dataForm["date_fin_prestation"] = dataForm["date_fin_prestation"] ? dataForm["date_fin_prestation"].format("yy-M-D") : null
    dataForm["date_checklist"] = dataForm["date_checklist"] ? dataForm["date_checklist"].format("yy-M-D") : moment().format("yy-M-D")
    api.put("/decharges/" + params.id, dataForm).then((res) => {
      message.info("Bien modifier")
      history.push("/decharges/")
    }).catch(() => {
      setLoading(false);
    })
  }

  const checklist = (dataForm) => {
    const postData = {
      ...allData.data,
      ...dataForm
    }

    api.put("/decharges/" + params.id, postData).then((res) => {
      message.info("Bien modifier")
      history.push("/decharges/show/" + res.data.data.id)
    }).catch(() => {
      setLoading(false);
    })

  }

  const printDecharge = useRef(null);
  const handlePrintDecharge = useReactToPrint({
    content: () => printDecharge.current,
    onBeforeGetContent: async () => { },
  });

  if (loadingData || !dechargeData) {
    return (
      <Page title="Chargement ..." withBack={true} >
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spin size="large" />
        </div>
      </Page>
    )
  }

  return (
    <Page withBack={true} title={"Modifier Décharge N°(" + params.id + ") | Véhicule: " + dechargeData["cars.matricule"]}>
      <FormBuilder
        loading={loading}
        formItems={[
          {
            name: "client_id",
            label: "Client",
            type: "search",
            rules: [{ required: true, message: _messages.required }],
            url: "clients/search",
            defaultOptionName: "client",
            mapOptionToString: c => c?.designation
          },
          {
            name: "car_id",
            label: "Véhicule",
            type: "search",
            rules: [{ required: true, message: _messages.required }],
            url: "cars/search",
            defaultOptionName: "car",
            mapOptionToString: c => c?.matricule + " | " + c?.marque
          },
          {
            name: "date_decharge",
            label: "Date décharge",
            rules: [{ required: true, message: _messages.required }],
            type: "date",
          },
          {
            name: "date_fin_prestation",
            label: "Date fin prestation",
            type: "date",
            disabledDate: (current, form) => current && current < form.getFieldValue("date_decharge")
          },
          {
            name: "date_checklist",
            label: "Date checklist",
            type: "date",
            disabledDate: (current, form) => current && current < moment(allData.data.date_decharge)
          },
          {
            name: "driver_id",
            label: "Conducteur",
            type: "search",
            rules: [{ required: true, message: _messages.required }],
            url: "drivers/search",
            defaultOptionName: "driver",
            mapOptionToString: c => c?.firstname + " " + c.lastname
          },
          {
            name: "niveau_carburant",
            label: "Niveau carburant",
            rules: [{ required: true, message: _messages.required }],
            type: "progress",
          },
          {
            name: "odometre",
            label: "Odometre",
            rules: [{ required: true, message: _messages.required }],
            type: "integer",
            inputProp: {
              suffix: "KM"
            }
          },
          {
            name: "starts",
            label: "Etat de véhicule",
            type: "rate",
          },
          {
            name: "cle_vehicule",
            label: "Nbs clés véhicule",
            type: "integer",
            inputProp: {
              suffix: "Clé(s)"
            }
          },
          {
            name: "carte_grise",
            label: "Carte grise",
            type: "checkbox",
          }
          ,
          {
            name: "assurance",
            label: "Assurance",
            type: "checkbox",
          },
          ,
          {
            name: "assurance_marchandises",
            label: "Assurance marchandises",
            type: "checkbox",
          }
          ,
          {
            name: "scanner",
            label: "Scanner",
            type: "checkbox",
          }
          ,
          {
            name: "permis_circuler",
            label: "Permis circuler",
            type: "checkbox",
          }
          ,
          {
            name: "carnet_enter",
            label: "Carnet entretien",
            type: "checkbox",
          }
          ,
          {
            name: "vignette",
            label: "Vignette",
            type: "checkbox",
          }
          ,
          {
            name: "carte_gpl",
            label: "Carte GPL",
            type: "checkbox",
          }
          ,
          {
            name: "gillet",
            label: "Gillet",
            type: "checkbox",
          },
          {
            name: "roue_secour",
            label: "Roue secour",
            type: "checkbox",
          },
          {
            name: "cric",
            label: "Cric",
            type: "checkbox",
          },
          {
            name: "cle_roue",
            label: "Cle roue",
            type: "checkbox",
          },
          {
            name: "poste_radio",
            label: "Poste radio",
            type: "checkbox",
          },

          {
            name: "extincteur",
            label: "Extincteur",
            type: "checkbox",
          },
          {
            name: "boite_pharm",
            label: "Boite pharmacie",
            type: "checkbox",
          },
          {
            name: "triangle",
            label: "Triangle de présignalisation",
            type: "checkbox",
          },
          {
            name: "pochette_cle",
            label: "Pochette des clés",
            type: "checkbox",
          },
          {
            name: "observation_checklist",
            label: "observation",
            type: "textarea",
          }
        ]}
        onFinish={decharge}
        initialValues={
          {
            client_id: dechargeData["client_id"],
            client: dechargeData["client"],
            car_id: dechargeData["car_id"],
            car: dechargeData["car"],
            driver_id: dechargeData["driver_id"],
            driver: dechargeData["driver"],
            date_decharge: moment(dechargeData["decharges.date_decharge"]),
            date_checklist: moment(dechargeData["date_checklist"]),
            assurance: dechargeData.assurance,
            assurance_marchandises: dechargeData.assurance_marchandises,
            boite_pharm: dechargeData.boite_pharm,
            carnet_enter: dechargeData.carnet_enter,
            carte_gpl: dechargeData.carte_gpl,
            carte_grise: dechargeData.carte_grise,
            cle_roue: dechargeData.cle_roue,
            cle_vehicule: dechargeData.cle_vehicule,
            cric: dechargeData.cric,
            extincteur: dechargeData.extincteur,
            gillet: dechargeData.gillet,
            niveau_carburant: dechargeData.niveau_carburant,
            odometre: dechargeData.odometre,
            permis_circuler: dechargeData.permis_circuler,
            pochette_cle: dechargeData.pochette_cle,
            poste_radio: dechargeData.poste_radio,
            roue_secour: dechargeData.roue_secour,
            scanner: dechargeData.scanner,
            starts: dechargeData.starts,
            triangle: dechargeData.triangle,
            vignette: dechargeData.vignette,
            observation_checklist: dechargeData["observation_checklist"],
          }
        }
      />
    </Page >
  )
}
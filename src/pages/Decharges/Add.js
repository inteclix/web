import React, { useRef, useState } from "react"
import { message, Steps } from 'antd';
import * as moment from "moment"
import Page from "components/Page"
import { useAppStore } from "stores";

import { FormBuilder } from "components/UIBuilder"
import { _postes, _messages } from "_consts";

import { formDechargeItems, formCheckListItems } from "./columns"
import PrintDecharge from "components/PrintDecharge";
import { useReactToPrint } from "react-to-print";
import { useHistory } from "react-router-dom";
const { Step } = Steps;

export default function () {
  const { api } = useAppStore()
  const history = useHistory()
  const [allData, setAllData] = useState({ step: 0 })
  const decharge = (dataForm) => {
    dataForm["date_decharge"] = dataForm["date_decharge"] ? dataForm["date_decharge"].format("yy-M-D") : moment().format("yy-M-D")
    dataForm["date_fin_prestation"] = dataForm["date_fin_prestation"] ? dataForm["date_fin_prestation"].format("yy-M-D") : null
    setAllData({ ...allData, data: { ...allData.data, ...dataForm }, step: 1 })
  }

  const checklist = (dataForm) => {
    dataForm["date_checklist"] = dataForm["date_checklist"] ? dataForm["date_checklist"].format("yy-M-D") : moment().format("yy-M-D")
    const postData = {
      ...allData.data,
      ...dataForm
    }

    api.post("/decharges", postData).then((res) => {
      message.info("Bien ajouter")
      history.push("/decharges/show/" + res.data.data.id)
    })

  }

  const printDecharge = useRef(null);
  const handlePrintDecharge = useReactToPrint({
    content: () => printDecharge.current,
    onBeforeGetContent: async () => { },
  });

  return (
    <Page title="Nauveau decharge">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Steps current={allData.step}>
          <Step title="Affectation client" description="" />
          <Step title="Checklist Conducteur" description="" />
        </Steps>
        <div><hr /></div>
        <div style={{ flex: 1, }}>
          {allData.step === 0 &&
            <FormBuilder formItems={formDechargeItems} initialValues={{ date_decharge: moment() }} onFinish={decharge} />
          }
          {allData.step === 1 &&
            <FormBuilder
              formItems={[{
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
              ]} onFinish={checklist}
              initialValues={
                {
                  assurance: false,
                  boite_pharm: false,
                  carnet_enter: false,
                  carte_gpl: false,
                  carte_grise: false,
                  cle_roue: false,
                  cle_vehicule: 1,
                  cric: false,
                  extincteur: false,
                  gillet: false,
                  niveau_carburant: 0,
                  odometre: 0,
                  permis_circuler: false,
                  pochette_cle: false,
                  poste_radio: false,
                  roue_secour: false,
                  scanner: false,
                  starts: 5,
                  triangle: false,
                  vignette: false
                }
              }
            />
          }
        </div>


      </div>,
    </Page >
  )
}
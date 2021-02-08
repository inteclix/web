import React, { useRef, useState, useEffect } from "react";
import { message, Card, Divider } from "antd";
import * as moment from "moment";
import Page from "components/Page";
import { useAppStore } from "stores";
import { FormBuilder } from "components/UIBuilder";
import { formCheckListItems, formCheckListRestititionItems } from "./columns";
import { Link } from "react-router-dom";
import { _postes, _messages } from "_consts";

import PrintDecharge from "components/PrintDecharge";
import { useReactToPrint } from "react-to-print";
import { useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function () {
  const { api } = useAppStore();
  const { params } = useRouteMatch();
  const history = useHistory();
  const [allData, setAllData] = useState({ decharge: null });
  window.allData = allData;
  useEffect(() => {
    api.get("decharges/" + params.id).then((res) => {
      setAllData({ ...allData, decharge: res.data.data });
    });
  }, []);

  const addChecklist = (data) => {
    data["car_id"] = allData.decharge["cars.id"];
    data["decharge_id"] = allData.decharge["decharges.id"];
    data["date_checklist"] = data["date_checklist"]
      ? data["date_checklist"].format("yy-M-D")
      : moment().format("yy-M-D");
    api.post("decharges/checklist/" + params.id, data).then((res) => {
      message.success("Bien Ajouter");
      history.push("/decharges/show/" + params.id);
    });
  };
  return (
    <Page
      withBack={true}
      loading={!allData.decharge}
      title={"Changement de conducteur"}
    >
      <Card
        title={`Decharge N° ${allData.decharge && allData.decharge["decharges.id"]
          }, Le ${allData.decharge &&
          moment(allData.decharge["decharges.date_decharge"]).format("DD-MM-Y")
          }`}
        extra={
          <Link
            to={`/decharges/show/${allData.decharge && allData.decharge["decharges.id"]
              }`}
          >
            Plus d'info
          </Link>
        }
      >
        <p>
          <b>Client:</b>{" "}
          {allData.decharge && allData.decharge["clients.designation"]}
        </p>
        <p>
          <b>Marque véhicule:</b>{" "}
          {allData.decharge && allData.decharge["cars.marque"]}
        </p>
        <p>
          <b>Matricule véhicule:</b>{" "}
          {allData.decharge && allData.decharge["cars.matricule"]}
        </p>
        <p>
          <b>Code GPS:</b>{" "}
          {allData.decharge && allData.decharge["cars.code_gps"]}
        </p>
      </Card>
      <Divider orientation="left">
        <h1>Chcklist:</h1>
      </Divider>
      {
        allData.decharge &&
        <FormBuilder
          formItems={[
            {
              name: "date_checklist",
              label: "Date checklist",
              type: "date",
              disabledDate: (current, form) =>
                current &&
                current < moment(allData.decharge.checklists[0].date_checklist)
            },
            {
              name: "driver_id",
              label: "Conducteur",
              type: "search",
              rules: [{ required: true, message: _messages.required }],
              url: "drivers/search",
              defaultOptionName: "driver",
              mapOptionToString: (c) => c?.firstname + " " + c.lastname
            },
            {
              name: "niveau_carburant",
              label: "Niveau carburant",
              rules: [{ required: true, message: _messages.required }],
              type: "progress"
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
              type: "rate"
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
              type: "checkbox"
            },
            {
              name: "assurance",
              label: "Assurance",
              type: "checkbox"
            },
            {
              name: "assurance_marchandises",
              label: "Assurance marchandises",
              type: "checkbox"
            },
            {
              name: "scanner",
              label: "Scanner",
              type: "checkbox"
            },
            {
              name: "permis_circuler",
              label: "Permis circuler",
              type: "checkbox"
            },
            {
              name: "carnet_enter",
              label: "Carnet entretien",
              type: "checkbox"
            },
            {
              name: "vignette",
              label: "Vignette",
              type: "checkbox"
            },
            {
              name: "carte_gpl",
              label: "Carte GPL",
              type: "checkbox"
            },
            {
              name: "gillet",
              label: "Gillet",
              type: "checkbox"
            },
            {
              name: "roue_secour",
              label: "Roue secour",
              type: "checkbox"
            },
            {
              name: "cric",
              label: "Cric",
              type: "checkbox"
            },
            {
              name: "cle_roue",
              label: "Cle roue",
              type: "checkbox"
            },
            {
              name: "poste_radio",
              label: "Poste radio",
              type: "checkbox"
            },

            {
              name: "extincteur",
              label: "Extincteur",
              type: "checkbox"
            },
            {
              name: "boite_pharm",
              label: "Boite pharmacie",
              type: "checkbox"
            },
            {
              name: "triangle",
              label: "Triangle de présignalisation",
              type: "checkbox"
            },
            {
              name: "pochette_cle",
              label: "Pochette des clés",
              type: "checkbox"
            },
            {
              name: "observation_checklist",
              label: "Observation",
              type: "textarea"
            }
          ]}
          onFinish={addChecklist}
          initialValues={{
            odometre: allData.decharge.odometre,
            assurance: allData.decharge.assurance,
            assurance_marchandises: allData.decharge.assurance_marchandises,
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
          }}
        />
      }
    </Page>
  );
}

import { _prop, _postes, _carGenre, _messages, _motif_restititions } from "_consts";
import * as moment from "moment"
export const formDechargeItems = [
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
  }
]


export const formCheckListRestititionItems = [
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
    name: "motif_restitition",
    label: "Motif de restitution",
    rules: [{ required: true, message: _messages.required }],
    type: "select",
    selects: _motif_restititions,
  },
  {
    name: "date_restitition",
    label: "Date restitution",
    rules: [{ required: true, message: _messages.required }],
    type: "date",
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
]

export const formCheckListItems = [

]
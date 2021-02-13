import { _prop, _postes, _carGenre, _messages } from "_consts";

export const formItems = [
  {
    name: "numero",
    label: "numero",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "car_id",
    label: "Véhicule",
    type: "search",
    url: "cars/search",
    defaultOptionName: "car",
    mapOptionToString: c => c?.matricule + " | " + c?.marque
  },
  {
    name: "client_id",
    label: "Client",
    type: "search",
    url: "clients/search",
    defaultOptionName: "client",
    mapOptionToString: c => c?.designation
  },
  {
    name: "driver1_id",
    label: "Conducteur 1",
    type: "search",
    url: "drivers/search",
    rules: [{ required: true, message: _messages.required }],
    defaultOptionName: "driver1",
    mapOptionToString: c => c?.firstname + " " + c?.lastname + " | C/P: " + c?.code_paie
  },
  {
    name: "driver2_id",
    label: "Conducteur 2",
    type: "search",
    url: "drivers/search",
    defaultOptionName: "driver2",
    mapOptionToString: c => c?.firstname + " " + c?.lastname + " | C/P: " + c?.code_paie
  },
  {
    name: "date_bon_mission",
    label: "Date d'effet(Bon commande)",
    rules: [{ required: true, message: _messages.required }],
    type: "date",
  },
  {
    name: "depart",
    label: "Lieu départ(chargement)",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "destination",
    label: "Lieu destination(déchargement)",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "date_depart_mission",
    label: "Date depart",
    rules: [{ required: true, message: _messages.required }],
    type: "date",
  },
  {
    name: "date_arrivee_mission",
    label: "Date arrivée",
    rules: [{ required: true, message: _messages.required }],
    type: "date",
  },
]
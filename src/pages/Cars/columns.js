import { _prop, _marque, _carGenre, _messages, _carStateName } from "_consts";

export const formItems = [
  {
    name: "matricule",
    label: "Matricule",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "prop",
    label: "prop",
    rules: [{ required: true, message: _messages.required }],
    type: "select",
    selects: _prop,
  },
  {
    name: "old_matricule",
    label: "old_matricule",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "code_gps",
    label: "code_gps",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "genre",
    label: "genre",
    rules: [{ required: true, message: _messages.required }],
    type: "select",
    selects: _carGenre
  },
  {
    name: "marque",
    label: "marque",
    rules: [{ required: true, message: _messages.required }],
    type: "select",
    selects: _marque
  },
  {
    name: "type",
    label: "type",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "puissance",
    label: "puissance",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "energie",
    label: "energie",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "carrosserie",
    label: "carrosserie",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "color",
    label: "color",
    type: "text",
  },

]

export const formItemsCarState = [
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
    name: "name",
    label: "Designation",
    type: "select",
    rules: [{ required: true, message: _messages.required }],
    selects: _carStateName
  },
  {
    name: "state_date",
    label: "Date",
    type: "date",
    rules: [{ required: true, message: _messages.required }],
  },
  {
    name: "observation",
    label: "Observation",
    type: "textarea"
  }
]


export const camionRemorqueFormItems = [
  {
    name: "car_id",
    label: "Camion",
    type: "search",
    url: "cars/search",
    defaultOptionName: "car",
    mapOptionToString: c => c?.matricule + " | " + c?.marque
  },
  {
    name: "car_id",
    label: "Remorque",
    type: "search",
    url: "cars/search",
    defaultOptionName: "car",
    mapOptionToString: c => c?.matricule + " | " + c?.marque
  },
  {
    name: "date",
    label: "Date",
    rules: [{ required: true, message: _messages.required }],
    type: "date",
  },
]
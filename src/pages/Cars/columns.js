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
    label: "Propriétaire",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "old_matricule",
    label: "Ancien matricule",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "code_gps",
    label: "code GPS",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "genre",
    label: "Genre",
    rules: [{ required: true, message: _messages.required }],
    type: "select",
		selects: _carGenre
  },
  {
    name: "marque",
    label: "Marque",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "type",
    label: "Type",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "puissance",
    label: "Puissance",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "energie",
    label: "Energie",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "carrosserie",
    label: "Carrosserie",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "color",
    label: "Color",
    type: "text",
  },
	{
    name: "nb_places",
    label: "Nombre de places",
    type: "integer",
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
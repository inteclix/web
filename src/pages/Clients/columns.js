import { _prop, _postes, _carGenre, _messages } from "_consts";

export const formItems = [
  {
    name: "code",
    label: "Code (SAP)",
    type: "text",
  },
  {
    name: "designation",
    label: "Designation",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "localite",
    label: "Localité",
    type: "text",
  },
  {
    name: "tel",
    label: "TEL",
    type: "text",
  },
  {
    name: "client_id",
    label: "Client hiérarchique",
    type: "search",
    url: "clients/search",
    defaultOptionName: "client",
    mapOptionToString: c => c?.designation
  },
]
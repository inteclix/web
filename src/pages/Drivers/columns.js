import { _prop, _postes, _carGenre, _messages, _drivers_types } from "_consts";

export const formItems = [
  {
    name: "firstname",
    label: "Nom",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "lastname",
    label: "Prenom",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "tel",
    label: "tel",
    type: "text",
  },
  {
    name: "code_paie",
    label: "Code paie",
    type: "integer",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    selects: _drivers_types
  }
]
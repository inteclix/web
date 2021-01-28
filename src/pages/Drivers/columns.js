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
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "code_paie",
    label: "Code paie",
    rules: [{ required: true, message: _messages.required }],
    inputProp: {
      placeholder: "'0' Si n'appartient pas au Condor Logistics",
    },
    type: "text",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    selects: _drivers_types
  }
]
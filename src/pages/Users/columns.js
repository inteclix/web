import { _prop, _postes, _carGenre, _messages } from "_consts";

export const formItems = [
  {
    name: "username",
    label: "Nom d'utilisateur",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
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
    name: "mail",
    label: "Email",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  },
  {
    name: "password",
    label: "Mot de pass",
    rules: [{ required: true, message: _messages.required }],
    type: "password",
  },
  {
    name: "poste",
    label: "Poste",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
    selects: _postes
  },
  {
    name: "tel",
    label: "TEL",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  }
]

export const roleFormItems = [
  {
    name: "name",
    label: "Designation",
    rules: [{ required: true, message: _messages.required }],
    type: "text",
  }
]
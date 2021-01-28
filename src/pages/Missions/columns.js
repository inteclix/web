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
        defaultOptionName: "driver1",
        mapOptionToString: c => c?.firstname + " " + c?.lastname
    },
    {
        name: "driver2_id",
        label: "Conducteur 2",
        type: "search",
        url: "drivers/search",
        defaultOptionName: "driver2",
        mapOptionToString: c => c?.firstname + " " + c?.lastname
    },
    {
        name: "l_chargement",
        label: "l_chargement",
        rules: [{ required: true, message: _messages.required }],
        type: "text",
    },
    {
        name: "l_dechargement",
        label: "l_dechargement",
        rules: [{ required: true, message: _messages.required }],
        type: "text",
    },
    {
        name: "date_mission",
        label: "date_mission",
        rules: [{ required: true, message: _messages.required }],
        type: "date",
    },
]